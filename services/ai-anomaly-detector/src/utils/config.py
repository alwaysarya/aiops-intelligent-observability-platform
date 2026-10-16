"""Configuration for AI Anomaly Detector Service."""
from functools import lru_cache
from typing import List, Optional

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
        protected_namespaces=("settings_",),
    )

    # Application
    app_name: str = Field(default="ai-anomaly-detector", alias="APP_NAME")
    app_version: str = Field(default="1.0.0", alias="APP_VERSION")
    environment: str = Field(default="development", alias="ENVIRONMENT")
    debug: bool = Field(default=False, alias="DEBUG")
    log_level: str = Field(default="INFO", alias="LOG_LEVEL")

    # Server
    host: str = Field(default="0.0.0.0", alias="HOST")
    port: int = Field(default=8000, alias="PORT")

    # Kafka
    kafka_bootstrap_servers: str = Field(default="localhost:9092", alias="KAFKA_BOOTSTRAP_SERVERS")
    kafka_topic_logs: str = Field(default="aiops.logs", alias="KAFKA_TOPIC_LOGS")
    kafka_topic_anomalies: str = Field(default="aiops.anomalies", alias="KAFKA_TOPIC_ANOMALIES")
    kafka_consumer_group: str = Field(default="ai-anomaly-detector", alias="KAFKA_CONSUMER_GROUP")

    # Elasticsearch
    elasticsearch_hosts: str = Field(default="http://localhost:9200", alias="ELASTICSEARCH_HOSTS")
    elasticsearch_index_anomalies: str = Field(default="aiops-anomalies", alias="ELASTICSEARCH_INDEX_ANOMALIES")

    # ML Models
    model_dir: str = Field(default="./models", alias="MODEL_DIR")
    isolation_forest_contamination: float = Field(default=0.05, alias="IF_CONTAMINATION")
    lstm_sequence_length: int = Field(default=50, alias="LSTM_SEQUENCE_LENGTH")
    lstm_epochs: int = Field(default=50, alias="LSTM_EPOCHS")
    lstm_batch_size: int = Field(default=32, alias="LSTM_BATCH_SIZE")
    autoencoder_encoding_dim: int = Field(default=8, alias="AE_ENCODING_DIM")
    autoencoder_epochs: int = Field(default=50, alias="AE_EPOCHS")
    anomaly_threshold: float = Field(default=0.7, alias="ANOMALY_THRESHOLD")

    # MLflow
    mlflow_tracking_uri: str = Field(default="http://mlflow:5000", alias="MLFLOW_TRACKING_URI")
    mlflow_experiment_name: str = Field(default="aiops-anomaly-detection", alias="MLFLOW_EXPERIMENT_NAME")

    # OpenTelemetry
    otel_exporter_otlp_endpoint: str = Field(default="http://jaeger:4317", alias="OTEL_EXPORTER_OTLP_ENDPOINT")
    otel_service_name: str = Field(default="ai-anomaly-detector", alias="OTEL_SERVICE_NAME")

    # Metrics
    metrics_port: int = Field(default=9090, alias="METRICS_PORT")

    @property
    def elasticsearch_hosts_list(self) -> List[str]:
        return [h.strip() for h in self.elasticsearch_hosts.split(",")]


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
