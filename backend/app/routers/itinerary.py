from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.connection import get_db
from app.database.models import Trip, ItineraryDay, ItineraryActivity, User
from app.schemas.itinerary import (
    ActivityCreate,
    ActivityUpdate,
    ActivityResponse,
    ItineraryDayCreate,
    ItineraryDayResponse
)
from app.utils.auth import get_current_user

router = APIRouter(tags=["Itinerary"])


@router.get("/trips/{trip_id}/itinerary", response_model=List[ItineraryDayResponse])
def get_trip_itinerary(
    trip_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Retrieve full day-by-day itinerary with all scheduled activities for a trip."""
    trip = db.query(Trip).filter(Trip.id == trip_id).first()
    if not trip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Trip with ID {trip_id} not found"
        )
    # Check if current user is owner or group member
    is_owner = trip.user_id == current_user.id
    is_member = any(m.user_id == current_user.id for m in trip.group_members)
    if not is_owner and not is_member and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to view this itinerary"
        )

    days = (
        db.query(ItineraryDay)
        .filter(ItineraryDay.trip_id == trip_id)
        .order_by(ItineraryDay.day_number.asc())
        .all()
    )
    return days


@router.post("/trips/{trip_id}/itinerary/days", response_model=ItineraryDayResponse, status_code=status.HTTP_201_CREATED)
def add_itinerary_day(
    trip_id: int,
    day_in: ItineraryDayCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Add a new day to a trip's itinerary."""
    trip = db.query(Trip).filter(Trip.id == trip_id).first()
    if not trip:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")

    if trip.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to edit this trip")

    new_day = ItineraryDay(
        trip_id=trip_id,
        day_number=day_in.day_number,
        date=day_in.date,
        title=day_in.title
    )
    db.add(new_day)
    db.commit()
    db.refresh(new_day)
    return new_day


@router.delete("/itinerary/days/{day_id}", status_code=status.HTTP_200_OK)
def delete_itinerary_day(
    day_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete an entire itinerary day and its associated activities."""
    day = db.query(ItineraryDay).filter(ItineraryDay.id == day_id).first()
    if not day:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Itinerary day not found")

    trip = db.query(Trip).filter(Trip.id == day.trip_id).first()
    if trip and trip.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")

    db.delete(day)
    db.commit()
    return {"success": True, "message": f"Itinerary day {day_id} deleted successfully"}


@router.post("/itinerary/days/{day_id}/activities", response_model=ActivityResponse, status_code=status.HTTP_201_CREATED)
def add_activity_to_day(
    day_id: int,
    activity_in: ActivityCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Add an activity to a specific itinerary day."""
    day = db.query(ItineraryDay).filter(ItineraryDay.id == day_id).first()
    if not day:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Itinerary day not found")

    trip = db.query(Trip).filter(Trip.id == day.trip_id).first()
    if trip and trip.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to edit this itinerary")

    new_activity = ItineraryActivity(
        itinerary_day_id=day_id,
        name=activity_in.name,
        description=activity_in.description,
        location=activity_in.location,
        start_time=activity_in.start_time,
        end_time=activity_in.end_time,
        estimated_cost=activity_in.estimated_cost,
        duration=activity_in.duration,
        travel_time=activity_in.travel_time,
        latitude=activity_in.latitude,
        longitude=activity_in.longitude,
        crowd_level=activity_in.crowd_level,
        ai_reason=activity_in.ai_reason,
        photo_spot=activity_in.photo_spot
    )
    db.add(new_activity)
    db.commit()
    db.refresh(new_activity)
    return new_activity


@router.put("/itinerary/activities/{activity_id}", response_model=ActivityResponse)
def update_itinerary_activity(
    activity_id: int,
    activity_in: ActivityUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update an existing activity's details or schedule."""
    activity = db.query(ItineraryActivity).filter(ItineraryActivity.id == activity_id).first()
    if not activity:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Activity not found")

    day = db.query(ItineraryDay).filter(ItineraryDay.id == activity.itinerary_day_id).first()
    if day:
        trip = db.query(Trip).filter(Trip.id == day.trip_id).first()
        if trip and trip.user_id != current_user.id and current_user.role != "admin":
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to modify this activity")

    update_data = activity_in.dict(exclude_unset=True)
    for field, val in update_data.items():
        setattr(activity, field, val)

    db.commit()
    db.refresh(activity)
    return activity


@router.delete("/itinerary/activities/{activity_id}", status_code=status.HTTP_200_OK)
def delete_itinerary_activity(
    activity_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete an activity from an itinerary."""
    activity = db.query(ItineraryActivity).filter(ItineraryActivity.id == activity_id).first()
    if not activity:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Activity not found")

    day = db.query(ItineraryDay).filter(ItineraryDay.id == activity.itinerary_day_id).first()
    if day:
        trip = db.query(Trip).filter(Trip.id == day.trip_id).first()
        if trip and trip.user_id != current_user.id and current_user.role != "admin":
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete this activity")

    db.delete(activity)
    db.commit()
    return {"success": True, "message": f"Activity {activity_id} removed successfully"}
