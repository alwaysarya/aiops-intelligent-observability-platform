"""Configuration for Root Cause Analyzer."""
from functools import lru_cache

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
    app_name: str = Field(default="root-cause-analyzer", alias="APP_NAME")
    app_version: str = Field(default="1.0.0", alias="APP_VERSION")
    environment: str = Field(default="development", alias="ENVIRONMENT")
    debug: bool = Field(default=False, alias="DEBUG")
    log_level: str = Field(default="INFO", alias="LOG_LEVEL")

    # Server
    host: str = Field(default="0.0.0.0", alias="HOST")
    port: int = Field(default=8003, alias="PORT")

    # Kafka
    kafka_bootstrap_servers: str = Field(default="localhost:9092", alias="KAFKA_BOOTSTRAP_SERVERS")
    kafka_topic_anomalies: str = Field(default="aiops.anomalies", alias="KAFKA_TOPIC_ANOMALIES")
    kafka_topic_root_causes: str = Field(default="aiops.root_causes", alias="KAFKA_TOPIC_ROOT_CAUSES")
    kafka_consumer_group: str = Field(default="root-cause-analyzer", alias="KAFKA_CONSUMER_GROUP")

    # Elasticsearch
    elasticsearch_hosts: str = Field(default="http://localhost:9200", alias="ELASTICSEARCH_HOSTS")
    elasticsearch_index_logs: str = Field(default="aiops-logs", alias="ELASTICSEARCH_INDEX_LOGS")

    # Analysis parameters
    correlation_window_seconds: int = Field(default=300, alias="CORRELATION_WINDOW_SECONDS")
    max_dependencies: int = Field(default=10, alias="MAX_DEPENDENCIES")
    causality_threshold: float = Field(default=0.7, alias="CAUSALITY_THRESHOLD")

    # OpenTelemetry
    otel_exporter_otlp_endpoint: str = Field(default="http://jaeger:4317", alias="OTEL_EXPORTER_OTLP_ENDPOINT")
    otel_service_name: str = Field(default="root-cause-analyzer", alias="OTEL_SERVICE_NAME")

    # Metrics
    metrics_port: int = Field(default=9090, alias="METRICS_PORT")


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
