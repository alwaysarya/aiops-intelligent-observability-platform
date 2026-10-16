"""Generic webhook alert channel."""
from typing import Optional

import httpx

from src.channels.base import BaseChannel
from src.models.alert import Alert
from src.utils.config import settings
from src.utils.logger import logger
from src.utils.metrics import ALERT_SEND_LATENCY, ALERTS_FAILED, ALERTS_SENT


class WebhookChannel(BaseChannel):
    """Sends alerts to a generic webhook URL."""

    name = "webhook"

    def __init__(self):
        super().__init__()
        self.webhook_url: Optional[str] = settings.webhook_url
        self.enabled = settings.webhook_enabled and bool(self.webhook_url)

    def is_enabled(self) -> bool:
        return self.enabled

    async def send(self, alert: Alert) -> bool:
        if not self.is_enabled():
            logger.debug("Webhook channel disabled")
            return False

        with ALERT_SEND_LATENCY.labels(channel=self.name).time():
            try:
                payload = {
                    "alert_id": alert.alert_id,
                    "severity": alert.severity.value,
                    "title": alert.title,
                    "message": alert.message,
                    "service": alert.service,
                    "host": alert.host,
                    "anomaly_score": alert.anomaly_score,
                    "timestamp": alert.timestamp.isoformat(),
                    "metadata": alert.metadata,
                }

                async with httpx.AsyncClient(timeout=10.0) as client:
                    response = await client.post(self.webhook_url, json=payload)
                    response.raise_for_status()

                ALERTS_SENT.labels(channel=self.name, severity=alert.severity.value).inc()
                logger.info(f"Webhook alert sent: {alert.alert_id}")
                return True

            except Exception as e:
                ALERTS_FAILED.labels(channel=self.name, reason=type(e).__name__).inc()
                logger.error(f"Webhook send failed: {e}")
                return False
