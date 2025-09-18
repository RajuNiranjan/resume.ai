from datetime import datetime, timezone, timedelta
from passlib.context import CryptContext
from typing import Union, Any, Optional
from jose import jwt, JWTError
from .config import get_settings

pwd_context = CryptContext(schemes=['bcrypt'], deprecated="auto")


def get_hash_password(password:str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password, hased_password) -> bool:
    return pwd_context.verify(plain_password, hased_password)

def create_access_token(subject:Union[str, Any], expire_delta: timedelta = None ) -> str:
    settings = get_settings()
    if expire_delta:
        expire = datetime.now(timezone.utc) + expire_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode = {"exp":expire, "sub": subject, "type":'access'}

    return jwt.encode(to_encode, settings.SECRET_KEY.get_secret_value(), algorithm=settings.ALGORITHM)

def create_refresh_token(subject:Union[str, Any], expire_delta: timedelta = None ) -> str:
    settings = get_settings()
    if expire_delta:
        expire = datetime.now(timezone.utc) + expire_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

    to_encode = {"exp":expire, "sub": subject, "type":'refresh'}

    return jwt.encode(to_encode, settings.SECRET_KEY.get_secret_value(), algorithm=settings.ALGORITHM)
