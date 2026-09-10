from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class AIDestinationMatchRequest(BaseModel):
    budget: float = Field(..., example=20000.0)
    days: int = Field(default=4, example=4)
    travel_style: str = Field(default="adventure", example="adventure")
    interests: List[str] = Field(default=["nature", "photography", "food"], example=["nature", "photography", "food"])
    travelers: int = Field(default=2, example=2)

class MatchedDestinationItem(BaseModel):
    destination: str
    state: str
    match_percentage: int
    reason: str
    estimated_budget: float
    image_url: str
    tags: List[str]

class AIDestinationMatchResponse(BaseModel):
    recommendations: List[MatchedDestinationItem]

class AITripGenerateRequest(BaseModel):
    origin: str = Field(default="Visakhapatnam", example="Visakhapatnam")
    destination: str = Field(..., example="Araku Valley")
    start_date: str = Field(default="2026-10-10", example="2026-10-10")
    end_date: str = Field(default="2026-10-12", example="2026-10-12")
    travelers: int = Field(default=2, ge=1, le=50, example=2)
    budget: float = Field(default=15000.0, example=15000.0)
    travel_style: str = Field(default="nature", example="nature")
    interests: List[str] = Field(default=["nature", "adventure", "local food"], example=["nature", "adventure", "local food"])
    food_preference: Optional[str] = "Traditional"
    accommodation_preference: Optional[str] = "Eco-Resort"

class ActivityItemJSON(BaseModel):
    time: str
    activity: str
    location: str
    period: str
    estimated_cost: float
    duration: str
    travel_time: str
    ai_reason: str
    photo_spot: bool
    crowd_level: str

class DayItineraryJSON(BaseModel):
    day: int
    title: str
    theme: str
    date: str
    activities: List[ActivityItemJSON]

class AITripGenerateResponse(BaseModel):
    trip_summary: Dict[str, Any]
    daily_itinerary: List[DayItineraryJSON]
    estimated_cost_breakdown: Dict[str, float]
    transportation_recommendation: Dict[str, Any]
    hotel_recommendation: Dict[str, Any]
    food_suggestions: List[Dict[str, Any]]
    safety_suggestions: List[str]
    packing_list: List[Dict[str, Any]]
    sustainability_recommendations: Dict[str, Any]

class AIOptimizeRequest(BaseModel):
    destination: str = Field(..., example="Araku Valley")
    current_itinerary: Optional[List[Dict[str, Any]]] = None
    travelers: int = Field(default=2, example=2)
    budget: float = Field(default=15000.0, example=15000.0)

class AIOptimizeResponse(BaseModel):
    time_saved_minutes: int
    money_saved: float
    route_improvements: List[str]
    recommendations: List[str]
    optimized_order: List[Dict[str, Any]]

class AIChatRequest(BaseModel):
    message: str = Field(..., example="Suggest a 3 day trip to Goa")
    destination_context: Optional[str] = None

class AIChatResponse(BaseModel):
    response: str
    suggestions: List[str] = []
    quick_actions: Optional[List[Dict[str, str]]] = None

class AIFoodRequest(BaseModel):
    destination: str = Field(..., example="Araku Valley")
    food_preference: Optional[str] = Field(default="All", example="Non-Vegetarian")
    budget: Optional[float] = Field(default=2000.0, example=2000.0)

class AIFoodResponse(BaseModel):
    destination: str
    local_foods: List[str]
    must_try_dishes: List[Dict[str, Any]]
    recommended_dining_categories: List[str]
    estimated_cost_per_day: float
    food_safety_tips: List[str]

class AICrowdRequest(BaseModel):
    destination: str = Field(..., example="Araku Valley")
    date: str = Field(default="2026-10-15", example="2026-10-15")
    time: str = Field(default="10:00 AM", example="10:00 AM")

class AICrowdResponse(BaseModel):
    destination: str
    crowd_level: str # Low, Moderate, High, Peak
    best_time_to_visit: str
    estimated_wait_time_minutes: int
    reason: str
