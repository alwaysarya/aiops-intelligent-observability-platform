"""Root Cause Analyzer — main entry point."""
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.responses import Response
from prometheus_client import CONTENT_TYPE_LATEST, generate_latest

from src.analyzer import RootCauseAnalyzer
from src.kafka_consumer import KafkaAnomalyConsumer
from src.models.root_cause import AnalyzeRequest
from src.utils.config import settings
from src.utils.logger import logger
from src.utils.tracing import instrument_fastapi, setup_tracing

analyzer: RootCauseAnalyzer = None
kafka_consumer: KafkaAnomalyConsumer = None


async def process_anomaly(payload: dict):
    """Handle incoming anomaly."""
    try:
        result = analyzer.analyze_anomaly(payload)
        logger.info(f"Analysis result: {result.analysis_id} | {len(result.root_causes)} causes")
    except Exception as e:
        logger.exception(f"Failed to process anomaly: {e}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    global analyzer, kafka_consumer

    logger.info("=" * 60)
    logger.info(f"Starting {settings.app_name} v{settings.app_version}")
    logger.info("=" * 60)

    setup_tracing()

    analyzer = RootCauseAnalyzer()
    stats = analyzer.get_graph_stats()
    logger.info(f"Graph: {stats['nodes']} nodes, {stats['edges']} edges")

    kafka_consumer = KafkaAnomalyConsumer(handler=process_anomaly)
    kafka_consumer.start()

    logger.info("✅ Root Cause Analyzer is running")
    yield

    logger.info("Shutting down...")
    if kafka_consumer:
        kafka_consumer.stop()
    logger.info("👋 Shutdown complete")


app = FastAPI(
    title="Root Cause Analyzer",
    description="AI-powered root cause analysis for AIOps platform",
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
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.get("/ready")
async def ready():
    checks = {
        "analyzer": analyzer is not None,
        "kafka_consumer": kafka_consumer is not None and kafka_consumer.running,
    }
    return {"ready": all(checks.values()), "checks": checks}


@app.get("/graph")
async def graph():
    """Return the dependency graph."""
    if analyzer is None:
        return {"error": "not initialized"}
    return analyzer.graph.to_dict()


@app.get("/graph/stats")
async def graph_stats():
    if analyzer is None:
        return {"error": "not initialized"}
    return analyzer.get_graph_stats()


@app.get("/graph/path/{source}/{target}")
async def graph_path(source: str, target: str):
    if analyzer is None:
        return {"error": "not initialized"}
    return analyzer.find_path(source, target)


@app.post("/analyze")
async def analyze(request: AnalyzeRequest):
    """Manually trigger root cause analysis."""
    anomaly = {
        "service": request.service,
        "severity": request.severity,
        "anomaly_id": request.anomaly_id,
    }
    result = analyzer.analyze_anomaly(anomaly)
    return result


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
