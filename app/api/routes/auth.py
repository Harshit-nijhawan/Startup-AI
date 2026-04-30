from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.user import SignupRequest, LoginRequest, TokenResponse
from app.services import auth_service

router = APIRouter()

@router.post("/signup", response_model=TokenResponse)
def signup(request: SignupRequest, db: Session = Depends(get_db)):
    """Create a new user account and return JWT token."""
    return auth_service.register_user(db, request)

@router.post("/login", response_model=TokenResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """Authenticate user and return JWT token."""
    return auth_service.authenticate_user(db, request)
