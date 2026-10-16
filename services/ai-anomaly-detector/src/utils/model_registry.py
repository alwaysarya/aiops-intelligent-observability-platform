"""Model registry — MLflow integration."""
from typing import Any, Dict, Optional

from src.utils.config import settings
from src.utils.logger import logger


class ModelRegistry:
    """Manages models via MLflow Model Registry."""

    def __init__(self):
        self.tracking_uri = settings.mlflow_tracking_uri
        self.experiment_name = settings.mlflow_experiment_name
        self.client = None
        self._init_client()

    def _init_client(self):
        try:
            import mlflow
            mlflow.set_tracking_uri(self.tracking_uri)
            mlflow.set_experiment(self.experiment_name)
            self.client = mlflow
            logger.info(f"MLflow connected: {self.tracking_uri}")
        except Exception as e:
            logger.warning(f"MLflow unavailable: {e}")
            self.client = None

    def log_metrics(self, metrics: Dict[str, float], step: Optional[int] = None):
        if self.client is None:
            return
        try:
            for key, value in metrics.items():
                self.client.log_metric(key, value, step=step)
        except Exception as e:
            logger.warning(f"Failed to log metrics: {e}")

    def log_params(self, params: Dict[str, Any]):
        if self.client is None:
            return
        try:
            self.client.log_params(params)
        except Exception as e:
            logger.warning(f"Failed to log params: {e}")
