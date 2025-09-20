from pydantic import BaseModel, HttpUrl, Field

class PredictRequest(BaseModel):
    imgUrl: HttpUrl = Field(..., description="Publicly accessible image URL")
    description: str = Field(..., min_length=1, description="Problem description text")