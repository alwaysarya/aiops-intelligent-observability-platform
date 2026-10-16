"""Dependency graph builder using NetworkX."""
from typing import Dict, List, Set, Tuple

import networkx as nx

from src.models.root_cause import Dependency
from src.utils.config import settings
from src.utils.logger import logger
from src.utils.metrics import GRAPH_EDGES, GRAPH_NODES


class DependencyGraph:
    """Builds and manages service dependency graph."""

    def __init__(self):
        self.graph = nx.DiGraph()
        self._initialize_default_topology()

    def _initialize_default_topology(self):
        """Initialize with a default microservice topology."""
        default_deps = [
            ("api-gateway", "user-service"),
            ("api-gateway", "payment-service"),
            ("api-gateway", "catalog-service"),
            ("payment-service", "database"),
            ("payment-service", "payment-gateway"),
            ("user-service", "database"),
            ("catalog-service", "database"),
            ("catalog-service", "search-service"),
            ("search-service", "elasticsearch"),
        ]
        for source, target in default_deps:
            self.graph.add_edge(source, target)
        logger.info(f"Initialized default topology: {self.graph.number_of_nodes()} nodes, {self.graph.number_of_edges()} edges")
        self._update_metrics()

    def add_dependency(self, dep: Dependency):
        """Add a dependency to the graph."""
        self.graph.add_edge(
            dep.source_service,
            dep.target_service,
            dependency_type=dep.dependency_type,
            call_count=dep.call_count,
            error_count=dep.error_count,
            avg_latency_ms=dep.avg_latency_ms,
        )
        self._update_metrics()

    def get_upstream(self, service: str, depth: int = 3) -> List[str]:
        """Get upstream services (callers)."""
        try:
            upstream = set()
            current = {service}
            for _ in range(depth):
                next_level = set()
                for node in current:
                    predecessors = set(self.graph.predecessors(node))
                    next_level.update(predecessors)
                next_level -= upstream
                upstream.update(next_level)
                current = next_level
            return list(upstream)
        except nx.NetworkXError:
            return []

    def get_downstream(self, service: str, depth: int = 3) -> List[str]:
        """Get downstream services (dependencies)."""
        try:
            downstream = set()
            current = {service}
            for _ in range(depth):
                next_level = set()
                for node in current:
                    successors = set(self.graph.successors(node))
                    next_level.update(successors)
                next_level -= downstream
                downstream.update(next_level)
                current = next_level
            return list(downstream)
        except nx.NetworkXError:
            return []

    def find_common_ancestors(self, services: List[str]) -> List[str]:
        """Find common upstream services for multiple affected services."""
        if not services:
            return []
        try:
            ancestors_sets = []
            for svc in services:
                ancestors = nx.ancestors(self.graph, svc) if svc in self.graph else set()
                ancestors_sets.append(ancestors)
            common = set.intersection(*ancestors_sets) if ancestors_sets else set()
            return list(common)
        except Exception:
            return []

    def find_shortest_path(self, source: str, target: str) -> List[str]:
        """Find shortest path between two services."""
        try:
            if source in self.graph and target in self.graph:
                return nx.shortest_path(self.graph, source, target)
            return []
        except (nx.NetworkXNoPath, nx.NodeNotFound):
            return []

    def _update_metrics(self):
        GRAPH_NODES.set(self.graph.number_of_nodes())
        GRAPH_EDGES.set(self.graph.number_of_edges())

    def to_dict(self) -> Dict:
        """Export graph as dict."""
        return {
            "nodes": list(self.graph.nodes()),
            "edges": [
                {"source": u, "target": v, **data}
                for u, v, data in self.graph.edges(data=True)
            ],
        }
