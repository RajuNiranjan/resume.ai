from fastapi import FastAPI
from app.core.config import get_settings

settings = get_settings()  

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend service for Resume.ai",
)

@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.PROJECT_NAME}", "version": settings.VERSION}

@app.get("/health-check")
async def health_check():
    return {"message": "Yup! I'm Good"}
