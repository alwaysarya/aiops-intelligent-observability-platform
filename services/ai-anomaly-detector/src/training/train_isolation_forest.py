"""Train Isolation Forest on synthetic or real data."""
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

import numpy as np

from src.models.isolation_forest import IsolationForestDetector
from src.utils.logger import logger


def generate_synthetic_data(n_samples: int = 5000, n_features: int = 10) -> np.ndarray:
    """Generate synthetic normal data with some anomalies."""
    np.random.seed(42)
    normal = np.random.normal(0, 1, (int(n_samples * 0.95), n_features))
    anomalies = np.random.normal(5, 2, (int(n_samples * 0.05), n_features))
    data = np.vstack([normal, anomalies])
    np.random.shuffle(data)
    return data


def main():
    logger.info("Generating synthetic training data...")
    X = generate_synthetic_data()

    detector = IsolationForestDetector()
    detector.train(X)
    detector.save()

    logger.info("Testing prediction...")
    test_data = np.random.normal(0, 1, (5, 10))
    result = detector.predict(test_data)
    logger.info(f"Prediction result: {result}")


if __name__ == "__main__":
    main()
