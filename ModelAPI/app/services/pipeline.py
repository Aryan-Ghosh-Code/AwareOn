from typing import Dict
from app.services.downloader import download_image
from app.models.image.inference import get_image_model
from app.models.text.analyzer import TextAnalyzer
from app.models.mapping.resolver import MappingResolver
from app.core.config import settings

# Singletons initialized at app startup
image_model = None
text_analyzer = None
mapping_resolver = None

def init_pipeline():
    global image_model, text_analyzer, mapping_resolver
    image_model = get_image_model()
    text_analyzer = TextAnalyzer(labels_path=settings.TEXT_LABELS_PATH)
    mapping_resolver = MappingResolver(mapping_path=settings.MAPPING_PATH)

def run_pipeline(img_url: str, description: str) -> Dict:
    img = download_image(img_url)
    img_label, img_conf = image_model.predict(img)

    txt_label, txt_conf = text_analyzer.predict(description)
    # Normalize labels before resolving (recommended)
    img_label_norm = (img_label or "").strip().lower()
    txt_label_norm = (txt_label or "").strip().lower()

    mapping = mapping_resolver.resolve(img_label_norm, txt_label_norm)

    # Combine confidences: simple approach = average; adapt as needed
    combined_conf = float((img_conf + txt_conf) / 2.0)

    result = {
        "problem": mapping.get("problem", "Unknown"),
        "Confidence Score": combined_conf,  # field name per your contract (note space)
        "sdgs": mapping.get("sdgs", ["13"]),
        "actionableInsights": mapping.get("insights", []),
        # Optionally include debug fields if needed:
        "_debug": {
            "image": {"label": img_label, "conf": img_conf},
            "text": {"label": txt_label, "conf": txt_conf}
        }
    }
    return result
