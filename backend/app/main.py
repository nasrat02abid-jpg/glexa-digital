import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.api.applications import router as applications_router
from app.api.inquiries import router as inquiries_router
from app.api.quotes import router as quotes_router
from app.db.base import Base
from app.db.session import engine
from app.models import Inquiry
from app.models.application import JobApplication
from app.models.quote import QuoteRequest
from app.models.portfolio import PortfolioProject  # noqa: F401
from app.api.auth import router as auth_router
from app.models.admin import Admin
from app.api.admin import router as admin_router
from app.api import portfolio, portfolio_admin

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Glexa Digital API",
    description="Backend API for the Glexa Digital website.",
    version="1.0.0",
)
upload_root = Path(
    os.getenv("UPLOAD_ROOT", "uploads")
).resolve()

upload_root.mkdir(parents=True, exist_ok=True)

app.mount(
    "/uploads",
    StaticFiles(directory=upload_root),
    name="uploads",
)

allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    "https://glexadigital.com",
    "https://www.glexadigital.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(inquiries_router)
app.include_router(quotes_router)
app.include_router(applications_router)
app.include_router(auth_router)
app.include_router(admin_router)
app.include_router(portfolio.router)
app.include_router(portfolio_admin.router)


@app.get("/")
def root():
    return {"message": "Glexa Digital API is running"}


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "glexa-digital-api",
    }


@app.get("/health/database")
def database_health_check():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {
        "status": "healthy",
        "database": "connected",
    }