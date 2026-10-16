"""Data preprocessing utilities."""
from typing import List, Tuple

import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler


def load_data(path: str) -> pd.DataFrame:
    """Load data from CSV."""
    return pd.read_csv(path)


def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """Clean missing values."""
    return df.dropna().reset_index(drop=True)


def scale_features(X: np.ndarray) -> Tuple[np.ndarray, StandardScaler]:
    """Standardize features."""
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    return X_scaled, scaler


def create_sequences(data: np.ndarray, seq_length: int) -> np.ndarray:
    """Create time-series sequences."""
    sequences = []
    for i in range(len(data) - seq_length):
        sequences.append(data[i:i + seq_length])
    return np.array(sequences)


def train_test_split_ts(X: np.ndarray, test_size: float = 0.2) -> Tuple[np.ndarray, np.ndarray]:
    """Time-series train/test split (no shuffle)."""
    split_idx = int(len(X) * (1 - test_size))
    return X[:split_idx], X[split_idx:]
