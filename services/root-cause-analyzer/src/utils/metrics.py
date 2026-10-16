"""Prometheus metrics."""
from prometheus_client import Counter, Gauge, Histogram

ANOMALIES_RECEIVED = Counter(
    "rca_anomalies_received_total",
    "Total anomalies received",
    ["severity"],
)

ROOT_CAUSES_IDENTIFIED = Counter(
    "rca_root_causes_identified_total",
    "Total root causes identified",
)

CORRELATIONS_FOUND = Counter(
    "rca_correlations_found_total",
    "Total correlations found",
)

ANALYSIS_LATENCY = Histogram(
    "rca_analysis_latency_seconds",
    "Time taken to analyze an anomaly",
    buckets=[0.1, 0.5, 1.0, 2.0, 5.0, 10.0],
)

GRAPH_NODES = Gauge(
    "rca_graph_nodes",
    "Number of nodes in dependency graph",
)

GRAPH_EDGES = Gauge(
    "rca_graph_edges",
    "Number of edges in dependency graph",
)
