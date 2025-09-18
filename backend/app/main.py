from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.core.config import get_settings
from app.core.database import connect_to_mongo, close_mongo_server

settings = get_settings()

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await connect_to_mongo()
        yield
    finally:
        await close_mongo_server()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend service for Resume.ai",
    lifespan=lifespan,
)

@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.PROJECT_NAME}", "version": settings.VERSION}

@app.get("/health-check")
async def health_check():
    return {"message": "Yup! I'm Good"}
