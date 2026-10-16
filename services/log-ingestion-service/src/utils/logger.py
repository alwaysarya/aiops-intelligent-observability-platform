"""
Structured JSON logging configuration.
"""
import logging
import sys

from pythonjsonlogger import jsonlogger

from src.utils.config import settings


def setup_logger(name: str = "log-ingestion-service") -> logging.Logger:
    logger = logging.getLogger(name)
    if logger.handlers:
        return logger

    logger.setLevel(settings.log_level)
    handler = logging.StreamHandler(sys.stdout)

    if settings.environment == "production":
        formatter = jsonlogger.JsonFormatter(
            "%(asctime)s %(levelname)s %(name)s %(message)s"
        )
    else:
        formatter = logging.Formatter(
            "%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )

    handler.setFormatter(formatter)
    logger.addHandler(handler)
    return logger


logger = setup_logger()
