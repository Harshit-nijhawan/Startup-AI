from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.db import crud
from app.core.security import verify_password, create_access_token
from app.schemas.user import SignupRequest, LoginRequest

def register_user(db: Session, request: SignupRequest):
    existing_user = crud.get_user_by_email(db, request.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    user = crud.create_user(db, request.email, request.password)
    access_token = create_access_token(user.id, user.email)
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

def authenticate_user(db: Session, request: LoginRequest):
    user = crud.get_user_by_email(db, request.email)
    if not user or not verify_password(request.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    access_token = create_access_token(user.id, user.email)
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
