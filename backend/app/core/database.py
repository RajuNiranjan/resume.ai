from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from .config import get_settings
from typing import Optional

class DataBase:
    client: Optional[AsyncIOMotorClient] = None
    database: Optional[AsyncIOMotorDatabase] = None

db = DataBase()

async def get_database() -> AsyncIOMotorDatabase:
    return db.database


async def connect_to_mongo():
    settings = get_settings()
    db.client = AsyncIOMotorClient(settings.MONGO_URL)
    db.database = db.client[settings.DATABASE_NAME]
    print("Connected to DataBase")

async def close_mongo_server():
    if db.client:
        db.client.close()
        print("Disconnected to Database")
