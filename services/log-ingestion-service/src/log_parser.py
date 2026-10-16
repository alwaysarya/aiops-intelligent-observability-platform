"""
Log parser — converts raw log payloads into structured LogEntry objects.
"""
import re
from datetime import datetime
from typing import Any, Dict, Optional

from src.models.log_entry import LogEntry
from src.utils.logger import logger


class LogParser:
    """Parses various log formats into LogEntry objects."""

    LEVEL_PATTERN = re.compile(
        r"\b(DEBUG|INFO|WARN|WARNING|ERROR|FATAL|CRITICAL|TRACE)\b",
        re.IGNORECASE,
    )
    TRACE_ID_PATTERN = re.compile(r"\b([a-f0-9]{16,32})\b", re.IGNORECASE)

    def parse(self, raw: Dict[str, Any]) -> Optional[LogEntry]:
        try:
            return LogEntry(
                timestamp=self._parse_timestamp(raw),
                level=self._parse_level(raw),
                service=raw.get("service") or raw.get("service_name") or "unknown",
                host=raw.get("host") or raw.get("hostname") or "unknown",
                message=self._parse_message(raw),
                trace_id=raw.get("trace_id") or self._extract_trace_id(raw),
                span_id=raw.get("span_id"),
                user_id=raw.get("user_id"),
                request_id=raw.get("request_id"),
                duration_ms=self._parse_duration(raw),
                status_code=self._parse_status_code(raw),
                method=raw.get("method") or raw.get("http_method"),
                path=raw.get("path") or raw.get("url"),
                error=raw.get("error"),
                stack_trace=raw.get("stack_trace") or raw.get("exception"),
                metadata=self._extract_metadata(raw),
            )
        except Exception as e:
            logger.error(f"Failed to parse log: {e}")
            return None

    def _parse_timestamp(self, raw: Dict[str, Any]) -> datetime:
        ts = raw.get("timestamp") or raw.get("time") or raw.get("@timestamp")
        if isinstance(ts, datetime):
            return ts
        if isinstance(ts, (int, float)):
            if ts > 1e12:
                ts = ts / 1000
            return datetime.utcfromtimestamp(ts)
        if isinstance(ts, str):
            try:
                return datetime.fromisoformat(ts.replace("Z", "+00:00"))
            except ValueError:
                pass
        return datetime.utcnow()

    def _parse_level(self, raw: Dict[str, Any]) -> str:
        level = raw.get("level") or raw.get("severity") or raw.get("log_level")
        if level:
            level_str = str(level).upper()
            return "WARNING" if level_str == "WARN" else level_str
        message = raw.get("message") or raw.get("msg") or ""
        match = self.LEVEL_PATTERN.search(str(message))
        if match:
            detected = match.group(1).upper()
            return "WARNING" if detected == "WARN" else detected
        return "INFO"

    def _parse_message(self, raw: Dict[str, Any]) -> str:
        return str(
            raw.get("message") or raw.get("msg") or raw.get("log") or raw.get("body") or ""
        )

    def _extract_trace_id(self, raw: Dict[str, Any]) -> Optional[str]:
        text = str(raw)
        match = self.TRACE_ID_PATTERN.search(text)
        return match.group(1) if match else None

    def _parse_duration(self, raw: Dict[str, Any]) -> Optional[float]:
        duration = (
            raw.get("duration_ms") or raw.get("duration")
            or raw.get("response_time") or raw.get("latency")
        )
        if duration is None:
            return None
        try:
            return float(duration)
        except (ValueError, TypeError):
            return None

    def _parse_status_code(self, raw: Dict[str, Any]) -> Optional[int]:
        code = raw.get("status_code") or raw.get("status") or raw.get("http_status")
        if code is None:
            return None
        try:
            return int(code)
        except (ValueError, TypeError):
            return None

    def _extract_metadata(self, raw: Dict[str, Any]) -> Dict[str, Any]:
        known_keys = {
            "timestamp", "time", "@timestamp", "level", "severity", "log_level",
            "service", "service_name", "host", "hostname", "message", "msg",
            "log", "body", "trace_id", "span_id", "user_id", "request_id",
            "duration_ms", "duration", "response_time", "latency", "status_code",
            "status", "http_status", "method", "http_method", "path", "url",
            "error", "stack_trace", "exception",
        }
        return {k: v for k, v in raw.items() if k not in known_keys}
