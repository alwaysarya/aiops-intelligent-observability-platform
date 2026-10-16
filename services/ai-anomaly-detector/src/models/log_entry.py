"""LogEntry model (shared with ingestion service)."""
from datetime import datetime
from typing import Any, Dict, Optional

from pydantic import BaseModel, Field


class LogEntry(BaseModel):
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    level: str = "INFO"
    service: str = "unknown"
    host: str = "unknown"
    message: str = ""
    trace_id: Optional[str] = None
    user_id: Optional[str] = None
    duration_ms: Optional[float] = None
    status_code: Optional[int] = None
    method: Optional[str] = None
    path: Optional[str] = None
    error: Optional[str] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)
