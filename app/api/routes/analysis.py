from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.analysis import IdeaRequest, AnalysisResponse
from app.schemas.user import TokenData
from app.dependencies.auth import get_current_user
from app.services import analysis_service

router = APIRouter()

@router.post("/analyze", response_model=AnalysisResponse)
def analyze(
    request: IdeaRequest,
    db: Session = Depends(get_db),
    current_user: TokenData = Depends(get_current_user),
):
    """Analyze startup idea (requires authentication)"""
    try:
        return analysis_service.perform_analysis(db, current_user.user_id, request.idea, request.budget)
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "message": "An error occurred during analysis."
        }
