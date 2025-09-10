from typing import Optional
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from .config import get_settings


class DataBase:
    client: Optional[AsyncIOMotorClient] = None
    database: Optional[AsyncIOMotorDatabase] = None


db = DataBase()


async def get_database() -> AsyncIOMotorDatabase:
    return db.database


async def connect_to_db():
    settings = get_settings()
    db.client = AsyncIOMotorClient(settings.MONGODB_URL)
    db.database = db.client[settings.DATABASE_NAME]
    print("connected to database")


async def close_db_connection():
    if db.client:
        db.client.close()
        print("Disconnected from database")
