from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator
from typing import Optional
from datetime import datetime, timezone
from app.helpers.py_objectid import PyObjectId


class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    profile_pic: Optional[str] = None  


class UserCreate(UserBase):
    password: str = Field(..., min_length=6, max_length=15)

    @field_validator("password")
    def validate_password(cls, v: str) -> str:
        if not any(c.isalpha() for c in v):
            raise ValueError("Password must contain at least one letter")
        if not any(c.isdigit() for c in v):
            raise ValueError("Password must contain at least one number")
        if not any(c in "@$!%*#?&" for c in v):
            raise ValueError("Password must contain at least one special character (@$!%*#?&)")
        return v


class UserLogin(BaseModel):
    email_or_username: str
    password: str


class User(UserBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        populate_by_name=True,
        json_encoders={PyObjectId: str},
    )


class UserProfile(BaseModel):
    id: str
    email: str
    username: str
    profile_pic: Optional[str] = None
    created_at:datetime