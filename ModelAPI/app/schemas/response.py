# from pydantic import BaseModel, Field
# from typing import List

# class PredictResponse(BaseModel):
#     problem: str = Field(..., description="Problem label derived from combined predictions")
#     ConfidenceScore: float = Field(..., ge=0.0, le=1.0, description="Combined confidence between 0-1")
#     SDG: str = Field(..., description="Mapped SDG category")
#     actionableInsights: List[str] = Field(default_factory=list)

from pydantic import BaseModel, Field
from typing import List

class PredictResponse(BaseModel):
    problem: str
    ConfidenceScore: float = Field(..., ge=0.0, le=1.0)
    sdgs: List[str]                # multiple SDG codes as strings
    actionableInsights: List[str]  # flattened list