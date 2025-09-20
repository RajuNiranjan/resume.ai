from app.schemas.user import UserCreate, UserLogIn, User, UserProfile
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.helpers.py_objectid import PyObjectId
from fastapi import HTTPException, status
from bson import ObjectId
from typing import Optional
from app.core.security import get_hash_password, verify_password, create_refresh_token
from datetime import datetime, timezone


class AuthService:
    def __init__(self, database: AsyncIOMotorDatabase):
        self.db = database
    
    async def create_user(self, user_create:UserCreate):
        try:
            existing_user = await self.db.users.find_one({
                "$or": [
                    {"username":user_create.username},
                    {"email": user_create.email}
                ]
            }) 

            if existing_user:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="User already exited with the email or username"
                )
            
            hash_password = get_hash_password(user_create.password)

            new_user = user_create.model_dump()
            del new_user['password']

            new_user['password'] = hash_password
            new_user['profile_pic'] = f'https://avatar.iran.liara.run/username?username={user_create.first_name + user_create.last_name}'
            new_user['created_at'] = datetime.now(timezone.utc)
            new_user['refresh_tokens'] = []

            result = await self.db.users.insert_one(new_user)
            new_user['_id']=result.inserted_id

            return User(**new_user)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f'failed to create user {str(e)}'
            )
        
    async def authenticate_user(self, user_login: UserLogIn):
        user_dict = await self.db.users.find_one({
            "$or": [
                {"email": user_login.email_or_username},
                {"username": user_login.email_or_username},
            ]
        })
        
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


    async def store_refresh_token(self, user_id:str, refresh_token:str):
        await self.db.users.update_one(
            {"_id": ObjectId(user_id)},
            {
                "$push": {"refresh_tokens": refresh_token}
            }
        )


    async def remove_refresh_token(self, user_id:str, refresh_token:str):
        await self.db.users.update_one(
            {"_id": ObjectId(user_id)},
            {
                "$pull": {"refresh_tokens": refresh_token}
            }
        )
    
    async def get_user_by_id(self, user_id:str):
        try:
            user = await self.db.users.find_one({"_id": ObjectId(user_id)})
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