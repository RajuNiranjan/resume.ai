from fastapi import APIRouter, Request, Response, Depends, HTTPException, status
from app.services.auth_service import AuthService
from app.schemas.user import User, UserCreate, UserLogIn, UserProfile
from app.core.database import get_database
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.security import create_access_token, create_refresh_token
from app.core.auth_deps import get_current_user


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

@auth_router.post('/login', status_code=status.HTTP_200_OK)
async def login(response:Response, user_login:UserLogIn, database: AsyncIOMotorDatabase = Depends(get_database)):
    try:
        auth_service = AuthService(database)
        user = await auth_service.authenticate_user(user_login)

        access_token = create_access_token(str(user.id))
        refresh_token = create_refresh_token(str(user.id))

        await auth_service.store_refresh_token(str(user.id), refresh_token)

        response.set_cookie(
            key="access_token",
            httponly=True,
            value=access_token,
            samesite="lax",
            secure=False,
            max_age=15*60
            )
        
        response.set_cookie(
            key="refresh_token",
            httponly=True,
            value=refresh_token,
            samesite="lax",
            secure=False,
            max_age=7*24*60*60
            )


        return {"message":"User Login Successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f'failed to login user {str(e)}'
        )

@auth_router.get('/me')
async def get_user_profile(current_user=Depends(get_current_user)):
    return current_user
