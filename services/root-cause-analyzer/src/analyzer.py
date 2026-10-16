"""Main analyzer — orchestrates root cause analysis."""
import time
import uuid
from typing import Any, Dict, List

from src.causal_inference import CausalInference
from src.correlation_engine import CorrelationEngine
from src.dependency_graph import DependencyGraph
from src.models.root_cause import RootCause, RootCauseResult
from src.utils.config import settings
from src.utils.logger import logger
from src.utils.metrics import ANALYSIS_LATENCY, ANOMALIES_RECEIVED, ROOT_CAUSES_IDENTIFIED


class RootCauseAnalyzer:
    """Main analyzer that ties everything together."""

    def __init__(self):
        self.graph = DependencyGraph()
        self.correlations = CorrelationEngine()
        self.inference = CausalInference(self.graph)
        logger.info("RootCauseAnalyzer initialized")

    def analyze_anomaly(self, anomaly: Dict[str, Any]) -> RootCauseResult:
        """Full root cause analysis pipeline."""
        start = time.time()
        analysis_id = str(uuid.uuid4())

        severity = anomaly.get("severity", "medium")
        ANOMALIES_RECEIVED.labels(severity=severity).inc()

        try:
            # 1. Get affected services
            primary = anomaly.get("service", "unknown")
            affected = [primary]

            # 2. Get downstream services from graph
            downstream = self.graph.get_downstream(primary, depth=2)
            if downstream:
                affected.extend(downstream[:5])
                logger.info(f"Downstream services: {downstream}")

            # 3. Find correlated events (from anomaly metadata)
            events = anomaly.get("related_events", [])
            if not events and anomaly.get("timestamp"):
                events = [{"timestamp": anomaly["timestamp"], "service": primary, "type": "anomaly"}]

            correlations = self.correlations.find_correlations(events)

            # 4. Infer root causes
            root_causes = self.inference.infer(
                anomaly=anomaly,
                correlations=correlations,
                affected_services=affected,
            )

            # 5. Compute confidence
            confidence = max((rc.confidence for rc in root_causes), default=0.0)

            duration_ms = (time.time() - start) * 1000
            ANALYSIS_LATENCY.observe(duration_ms / 1000.0)

            if root_causes:
                ROOT_CAUSES_IDENTIFIED.inc(len(root_causes))

            result = RootCauseResult(
                analysis_id=analysis_id,
                anomaly_id=anomaly.get("anomaly_id"),
                root_causes=root_causes,
                confidence=confidence,
                analysis_duration_ms=duration_ms,
                logs_analyzed=len(events),
                correlations_found=len(correlations),
                metadata={
                    "primary_service": primary,
                    "affected_services": affected,
                },
            )

            logger.info(
                f"Analysis complete: {analysis_id} | "
                f"root_causes={len(root_causes)} | "
                f"confidence={confidence:.2f}"
            )
            return result

        except Exception as e:
            logger.exception(f"Analysis failed: {e}")
            return RootCauseResult(
                analysis_id=analysis_id,
                anomaly_id=anomaly.get("anomaly_id"),
                analysis_duration_ms=(time.time() - start) * 1000,
                metadata={"error": str(e)},
            )

    def get_graph_stats(self) -> Dict:
        return {
            "nodes": self.graph.graph.number_of_nodes(),
            "edges": self.graph.graph.number_of_edges(),
            "services": list(self.graph.graph.nodes()),
        }

    def find_path(self, source: str, target: str) -> Dict:
        path = self.graph.find_shortest_path(source, target)
        return {"source": source, "target": target, "path": path}
