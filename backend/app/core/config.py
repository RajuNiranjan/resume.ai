from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr
from typing import List


class Settings(BaseSettings):
    PROJECT_NAME: str 
    VERSION: str
    MONGODB_URL:str
    DATABASE_NAME:str
    SECRET_KEY:SecretStr
    ALGORITHM:str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_DAYS: int

    ALLOWED_HOSTS: List[str] = ["*"]
    CORS_ORIGINS: List[str] = [
        "http://localhost",
        "http://localhost:5173",
        "http://localhost:3000",
    ]

    model_config = SettingsConfigDict(
        env_file='.env',
        frozen=True
    )

settings = Settings()

def get_settings() -> Settings:
    return settings