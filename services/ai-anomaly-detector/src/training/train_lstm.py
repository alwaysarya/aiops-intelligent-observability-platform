"""Train LSTM model."""
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

import numpy as np

from src.models.lstm_model import LSTMDetector
from src.utils.logger import logger


def main():
    np.random.seed(42)
    n_samples = 500
    seq_len = 50
    n_features = 5

    X = np.random.normal(0, 1, (n_samples, seq_len, n_features))

    detector = LSTMDetector(sequence_length=seq_len)
    detector.train(X, epochs=10, batch_size=32)
    detector.save()

    logger.info("Testing prediction...")
    result = detector.predict(X[:3])
    logger.info(f"Result: {result}")


if __name__ == "__main__":
    main()
