"""Base class for alert channels."""
from abc import ABC, abstractmethod
from typing import Dict

from src.models.alert import Alert


class BaseChannel(ABC):
    """Abstract base class for all alert channels."""

    name: str = "base"

    def __init__(self):
        self.enabled = False

    @abstractmethod
    async def send(self, alert: Alert) -> bool:
        """Send alert via this channel. Return True if successful."""
        pass

    @abstractmethod
    def is_enabled(self) -> bool:
        """Check if this channel is enabled."""
        pass

    def format_alert(self, alert: Alert) -> str:
        """Format alert as a human-readable string."""
        emoji = {
            "low": "🟢",
            "medium": "🟡",
            "high": "🟠",
            "critical": "🔴",
        }.get(alert.severity.value, "⚪")

        return (
            f"{emoji} *{alert.severity.value.upper()}* — {alert.title}\n"
            f"Service: `{alert.service}` | Host: `{alert.host}`\n"
            f"Message: {alert.message}\n"
            f"Score: {alert.anomaly_score}\n"
            f"Time: {alert.timestamp.isoformat()}"
        )
