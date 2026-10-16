"""
Prometheus metrics for Log Ingestion Service.
"""
from prometheus_client import Counter, Gauge, Histogram

LOGS_RECEIVED = Counter(
    "logs_received_total",
    "Total number of logs received from Kafka",
    ["topic"],
)

LOGS_PROCESSED = Counter(
    "logs_processed_total",
    "Total number of logs successfully processed",
    ["status"],
)

LOGS_FAILED = Counter(
    "logs_failed_total",
    "Total number of logs that failed processing",
    ["reason"],
)

PROCESSING_LATENCY = Histogram(
    "log_processing_latency_seconds",
    "Time taken to process a log",
    buckets=[0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1.0],
)

ES_WRITE_LATENCY = Histogram(
    "elasticsearch_write_latency_seconds",
    "Time taken to write to Elasticsearch",
    buckets=[0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5],
)

ES_BULK_SIZE = Gauge(
    "elasticsearch_bulk_size",
    "Current bulk buffer size",
)

KAFKA_CONSUMER_LAG = Gauge(
    "kafka_consumer_lag",
    "Current Kafka consumer lag",
    ["topic", "partition"],
)
