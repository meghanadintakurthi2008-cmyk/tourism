from pydantic import BaseModel, Field
from typing import Optional, List

class HotelBase(BaseModel):
    name: str = Field(..., example="Haritha Valley Resort (APTDC)")
    destination_id: int = Field(..., example=1)
    price_per_night: float = Field(..., example=2800.0)
    rating: float = Field(default=4.5, ge=1.0, le=5.0, example=4.6)
    description: Optional[str] = Field(None, example="Scenic valley view resort with tribal dance courtyard.")
    image_url: Optional[str] = Field(None, example="https://images.unsplash.com/photo-1566073771259-6a8506099945")
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    facilities: str = Field(default="", example="Free Breakfast, WiFi, Balcony, Bonfire")
    category: str = Field(default="Best Value", example="Best Value") # Best Value, Best Rated, Budget Friendly, Closest
    eco_certified: bool = Field(default=True, example=True)
    ai_score: float = Field(default=9.2, example=9.4)

class HotelCreate(HotelBase):
    pass

class HotelResponse(HotelBase):
    id: int

    class Config:
        from_attributes = True

class HotelRecommendRequest(BaseModel):
    destination_id: Optional[int] = None
    destination_name: Optional[str] = None
    budget_per_night: Optional[float] = None
    travel_style: Optional[str] = None

class HotelCategoryRecommendation(BaseModel):
    category: str # Best Value, Best Rated, Budget Friendly, Closest
    hotel: HotelResponse
    recommendation_reason: str
