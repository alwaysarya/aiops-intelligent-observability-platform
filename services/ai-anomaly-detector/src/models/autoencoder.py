"""Autoencoder for anomaly detection."""
import os
from typing import Any, Dict, Optional

import numpy as np

from src.utils.config import settings
from src.utils.logger import logger

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers


class AutoencoderDetector:
    """Autoencoder for reconstruction-based anomaly detection."""

    def __init__(self, encoding_dim: Optional[int] = None):
        self.encoding_dim = encoding_dim or settings.autoencoder_encoding_dim
        self.model: Optional[keras.Model] = None
        self.threshold: Optional[float] = None
        self.model_path = os.path.join(settings.model_dir, "autoencoder.h5")
        self.threshold_path = os.path.join(settings.model_dir, "autoencoder_threshold.npy")

    def _build_model(self, input_dim: int) -> keras.Model:
        inputs = keras.Input(shape=(input_dim,))
        encoded = layers.Dense(64, activation="relu")(inputs)
        encoded = layers.Dense(32, activation="relu")(encoded)
        encoded = layers.Dense(self.encoding_dim, activation="relu")(encoded)
        decoded = layers.Dense(32, activation="relu")(encoded)
        decoded = layers.Dense(64, activation="relu")(decoded)
        outputs = layers.Dense(input_dim, activation="linear")(decoded)

        model = keras.Model(inputs, outputs)
        model.compile(optimizer="adam", loss="mse")
        return model

    def train(self, X: np.ndarray, epochs: Optional[int] = None, batch_size: int = 32) -> None:
        epochs = epochs or settings.autoencoder_epochs
        input_dim = X.shape[1]

        logger.info(f"Training Autoencoder on {len(X)} samples, {epochs} epochs")
        self.model = self._build_model(input_dim)
        self.model.fit(X, X, epochs=epochs, batch_size=batch_size, validation_split=0.1, verbose=1)

        reconstructions = self.model.predict(X, verbose=0)
        mse = np.mean(np.power(X - reconstructions, 2), axis=1)
        self.threshold = float(np.percentile(mse, 95))

        logger.info(f"Autoencoder trained. Threshold: {self.threshold:.6f}")

    def predict(self, X: np.ndarray) -> Dict[str, Any]:
        if self.model is None or self.threshold is None:
            raise RuntimeError("Model not trained")

        if X.ndim == 1:
            X = X.reshape(1, -1)

        reconstructions = self.model.predict(X, verbose=0)
        mse = np.mean(np.power(X - reconstructions, 2), axis=1)

        results = []
        for err in mse:
            results.append({
                "is_anomaly": bool(err > self.threshold),
                "score": float(min(err / self.threshold, 1.0)),
                "reconstruction_error": float(err),
            })

        return {"results": results}

    def save(self) -> None:
        os.makedirs(settings.model_dir, exist_ok=True)
        self.model.save(self.model_path)
        np.save(self.threshold_path, self.threshold)
        logger.info(f"Autoencoder saved")

    def load(self) -> bool:
        try:
            self.model = keras.models.load_model(self.model_path)
            self.threshold = float(np.load(self.threshold_path))
            logger.info("Autoencoder loaded")
            return True
        except Exception as e:
            logger.error(f"Failed to load Autoencoder: {e}")
            return False
