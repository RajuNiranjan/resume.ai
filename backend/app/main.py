from fastapi import FastAPI
from app.core.config import get_settings
from app.core.database import close_db_connection, connect_to_db
from contextlib import asynccontextmanager
from app.routes.auth import auth_route


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_db()
    yield
    await close_db_connection()  


app = FastAPI(
    title=get_settings().PROJECT_NAME,
    version=get_settings().VERSION,
    lifespan=lifespan
)

@app.get('/')
def root():
    settings = get_settings()
    return {
        "message": f"welcome to {settings.PROJECT_NAME}",
        "version": settings.VERSION,
        "docs": "/docs",
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

app.include_router(auth_route)
