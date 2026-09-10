from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from app.database.connection import get_db
from app.database.models import Favorite, Destination, Hotel, Trip, User
from app.utils.auth import get_current_user

router = APIRouter(prefix="/favorites", tags=["Favorites"])


class FavoriteCreate(BaseModel):
    item_type: str = Field(default="destination", example="destination")
    item_id: int = Field(..., example=1)


class FavoriteResponse(BaseModel):
    id: int
    user_id: int
    item_type: str
    item_id: int
    item_details: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True


@router.get("", response_model=List[FavoriteResponse])
def get_user_favorites(
    item_type: Optional[str] = Query(None, description="Filter by item type (destination, hotel, trip)"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Retrieve all favorited items for the authenticated user, enriched with item metadata."""
    query = db.query(Favorite).filter(Favorite.user_id == current_user.id)
    if item_type:
        query = query.filter(Favorite.item_type == item_type)

    favs = query.all()
    results = []
    for f in favs:
        details = None
        if f.item_type == "destination":
            dest = db.query(Destination).filter(Destination.id == f.item_id).first()
            if dest:
                details = {
                    "id": dest.id,
                    "name": dest.name,
                    "image_url": dest.image_url,
                    "state": dest.state,
                    "average_budget": dest.average_budget,
                    "rating": dest.rating
                }
        elif f.item_type == "hotel":
            h = db.query(Hotel).filter(Hotel.id == f.item_id).first()
            if h:
                details = {
                    "id": h.id,
                    "name": h.name,
                    "price_per_night": h.price_per_night,
                    "rating": h.rating,
                    "category": h.category
                }

        results.append(FavoriteResponse(
            id=f.id,
            user_id=f.user_id,
            item_type=f.item_type,
            item_id=f.item_id,
            item_details=details
        ))

    return results


@router.post("", response_model=FavoriteResponse, status_code=status.HTTP_201_CREATED)
def add_favorite(
    fav_in: FavoriteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Add a destination, hotel, or trip to user favorites."""
    existing = (
        db.query(Favorite)
        .filter(
            Favorite.user_id == current_user.id,
            Favorite.item_type == fav_in.item_type,
            Favorite.item_id == fav_in.item_id
        )
        .first()
    )
    if existing:
        return FavoriteResponse(
            id=existing.id,
            user_id=existing.user_id,
            item_type=existing.item_type,
            item_id=existing.item_id
        )

    new_fav = Favorite(
        user_id=current_user.id,
        item_type=fav_in.item_type,
        item_id=fav_in.item_id
    )
    db.add(new_fav)
    db.commit()
    db.refresh(new_fav)
    return FavoriteResponse(
        id=new_fav.id,
        user_id=new_fav.user_id,
        item_type=new_fav.item_type,
        item_id=new_fav.item_id
    )


@router.get("/check")
def check_favorite(
    item_type: str = Query(..., description="Item type to check (destination, hotel, trip)"),
    item_id: int = Query(..., description="Item ID to check"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Check if an item is already favorited by the current user."""
    exists = (
        db.query(Favorite)
        .filter(
            Favorite.user_id == current_user.id,
            Favorite.item_type == item_type,
            Favorite.item_id == item_id
        )
        .first()
    )
    return {
        "is_favorited": exists is not None,
        "favorite_id": exists.id if exists else None
    }


@router.delete("/{favorite_id}", status_code=status.HTTP_200_OK)
def remove_favorite(
    favorite_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Remove an item from favorites by favorite ID."""
    fav = db.query(Favorite).filter(Favorite.id == favorite_id).first()
    if not fav:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Favorite not found")

    if fav.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

    db.delete(fav)
    db.commit()
    return {"success": True, "message": "Removed from favorites"}
