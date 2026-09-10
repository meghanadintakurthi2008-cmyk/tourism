from pydantic import BaseModel, Field
from typing import Optional, List
import datetime
from app.schemas.destination import DestinationResponse
from app.schemas.itinerary import ItineraryDayResponse

class TripBase(BaseModel):
    destination_id: Optional[int] = Field(None, example=1)
    trip_name: str = Field(..., example="Misty Ghats: Araku Adventure")
    start_date: str = Field(..., example="2026-10-15")
    end_date: str = Field(..., example="2026-10-17")
    travelers: int = Field(default=2, ge=1, le=50, example=2)
    budget: float = Field(default=15000.0, example=15000.0)
    travel_style: str = Field(default="Adventure", example="Adventure")
    status: str = Field(default="planned", example="planned")
    notes: Optional[str] = None

class TripCreate(TripBase):
    pass

class TripUpdate(BaseModel):
    trip_name: Optional[str] = None
    destination_id: Optional[int] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    travelers: Optional[int] = None
    budget: Optional[float] = None
    travel_style: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None

class GroupMemberResponse(BaseModel):
    user_id: int
    user_name: str
    user_email: str
    role: str
    joined_at: datetime.datetime

class TripResponse(TripBase):
    id: int
    user_id: int
    sustainability_score: int
    carbon_footprint_kg: float
    created_at: datetime.datetime
    destination: Optional[DestinationResponse] = None
    itinerary_days: List[ItineraryDayResponse] = []

    class Config:
        from_attributes = True

class GroupTripCreate(BaseModel):
    trip_name: str
    destination_id: Optional[int] = None
    start_date: str
    end_date: str
    shared_budget: float = 20000.0
    travel_style: str = "Adventure"

class GroupMemberAdd(BaseModel):
    email: str
    role: str = "member"
