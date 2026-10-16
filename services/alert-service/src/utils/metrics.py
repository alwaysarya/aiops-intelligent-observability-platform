"""Prometheus metrics."""
from prometheus_client import Counter, Gauge, Histogram

ALERTS_RECEIVED = Counter(
    "alerts_received_total",
    "Total alerts received from Kafka",
    ["severity"],
)

ALERTS_SENT = Counter(
    "alerts_sent_total",
    "Total alerts sent successfully",
    ["channel", "severity"],
)

ALERTS_FAILED = Counter(
    "alerts_failed_total",
    "Total alerts that failed to send",
    ["channel", "reason"],
)

ALERTS_DEDUPLICATED = Counter(
    "alerts_deduplicated_total",
    "Total alerts deduplicated",
)

ALERT_SEND_LATENCY = Histogram(
    "alert_send_latency_seconds",
    "Time taken to send an alert",
    ["channel"],
    buckets=[0.1, 0.5, 1.0, 2.0, 5.0, 10.0, 30.0],
)

ACTIVE_CHANNELS = Gauge(
    "alert_active_channels",
    "Number of active alert channels",
)
