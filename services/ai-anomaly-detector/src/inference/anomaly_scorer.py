"""Anomaly scoring helpers."""
from typing import Dict, List

import numpy as np


def normalize_scores(scores: np.ndarray) -> np.ndarray:
    """Normalize scores to 0-1 range."""
    min_val = scores.min()
    max_val = scores.max()
    if max_val - min_val < 1e-8:
        return np.zeros_like(scores)
    return (scores - min_val) / (max_val - min_val)


def combine_model_scores(model_scores: Dict[str, float], weights: Dict[str, float]) -> float:
    """Weighted combination of model scores."""
    total_weight = 0.0
    weighted_sum = 0.0
    for model, score in model_scores.items():
        w = weights.get(model, 1.0)
        weighted_sum += score * w
        total_weight += w
    return weighted_sum / total_weight if total_weight > 0 else 0.0


def score_to_severity(score: float) -> str:
    """Convert numeric score to severity level."""
    if score >= 0.8:
        return "critical"
    elif score >= 0.6:
        return "high"
    elif score >= 0.4:
        return "medium"
    return "low"
