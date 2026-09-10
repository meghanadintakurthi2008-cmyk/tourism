from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.database.connection import get_db
from app.database.models import Trip, User, TripExpense, GroupTripMember, Destination
from app.schemas.trip import TripCreate, TripUpdate, TripResponse, GroupTripCreate, GroupMemberAdd
from app.schemas.expense import TripExpenseCreate, TripExpenseResponse, ExpenseSplitResponse
from app.services.trip_service import trip_service
from app.services.budget_service import budget_service
from app.utils.auth import get_current_user

router = APIRouter(tags=["Trips"])

# --- User Trips ---

@router.post("/trips", response_model=TripResponse, status_code=status.HTTP_201_CREATED)
def create_trip(
    trip_in: TripCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new personal trip."""
    return trip_service.create_trip(db, trip_in, current_user.id)

@router.get("/trips", response_model=List[TripResponse])
def get_my_trips(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all private trips created by the logged-in user."""
    return trip_service.get_user_trips(db, current_user.id)

@router.get("/trips/{id}", response_model=TripResponse)
def get_trip_details(
    id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get details for a specific trip (ensures user is owner or member)."""
    trip = trip_service.get_trip_by_id(db, id, current_user.id)
    if not trip:
        # Check if user is group member
        membership = db.query(GroupTripMember).filter(GroupTripMember.trip_id == id, GroupTripMember.user_id == current_user.id).first()
        if not membership:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail={"success": False, "message": "Trip not found or unauthorized"}
            )
        trip = db.query(Trip).filter(Trip.id == id).first()
    return trip

@router.put("/trips/{id}", response_model=TripResponse)
def update_trip(
    id: int,
    trip_in: TripUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update an existing trip owned by user."""
    trip = trip_service.get_trip_by_id(db, id, current_user.id)
    if not trip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"success": False, "message": "Trip not found"}
        )
    return trip_service.update_trip(db, trip, trip_in)

@router.delete("/trips/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_trip(
    id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete a trip."""
    trip = trip_service.get_trip_by_id(db, id, current_user.id)
    if not trip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"success": False, "message": "Trip not found"}
        )
    trip_service.delete_trip(db, trip)
    return None

# --- Trip Expenses & Expense Splitter (Requirement #24) ---

@router.post("/trips/{trip_id}/expenses", response_model=TripExpenseResponse, status_code=status.HTTP_201_CREATED)
def add_trip_expense(
    trip_id: int,
    expense_in: TripExpenseCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Add an expense entry to a trip."""
    trip = db.query(Trip).filter(Trip.id == trip_id).first()
    if not trip:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"success": False, "message": "Trip not found"})

    expense = TripExpense(
        trip_id=trip_id,
        name=expense_in.name,
        amount=expense_in.amount,
        paid_by=expense_in.paid_by or current_user.name,
        category=expense_in.category
    )
    db.add(expense)
    db.commit()
    db.refresh(expense)
    return expense

@router.get("/trips/{trip_id}/expenses", response_model=ExpenseSplitResponse)
def get_trip_expenses_and_splits(
    trip_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Calculate total expenses, per-person share, and fair settlement transfers."""
    trip = db.query(Trip).filter(Trip.id == trip_id).first()
    if not trip:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"success": False, "message": "Trip not found"})

    expenses = db.query(TripExpense).filter(TripExpense.trip_id == trip_id).all()
    expense_dicts = [{"name": e.name, "amount": e.amount, "paid_by": e.paid_by} for e in expenses]

    # Gather group members or default to travelers count
    group_members = [m.user.name for m in trip.group_members] if trip.group_members else [current_user.name, "Traveler 2"]
    split_calc = budget_service.split_expenses(expense_dicts, group_members)

    return ExpenseSplitResponse(
        trip_id=trip_id,
        total_expense=split_calc["total_expense"],
        member_count=split_calc["member_count"],
        per_person_share=split_calc["per_person_share"],
        paid_summary=split_calc["paid_summary"],
        settlements=split_calc["settlements"]
    )

# --- Group Trip Planner (Requirement #25) ---

@router.post("/group-trips", response_model=TripResponse, status_code=status.HTTP_201_CREATED)
def create_group_trip(
    group_in: GroupTripCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a collaborative group trip with shared budget and itinerary."""
    dest = None
    if group_in.destination_id:
        dest = db.query(Destination).filter(Destination.id == group_in.destination_id).first()

    trip = Trip(
        user_id=current_user.id,
        destination_id=group_in.destination_id,
        trip_name=f"[Group] {group_in.trip_name}",
        start_date=group_in.start_date,
        end_date=group_in.end_date,
        travelers=4,
        budget=group_in.shared_budget,
        travel_style=group_in.travel_style,
        status="planned"
    )
    db.add(trip)
    db.commit()
    db.refresh(trip)

    # Add creator as owner
    owner_member = GroupTripMember(trip_id=trip.id, user_id=current_user.id, role="owner")
    db.add(owner_member)
    db.commit()

    return trip

@router.post("/group-trips/{id}/members")
def add_member_to_group_trip(
    id: int,
    member_in: GroupMemberAdd,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Add a member to a group trip via email."""
    trip = db.query(Trip).filter(Trip.id == id).first()
    if not trip:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"success": False, "message": "Trip not found"})

    invited_user = db.query(User).filter(User.email == member_in.email.lower().strip()).first()
    if not invited_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"success": False, "message": "User with this email not found"})

    already_member = db.query(GroupTripMember).filter(GroupTripMember.trip_id == id, GroupTripMember.user_id == invited_user.id).first()
    if already_member:
        return {"success": True, "message": "User is already a member of this trip"}

    member = GroupTripMember(trip_id=id, user_id=invited_user.id, role=member_in.role)
    db.add(member)
    db.commit()
    return {"success": True, "message": f"{invited_user.name} added to group trip successfully"}

@router.get("/group-trips/{id}")
def get_group_trip_details(
    id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get group trip details including member list."""
    trip = db.query(Trip).filter(Trip.id == id).first()
    if not trip:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail={"success": False, "message": "Trip not found"})

    members = [
        {
            "user_id": m.user_id,
            "name": m.user.name,
            "email": m.user.email,
            "role": m.role,
            "joined_at": m.joined_at
        }
        for m in trip.group_members
    ]

    return {
        "trip": trip,
        "members": members,
        "shared_budget": trip.budget,
        "expenses": trip.expenses
    }
