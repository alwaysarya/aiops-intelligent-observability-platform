"""Batch prediction."""
from typing import Any, Dict, List

import numpy as np

from src.models.ensemble import EnsembleDetector
from src.utils.logger import logger


class BatchPredictor:
    """Efficient batch prediction."""

    def __init__(self, detector: EnsembleDetector, batch_size: int = 100):
        self.detector = detector
        self.batch_size = batch_size

    def predict(self, features: List[List[float]]) -> List[Dict[str, Any]]:
        results = []
        total = len(features)
        for i in range(0, total, self.batch_size):
            batch = features[i:i + self.batch_size]
            X = np.array(batch, dtype=np.float32)
            for j in range(len(X)):
                result = self.detector.predict(X[j:j+1])
                results.append(result)
            logger.info(f"Processed batch {i // self.batch_size + 1}, {min(i + self.batch_size, total)}/{total}")
        return results
