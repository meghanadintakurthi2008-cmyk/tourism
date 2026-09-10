from pydantic import BaseModel, Field
from typing import Optional, List

class PackingGenerateRequest(BaseModel):
    destination: str = Field(..., example="Araku Valley")
    days: int = Field(default=3, ge=1, le=30, example=3)
    weather: Optional[str] = Field(default="Pleasant", example="Pleasant")
    travel_style: Optional[str] = Field(default="Adventure", example="Adventure")
    travelers: Optional[int] = Field(default=2, example=2)

class PackingItemCreate(BaseModel):
    trip_id: int
    name: str = Field(..., example="Sturdy hiking shoes")
    category: str = Field(default="clothes", example="clothes")
    is_checked: bool = Field(default=False)
    weather_reason: Optional[str] = None

class PackingItemUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    is_checked: Optional[bool] = None
    weather_reason: Optional[str] = None

class PackingItemResponse(BaseModel):
    id: int
    trip_id: int
    name: str
    category: str
    is_checked: bool
    weather_reason: Optional[str]

    class Config:
        from_attributes = True

class PackingListCategorizedResponse(BaseModel):
    destination: str
    days: int
    clothes: List[str]
    shoes: List[str]
    electronics: List[str]
    documents: List[str]
    health_items: List[str]
    toiletries: List[str]
    optional_items: List[str]
    weather_advisory: str
