"""Alert Service — main entry point."""
import uuid
from contextlib import asynccontextmanager
from datetime import datetime

from fastapi import FastAPI
from fastapi.responses import Response
from prometheus_client import CONTENT_TYPE_LATEST, generate_latest

from src.alert_manager import AlertManager
from src.kafka_consumer import KafkaAnomalyConsumer
from src.models.alert import Alert, AlertSeverity, WebhookPayload
from src.utils.config import settings
from src.utils.logger import logger
from src.utils.tracing import instrument_fastapi, setup_tracing

alert_manager: AlertManager = None
kafka_consumer: KafkaAnomalyConsumer = None


async def process_anomaly(payload: dict):
    """Handle incoming anomaly from Kafka."""
    try:
        severity_map = {
            "low": AlertSeverity.LOW,
            "medium": AlertSeverity.MEDIUM,
            "high": AlertSeverity.HIGH,
            "critical": AlertSeverity.CRITICAL,
        }
        severity = severity_map.get(payload.get("severity", "medium"), AlertSeverity.MEDIUM)

        alert = Alert(
            alert_id=str(uuid.uuid4()),
            anomaly_id=payload.get("anomaly_id"),
            severity=severity,
            title=payload.get("title", "Anomaly Detected"),
            message=payload.get("message", "Anomaly detected by ML model"),
            service=payload.get("service", "unknown"),
            host=payload.get("host", "unknown"),
            anomaly_score=payload.get("score"),
            metadata=payload.get("metadata", {}),
        )
        await alert_manager.process(alert)
    except Exception as e:
        logger.exception(f"Failed to process anomaly: {e}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    global alert_manager, kafka_consumer

    logger.info("=" * 60)
    logger.info(f"Starting {settings.app_name} v{settings.app_version}")
    logger.info(f"Environment: {settings.environment}")
    logger.info("=" * 60)

    setup_tracing()

    alert_manager = AlertManager()
    alert_manager.update_active_gauge()
    logger.info(f"Active channels: {alert_manager.active_channels()}")

    kafka_consumer = KafkaAnomalyConsumer(handler=process_anomaly)
    kafka_consumer.start()

    logger.info("✅ Alert Service is running")
    yield

    logger.info("Shutting down...")
    if kafka_consumer:
        kafka_consumer.stop()
    logger.info("👋 Shutdown complete")


app = FastAPI(
    title="Alert Service",
    description="Multi-channel alerting for AIOps platform",
    version=settings.app_version,
    lifespan=lifespan,
)

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


instrument_fastapi(app)


@app.get("/")
async def root():
    return {
        "service": settings.app_name,
        "version": settings.app_version,
        "status": "running",
        "active_channels": alert_manager.active_channels() if alert_manager else [],
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.get("/ready")
async def ready():
    checks = {
        "kafka_consumer": kafka_consumer is not None and kafka_consumer.running,
        "alert_manager": alert_manager is not None,
    }
    return {"ready": all(checks.values()), "checks": checks}


@app.get("/channels")
async def channels():
    return {
        "active": alert_manager.active_channels() if alert_manager else [],
        "all": ["slack", "email", "webhook"],
    }


@app.post("/trigger")
async def trigger_alert(payload: WebhookPayload):
    """Manually trigger an alert."""
    alert = Alert(
        alert_id=str(uuid.uuid4()),
        severity=payload.severity,
        title=payload.title,
        message=payload.message,
        service=payload.service,
        host=payload.host,
        metadata=payload.metadata,
    )
    result = await alert_manager.process(alert)
    return {
        "alert_id": result.alert_id,
        "status": result.status.value,
        "channels_sent": result.channels_sent,
    }


@app.get("/metrics")
async def metrics():
    return Response(content=generate_latest(), media_type=CONTENT_TYPE_LATEST)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "src.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
        log_config=None,
    )
