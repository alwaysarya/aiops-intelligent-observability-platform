"""
Pydantic models for log entries.
"""
from datetime import datetime
from typing import Any, Dict, Optional

from pydantic import BaseModel, Field


class LogEntry(BaseModel):
    """Represents a single log entry."""

    timestamp: datetime = Field(default_factory=datetime.utcnow)
    level: str = Field(default="INFO")
    service: str = Field(default="unknown")
    host: str = Field(default="unknown")
    message: str = Field(default="")
    trace_id: Optional[str] = None
    span_id: Optional[str] = None
    user_id: Optional[str] = None
    request_id: Optional[str] = None
    duration_ms: Optional[float] = None
    status_code: Optional[int] = None
    method: Optional[str] = None
    path: Optional[str] = None
    error: Optional[str] = None
    stack_trace: Optional[str] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)


class ProcessedLog(BaseModel):
    """Processed log entry ready for storage."""

    log: LogEntry
    index_name: str
    processed_at: datetime = Field(default_factory=datetime.utcnow)
    enrichment: Dict[str, Any] = Field(default_factory=dict)
