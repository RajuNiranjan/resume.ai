from fastapi import APIRouter, Request, Response, Depends, HTTPException, status
from app.services.auth_service import AuthService
from app.schemas.user import User, UserCreate, UserLogIn, UserProfile
from app.core.database import get_database
from motor.motor_asyncio import AsyncIOMotorDatabase


auth_router = APIRouter()

@auth_router.get('/auth')
async def check_auth():
    return {"message":"Hi there!"}

@auth_router.post('/signup', status_code=status.HTTP_201_CREATED, response_model=UserProfile)
async def signup(user_create:UserCreate, database: AsyncIOMotorDatabase = Depends(get_database)) -> UserProfile:
    try:
        auth_service = AuthService(database)
        user = await auth_service.create_user(user_create)

        return UserProfile(
            id=str(user.id),
            email=user.email,
            username=user.username,
            first_name=user.first_name,
            last_name=user.last_name,
            profile_pic=user.profile_pic,
            created_at=user.created_at
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f'failed to create user {str(e)}'
        )