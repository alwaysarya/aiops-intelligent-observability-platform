"""Alert manager — orchestrates channels + deduplication."""
import hashlib
from typing import Dict, List

import redis.asyncio as aioredis

from src.channels import EmailChannel, SlackChannel, WebhookChannel
from src.models.alert import Alert, AlertSeverity, AlertStatus
from src.utils.config import settings
from src.utils.logger import logger
from src.utils.metrics import ALERTS_DEDUPLICATED, ALERTS_RECEIVED, ACTIVE_CHANNELS


SEVERITY_RANK = {"low": 0, "medium": 1, "high": 2, "critical": 3}


class AlertManager:
    """Manages alerts — deduplication + multi-channel dispatch."""

    def __init__(self):
        self.channels = [
            SlackChannel(),
            EmailChannel(),
            WebhookChannel(),
        ]
        self.redis = None
        self._init_redis()

    def _init_redis(self):
        try:
            self.redis = aioredis.Redis(
                host=settings.redis_host,
                port=settings.redis_port,
                db=settings.redis_db,
                decode_responses=True,
            )
            logger.info(f"Redis connected: {settings.redis_host}:{settings.redis_port}")
        except Exception as e:
            logger.warning(f"Redis unavailable, dedup disabled: {e}")
            self.redis = None

    def _dedup_key(self, alert: Alert) -> str:
        raw = f"{alert.service}:{alert.host}:{alert.severity.value}:{alert.title}"
        return f"alert:dedup:{hashlib.md5(raw.encode()).hexdigest()}"

    async def _is_duplicate(self, alert: Alert) -> bool:
        if self.redis is None:
            return False
        try:
            key = self._dedup_key(alert)
            exists = await self.redis.exists(key)
            if exists:
                ALERTS_DEDUPLICATED.inc()
                return True
            await self.redis.setex(key, settings.dedup_window_seconds, "1")
            return False
        except Exception as e:
            logger.warning(f"Dedup check failed: {e}")
            return False

    def _meets_severity_threshold(self, alert: Alert) -> bool:
        min_rank = SEVERITY_RANK.get(settings.min_severity_to_alert, 1)
        return SEVERITY_RANK.get(alert.severity.value, 0) >= min_rank

    async def process(self, alert: Alert) -> Alert:
        """Process a single alert: dedup, filter, send."""
        ALERTS_RECEIVED.labels(severity=alert.severity.value).inc()

        if not self._meets_severity_threshold(alert):
            logger.info(f"Alert below threshold: {alert.severity.value}")
            alert.status = AlertStatus.DEDUPLICATED
            return alert

        if await self._is_duplicate(alert):
            logger.info(f"Duplicate alert: {alert.alert_id}")
            alert.status = AlertStatus.DEDUPLICATED
            return alert

        # Send to all enabled channels
        sent = []
        for channel in self.channels:
            if not channel.is_enabled():
                continue
            try:
                success = await channel.send(alert)
                if success:
                    sent.append(channel.name)
            except Exception as e:
                logger.exception(f"Channel {channel.name} failed: {e}")

        alert.channels_sent = sent
        alert.status = AlertStatus.SENT if sent else AlertStatus.FAILED
        logger.info(f"Alert {alert.alert_id} sent via {sent}")
        return alert

    def active_channels(self) -> List[str]:
        return [c.name for c in self.channels if c.is_enabled()]

    def update_active_gauge(self):
        ACTIVE_CHANNELS.set(len(self.active_channels()))
