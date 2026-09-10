from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.database.models import User
from app.schemas.user import UserResponse, UserUpdate
from app.utils.auth import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/profile", response_model=UserResponse)
def get_profile(current_user: User = Depends(get_current_user)):
    """Fetch current user's profile details."""
    return current_user

@router.put("/profile", response_model=UserResponse)
def update_profile(
    user_in: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update name or email of current user."""
    if user_in.name:
        current_user.name = user_in.name.strip()
    if user_in.email:
        existing = db.query(User).filter(User.email == user_in.email.lower(), User.id != current_user.id).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={"success": False, "message": "Email already in use by another account"}
            )
        current_user.email = user_in.email.lower().strip()

    db.commit()
    db.refresh(current_user)
    return current_user
