"""Slack alert channel."""
from typing import Optional

import httpx

from src.channels.base import BaseChannel
from src.models.alert import Alert
from src.utils.config import settings
from src.utils.logger import logger
from src.utils.metrics import ALERT_SEND_LATENCY, ALERTS_FAILED, ALERTS_SENT


class SlackChannel(BaseChannel):
    """Sends alerts to Slack via webhook."""

    name = "slack"

    def __init__(self):
        super().__init__()
        self.webhook_url: Optional[str] = settings.slack_webhook_url
        self.channel = settings.slack_channel
        self.enabled = settings.slack_enabled and bool(self.webhook_url)

    def is_enabled(self) -> bool:
        return self.enabled

    async def send(self, alert: Alert) -> bool:
        if not self.is_enabled():
            logger.debug("Slack channel disabled, skipping")
            return False

        with ALERT_SEND_LATENCY.labels(channel=self.name).time():
            try:
                payload = {
                    "channel": self.channel,
                    "text": self.format_alert(alert),
                    "blocks": self._build_blocks(alert),
                }

                async with httpx.AsyncClient(timeout=10.0) as client:
                    response = await client.post(self.webhook_url, json=payload)
                    response.raise_for_status()

                ALERTS_SENT.labels(channel=self.name, severity=alert.severity.value).inc()
                logger.info(f"Slack alert sent: {alert.alert_id}")
                return True

            except Exception as e:
                ALERTS_FAILED.labels(channel=self.name, reason=type(e).__name__).inc()
                logger.error(f"Slack send failed: {e}")
                return False

    def _build_blocks(self, alert: Alert) -> list:
        emoji = {
            "low": ":large_green_circle:",
            "medium": ":large_yellow_circle:",
            "high": ":large_orange_circle:",
            "critical": ":red_circle:",
        }.get(alert.severity.value, ":white_circle:")

        return [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": f"{emoji} {alert.severity.value.upper()} — {alert.title}",
                },
            },
            {
                "type": "section",
                "fields": [
                    {"type": "mrkdwn", "text": f"*Service:*\n{alert.service}"},
                    {"type": "mrkdwn", "text": f"*Host:*\n{alert.host}"},
                    {"type": "mrkdwn", "text": f"*Score:*\n{alert.anomaly_score}"},
                    {"type": "mrkdwn", "text": f"*Time:*\n{alert.timestamp.isoformat()}"},
                ],
            },
            {
                "type": "section",
                "text": {"type": "mrkdwn", "text": alert.message},
            },
        ]
