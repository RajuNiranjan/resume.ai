from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import get_settings
from app.core.database import connect_to_mongo, close_mongo_server
from app.routes.v1.auth import auth_router

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

origins = [
    "http://localhost:3000",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,         
    allow_credentials=True,
    allow_methods=["*"],           
    allow_headers=["*"],           
)

@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.PROJECT_NAME}", "version": settings.VERSION}

@app.get("/health-check")
async def health_check():
    return {"message": "Yup! I'm Good"}

app.include_router(auth_router, prefix="/v1/api/auth", tags=["Authentication"])
