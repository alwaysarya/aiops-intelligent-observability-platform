"""Model loader utility."""
import os
from typing import Any, Dict, Optional

import joblib

from src.utils.config import settings
from src.utils.logger import logger


class ModelLoader:
    """Loads ML models from disk."""

    @staticmethod
    def load_sklearn(model_path: str) -> Optional[Any]:
        try:
            model = joblib.load(model_path)
            logger.info(f"Loaded sklearn model: {model_path}")
            return model
        except Exception as e:
            logger.error(f"Failed to load {model_path}: {e}")
            return None

    @staticmethod
    def load_keras(model_path: str) -> Optional[Any]:
        try:
            from tensorflow import keras
            model = keras.models.load_model(model_path)
            logger.info(f"Loaded Keras model: {model_path}")
            return model
        except Exception as e:
            logger.error(f"Failed to load {model_path}: {e}")
            return None

    @staticmethod
    def list_available_models() -> Dict[str, bool]:
        model_files = {
            "isolation_forest": "isolation_forest.pkl",
            "autoencoder": "autoencoder.h5",
            "lstm": "lstm_model.h5",
        }
        status = {}
        for name, filename in model_files.items():
            path = os.path.join(settings.model_dir, filename)
            status[name] = os.path.exists(path)
        return status
