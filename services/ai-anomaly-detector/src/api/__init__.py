"""API package."""
from src.api.routes import router
from src.api.dependencies import get_detector, init_detector

__all__ = ["router", "get_detector", "init_detector"]
