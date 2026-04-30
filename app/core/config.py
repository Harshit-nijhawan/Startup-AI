import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Startup AI Simulator"
    PROJECT_DESCRIPTION: str = "Multi-agent AI startup idea analyzer powered by Groq"
    VERSION: str = "1.0.0"
    
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production-env")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    # Database — SQLite locally, PostgreSQL (Neon) in production
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./startup_ai.db")
    
    # CORS — add your Vercel URL via ALLOWED_ORIGINS env var (comma-separated)
    @property
    def ALLOWED_ORIGINS(self) -> list:
        env_origins = os.getenv("ALLOWED_ORIGINS", "")
        base = [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:3000",
            "http://127.0.0.1:5173",
            "http://127.0.0.1:5174",
        ]
        if env_origins:
            extra = [o.strip().rstrip("/") for o in env_origins.split(",") if o.strip()]
            return base + extra
        return base

settings = Settings()
