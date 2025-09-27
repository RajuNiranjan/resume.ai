from motor.motor_asyncio import AsyncIOMotorDatabase
from fastapi import Depends, HTTPException, status, Response, Cookie
from typing import Optional
from app.core.database import get_database
from app.core.security import verify_token
from app.services.auth_service import AuthService
from fastapi.security import HTTPBearer

security = HTTPBearer(auto_error=False)


async def get_current_user(access_token: Optional[str]=Cookie(None), database:AsyncIOMotorDatabase=Depends(get_database)):
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Access token required"
        )
    
    user_id = verify_token(access_token)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
    
    auth_servive = AuthService(database)

    user = await auth_servive.get_user_by_id(user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )

    return user
