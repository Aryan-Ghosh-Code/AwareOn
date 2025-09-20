from fastapi import APIRouter, HTTPException
from app.schemas.request import PredictRequest
from app.schemas.response import PredictResponse
from app.services.pipeline import run_pipeline

router = APIRouter()

# @router.post("/predict", response_model=PredictResponse)
# def predict(req: PredictRequest):
#     try:
#         output = run_pipeline(req.imgUrl, req.description)
#         # Validate output keys and coerce to response model
#         return PredictResponse(
#             problem=output.get("problem", "Unknown"),
#             ConfidenceScore=output.get("Confidence Score", 0.0),
#             SDG=output.get("SDG", "SDG ?"),
#             actionableInsights=output.get("actionableInsights", []),
#         )
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))

@router.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    try:
        output = run_pipeline(req.imgUrl, req.description)
        return PredictResponse(
            problem=output.get("problem", "Unknown"),
            ConfidenceScore=output.get("Confidence Score", 0.0),
            sdgs=output.get("sdgs", ["13"]),                 # expects list e.g. ["12","14","11"]
            actionableInsights=output.get("actionableInsights", []),
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))