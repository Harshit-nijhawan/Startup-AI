from pydantic import BaseModel, EmailStr

class TokenResponse(BaseModel):
    """JWT token response"""
    access_token: str
    token_type: str


class SignupRequest(BaseModel):
    """User signup request"""
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    """User login request"""
    email: EmailStr
    password: str


class TokenData(BaseModel):
    """Token payload data"""
    user_id: int
    email: str
