from pydantic import BaseModel
from typing import Optional, Dict, Any

class IdeaRequest(BaseModel):
    idea: str
    budget: int

class ImproveRequest(BaseModel):
    idea: str
    budget: int
    previous_plan: dict
    previous_critique: dict
    analysis_id: Optional[int] = None

class AnalysisResponse(BaseModel):
    success: bool
    id: Optional[int] = None
    idea: Optional[str] = None
    budget: Optional[int] = None
    research: Optional[Dict[str, Any]] = None
    plan: Optional[Dict[str, Any]] = None
    critique: Optional[Dict[str, Any]] = None
    confidence: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    message: Optional[str] = None
