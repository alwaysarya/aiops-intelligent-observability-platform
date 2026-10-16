"""Shared dependencies."""
from typing import Optional

from src.models.ensemble import EnsembleDetector
from src.utils.config import settings
from src.utils.logger import logger

_detector: Optional[EnsembleDetector] = None


def get_detector() -> EnsembleDetector:
    global _detector
    if _detector is None:
        _detector = EnsembleDetector()
        loaded = _detector.load_all()
        logger.info(f"Model load status: {loaded}")
    return _detector


def init_detector() -> EnsembleDetector:
    global _detector
    _detector = EnsembleDetector()
    _detector.load_all()
    return _detector
