from pydantic import BaseModel, Field
from typing import Optional, List, Dict
import datetime

class TripExpenseCreate(BaseModel):
    name: str = Field(..., example="Vistadome Train Tickets")
    amount: float = Field(..., gt=0, example=1800.0)
    paid_by: str = Field(default="Me", example="Meghana")
    category: str = Field(default="Transport", example="Transport")

class TripExpenseResponse(TripExpenseCreate):
    id: int
    trip_id: int
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class MemberSettlement(BaseModel):
    payer: str
    receiver: str
    amount: float

class ExpenseSplitResponse(BaseModel):
    trip_id: int
    total_expense: float
    member_count: int
    per_person_share: float
    paid_summary: Dict[str, float]
    settlements: List[MemberSettlement]
