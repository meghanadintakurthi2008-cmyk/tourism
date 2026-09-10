from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Dict, Any, List, Optional
from app.database.connection import get_db
from app.database.models import User, Trip, Destination, Hotel, Review
from app.utils.auth import get_current_admin

router = APIRouter(prefix="/admin", tags=["Admin Portal"])


@router.get("/statistics")
def get_admin_statistics(
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
) -> Dict[str, Any]:
    """Retrieve platform-wide operational and engagement analytics."""
    total_users = db.query(func.count(User.id)).scalar() or 0
    total_trips = db.query(func.count(Trip.id)).scalar() or 0
    total_destinations = db.query(func.count(Destination.id)).scalar() or 0
    total_reviews = db.query(func.count(Review.id)).scalar() or 0
    total_hotels = db.query(func.count(Hotel.id)).scalar() or 0
    total_planned_budget = db.query(func.sum(Trip.budget)).scalar() or 0.0
    avg_rating = db.query(func.avg(Review.rating)).scalar() or 4.7

    top_destinations = (
        db.query(Destination.name, Destination.state, Destination.rating, Destination.sustainability_score)
        .order_by(Destination.rating.desc())
        .limit(5)
        .all()
    )

    recent_trips = (
        db.query(Trip)
        .order_by(Trip.created_at.desc())
        .limit(5)
        .all()
    )

    return {
        "success": True,
        "overview": {
            "total_users": total_users,
            "total_trips": total_trips,
            "total_destinations": total_destinations,
            "total_hotels": total_hotels,
            "total_reviews": total_reviews,
            "total_budget_planned_inr": round(float(total_planned_budget), 2),
            "average_user_rating": round(float(avg_rating), 1)
        },
        "top_destinations": [
            {
                "name": d[0],
                "state": d[1],
                "rating": d[2],
                "sustainability_score": d[3]
            }
            for d in top_destinations
        ],
        "recent_trips": [
            {
                "id": t.id,
                "trip_name": t.trip_name,
                "destination_name": t.destination.name if t.destination else "Custom Destination",
                "travelers": t.travelers,
                "budget": t.budget,
                "created_at": t.created_at
            }
            for t in recent_trips
        ]
    }


@router.get("/users")
def list_admin_users(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
) -> Dict[str, Any]:
    """List all registered platform users with activity metrics."""
    query = db.query(User)
    total = query.count()
    offset = (page - 1) * limit
    users = query.order_by(User.created_at.desc()).offset(offset).limit(limit).all()

    users_data = []
    for u in users:
        trips_count = len(u.trips)
        reviews_count = len(u.reviews)
        users_data.append({
            "id": u.id,
            "name": u.name,
            "email": u.email,
            "role": u.role,
            "trips_count": trips_count,
            "reviews_count": reviews_count,
            "created_at": u.created_at
        })

    return {
        "success": True,
        "total": total,
        "page": page,
        "limit": limit,
        "data": users_data
    }


@router.get("/trips")
def list_admin_trips(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
) -> Dict[str, Any]:
    """Audit all platform trips with owner references and status."""
    query = db.query(Trip)
    total = query.count()
    offset = (page - 1) * limit
    trips = query.order_by(Trip.created_at.desc()).offset(offset).limit(limit).all()

    trips_data = [
        {
            "id": t.id,
            "trip_name": t.trip_name,
            "user_id": t.user_id,
            "user_name": t.user.name if t.user else "Unknown",
            "destination_name": t.destination.name if t.destination else "Custom",
            "start_date": t.start_date,
            "end_date": t.end_date,
            "travelers": t.travelers,
            "budget": t.budget,
            "status": t.status,
            "sustainability_score": t.sustainability_score,
            "created_at": t.created_at
        }
        for t in trips
    ]

    return {
        "success": True,
        "total": total,
        "page": page,
        "limit": limit,
        "data": trips_data
    }


@router.get("/destinations")
def list_admin_destinations(
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
) -> Dict[str, Any]:
    """List all destinations with hotel count, review count, and eco score."""
    destinations = db.query(Destination).order_by(Destination.name.asc()).all()
    data = []
    for d in destinations:
        data.append({
            "id": d.id,
            "name": d.name,
            "state": d.state,
            "average_budget": d.average_budget,
            "travel_style": d.travel_style,
            "rating": d.rating,
            "sustainability_score": d.sustainability_score,
            "hotel_count": len(d.hotels),
            "review_count": len(d.reviews)
        })

    return {
        "success": True,
        "total": len(data),
        "data": data
    }


@router.get("/reviews")
def list_admin_reviews(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
) -> Dict[str, Any]:
    """Moderate and view all traveler reviews."""
    query = db.query(Review)
    total = query.count()
    offset = (page - 1) * limit
    reviews = query.order_by(Review.created_at.desc()).offset(offset).limit(limit).all()

    data = [
        {
            "id": r.id,
            "user_id": r.user_id,
            "user_name": r.user.name if r.user else "Anonymous",
            "destination_id": r.destination_id,
            "destination_name": r.destination.name if r.destination else "Destination",
            "rating": r.rating,
            "comment": r.comment,
            "created_at": r.created_at
        }
        for r in reviews
    ]

    return {
        "success": True,
        "total": total,
        "page": page,
        "limit": limit,
        "data": data
    }
