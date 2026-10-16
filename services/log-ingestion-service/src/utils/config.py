"""
Configuration management for Log Ingestion Service.
"""
from functools import lru_cache
from typing import List

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # Application
    app_name: str = Field(default="log-ingestion-service", alias="APP_NAME")
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
    kafka_consumer_group: str = Field(default="log-ingestion-service", alias="KAFKA_CONSUMER_GROUP")
    kafka_auto_offset_reset: str = Field(default="earliest", alias="KAFKA_AUTO_OFFSET_RESET")

    # Elasticsearch
    elasticsearch_hosts: str = Field(default="http://localhost:9200", alias="ELASTICSEARCH_HOSTS")
    elasticsearch_index_prefix: str = Field(default="aiops-logs", alias="ELASTICSEARCH_INDEX_PREFIX")

    # Redis
    redis_host: str = Field(default="localhost", alias="REDIS_HOST")
    redis_port: int = Field(default=6379, alias="REDIS_PORT")
    redis_db: int = Field(default=0, alias="REDIS_DB")

    # PostgreSQL
    postgres_host: str = Field(default="localhost", alias="POSTGRES_HOST")
    postgres_port: int = Field(default=5432, alias="POSTGRES_PORT")
    postgres_db: str = Field(default="aiops", alias="POSTGRES_DB")
    postgres_user: str = Field(default="aiops", alias="POSTGRES_USER")
    postgres_password: str = Field(default="aiops_password", alias="POSTGRES_PASSWORD")

    # OpenTelemetry
    otel_exporter_otlp_endpoint: str = Field(default="http://localhost:4317", alias="OTEL_EXPORTER_OTLP_ENDPOINT")
    otel_service_name: str = Field(default="log-ingestion-service", alias="OTEL_SERVICE_NAME")

    # Metrics
    metrics_port: int = Field(default=9090, alias="METRICS_PORT")

    @field_validator("log_level")
    @classmethod
    def validate_log_level(cls, v: str) -> str:
        allowed = ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]
        v_upper = v.upper()
        if v_upper not in allowed:
            raise ValueError(f"log_level must be one of {allowed}")
        return v_upper

    @property
    def elasticsearch_hosts_list(self) -> List[str]:
        return [h.strip() for h in self.elasticsearch_hosts.split(",")]

    @property
    def database_url(self) -> str:
        return (
            f"postgresql://{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
