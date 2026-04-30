import logging
import sys
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.database import init_db
from app.api.routes import auth, analysis, history, improve

# ── Startup Logging ──────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

logger.info("=== Startup: Startup AI Simulator ===")
logger.info(f"DATABASE_URL set: {'Yes' if os.getenv('DATABASE_URL') else 'NO - using SQLite'}")
logger.info(f"GROQ_API_KEY set: {'Yes' if os.getenv('GROQ_API_KEY') else 'NO - MISSING!'}")
logger.info(f"SECRET_KEY set:   {'Yes' if os.getenv('SECRET_KEY') else 'NO - using default'}")
logger.info(f"ALLOWED_ORIGINS: {settings.ALLOWED_ORIGINS}")

# Initialize Database
try:
    logger.info("Connecting to database...")
    init_db()
    logger.info("Database connected and tables ready.")
except Exception as e:
    logger.error(f"DATABASE CONNECTION FAILED: {e}")
    sys.exit(1)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.PROJECT_DESCRIPTION,
    version=settings.VERSION,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, tags=["Authentication"])
app.include_router(analysis.router, tags=["Analysis"])
app.include_router(history.router, tags=["History"])
app.include_router(improve.router, tags=["Improvement"])

@app.get("/")
def home():
    return {"message": "Server is Running"}
