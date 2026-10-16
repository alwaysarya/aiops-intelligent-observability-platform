"""Pydantic models for root cause analysis."""
from datetime import datetime
from enum import Enum
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class CauseType(str, Enum):
    RESOURCE_EXHAUSTION = "resource_exhaustion"
    NETWORK_ISSUE = "network_issue"
    DEPENDENCY_FAILURE = "dependency_failure"
    CONFIGURATION_ERROR = "configuration_error"
    CODE_BUG = "code_bug"
    TRAFFIC_SPIKE = "traffic_spike"
    EXTERNAL_SERVICE = "external_service"
    UNKNOWN = "unknown"


class Dependency(BaseModel):
    """Represents a dependency between services."""
    source_service: str
    target_service: str
    dependency_type: str = "http"
    call_count: int = 0
    error_count: int = 0
    avg_latency_ms: float = 0.0


class Correlation(BaseModel):
    """Represents a correlation between events."""
    event_a: str
    event_b: str
    correlation_score: float = Field(..., ge=0.0, le=1.0)
    time_delta_seconds: float = 0.0
    description: str = ""


class RootCause(BaseModel):
    """A root cause identified by the analyzer."""
    cause_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    cause_type: CauseType = CauseType.UNKNOWN
    confidence: float = Field(..., ge=0.0, le=1.0)
    primary_service: str = "unknown"
    affected_services: List[str] = Field(default_factory=list)
    description: str = ""
    evidence: List[str] = Field(default_factory=list)
    correlations: List[Correlation] = Field(default_factory=list)
    metadata: Dict[str, Any] = Field(default_factory=dict)


class RootCauseResult(BaseModel):
    """Result of a root cause analysis."""
    analysis_id: str
    anomaly_id: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    root_causes: List[RootCause] = Field(default_factory=list)
    confidence: float = 0.0
    analysis_duration_ms: float = 0.0
    logs_analyzed: int = 0
    correlations_found: int = 0
    metadata: Dict[str, Any] = Field(default_factory=dict)


class AnalyzeRequest(BaseModel):
    """Request to manually trigger analysis."""
    anomaly_id: Optional[str] = None
    service: str
    time_window_seconds: int = 300
    severity: str = "medium"
