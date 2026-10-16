"""API request/response schemas."""
from datetime import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field

from src.models.anomaly import Anomaly, AnomalySeverity


class HealthResponse(BaseModel):
    status: str
    service: str
    version: str


class ReadyResponse(BaseModel):
    ready: bool
    checks: Dict[str, bool]


class AnomalyResponse(BaseModel):
    anomaly_id: str
    is_anomaly: bool
    score: float
    severity: AnomalySeverity
    model_scores: Dict[str, float]
    timestamp: datetime


class BatchPredictRequest(BaseModel):
    samples: List[List[float]]
    service: Optional[str] = "unknown"


class BatchPredictResponse(BaseModel):
    results: List[AnomalyResponse]
    total: int
    anomalies_found: int
