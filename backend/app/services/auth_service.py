from bson import ObjectId
from fastapi import HTTPException, status
from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.schemas.user import User, UserCreate, UserLogin
from app.core.security import get_hash_password, verify_password
from app.schemas.user import UserProfile

class AuthService:
    def __init__(self, database: AsyncIOMotorDatabase):
        self.db = database

    async def ensure_email_unique(self, email: str):
        email = email.lower().strip()
        if await self.db.users.find_one({"email": email}):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already taken",
            )

    async def create_user(self, user_create: UserCreate) -> User:
        hashed = get_hash_password(user_create.password)
        new_user = user_create.model_dump(exclude={"password"})
        new_user.update(
            password=hashed,
            profile_pic=f"https://avatar.iran.liara.run/username?username={user_create.username}",
            created_at=datetime.now(timezone.utc),
        )
        try:
            result = await self.db.users.insert_one(new_user)
            new_user["_id"] = result.inserted_id
            return User(**new_user)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create user: {e}",
            )

    async def authenticate_user(self, user_login: UserLogin) -> User:
        user_dict = await self.db.users.find_one({"email": user_login.email})
        if not user_dict:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User not registered, please sign up."
            )
        user = User(**user_dict)
        if not verify_password(user_login.password, user.password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid credentials."
            )
        return user

    async def get_user_by_id(self, user_id:str):
        try:
            user = await self.db.users.find_one({"_id":ObjectId(user_id)})
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="user not found"
                )
            return UserProfile(**user)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"failed to create user {str(e)}"
            )