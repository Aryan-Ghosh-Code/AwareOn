import json
import os
from typing import List, Tuple, Optional

from transformers import pipeline

# Default labels (your list)
DEFAULT_LABELS = [
    "endangered_species",
    "algal_bloom",
    "clear_water",
    "deforestation",
    "forest_fire",
    "good_air",
    "no_deforestation",
    "plastic",
    "polluted_air",
]

def _load_labels(labels_path: Optional[str]) -> List[str]:
    # Robust loader: if file missing/empty/invalid -> use defaults
    if labels_path and os.path.exists(labels_path):
        try:
            with open(labels_path, "r", encoding="utf-8") as f:
                raw = f.read().strip()
            if not raw:
                return DEFAULT_LABELS
            data = json.loads(raw)
            if isinstance(data, dict):
                # Sort numeric keys if possible, else values order
                try:
                    items = sorted(data.items(), key=lambda kv: int(kv[0]))
                    return [v for _, v in items]
                except Exception:
                    return list(data.values())
            if isinstance(data, list):
                return data
        except Exception:
            return DEFAULT_LABELS
    return DEFAULT_LABELS

class TextAnalyzer:
    """
    Zero-shot classifier wrapper, forced to PyTorch backend to avoid TF/Keras dependency.
    Interface:
      - __init__(labels_path: str | None = None)
      - predict(text: str) -> tuple[str, float]
    """

    def __init__(
        self,
        labels_path: Optional[str] = None,
        model_name: Optional[str] = None,
        device: Optional[int] = None,
        multi_label: bool = True,
    ):
        # Model selection via env (smaller default optional)
        # Use BART large if bandwidth/time is fine; otherwise use distilbart for faster startup.
        self.model_name = model_name or os.getenv("HF_ZS_MODEL", "facebook/bart-large-mnli")
        # Device: -1 CPU, 0 GPU; env override supported
        if device is None:
            device_env = os.getenv("HF_DEVICE", "-1")
            try:
                device = int(device_env)
            except ValueError:
                device = -1
        self.device = device
        # Multi-label flag; env HF_MULTI_LABEL=1 to force True
        self.multi_label = multi_label if os.getenv("HF_MULTI_LABEL") is None else os.getenv("HF_MULTI_LABEL") == "1"

        # Labels
        self.labels = _load_labels(labels_path)

        # Force PyTorch backend to avoid TensorFlow/Keras
        self._classifier = pipeline(
            "zero-shot-classification",
            model=self.model_name,
            device=self.device,
            framework="pt",  # critical change
        )

    def predict(self, text: str) -> Tuple[str, float]:
        if not text or not text.strip():
            return "unknown", 0.0
        res = self._classifier(
            text,
            candidate_labels=self.labels,
            multi_label=self.multi_label,
        )
        labels = res.get("labels", [])
        scores = res.get("scores", [])
        if not labels or not scores:
            return "unknown", 0.0
        top_idx = int(max(range(len(scores)), key=lambda i: scores[i]))
        return labels[top_idx], float(scores[top_idx])

    def predict_all(self, text: str):
        if not text or not text.strip():
            return []
        res = self._classifier(
            text,
            candidate_labels=self.labels,
            multi_label=self.multi_label,
        )
        labels = res.get("labels", [])
        scores = res.get("scores", [])
        pairs = list(zip(labels, scores))
        pairs.sort(key=lambda x: x[1], reverse=True)
        return [(lbl, float(scr)) for lbl, scr in pairs]
