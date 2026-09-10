from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from app.services.sustainability_service import SustainabilityService

router = APIRouter(prefix="/sustainability", tags=["Sustainability"])


class SustainabilityRequest(BaseModel):
    transport_mode: Optional[str] = Field(default="Train", example="Train")
    days: Optional[int] = Field(default=3, ge=1, le=30, example=3)
    travelers: Optional[int] = Field(default=2, ge=1, le=50, example=2)
    hotel_type: Optional[str] = Field(default="Eco-Resort", example="Eco-Resort")
    destination_name: Optional[str] = Field(default="Araku Valley", example="Araku Valley")


@router.post("/calculate")
def calculate_sustainability(req: SustainabilityRequest) -> Dict[str, Any]:
    """
    Calculate full carbon footprint, eco-traveler score (1-100),
    carbon offset recommendations, and tree-planting equivalents.
    """
    res = SustainabilityService.calculate_sustainability(
        transport_mode=req.transport_mode or "Train",
        days=req.days or 3,
        travelers=req.travelers or 2,
        hotel_type=req.hotel_type or "Eco-Resort",
        destination_name=req.destination_name or "Araku Valley"
    )

    # Calculate tree offsets: average urban tree absorbs ~21 kg CO2/year
    total_co2 = res["carbon_footprint_kg"]
    trees_needed = max(1, round(total_co2 / 21.0))
    res["trees_to_offset"] = trees_needed
    res["offset_badge"] = "Eco Guardian" if res["score"] >= 85 else "Conscious Traveler"

    return {"success": True, "data": res}
