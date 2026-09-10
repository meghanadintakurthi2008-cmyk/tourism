from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.database.connection import get_db
from app.database.models import PackingItem, Trip, User
from app.schemas.packing import (
    PackingGenerateRequest,
    PackingListCategorizedResponse,
    PackingItemCreate,
    PackingItemUpdate,
    PackingItemResponse
)
from app.services.packing_service import PackingService
from app.utils.auth import get_current_user

router = APIRouter(tags=["Packing List"])


@router.post("/packing/generate", response_model=PackingListCategorizedResponse)
def generate_packing_list(req: PackingGenerateRequest):
    """Generate dynamic categorized packing list based on destination climate, duration, and activity style."""
    return PackingService.generate_packing_list(req)


@router.get("/trips/{trip_id}/packing", response_model=List[PackingItemResponse])
def get_trip_packing_items(
    trip_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Retrieve saved interactive packing items for a specific trip."""
    trip = db.query(Trip).filter(Trip.id == trip_id).first()
    if not trip:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")

    is_member = any(m.user_id == current_user.id for m in trip.group_members)
    if trip.user_id != current_user.id and not is_member and current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

    return db.query(PackingItem).filter(PackingItem.trip_id == trip_id).all()


@router.post("/trips/{trip_id}/packing", response_model=PackingItemResponse, status_code=status.HTTP_201_CREATED)
def add_packing_item(
    trip_id: int,
    item_in: PackingItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Add a custom item to the trip packing checklist."""
    trip = db.query(Trip).filter(Trip.id == trip_id).first()
    if not trip:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")

    is_member = any(m.user_id == current_user.id for m in trip.group_members)
    if trip.user_id != current_user.id and not is_member and current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

    new_item = PackingItem(
        trip_id=trip_id,
        name=item_in.name,
        category=item_in.category,
        is_checked=item_in.is_checked,
        weather_reason=item_in.weather_reason
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


@router.put("/packing/{item_id}", response_model=PackingItemResponse)
def update_packing_item(
    item_id: int,
    item_in: PackingItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Toggle check status or edit a packing item."""
    item = db.query(PackingItem).filter(PackingItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Packing item not found")

    update_data = item_in.dict(exclude_unset=True)
    for field, val in update_data.items():
        setattr(item, field, val)

    db.commit()
    db.refresh(item)
    return item


@router.delete("/packing/{item_id}", status_code=status.HTTP_200_OK)
def delete_packing_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete an item from the packing list."""
    item = db.query(PackingItem).filter(PackingItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Packing item not found")

    db.delete(item)
    db.commit()
    return {"success": True, "message": f"Packing item {item_id} removed"}
