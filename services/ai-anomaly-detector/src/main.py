"""AI Anomaly Detector Service — main entry point."""
from contextlib import asynccontextmanager

from fastapi import FastAPI

from src.api.dependencies import init_detector
from src.api.routes import router
from src.utils.config import settings
from src.utils.logger import logger
from src.utils.tracing import instrument_fastapi, setup_tracing


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("=" * 60)
    logger.info(f"Starting {settings.app_name} v{settings.app_version}")
    logger.info(f"Environment: {settings.environment}")
    logger.info("=" * 60)

    setup_tracing()
    init_detector()

    logger.info("✅ AI Anomaly Detector is running")
    yield
    logger.info("👋 Shutdown complete")


app = FastAPI(
    title="AI Anomaly Detector",
    description="ML-based anomaly detection service for AIOps platform",
    version=settings.app_version,
    lifespan=lifespan,
)

instrument_fastapi(app)
app.include_router(router)


@app.get("/", tags=["Root"])
async def root():
    return {
        "service": settings.app_name,
        "version": settings.app_version,
        "status": "running",
        "environment": settings.environment,
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "src.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
        log_config=None,
    )
