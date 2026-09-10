from fastapi import APIRouter, status
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from app.services.map_service import MapService

router = APIRouter(prefix="/transport", tags=["Transportation"])


class TransportRecommendRequest(BaseModel):
    origin: str = Field(default="Visakhapatnam", example="Visakhapatnam")
    destination: str = Field(default="Araku Valley", example="Araku Valley")
    travelers: Optional[int] = Field(default=2, ge=1, le=50)
    budget: Optional[float] = Field(default=15000.0)
    preference: Optional[str] = Field(default="Train", example="Train")


@router.post("/recommend")
def recommend_transport(req: TransportRecommendRequest) -> Dict[str, Any]:
    """
    Compare multi-modal travel options (Flight, Train, Bus, Car, Rental Bike)
    with cost calculations, travel duration, comfort index, and carbon footprint comparisons.
    """
    return MapService.get_transport_recommendations(
        origin=req.origin,
        destination=req.destination,
        travelers=req.travelers or 2,
        budget=req.budget or 15000.0,
        preference=req.preference or "Train"
    )
