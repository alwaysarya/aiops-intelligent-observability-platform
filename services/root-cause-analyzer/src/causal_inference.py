"""Causal inference — determines root cause."""
import uuid
from typing import Any, Dict, List

from src.dependency_graph import DependencyGraph
from src.models.root_cause import CauseType, Correlation, RootCause
from src.utils.config import settings
from src.utils.logger import logger


class CausalInference:
    """Infers root cause from anomalies, correlations, and dependency graph."""

    def __init__(self, graph: DependencyGraph):
        self.graph = graph

    def infer(
        self,
        anomaly: Dict[str, Any],
        correlations: List[Correlation],
        affected_services: List[str] = None,
    ) -> List[RootCause]:
        """Infer root causes from an anomaly and its correlations."""
        root_causes = []

        primary_service = anomaly.get("service", "unknown")
        severity = anomaly.get("severity", "medium")
        score = anomaly.get("score", 0.5)

        affected_services = affected_services or [primary_service]

        # Cause 1: Dependency failure (if common ancestors exist)
        ancestors = self.graph.find_common_ancestors(affected_services)
        if ancestors:
            for ancestor in ancestors[:3]:
                confidence = min(0.9, score * 1.1)
                root_causes.append(RootCause(
                    cause_id=str(uuid.uuid4()),
                    cause_type=CauseType.DEPENDENCY_FAILURE,
                    confidence=confidence,
                    primary_service=ancestor,
                    affected_services=affected_services,
                    description=f"Common ancestor '{ancestor}' may be root cause",
                    evidence=[f"Downstream services affected: {affected_services}"],
                    correlations=correlations[:5],
                ))

        # Cause 2: Resource exhaustion (based on severity)
        if severity in ("high", "critical"):
            root_causes.append(RootCause(
                cause_id=str(uuid.uuid4()),
                cause_type=CauseType.RESOURCE_EXHAUSTION,
                confidence=min(0.8, score),
                primary_service=primary_service,
                affected_services=affected_services,
                description=f"Possible resource exhaustion in {primary_service}",
                evidence=[f"Anomaly severity: {severity}", f"Score: {score}"],
            ))

        # Cause 3: High correlation count → traffic spike
        if len(correlations) > 5:
            root_causes.append(RootCause(
                cause_id=str(uuid.uuid4()),
                cause_type=CauseType.TRAFFIC_SPIKE,
                confidence=min(0.7, len(correlations) / 20.0),
                primary_service=primary_service,
                affected_services=affected_services,
                description=f"High correlation count ({len(correlations)}) suggests traffic spike",
                evidence=[f"{len(correlations)} correlated events"],
            ))

        # Sort by confidence
        root_causes.sort(key=lambda rc: rc.confidence, reverse=True)
        return root_causes[:5]
