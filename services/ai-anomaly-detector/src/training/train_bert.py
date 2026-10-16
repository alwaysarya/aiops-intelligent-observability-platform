"""Train BERT classifier (optional — placeholder)."""
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from src.utils.logger import logger


def main():
    logger.info("BERT training requires labeled data.")
    logger.info("Skipping — implement when labeled log data is available.")
    logger.info("Plan: Use sentence-transformers + a simple classifier head.")


if __name__ == "__main__":
    main()
