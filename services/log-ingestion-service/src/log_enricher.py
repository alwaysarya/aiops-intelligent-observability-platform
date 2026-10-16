"""
Log enricher — adds context to parsed log entries.
"""
from datetime import datetime
from typing import Any, Dict

from src.models.log_entry import LogEntry, ProcessedLog


class LogEnricher:
    """Enriches log entries with additional context."""

    def __init__(self):
        self._cache: Dict[str, Any] = {}

    def enrich(self, log: LogEntry) -> ProcessedLog:
        enrichment = {
            "ingested_at": datetime.utcnow().isoformat(),
            "environment": "production",
            "severity_score": self._calculate_severity(log),
            "is_error": log.level in ("ERROR", "FATAL", "CRITICAL"),
            "is_warning": log.level == "WARNING",
            "has_trace": bool(log.trace_id),
            "service_tier": self._get_service_tier(log.service),
        }

        return ProcessedLog(
            log=log,
            index_name=self._get_index_name(log),
            enrichment=enrichment,
        )

    def _calculate_severity(self, log: LogEntry) -> int:
        base = {
            "TRACE": 0, "DEBUG": 10, "INFO": 30, "WARNING": 60,
            "ERROR": 80, "FATAL": 100, "CRITICAL": 100,
        }.get(log.level, 30)
        if log.error:
            base = min(100, base + 10)
        if log.stack_trace:
            base = min(100, base + 10)
        return base

    def _get_service_tier(self, service: str) -> str:
        critical = {"payment", "auth", "checkout", "user"}
        standard = {"catalog", "search", "recommendation"}
        s = service.lower()
        for c in critical:
            if c in s:
                return "critical"
        for st in standard:
            if st in s:
                return "standard"
        return "internal"

    def _get_index_name(self, log: LogEntry) -> str:
        date_str = log.timestamp.strftime("%Y.%m.%d")
        return f"aiops-logs-{date_str}"
