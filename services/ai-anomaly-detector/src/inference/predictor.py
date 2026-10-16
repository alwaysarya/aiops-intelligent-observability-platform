"""Predictor — high-level inference interface."""
from typing import Any, Dict, List

import numpy as np

from src.models.ensemble import EnsembleDetector
from src.utils.logger import logger


class Predictor:
    """High-level predictor using the ensemble."""

    def __init__(self, detector: EnsembleDetector):
        self.detector = detector

    def predict_single(self, features: List[float]) -> Dict[str, Any]:
        X = np.array([features], dtype=np.float32)
        return self.detector.predict(X)

    def predict_batch(self, features: List[List[float]]) -> List[Dict[str, Any]]:
        results = []
        for row in features:
            X = np.array([row], dtype=np.float32)
            results.append(self.detector.predict(X))
        return results

    def score_to_severity(self, score: float) -> str:
        if score >= 0.8:
            return "critical"
        elif score >= 0.6:
            return "high"
        elif score >= 0.4:
            return "medium"
        return "low"
