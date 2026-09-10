from sqlalchemy.orm import Session
from app.database.models import Trip, ItineraryDay, ItineraryActivity, PackingItem, Destination
from app.schemas.trip import TripCreate, TripUpdate

class TripService:
    @staticmethod
    def create_trip(db: Session, trip_in: TripCreate, user_id: int) -> Trip:
        """Create a new trip for a user and link destination if available."""
        dest = None
        if trip_in.destination_id:
            dest = db.query(Destination).filter(Destination.id == trip_in.destination_id).first()

        trip = Trip(
            user_id=user_id,
            destination_id=trip_in.destination_id,
            trip_name=trip_in.trip_name,
            start_date=trip_in.start_date,
            end_date=trip_in.end_date,
            travelers=trip_in.travelers,
            budget=trip_in.budget,
            travel_style=trip_in.travel_style,
            status=trip_in.status,
            sustainability_score=dest.sustainability_score if dest else 88,
            carbon_footprint_kg=round(14.0 * trip_in.travelers, 1),
            notes=trip_in.notes
        )
        db.add(trip)
        db.commit()
        db.refresh(trip)
        return trip

    @staticmethod
    def get_user_trips(db: Session, user_id: int):
        """Retrieve all trips owned by or shared with user."""
        return db.query(Trip).filter(Trip.user_id == user_id).order_by(Trip.created_at.desc()).all()

    @staticmethod
    def get_trip_by_id(db: Session, trip_id: int, user_id: int):
        """Retrieve a specific trip ensuring user ownership."""
        return db.query(Trip).filter(Trip.id == trip_id, Trip.user_id == user_id).first()

    @staticmethod
    def update_trip(db: Session, trip: Trip, trip_update: TripUpdate) -> Trip:
        """Update fields of an existing trip."""
        update_data = trip_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(trip, field, value)
        db.commit()
        db.refresh(trip)
        return trip

    @staticmethod
    def delete_trip(db: Session, trip: Trip):
        """Delete a trip and cascade related child records."""
        db.delete(trip)
        db.commit()

trip_service = TripService()
