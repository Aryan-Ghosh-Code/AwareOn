import os

class Settings:
    APP_NAME: str = "SDG Insight API"
    API_V1_PREFIX: str = "/api/v1"
    MODEL_IMAGE_PATH: str = os.getenv("MODEL_IMAGE_PATH", "app/models/image/keras_model/model.keras")
    IMAGE_LABELS_PATH: str = os.getenv("IMAGE_LABELS_PATH", "app/models/image/keras_model/labels.json")
    TEXT_LABELS_PATH: str = os.getenv("TEXT_LABELS_PATH", "app/models/text/labels.json")
    MAPPING_PATH: str = os.getenv("MAPPING_PATH", "app/models/mapping/mapping.json")
    DOWNLOAD_TIMEOUT: int = int(os.getenv("DOWNLOAD_TIMEOUT", "15"))
    MAX_IMAGE_BYTES: int = int(os.getenv("MAX_IMAGE_BYTES", str(10 * 1024 * 1024)))  # 10MB
    ALLOWED_IMAGE_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp", "image/jpg"}

settings = Settings()
