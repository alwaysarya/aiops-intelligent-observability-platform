"""Isolation Forest anomaly detection model."""
import os
from typing import Any, Dict, List, Optional

import joblib
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler

from src.utils.config import settings
from src.utils.logger import logger


class IsolationForestDetector:
    """Isolation Forest for unsupervised anomaly detection."""

    def __init__(self, contamination: Optional[float] = None):
        self.contamination = contamination or settings.isolation_forest_contamination
        self.model: Optional[IsolationForest] = None
        self.scaler: Optional[StandardScaler] = None
        self.model_path = os.path.join(settings.model_dir, "isolation_forest.pkl")
        self.scaler_path = os.path.join(settings.model_dir, "isolation_forest_scaler.pkl")

    def train(self, X: np.ndarray) -> None:
        logger.info(f"Training Isolation Forest on {len(X)} samples")
        self.scaler = StandardScaler()
        X_scaled = self.scaler.fit_transform(X)

        self.model = IsolationForest(
            contamination=self.contamination,
            n_estimators=100,
            max_samples="auto",
            random_state=42,
            n_jobs=-1,
        )
        self.model.fit(X_scaled)
        logger.info("Isolation Forest trained successfully")

    def predict(self, X: np.ndarray) -> Dict[str, Any]:
        if self.model is None or self.scaler is None:
            raise RuntimeError("Model not trained or loaded")

        if X.ndim == 1:
            X = X.reshape(1, -1)

        X_scaled = self.scaler.transform(X)
        predictions = self.model.predict(X_scaled)
        scores = -self.model.score_samples(X_scaled)

        # Normalize scores to 0-1
        normalized = (scores - scores.min()) / (scores.max() - scores.min() + 1e-8)

        results = []
        for i, pred in enumerate(predictions):
            results.append({
                "is_anomaly": bool(pred == -1),
                "score": float(normalized[i]),
                "raw_score": float(scores[i]),
            })

        return {"results": results}

    def save(self) -> None:
        os.makedirs(settings.model_dir, exist_ok=True)
        joblib.dump(self.model, self.model_path)
        joblib.dump(self.scaler, self.scaler_path)
        logger.info(f"Model saved to {self.model_path}")

    def load(self) -> bool:
        try:
            self.model = joblib.load(self.model_path)
            self.scaler = joblib.load(self.scaler_path)
            logger.info(f"Model loaded from {self.model_path}")
            return True
        except Exception as e:
            logger.error(f"Failed to load model: {e}")
            return False
