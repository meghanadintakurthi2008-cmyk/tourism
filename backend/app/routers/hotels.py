from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.connection import get_db
from app.database.models import Hotel, Destination, User
from app.schemas.hotel import (
    HotelCreate,
    HotelResponse,
    HotelRecommendRequest,
    HotelCategoryRecommendation
)
from app.utils.auth import get_current_admin

router = APIRouter(prefix="/hotels", tags=["Hotels"])


@router.get("", response_model=List[HotelResponse])
def list_hotels(
    destination_id: Optional[int] = Query(None, description="Filter by destination ID"),
    category: Optional[str] = Query(None, description="Category filter (Best Value, Best Rated, Budget Friendly)"),
    max_price: Optional[float] = Query(None, description="Maximum price per night"),
    min_rating: Optional[float] = Query(None, description="Minimum star rating"),
    eco_only: Optional[bool] = Query(None, description="Filter for eco-certified stays only"),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Retrieve hotels with multi-criteria filtering."""
    query = db.query(Hotel)
    if destination_id is not None:
        query = query.filter(Hotel.destination_id == destination_id)
    if category:
        query = query.filter(Hotel.category.ilike(f"%{category}%"))
    if max_price is not None:
        query = query.filter(Hotel.price_per_night <= max_price)
    if min_rating is not None:
        query = query.filter(Hotel.rating >= min_rating)
    if eco_only:
        query = query.filter(Hotel.eco_certified == True)

    return query.limit(limit).all()


@router.get("/{hotel_id}", response_model=HotelResponse)
def get_hotel(hotel_id: int, db: Session = Depends(get_db)):
    """Retrieve hotel details by ID."""
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Hotel with ID {hotel_id} not found"
        )
    return hotel


@router.post("/recommend", response_model=List[HotelCategoryRecommendation])
def recommend_hotels(req: HotelRecommendRequest, db: Session = Depends(get_db)):
    """
    Provide smart categorized hotel recommendations (Best Value, Best Rated, Closest, Budget Friendly).
    """
    query = db.query(Hotel)

    dest_name = req.destination_name
    if req.destination_id:
        query = query.filter(Hotel.destination_id == req.destination_id)
    elif dest_name:
        dest = db.query(Destination).filter(Destination.name.ilike(f"%{dest_name}%")).first()
        if dest:
            query = query.filter(Hotel.destination_id == dest.id)

    if req.budget_per_night:
        # Give some leeway
        query = query.filter(Hotel.price_per_night <= req.budget_per_night * 1.25)

    hotels = query.all()
    if not hotels:
        # Fallback to general search if no exact match found
        hotels = db.query(Hotel).limit(10).all()

    recommendations: List[HotelCategoryRecommendation] = []
    seen_ids = set()

    # 1. Best Rated
    best_rated = sorted(hotels, key=lambda h: (h.rating or 0.0), reverse=True)
    if best_rated:
        h = best_rated[0]
        seen_ids.add(h.id)
        recommendations.append(HotelCategoryRecommendation(
            category="Best Rated",
            hotel=HotelResponse.from_orm(h),
            recommendation_reason=f"Top guest favorite with a stellar {h.rating}/5 rating and premium amenities."
        ))

    # 2. Best Value (highest rating / price ratio or AI score)
    best_value_pool = [h for h in hotels if h.id not in seen_ids] or hotels
    best_val = sorted(best_value_pool, key=lambda h: (h.ai_score or 0.0), reverse=True)
    if best_val:
        h = best_val[0]
        seen_ids.add(h.id)
        recommendations.append(HotelCategoryRecommendation(
            category="Best Value",
            hotel=HotelResponse.from_orm(h),
            recommendation_reason=f"Optimal price-to-experience ratio (AI index {h.ai_score}/10) with verified comfort."
        ))

    # 3. Budget Friendly (lowest price)
    budget_pool = [h for h in hotels if h.id not in seen_ids] or hotels
    budget_choice = sorted(budget_pool, key=lambda h: h.price_per_night)
    if budget_choice:
        h = budget_choice[0]
        seen_ids.add(h.id)
        recommendations.append(HotelCategoryRecommendation(
            category="Budget Friendly",
            hotel=HotelResponse.from_orm(h),
            recommendation_reason=f"Unbeatable rate at ₹{h.price_per_night}/night with clean essentials and prime accessibility."
        ))

    # 4. Eco Pick
    eco_pool = [h for h in hotels if h.eco_certified and h.id not in seen_ids]
    if eco_pool:
        h = eco_pool[0]
        recommendations.append(HotelCategoryRecommendation(
            category="Eco Certified",
            hotel=HotelResponse.from_orm(h),
            recommendation_reason="Green tourism certified with solar power, zero single-use plastics, and organic dining."
        ))

    return recommendations


@router.post("", response_model=HotelResponse, status_code=status.HTTP_201_CREATED)
def create_hotel(
    hotel_in: HotelCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    """Admin endpoint to create a new hotel listing."""
    dest = db.query(Destination).filter(Destination.id == hotel_in.destination_id).first()
    if not dest:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Destination with ID {hotel_in.destination_id} does not exist"
        )
    hotel = Hotel(**hotel_in.dict())
    db.add(hotel)
    db.commit()
    db.refresh(hotel)
    return hotel


@router.put("/{hotel_id}", response_model=HotelResponse)
def update_hotel(
    hotel_id: int,
    hotel_in: HotelCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    """Admin endpoint to update hotel details."""
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Hotel not found")
    for field, val in hotel_in.dict().items():
        setattr(hotel, field, val)
    db.commit()
    db.refresh(hotel)
    return hotel


@router.delete("/{hotel_id}", status_code=status.HTTP_200_OK)
def delete_hotel(
    hotel_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    """Admin endpoint to delete a hotel."""
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not hotel:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Hotel not found")
    db.delete(hotel)
    db.commit()
    return {"success": True, "message": f"Hotel {hotel_id} deleted successfully"}
