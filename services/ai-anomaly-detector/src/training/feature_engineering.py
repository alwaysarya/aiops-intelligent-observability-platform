"""Feature engineering for log data."""
from typing import Dict, List

import numpy as np
import pandas as pd


def extract_temporal_features(df: pd.DataFrame, timestamp_col: str = "timestamp") -> pd.DataFrame:
    """Extract hour, day, month from timestamp."""
    df = df.copy()
    if timestamp_col in df.columns:
        df[timestamp_col] = pd.to_datetime(df[timestamp_col])
        df["hour"] = df[timestamp_col].dt.hour
        df["day_of_week"] = df[timestamp_col].dt.dayofweek
        df["is_weekend"] = df["day_of_week"].isin([5, 6]).astype(int)
    return df


def extract_text_features(messages: List[str]) -> np.ndarray:
    """Extract simple text features (length, word count)."""
    features = []
    for msg in messages:
        msg_str = str(msg)
        features.append([
            len(msg_str),
            len(msg_str.split()),
            msg_str.count("ERROR"),
            msg_str.count("WARN"),
        ])
    return np.array(features, dtype=np.float32)


def build_feature_vector(log: Dict) -> List[float]:
    """Build feature vector from a single log entry."""
    return [
        float(log.get("duration_ms") or 0),
        float(log.get("status_code") or 200),
        float(len(str(log.get("message", "")))),
        float(log.get("level") == "ERROR"),
        float(log.get("level") == "WARNING"),
        float(bool(log.get("error"))),
        float(bool(log.get("trace_id"))),
    ]
