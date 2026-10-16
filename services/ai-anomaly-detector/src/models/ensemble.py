"""Ensemble model combining multiple detectors."""
from typing import Any, Dict, Optional

import numpy as np

from src.models.autoencoder import AutoencoderDetector
from src.models.isolation_forest import IsolationForestDetector
from src.models.lstm_model import LSTMDetector
from src.utils.logger import logger


class EnsembleDetector:
    """Combines Isolation Forest, LSTM, and Autoencoder."""

    def __init__(self):
        self.isolation_forest = IsolationForestDetector()
        self.lstm = LSTMDetector()
        self.autoencoder = AutoencoderDetector()
        self.weights = {"isolation_forest": 0.3, "lstm": 0.35, "autoencoder": 0.35}

    def predict(self, features: np.ndarray, sequence: np.ndarray = None) -> Dict[str, Any]:
        results = {}

        if self.isolation_forest.model is not None:
            try:
                results["isolation_forest"] = self.isolation_forest.predict(features)
            except Exception as e:
                logger.warning(f"IF failed: {e}")

        if self.autoencoder.model is not None:
            try:
                expected_dim = self.autoencoder.model.input_shape[-1]
                if features.shape[-1] == expected_dim:
                    results["autoencoder"] = self.autoencoder.predict(features)
                else:
                    logger.info(f"Skipping AE: expected {expected_dim}, got {features.shape[-1]}")
            except Exception as e:
                logger.warning(f"AE failed: {e}")

        if sequence is not None and self.lstm.model is not None:
            try:
                results["lstm"] = self.lstm.predict(sequence)
            except Exception as e:
                logger.warning(f"LSTM failed: {e}")

        return self._combine(results)

    def _combine(self, results: Dict[str, Any]) -> Dict[str, Any]:
        scores = []
        active_weights = []
        for model_name, weight in self.weights.items():
            if model_name in results and results[model_name]["results"]:
                r = results[model_name]["results"][0]
                scores.append(r["score"] * weight)
                active_weights.append(weight)

        if not scores:
            return {"is_anomaly": False, "score": 0.0, "model_scores": {}}

        final_score = sum(scores) / sum(active_weights)

        return {
            "is_anomaly": final_score > 0.6,
            "score": float(final_score),
            "model_scores": {
                name: results[name]["results"][0]["score"]
                for name in results
                if results[name]["results"]
            },
        }

    def load_all(self) -> Dict[str, bool]:
        return {
            "isolation_forest": self.isolation_forest.load(),
            "lstm": self.lstm.load(),
            "autoencoder": self.autoencoder.load(),
        }
