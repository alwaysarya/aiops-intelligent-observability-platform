"""Correlation engine — finds related events."""
from datetime import datetime, timedelta
from typing import Any, Dict, List

from src.models.root_cause import Correlation
from src.utils.config import settings
from src.utils.logger import logger
from src.utils.metrics import CORRELATIONS_FOUND


class CorrelationEngine:
    """Finds correlations between events in a time window."""

    def __init__(self, window_seconds: int = None):
        self.window_seconds = window_seconds or settings.correlation_window_seconds

    def find_correlations(self, events: List[Dict[str, Any]]) -> List[Correlation]:
        """
        Find correlations between events.
        Events: list of dicts with keys: timestamp, service, type, message
        """
        if len(events) < 2:
            return []

        correlations = []
        sorted_events = sorted(events, key=lambda e: e.get("timestamp", datetime.utcnow()))

        for i, ev_a in enumerate(sorted_events):
            for ev_b in sorted_events[i + 1:]:
                corr = self._correlate(ev_a, ev_b)
                if corr:
                    correlations.append(corr)

        CORRELATIONS_FOUND.inc(len(correlations))
        logger.info(f"Found {len(correlations)} correlations from {len(events)} events")
        return correlations

    def _correlate(self, ev_a: Dict, ev_b: Dict) -> Correlation:
        """Check if two events are correlated."""
        ts_a = ev_a.get("timestamp", datetime.utcnow())
        ts_b = ev_b.get("timestamp", datetime.utcnow())

        if isinstance(ts_a, str):
            ts_a = datetime.fromisoformat(ts_a.replace("Z", "+00:00"))
        if isinstance(ts_b, str):
            ts_b = datetime.fromisoformat(ts_b.replace("Z", "+00:00"))

        time_delta = abs((ts_b - ts_a).total_seconds())

        if time_delta > self.window_seconds:
            return None

        # Time proximity score (closer = higher)
        time_score = 1.0 - (time_delta / self.window_seconds)

        # Service match bonus
        service_a = ev_a.get("service", "")
        service_b = ev_b.get("service", "")
        service_score = 1.0 if service_a == service_b else 0.5

        # Type match bonus
        type_a = ev_a.get("type", "")
        type_b = ev_b.get("type", "")
        type_score = 1.0 if type_a == type_b else 0.3

        # Combined score
        combined = (time_score * 0.5) + (service_score * 0.3) + (type_score * 0.2)

        if combined < settings.causality_threshold * 0.5:
            return None

        return Correlation(
            event_a=f"{service_a}:{type_a}",
            event_b=f"{service_b}:{type_b}",
            correlation_score=combined,
            time_delta_seconds=time_delta,
            description=f"Events occurred {time_delta:.1f}s apart",
        )

    def find_temporal_clusters(self, events: List[Dict], gap_seconds: int = 30) -> List[List[Dict]]:
        """Group events into temporal clusters."""
        if not events:
            return []

        sorted_events = sorted(events, key=lambda e: e.get("timestamp", datetime.utcnow()))
        clusters = []
        current_cluster = [sorted_events[0]]

        for ev in sorted_events[1:]:
            prev_ts = current_cluster[-1].get("timestamp", datetime.utcnow())
            curr_ts = ev.get("timestamp", datetime.utcnow())

            if isinstance(prev_ts, str):
                prev_ts = datetime.fromisoformat(prev_ts.replace("Z", "+00:00"))
            if isinstance(curr_ts, str):
                curr_ts = datetime.fromisoformat(curr_ts.replace("Z", "+00:00"))

            if (curr_ts - prev_ts).total_seconds() <= gap_seconds:
                current_cluster.append(ev)
            else:
                clusters.append(current_cluster)
                current_cluster = [ev]

        clusters.append(current_cluster)
        return clusters
