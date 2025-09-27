from fastapi import APIRouter, Depends, HTTPException, status, Response
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.services.auth_service import AuthService
from app.schemas.user import UserProfile, UserLogin, UserCreate
from app.core.database import get_database
from app.core.security import create_access_token
from app.lib.auth_deps import get_current_user


auth_router = APIRouter()


@auth_router.get("/")
async def health_check():
    return {"message": "Authentication service is running."}


@auth_router.get("/check-email-exists", status_code=status.HTTP_200_OK)
async def check_email_exists(
    email: str, database: AsyncIOMotorDatabase = Depends(get_database)
):
    service = AuthService(database)
    try:
        await service.ensure_email_unique(email)
        return {"email_exists": False}
    except HTTPException as e:
        return {"email_exists": True, "detail": e.detail}


@auth_router.post("/signup", status_code=status.HTTP_201_CREATED)
async def register_user(
    user_create: UserCreate, database: AsyncIOMotorDatabase = Depends(get_database)
):
    service = AuthService(database)
    try:
        await service.create_user(user_create)
        return {"message": "User registered successfully"}
    except HTTPException as e:
        return {"email_exists": True, "detail": e.detail}


@auth_router.post("/login", status_code=status.HTTP_200_OK)
async def login(
    response: Response,
    user_login: UserLogin,
    database: AsyncIOMotorDatabase = Depends(get_database),
):
    try:
        service = AuthService(database)
        user = await service.authenticate_user(user_login)

        access_token = create_access_token(str(user.id))

        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            samesite="lax",
            secure=False,
            max_age=15 * 60,
        )

        return {"message": "User logged in successfully"}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to login user: {str(e)}",
        )


@auth_router.get('/me')
async def get_user_profile(current_user=Depends(get_current_user)):
    return current_user