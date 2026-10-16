"""Configuration for Alert Service."""
from functools import lru_cache
from typing import Optional

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # Application
    app_name: str = Field(default="alert-service", alias="APP_NAME")
    app_version: str = Field(default="1.0.0", alias="APP_VERSION")
    environment: str = Field(default="development", alias="ENVIRONMENT")
    debug: bool = Field(default=False, alias="DEBUG")
    log_level: str = Field(default="INFO", alias="LOG_LEVEL")

    # Server
    host: str = Field(default="0.0.0.0", alias="HOST")
    port: int = Field(default=8002, alias="PORT")

    # Kafka
    kafka_bootstrap_servers: str = Field(default="localhost:9092", alias="KAFKA_BOOTSTRAP_SERVERS")
    kafka_topic_anomalies: str = Field(default="aiops.anomalies", alias="KAFKA_TOPIC_ANOMALIES")
    kafka_consumer_group: str = Field(default="alert-service", alias="KAFKA_CONSUMER_GROUP")

    # Redis (for deduplication)
    redis_host: str = Field(default="localhost", alias="REDIS_HOST")
    redis_port: int = Field(default=6379, alias="REDIS_PORT")
    redis_db: int = Field(default=1, alias="REDIS_DB")
    dedup_window_seconds: int = Field(default=300, alias="DEDUP_WINDOW_SECONDS")

    # Slack
    slack_enabled: bool = Field(default=False, alias="SLACK_ENABLED")
    slack_webhook_url: Optional[str] = Field(default=None, alias="SLACK_WEBHOOK_URL")
    slack_channel: str = Field(default="#alerts", alias="SLACK_CHANNEL")

    # Email
    email_enabled: bool = Field(default=False, alias="EMAIL_ENABLED")
    smtp_host: str = Field(default="smtp.gmail.com", alias="SMTP_HOST")
    smtp_port: int = Field(default=587, alias="SMTP_PORT")
    smtp_user: Optional[str] = Field(default=None, alias="SMTP_USER")
    smtp_password: Optional[str] = Field(default=None, alias="SMTP_PASSWORD")
    email_from: str = Field(default="alerts@aiops.local", alias="EMAIL_FROM")
    email_to: str = Field(default="admin@aiops.local", alias="EMAIL_TO")

    # Webhook
    webhook_enabled: bool = Field(default=False, alias="WEBHOOK_ENABLED")
    webhook_url: Optional[str] = Field(default=None, alias="WEBHOOK_URL")

    # Alert thresholds
    min_severity_to_alert: str = Field(default="medium", alias="MIN_SEVERITY_TO_ALERT")

    # OpenTelemetry
    otel_exporter_otlp_endpoint: str = Field(default="http://jaeger:4317", alias="OTEL_EXPORTER_OTLP_ENDPOINT")
    otel_service_name: str = Field(default="alert-service", alias="OTEL_SERVICE_NAME")

    # Metrics
    metrics_port: int = Field(default=9090, alias="METRICS_PORT")


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
