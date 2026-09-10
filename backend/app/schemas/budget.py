from pydantic import BaseModel, Field
from typing import List, Optional

class BudgetCalculationRequest(BaseModel):
    destination: str = Field(..., example="Araku Valley")
    days: int = Field(default=3, ge=1, le=30, example=3)
    travelers: int = Field(default=2, ge=1, le=50, example=2)
    hotel_budget: Optional[float] = Field(default=4500.0, example=4500.0)
    food_budget: Optional[float] = Field(default=3000.0, example=3000.0)
    transport_budget: Optional[float] = Field(default=3500.0, example=3500.0)
    activity_budget: Optional[float] = Field(default=2500.0, example=2500.0)
    shopping_budget: Optional[float] = Field(default=1500.0, example=1500.0)
    budget_tier: Optional[str] = Field(default="moderate", example="moderate") # budget, moderate, premium, luxury
    student_discount: Optional[bool] = Field(default=False)
    backpacker_mode: Optional[bool] = Field(default=False)

class BudgetBreakdownResponse(BaseModel):
    transportation: float
    accommodation: float
    food: float
    activities: float
    shopping: float
    emergency: float
    total: float
    currency: str = "INR"
    per_person_total: float
    daily_per_person: float

class BudgetOptimizeRequest(BaseModel):
    total_budget: float = Field(..., example=15000.0)
    destination: str = Field(..., example="Araku Valley")
    days: int = Field(default=3, example=3)
    travelers: int = Field(default=2, example=2)

class BudgetOptimizeResponse(BaseModel):
    potential_savings: float
    new_estimated_total: float
    suggestions: List[str]
