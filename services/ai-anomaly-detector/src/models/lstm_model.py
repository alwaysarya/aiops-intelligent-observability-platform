"""LSTM model for time-series anomaly detection."""
import os
from typing import Any, Dict, Optional

import numpy as np

from src.utils.config import settings
from src.utils.logger import logger

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers


class LSTMDetector:
    """LSTM autoencoder for time-series anomaly detection."""

    def __init__(self, sequence_length: Optional[int] = None):
        self.sequence_length = sequence_length or settings.lstm_sequence_length
        self.model: Optional[keras.Model] = None
        self.threshold: Optional[float] = None
        self.model_path = os.path.join(settings.model_dir, "lstm_model.h5")
        self.threshold_path = os.path.join(settings.model_dir, "lstm_threshold.npy")

    def _build_model(self, n_features: int) -> keras.Model:
        inputs = keras.Input(shape=(self.sequence_length, n_features))
        x = layers.LSTM(64, activation="relu", return_sequences=True)(inputs)
        x = layers.LSTM(32, activation="relu", return_sequences=False)(x)
        x = layers.RepeatVector(self.sequence_length)(x)
        x = layers.LSTM(32, activation="relu", return_sequences=True)(x)
        x = layers.LSTM(64, activation="relu", return_sequences=True)(x)
        outputs = layers.TimeDistributed(layers.Dense(n_features))(x)
        model = keras.Model(inputs, outputs)
        model.compile(optimizer="adam", loss="mse")
        return model

    def train(self, X: np.ndarray, epochs: Optional[int] = None, batch_size: Optional[int] = None) -> None:
        epochs = epochs or settings.lstm_epochs
        batch_size = batch_size or settings.lstm_batch_size
        n_features = X.shape[2]

        logger.info(f"Training LSTM on {len(X)} sequences, {epochs} epochs")
        self.model = self._build_model(n_features)
        self.model.fit(X, X, epochs=epochs, batch_size=batch_size, validation_split=0.1, verbose=1)

        # Calculate threshold from training data
        reconstructions = self.model.predict(X, verbose=0)
        mse = np.mean(np.power(X - reconstructions, 2), axis=(1, 2))
        self.threshold = float(np.percentile(mse, 95))

        logger.info(f"LSTM trained. Threshold: {self.threshold:.6f}")

    def predict(self, X: np.ndarray) -> Dict[str, Any]:
        if self.model is None or self.threshold is None:
            raise RuntimeError("Model not trained")

        if X.ndim == 2:
            X = X.reshape(1, self.sequence_length, -1)

        reconstructions = self.model.predict(X, verbose=0)
        mse = np.mean(np.power(X - reconstructions, 2), axis=(1, 2))

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
        logger.info(f"LSTM saved to {self.model_path}")

    def load(self) -> bool:
        try:
            self.model = keras.models.load_model(self.model_path)
            self.threshold = float(np.load(self.threshold_path))
            logger.info(f"LSTM loaded from {self.model_path}")
            return True
        except Exception as e:
            logger.error(f"Failed to load LSTM: {e}")
            return False
