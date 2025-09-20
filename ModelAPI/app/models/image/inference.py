# import json
# import numpy as np
# from typing import Tuple
# from PIL import Image
# from tensorflow.keras.models import load_model
# from app.core.config import settings

# class ImageModel:
#     def __init__(self, model_path: str, labels_path: str, target_size=(224, 224)):
#         self.model = load_model(model_path)
#         with open(labels_path, "r", encoding="utf-8") as f:
#             self.idx_to_label = json.load(f)  # e.g., {"0": "plastic_waste", "1": "e_waste", ...}
#         self.target_size = target_size

#     def preprocess(self, img: Image.Image) -> np.ndarray:
#         img = img.resize(self.target_size)
#         arr = np.asarray(img, dtype=np.float32) / 255.0
#         if arr.ndim == 2:
#             arr = np.stack([arr]*3, axis=-1)
#         arr = np.expand_dims(arr, axis=0)
#         return arr

#     def predict(self, img: Image.Image) -> Tuple[str, float]:
#         x = self.preprocess(img)
#         probs = self.model.predict(x, verbose=0)
#         top_idx = int(np.argmax(probs))
#         label = self.idx_to_label[str(top_idx)] if isinstance(self.idx_to_label, dict) else self.idx_to_label[top_idx]
#         conf = float(probs[top_idx])
#         return label, conf

# _image_model_singleton: ImageModel | None = None

# def get_image_model() -> ImageModel:
#     global _image_model_singleton
#     if _image_model_singleton is None:
#         _image_model_singleton = ImageModel(settings.MODEL_IMAGE_PATH, settings.IMAGE_LABELS_PATH)
#     return _image_model_singleton


import json
import numpy as np
from typing import Tuple, Union, Dict, List
from PIL import Image
from keras.models import load_model
from app.core.config import settings

class ImageModel:
    def __init__(self, model_path: str, labels_path: str, target_size=(224, 224)):
        self.model = load_model(model_path)
        with open(labels_path, "r", encoding="utf-8") as f:
            raw = json.load(f)

        # Normalize labels structure to an index->label lookup
        self.idx_to_label = self._normalize_labels(raw)
        self.target_size = target_size

    @staticmethod
    def _normalize_labels(raw: Union[Dict, List]) -> Dict[int, str]:
        # Case 1: nested dict with id_to_class
        if isinstance(raw, dict) and "id_to_class" in raw and isinstance(raw["id_to_class"], dict):
            return {int(k): str(v) for k, v in raw["id_to_class"].items()}
        # Case 2: flat dict {"0": "label", ...} or {0: "label", ...}
        if isinstance(raw, dict):
            out = {}
            ok = True
            for k, v in raw.items():
                try:
                    out[int(k)] = str(v)
                except Exception:
                    ok = False
                    break
            if ok:
                return out
        # Case 3: list ["label0", "label1", ...]
        if isinstance(raw, list):
            return {i: str(lbl) for i, lbl in enumerate(raw)}
        # Fallback: empty mapping
        return {}

    def preprocess(self, img: Image.Image) -> np.ndarray:
        img = img.resize(self.target_size)
        arr = np.asarray(img, dtype=np.float32) / 255.0
        if arr.ndim == 2:
            arr = np.stack([arr]*3, axis=-1)
        arr = np.expand_dims(arr, axis=0)
        return arr

    def predict(self, img: Image.Image) -> Tuple[str, float]:
        x = self.preprocess(img)
        probs = self.model.predict(x, verbose=0)[0]
        top_idx = int(np.argmax(probs))
        conf = float(probs[top_idx])

        label = self.idx_to_label.get(top_idx)
        if label is None:
            # Avoid crashing if labels missing; expose the index
            label = f"class_{top_idx}"

        return label, conf

_image_model_singleton: ImageModel | None = None

def get_image_model() -> ImageModel:
    global _image_model_singleton
    if _image_model_singleton is None:
        _image_model_singleton = ImageModel(settings.MODEL_IMAGE_PATH, settings.IMAGE_LABELS_PATH)
    return _image_model_singleton
