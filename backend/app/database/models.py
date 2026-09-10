import datetime
from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    DateTime,
    ForeignKey,
    Text,
    Enum as SAEnum
)
from sqlalchemy.orm import relationship
from app.database.connection import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(20), default="traveler") # traveler, admin
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    trips = relationship("Trip", back_populates="user", cascade="all, delete-orphan")
    reviews = relationship("Review", back_populates="user", cascade="all, delete-orphan")
    favorites = relationship("Favorite", back_populates="user", cascade="all, delete-orphan")
    preferences = relationship("TravelPreference", back_populates="user", uselist=False, cascade="all, delete-orphan")
    group_memberships = relationship("GroupTripMember", back_populates="user", cascade="all, delete-orphan")


class Destination(Base):
    __tablename__ = "destinations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True, nullable=False)
    country = Column(String(50), default="India", nullable=False)
    state = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)
    image_url = Column(String(500), nullable=False)
    best_time = Column(String(100), nullable=False)
    average_budget = Column(Float, nullable=False)
    travel_style = Column(String(100), nullable=False) # e.g. Adventure, Nature, Cultural
    rating = Column(Float, default=4.5)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    tags = Column(String(500), default="") # Comma-separated tags
    hidden_gems = Column(Text, default="") # JSON or semicolon-separated
    local_foods = Column(Text, default="") # JSON or semicolon-separated
    sustainability_score = Column(Integer, default=85)

    # Relationships
    hotels = relationship("Hotel", back_populates="destination", cascade="all, delete-orphan")
    reviews = relationship("Review", back_populates="destination", cascade="all, delete-orphan")
    trips = relationship("Trip", back_populates="destination")


class Trip(Base):
    __tablename__ = "trips"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    destination_id = Column(Integer, ForeignKey("destinations.id"), nullable=True)
    trip_name = Column(String(150), nullable=False)
    start_date = Column(String(20), nullable=False)
    end_date = Column(String(20), nullable=False)
    travelers = Column(Integer, default=2)
    budget = Column(Float, default=15000.0)
    travel_style = Column(String(50), default="Adventure")
    status = Column(String(30), default="planned") # planned, completed, cancelled
    sustainability_score = Column(Integer, default=85)
    carbon_footprint_kg = Column(Float, default=35.0)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="trips")
    destination = relationship("Destination", back_populates="trips")
    itinerary_days = relationship("ItineraryDay", back_populates="trip", cascade="all, delete-orphan", order_by="ItineraryDay.day_number")
    packing_items = relationship("PackingItem", back_populates="trip", cascade="all, delete-orphan")
    expenses = relationship("TripExpense", back_populates="trip", cascade="all, delete-orphan")
    group_members = relationship("GroupTripMember", back_populates="trip", cascade="all, delete-orphan")


class ItineraryDay(Base):
    __tablename__ = "itinerary_days"

    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id"), nullable=False)
    day_number = Column(Integer, nullable=False)
    date = Column(String(30), nullable=True)
    title = Column(String(150), nullable=False)

    # Relationships
    trip = relationship("Trip", back_populates="itinerary_days")
    activities = relationship("ItineraryActivity", back_populates="itinerary_day", cascade="all, delete-orphan")


class ItineraryActivity(Base):
    __tablename__ = "itinerary_activities"

    id = Column(Integer, primary_key=True, index=True)
    itinerary_day_id = Column(Integer, ForeignKey("itinerary_days.id"), nullable=False)
    name = Column(String(150), nullable=False)
    description = Column(Text, nullable=True)
    location = Column(String(150), nullable=False)
    start_time = Column(String(20), default="09:00 AM")
    end_time = Column(String(20), default="12:00 PM")
    estimated_cost = Column(Float, default=0.0)
    duration = Column(String(30), default="2 Hours")
    travel_time = Column(String(30), default="20 mins")
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    crowd_level = Column(String(20), default="Low") # Low, Moderate, High
    ai_reason = Column(Text, nullable=True)
    photo_spot = Column(Boolean, default=False)

    # Relationships
    itinerary_day = relationship("ItineraryDay", back_populates="activities")


class Hotel(Base):
    __tablename__ = "hotels"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    destination_id = Column(Integer, ForeignKey("destinations.id"), nullable=False)
    price_per_night = Column(Float, nullable=False)
    rating = Column(Float, default=4.5)
    description = Column(Text, nullable=True)
    image_url = Column(String(500), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    facilities = Column(String(500), default="") # Comma-separated facilities
    category = Column(String(50), default="Best Value") # Best Value, Best Rated, Closest, Budget Friendly
    eco_certified = Column(Boolean, default=True)
    ai_score = Column(Float, default=9.2)

    # Relationships
    destination = relationship("Destination", back_populates="hotels")


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    destination_id = Column(Integer, ForeignKey("destinations.id"), nullable=False)
    rating = Column(Integer, nullable=False) # 1 to 5
    comment = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="reviews")
    destination = relationship("Destination", back_populates="reviews")


class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    item_type = Column(String(30), nullable=False) # destination, hotel, trip
    item_id = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="favorites")


class TravelPreference(Base):
    __tablename__ = "travel_preferences"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    food_preference = Column(String(50), default="Traditional")
    accommodation_preference = Column(String(50), default="Eco-Resort")
    transport_preference = Column(String(50), default="Train")
    interests = Column(String(300), default="Nature, Adventure")
    budget_tier = Column(String(30), default="moderate")

    # Relationships
    user = relationship("User", back_populates="preferences")


class PackingItem(Base):
    __tablename__ = "packing_items"

    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id"), nullable=False)
    name = Column(String(150), nullable=False)
    category = Column(String(50), default="essentials") # clothes, toiletries, electronics, documents, health, essentials
    is_checked = Column(Boolean, default=False)
    weather_reason = Column(String(200), nullable=True)

    # Relationships
    trip = relationship("Trip", back_populates="packing_items")


class TripExpense(Base):
    __tablename__ = "trip_expenses"

    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id"), nullable=False)
    name = Column(String(150), nullable=False)
    amount = Column(Float, nullable=False)
    paid_by = Column(String(100), default="Me")
    category = Column(String(50), default="Food") # Transport, Lodging, Food, Activities, Shopping, Other
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    trip = relationship("Trip", back_populates="expenses")


class GroupTripMember(Base):
    __tablename__ = "group_trip_members"

    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    role = Column(String(30), default="member") # owner, member
    joined_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    trip = relationship("Trip", back_populates="group_members")
    user = relationship("User", back_populates="group_memberships")
