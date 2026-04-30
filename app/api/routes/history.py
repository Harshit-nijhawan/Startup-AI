import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db import crud
from app.schemas.user import TokenData
from app.dependencies.auth import get_current_user

router = APIRouter()

@router.get("/history")
def get_history(
    db: Session = Depends(get_db),
    current_user: TokenData = Depends(get_current_user),
):
    """Get the last 10 analyses for the current user."""
    try:
        analyses = crud.get_user_history(db, current_user.user_id)
        
        history = []
        for analysis in analyses:
            history.append({
                "id": analysis.id,
                "idea": analysis.idea,
                "budget": analysis.budget,
                "created_at": analysis.created_at.isoformat(),
            })
        
        return {
            "success": True,
            "data": history
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

@router.get("/history/{analysis_id}")
def get_analysis(
    analysis_id: int,
    db: Session = Depends(get_db),
    current_user: TokenData = Depends(get_current_user),
):
    """Get full details of a specific analysis."""
    analysis = crud.get_analysis_by_id(db, analysis_id, current_user.user_id)
    
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    return {
        "success": True,
        "id": analysis.id,
        "idea": analysis.idea,
        "budget": analysis.budget,
        "research": json.loads(analysis.research),
        "plan": json.loads(analysis.plan),
        "critique": json.loads(analysis.critique),
        "confidence": json.loads(analysis.confidence) if analysis.confidence else None,
        "improved_plan": json.loads(analysis.improved_plan) if analysis.improved_plan else None,
        "created_at": analysis.created_at.isoformat(),
    }

@router.delete("/history/{analysis_id}")
def delete_analysis(
    analysis_id: int,
    db: Session = Depends(get_db),
    current_user: TokenData = Depends(get_current_user),
):
    """Delete a specific analysis."""
    analysis = crud.get_analysis_by_id(db, analysis_id, current_user.user_id)
    
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    
    crud.delete_analysis(db, analysis)
    
    return {
        "success": True,
        "message": f"Analysis {analysis_id} deleted successfully"
    }
