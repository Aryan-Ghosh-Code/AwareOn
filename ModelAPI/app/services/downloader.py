import requests
from io import BytesIO
from PIL import Image
from app.core.config import settings

class ImageDownloadError(Exception):
    pass

def _content_length_too_large(headers) -> bool:
    cl = headers.get("Content-Length")
    try:
        if cl is not None and int(cl) > settings.MAX_IMAGE_BYTES:
            return True
    except ValueError:
        pass
    return False

def download_image(url: str) -> Image.Image:
    try:
        resp = requests.get(url, timeout=settings.DOWNLOAD_TIMEOUT, stream=True)
        resp.raise_for_status()
        ct = resp.headers.get("Content-Type", "").split(";")[0].strip().lower()
        if ct not in settings.ALLOWED_IMAGE_CONTENT_TYPES:
            # If server doesn’t send type, attempt to proceed but still check size
            if ct and not ct.startswith("image/"):
                raise ImageDownloadError(f"Unsupported content type: {ct}")
        if _content_length_too_large(resp.headers):
            raise ImageDownloadError("Image exceeds maximum allowed size")

        # Read with hard cap
        data = BytesIO()
        total = 0
        for chunk in resp.iter_content(chunk_size=8192):
            if not chunk:
                continue
            total += len(chunk)
            if total > settings.MAX_IMAGE_BYTES:
                raise ImageDownloadError("Image exceeds maximum allowed size")
            data.write(chunk)
        data.seek(0)
        img = Image.open(data).convert("RGB")
        return img
    except requests.RequestException as e:
        raise ImageDownloadError(f"Failed to download image: {e}") from e
    except Exception as e:
        raise ImageDownloadError(f"Failed to read image: {e}") from e
