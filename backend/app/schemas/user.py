from pydantic import BaseModel, EmailStr, Field
from typing import Optional
import datetime

class UserRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, example="Meghana Reddy")
    email: EmailStr = Field(..., example="meghana@travelai.org")
    password: str = Field(..., min_length=6, max_length=100, example="Password123")

class UserLogin(BaseModel):
    email: EmailStr = Field(..., example="meghana@travelai.org")
    password: str = Field(..., example="Password123")

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
