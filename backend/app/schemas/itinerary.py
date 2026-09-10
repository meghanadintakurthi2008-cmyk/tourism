from pydantic import BaseModel, Field
from typing import Optional, List

class ActivityBase(BaseModel):
    name: str = Field(..., example="Borra Limestone Caves")
    description: Optional[str] = Field(None, example="Million-year-old stalactites and stalagmites")
    location: str = Field(..., example="Ananthagiri Hills, Araku")
    start_time: str = Field(default="09:00 AM", example="08:30 AM")
    end_time: str = Field(default="11:30 AM", example="11:30 AM")
    estimated_cost: float = Field(default=0.0, example=800.0)
    duration: str = Field(default="2 Hours", example="3 Hours")
    travel_time: str = Field(default="20 mins", example="25 mins")
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    crowd_level: str = Field(default="Low", example="Low")
    ai_reason: Optional[str] = Field(None, example="Best morning temperature and minimal tourist crowd")
    photo_spot: bool = Field(default=False, example=True)

class ActivityCreate(ActivityBase):
    itinerary_day_id: int

class ActivityUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    estimated_cost: Optional[float] = None
    duration: Optional[str] = None
    travel_time: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    crowd_level: Optional[str] = None
    ai_reason: Optional[str] = None
    photo_spot: Optional[bool] = None

class ActivityResponse(ActivityBase):
    id: int
    itinerary_day_id: int

    class Config:
        from_attributes = True

class ItineraryDayCreate(BaseModel):
    trip_id: int
    day_number: int
    date: Optional[str] = None
    title: str

class ItineraryDayResponse(BaseModel):
    id: int
    trip_id: int
    day_number: int
    date: Optional[str]
    title: str
    activities: List[ActivityResponse] = []

    class Config:
        from_attributes = True
