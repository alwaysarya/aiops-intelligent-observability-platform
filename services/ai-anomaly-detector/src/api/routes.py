"""API routes."""
import uuid
from typing import List

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import Response
from prometheus_client import CONTENT_TYPE_LATEST, generate_latest

from src.api.schemas import (
    AnomalyResponse,
    BatchPredictRequest,
    BatchPredictResponse,
    HealthResponse,
    ReadyResponse,
)
from src.models.anomaly import AnomalySeverity
from src.utils.config import settings
from src.utils.logger import logger
from src.utils.metrics import ANOMALIES_DETECTED, PREDICTIONS_TOTAL

router = APIRouter()


@router.get("/health", response_model=HealthResponse, tags=["Health"])
async def health():
    return HealthResponse(
        status="healthy",
        service=settings.app_name,
        version=settings.app_version,
    )


@router.get("/ready", response_model=ReadyResponse, tags=["Health"])
async def ready():
    from src.api.dependencies import get_detector
    detector = get_detector()
    checks = {
        "isolation_forest": detector.isolation_forest.model is not None,
        "autoencoder": detector.autoencoder.model is not None,
        "lstm": detector.lstm.model is not None,
    }
    return ReadyResponse(ready=any(checks.values()), checks=checks)


@router.get("/metrics", tags=["Observability"])
async def metrics():
    return Response(content=generate_latest(), media_type=CONTENT_TYPE_LATEST)


@router.post("/predict", response_model=AnomalyResponse, tags=["Prediction"])
async def predict(features: List[List[float]]):
    """Predict anomaly for a batch of features."""
    from src.api.dependencies import get_detector

    detector = get_detector()
    if detector.isolation_forest.model is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Models not loaded",
        )

    import numpy as np
    X = np.array(features, dtype=np.float32)
    result = detector.predict(X)

    score = result.get("score", 0.0)

    if score > 0.8:
        severity = AnomalySeverity.CRITICAL
    elif score > 0.6:
        severity = AnomalySeverity.HIGH
    elif score > 0.4:
        severity = AnomalySeverity.MEDIUM
    else:
        severity = AnomalySeverity.LOW

    PREDICTIONS_TOTAL.labels(model="ensemble", result="anomaly" if result["is_anomaly"] else "normal").inc()

    if result["is_anomaly"]:
        ANOMALIES_DETECTED.labels(severity=severity.value, model="ensemble").inc()

    return AnomalyResponse(
        anomaly_id=str(uuid.uuid4()),
        is_anomaly=result["is_anomaly"],
        score=score,
        severity=severity,
        model_scores=result.get("model_scores", {}),
    )


@router.post("/predict/batch", response_model=BatchPredictResponse, tags=["Prediction"])
async def predict_batch(request: BatchPredictRequest):
    """Batch prediction endpoint."""
    import numpy as np
    from src.api.dependencies import get_detector

    detector = get_detector()
    if detector.isolation_forest.model is None:
        raise HTTPException(status_code=503, detail="Models not loaded")

    X = np.array(request.samples, dtype=np.float32)
    results = []

    for i in range(len(X)):
        sample = X[i:i+1]
        result = detector.predict(sample)
        score = result.get("score", 0.0)

        if score > 0.8:
            severity = AnomalySeverity.CRITICAL
        elif score > 0.6:
            severity = AnomalySeverity.HIGH
        elif score > 0.4:
            severity = AnomalySeverity.MEDIUM
        else:
            severity = AnomalySeverity.LOW

        results.append(AnomalyResponse(
            anomaly_id=str(uuid.uuid4()),
            is_anomaly=result["is_anomaly"],
            score=score,
            severity=severity,
            model_scores=result.get("model_scores", {}),
        ))

    anomalies_found = sum(1 for r in results if r.is_anomaly)

    return BatchPredictResponse(
        results=results,
        total=len(results),
        anomalies_found=anomalies_found,
    )
