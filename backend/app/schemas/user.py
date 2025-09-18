from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional, List
from bson import ObjectId
from datetime import datetime, timezone
from app.helpers.py_objectid import PyObjectId

class UserBase(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: EmailStr
    profile_pic: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogIn(BaseModel):
    email_or_username:str
    password: str

class User(UserBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    refresh_tokens: List[str] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={PyObjectId: str}
    )

class UserProfile(UserBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    profile_pic: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={PyObjectId: str}
    )
