from pydantic import BaseModel, Field
from typing import Optional, List

class DestinationBase(BaseModel):
    name: str = Field(..., example="Araku Valley")
    country: str = Field(default="India", example="India")
    state: str = Field(..., example="Andhra Pradesh")
    description: str = Field(..., example="Misty hill station in the Eastern Ghats famous for coffee and Borra Caves.")
    image_url: str = Field(..., example="https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5")
    best_time: str = Field(..., example="September to March")
    average_budget: float = Field(..., example=15000.0)
    travel_style: str = Field(..., example="Nature")
    rating: float = Field(default=4.5, ge=1.0, le=5.0, example=4.8)
    latitude: float = Field(..., example=18.3273)
    longitude: float = Field(..., example=82.8775)
    tags: Optional[str] = Field(default="", example="Eco-Tourism, Hill Station, Coffee")
    hidden_gems: Optional[str] = Field(default="", example="Katiki Waterfalls, Tyda Jungle Bells")
    local_foods: Optional[str] = Field(default="", example="Bongu Chicken, Araku Coffee")
    sustainability_score: Optional[int] = Field(default=85, ge=1, le=100, example=92)

class DestinationCreate(DestinationBase):
    pass

class DestinationUpdate(BaseModel):
    name: Optional[str] = None
    country: Optional[str] = None
    state: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    best_time: Optional[str] = None
    average_budget: Optional[float] = None
    travel_style: Optional[str] = None
    rating: Optional[float] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    tags: Optional[str] = None
    hidden_gems: Optional[str] = None
    local_foods: Optional[str] = None
    sustainability_score: Optional[int] = None

class DestinationResponse(DestinationBase):
    id: int

    class Config:
        from_attributes = True

class DestinationPagination(BaseModel):
    total: int
    page: int
    limit: int
    pages: int
    data: List[DestinationResponse]
