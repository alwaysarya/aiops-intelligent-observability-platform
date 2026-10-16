"""
Log Ingestion Service — main entry point.
"""
import signal
import sys
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.responses import Response
from prometheus_client import CONTENT_TYPE_LATEST, generate_latest

from src.elasticsearch_writer import ElasticsearchWriter
from src.kafka_consumer import KafkaLogConsumer
from src.log_enricher import LogEnricher
from src.log_parser import LogParser
from src.utils.config import settings
from src.utils.logger import logger
from src.utils.tracing import instrument_fastapi, setup_tracing

parser = LogParser()
enricher = LogEnricher()
es_writer: ElasticsearchWriter = None
kafka_consumer: KafkaLogConsumer = None


def process_log(raw_log: dict) -> None:
    """Pipeline: parse → enrich → write."""
    try:
        log_entry = parser.parse(raw_log)
        if not log_entry:
            return
        processed = enricher.enrich(log_entry)
        es_writer.write(processed)
    except Exception as e:
        logger.exception(f"Error in log pipeline: {e}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    global es_writer, kafka_consumer
    logger.info("=" * 60)
    logger.info(f"Starting {settings.app_name} v{settings.app_version}")
    logger.info(f"Environment: {settings.environment}")
    logger.info("=" * 60)

    setup_tracing()

    es_writer = ElasticsearchWriter(bulk_size=500, flush_interval=5.0)
    es_writer.start()

    kafka_consumer = KafkaLogConsumer(handler=process_log)
    kafka_consumer.start()

    logger.info("✅ Log Ingestion Service is running")
    yield

    logger.info("Shutting down...")
    if kafka_consumer:
        kafka_consumer.stop()
    if es_writer:
        es_writer.stop()
    logger.info("👋 Shutdown complete")


app = FastAPI(
    title="Log Ingestion Service",
    description="Consumes logs from Kafka and writes them to Elasticsearch",
    version=settings.app_version,
    lifespan=lifespan,
)

instrument_fastapi(app)


@app.get("/")
async def root():
    return {
        "service": settings.app_name,
        "version": settings.app_version,
        "status": "running",
        "environment": settings.environment,
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.get("/ready")
async def ready():
    checks = {
        "kafka_consumer": kafka_consumer is not None and kafka_consumer.running,
        "es_writer": es_writer is not None and es_writer.running,
    }
    return {"ready": all(checks.values()), "checks": checks}


@app.get("/metrics")
async def metrics():
    return Response(content=generate_latest(), media_type=CONTENT_TYPE_LATEST)


def signal_handler(sig, frame):
    logger.info(f"Received signal {sig}, shutting down...")
    sys.exit(0)


signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "src.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
        log_config=None,
    )
