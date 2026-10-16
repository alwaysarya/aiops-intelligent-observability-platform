"""Prometheus metrics."""
from prometheus_client import Counter, Gauge, Histogram

LOGS_RECEIVED = Counter("ai_logs_received_total", "Logs received", ["topic"])
ANOMALIES_DETECTED = Counter("ai_anomalies_detected_total", "Anomalies detected", ["severity", "model"])
PREDICTIONS_TOTAL = Counter("ai_predictions_total", "Total predictions", ["model", "result"])
PREDICTION_LATENCY = Histogram(
    "ai_prediction_latency_seconds",
    "Prediction latency",
    ["model"],
    buckets=[0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1.0],
)
MODEL_LOADED = Gauge("ai_model_loaded", "Model loaded status", ["model"])
ANOMALY_SCORE = Histogram(
    "ai_anomaly_score",
    "Distribution of anomaly scores",
    buckets=[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
)
