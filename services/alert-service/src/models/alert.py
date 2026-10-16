"""Pydantic models for alerts."""
from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class AlertSeverity(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class AlertStatus(str, Enum):
    PENDING = "pending"
    SENT = "sent"
    FAILED = "failed"
    DEDUPLICATED = "deduplicated"


class Alert(BaseModel):
    """Represents an alert."""

    alert_id: str = Field(..., description="Unique alert ID")
    anomaly_id: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    severity: AlertSeverity = AlertSeverity.MEDIUM
    status: AlertStatus = AlertStatus.PENDING

    title: str = Field(default="Anomaly Detected")
    message: str = Field(default="")
    service: str = Field(default="unknown")
    host: str = Field(default="unknown")
    metric: Optional[str] = None
    value: Optional[float] = None
    threshold: Optional[float] = None

    anomaly_score: Optional[float] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)
    channels_sent: List[str] = Field(default_factory=list)


class AlertBatch(BaseModel):
    """Batch of alerts."""
    alerts: List[Alert] = Field(default_factory=list)
    total: int = 0
    critical_count: int = 0
    high_count: int = 0


class WebhookPayload(BaseModel):
    """Webhook payload for manual alert trigger."""
    title: str
    message: str
    severity: AlertSeverity = AlertSeverity.MEDIUM
    service: str = "unknown"
    host: str = "unknown"
    metadata: Dict[str, Any] = Field(default_factory=dict)
