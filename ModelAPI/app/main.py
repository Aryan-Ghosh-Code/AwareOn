from fastapi import FastAPI
from app.core.config import settings
from app.core.logging import configure_logging
from app.api.v1.routes import router as api_router
from app.services.pipeline import init_pipeline

def create_app() -> FastAPI:
    configure_logging()
    app = FastAPI(title=settings.APP_NAME)
    init_pipeline()
    app.include_router(api_router, prefix=settings.API_V1_PREFIX)
    return app

app = create_app()
