from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime, timezone
from app.core.security import get_hased_password
from app.schemas.user import UserCreate
from app.models.user import UserInDB


class AuthService:
    def __init__(self, database: AsyncIOMotorDatabase):
        self.db = database

    async def create_user(self, user_create: UserCreate) -> UserInDB:
        existing_user = await self.db.users.find_one(
            {"$or": [{"email": user_create.email}, {"username": user_create.username}]}
        )
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User already exists with this email or username",
            )

        hashed_password = get_hased_password(user_create.password)

        new_user = user_create.model_dump(exclude={"password"})
        new_user.update(
            {
                "password": hashed_password,
                "profile_pic": f"https://avatar.iran.liara.run/username?username={user_create.username}",
                "refresh_tokens": [],
                "created_at": datetime.now(timezone.utc),
            }
        )
        try:
            result = await self.db.users.insert_one(new_user)
            new_user["_id"] = result.inserted_id
            return UserInDB(**new_user)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create user",
            ) from e
