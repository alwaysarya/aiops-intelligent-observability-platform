"""
Pydantic models for anomalies.
"""
from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class AnomalySeverity(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class AnomalyType(str, Enum):
    LATENCY_SPIKE = "latency_spike"
    ERROR_RATE_INCREASE = "error_rate_increase"
    TRAFFIC_SURGE = "traffic_surge"
    RESOURCE_EXHAUSTION = "resource_exhaustion"
    UNUSUAL_PATTERN = "unusual_pattern"
    SECURITY_THREAT = "security_threat"
    UNKNOWN = "unknown"


class Anomaly(BaseModel):
    anomaly_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    anomaly_type: AnomalyType = AnomalyType.UNKNOWN
    severity: AnomalySeverity = AnomalySeverity.MEDIUM
    service: str = "unknown"
    host: str = "unknown"
    score: float = Field(..., ge=0.0, le=1.0)
    confidence: float = Field(default=0.0, ge=0.0, le=1.0)
    message: str = ""
    detected_by: str = "ensemble"
    related_logs: List[Any] = Field(default_factory=list)
    metadata: Dict[str, Any] = Field(default_factory=dict)
