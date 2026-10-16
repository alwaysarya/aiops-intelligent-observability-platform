"""Train Autoencoder."""
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

import numpy as np

from src.models.autoencoder import AutoencoderDetector
from src.utils.logger import logger


def main():
    np.random.seed(42)
    X = np.random.normal(0, 1, (2000, 10))

    detector = AutoencoderDetector()
    detector.train(X, epochs=20)
    detector.save()

    logger.info("Testing prediction...")
    result = detector.predict(np.random.normal(0, 1, (3, 10)))
    logger.info(f"Result: {result}")


if __name__ == "__main__":
    main()
