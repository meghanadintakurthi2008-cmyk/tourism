from pydantic import BaseModel, Field
from typing import Optional
import datetime

class ReviewCreate(BaseModel):
    destination_id: int = Field(..., example=1)
    rating: int = Field(..., ge=1, le=5, example=5)
    comment: str = Field(..., min_length=3, max_length=1500, example="Borra Caves and Vistadome train ride were magical! Must try bamboo chicken.")

class ReviewUpdate(BaseModel):
    rating: Optional[int] = Field(None, ge=1, le=5)
    comment: Optional[str] = Field(None, min_length=3, max_length=1500)

class ReviewResponse(BaseModel):
    id: int
    user_id: int
    user_name: Optional[str] = None
    destination_id: int
    destination_name: Optional[str] = None
    rating: int
    comment: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True
