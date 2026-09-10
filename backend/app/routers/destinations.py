from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional, List, Dict, Any
from app.database.connection import get_db
from app.database.models import Destination, User
from app.schemas.destination import (
    DestinationCreate,
    DestinationUpdate,
    DestinationResponse,
    DestinationPagination
)
from app.utils.auth import get_current_admin

router = APIRouter(prefix="/destinations", tags=["Destinations"])

@router.get("", response_model=DestinationPagination)
def list_destinations(
    budget: Optional[float] = Query(None, description="Maximum 3-day average budget"),
    travel_style: Optional[str] = Query(None, description="Travel style (Nature, Adventure, Cultural, etc.)"),
    state: Optional[str] = Query(None, description="State (Andhra Pradesh, Goa, Kerala, etc.)"),
    country: Optional[str] = Query(None, description="Country filter"),
    rating: Optional[float] = Query(None, description="Minimum star rating"),
    best_time: Optional[str] = Query(None, description="Season or month filter"),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """Retrieve all destinations with multi-criteria filtering and pagination metadata."""
    query = db.query(Destination)

    if budget is not None:
        query = query.filter(Destination.average_budget <= budget)
    if travel_style:
        query = query.filter(Destination.travel_style.ilike(f"%{travel_style}%"))
    if state:
        query = query.filter(Destination.state.ilike(f"%{state}%"))
    if country:
        query = query.filter(Destination.country.ilike(f"%{country}%"))
    if rating is not None:
        query = query.filter(Destination.rating >= rating)
    if best_time:
        query = query.filter(Destination.best_time.ilike(f"%{best_time}%"))

    total = query.count()
    offset = (page - 1) * limit
    destinations = query.offset(offset).limit(limit).all()
    pages = (total + limit - 1) // limit if limit > 0 else 1

    return DestinationPagination(
        total=total,
        page=page,
        limit=limit,
        pages=pages,
        data=destinations
    )

@router.get("/search", response_model=List[DestinationResponse])
def search_destinations(
    q: str = Query(..., min_length=1, description="Search query string"),
    db: Session = Depends(get_db)
):
    """Full-text search destinations across name, state, description, and tags."""
    term = f"%{q.strip()}%"
    results = db.query(Destination).filter(
        or_(
            Destination.name.ilike(term),
            Destination.state.ilike(term),
            Destination.description.ilike(term),
            Destination.tags.ilike(term)
        )
    ).all()
    return results

@router.get("/{id}", response_model=DestinationResponse)
def get_destination_by_id(id: int, db: Session = Depends(get_db)):
    """Retrieve a single destination by its primary ID."""
    dest = db.query(Destination).filter(Destination.id == id).first()
    if not dest:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"success": False, "message": f"Destination with ID {id} not found"}
        )
    return dest

@router.get("/{id}/hidden-gems", response_model=List[Dict[str, Any]])
def get_hidden_gems(id: int, db: Session = Depends(get_db)):
    """Retrieve curated offbeat and hidden attractions for a specific destination."""
    dest = db.query(Destination).filter(Destination.id == id).first()
    if not dest:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"success": False, "message": "Destination not found"}
        )

    gems_raw = dest.hidden_gems or ""
    gems_list = [g.strip() for g in gems_raw.split(";") if g.strip()] if ";" in gems_raw else [g.strip() for g in gems_raw.split(",") if g.strip()]

    return [
        {
            "name": gem,
            "description": f"Hidden tranquil spot discovered by local guides in {dest.name}.",
            "estimated_cost": 250.0,
            "best_time": "08:00 AM - 10:00 AM",
            "crowd_level": "Low",
            "travel_distance": "12 km from center"
        }
        for gem in gems_list
    ]

@router.post("", response_model=DestinationResponse, status_code=status.HTTP_201_CREATED)
def create_destination(
    dest_in: DestinationCreate,
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin endpoint to create a new destination record."""
    existing = db.query(Destination).filter(Destination.name.ilike(dest_in.name)).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"success": False, "message": "Destination already exists"}
        )

    dest = Destination(**dest_in.model_dump())
    db.add(dest)
    db.commit()
    db.refresh(dest)
    return dest

@router.put("/{id}", response_model=DestinationResponse)
def update_destination(
    id: int,
    dest_in: DestinationUpdate,
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin endpoint to update destination details."""
    dest = db.query(Destination).filter(Destination.id == id).first()
    if not dest:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"success": False, "message": "Destination not found"}
        )

    for field, val in dest_in.model_dump(exclude_unset=True).items():
        setattr(dest, field, val)
    db.commit()
    db.refresh(dest)
    return dest

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_destination(
    id: int,
    admin: User = Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    """Admin endpoint to delete a destination."""
    dest = db.query(Destination).filter(Destination.id == id).first()
    if not dest:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"success": False, "message": "Destination not found"}
        )
    db.delete(dest)
    db.commit()
    return None
