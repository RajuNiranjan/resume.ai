
from fastapi import APIRouter, Depends, HTTPException, status
from app.core.database import get_database
from app.models.user import UserInDB
from app.services.auth_service import AuthService
from app.schemas.user import UserCreate, UserProfile
from motor.motor_asyncio import AsyncIOMotorDatabase

auth_route = APIRouter(
    prefix='/api/v1/auth',
    tags=["Authentication"]
)

@auth_route.post('/signup')
async def signup(user_create: UserCreate, database: AsyncIOMotorDatabase = Depends(get_database)):
    auth_service = AuthService(database)
    user = await auth_service.create_user(user_create)
    return UserProfile(
        id=str(user.id),
        email=user.email,
        username=user.username,
        profile_pic=user.profile_pic,
        created_at=user.created_at
    )
