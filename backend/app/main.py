from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.api.inquiries import router as inquiries_router
from app.db.session import engine
from app.db.base import Base
from app.models import Inquiry

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Glexa Digital API",
    description="Backend API for the Glexa Digital website.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(inquiries_router)

allowed_origins = [
    "http://localhost:3000",
    "http://localhost:3001",
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