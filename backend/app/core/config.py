from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr

class Settings(BaseSettings):
    MONGO_URL: str
    DATABASE_NAME: str
    SECRET_KEY: SecretStr
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_DAYS: int
    PROJECT_NAME: str
    VERSION: str

    model_config = SettingsConfigDict(
        env_file=".env",
        frozen=True,
        extra="ignore"
    )

settings = Settings()

def get_settings():
    return settings
