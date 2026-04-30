from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.analysis import ImproveRequest
from app.schemas.user import TokenData
from app.dependencies.auth import get_current_user
from app.services import analysis_service

router = APIRouter()

@router.post("/improve")
def improve(
    request: ImproveRequest,
    db: Session = Depends(get_db),
    current_user: TokenData = Depends(get_current_user),
):
    """Improve the startup plan based on critique feedback."""
    try:
        return analysis_service.perform_improvement(
            db, 
            current_user.user_id,
            request.analysis_id,
            request.idea,
            request.budget,
            request.previous_plan,
            request.previous_critique
        )
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "message": "Failed to improve plan."
        }
