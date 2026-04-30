import logging
import sys
import os
import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.database import init_db
from app.api.routes import auth, analysis, history, improve

# ── Logging Setup ──────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

# Initialize Database
try:
    logger.info("=== Startup: Startup AI Simulator ===")
    logger.info(f"DATABASE_URL set: {'Yes' if os.getenv('DATABASE_URL') else 'NO - using SQLite'}")
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

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    logger.info(f"Incoming request: {request.method} {request.url}")
    try:
        response = await call_next(request)
        process_time = time.time() - start_time
        logger.info(f"Completed request: {request.method} {request.url} - Status: {response.status_code} - Time: {process_time:.4f}s")
        return response
    except Exception as e:
        logger.error(f"REQUEST CRASHED: {request.method} {request.url} - Error: {e}")
        raise e

# NUCLEAR CORS (Allow All for testing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
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
