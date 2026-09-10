from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from app.database.connection import get_db
from app.database.models import Review, Destination, User
from app.schemas.review import ReviewCreate, ReviewUpdate, ReviewResponse
from app.utils.auth import get_current_user

router = APIRouter(prefix="/reviews", tags=["Reviews"])


def _recalculate_destination_rating(destination_id: int, db: Session):
    """Update destination rating based on all reviews."""
    avg_rating = (
        db.query(func.avg(Review.rating))
        .filter(Review.destination_id == destination_id)
        .scalar()
    )
    dest = db.query(Destination).filter(Destination.id == destination_id).first()
    if dest:
        dest.rating = round(float(avg_rating or 4.5), 1)
        db.commit()


@router.get("/destination/{destination_id}", response_model=List[ReviewResponse])
def get_destination_reviews(destination_id: int, db: Session = Depends(get_db)):
    """Retrieve all community traveler reviews for a specific destination."""
    dest = db.query(Destination).filter(Destination.id == destination_id).first()
    if not dest:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Destination not found")

    reviews = (
        db.query(Review)
        .filter(Review.destination_id == destination_id)
        .order_by(Review.created_at.desc())
        .all()
    )

    out = []
    for r in reviews:
        out.append(ReviewResponse(
            id=r.id,
            user_id=r.user_id,
            user_name=r.user.name if r.user else "Traveler",
            destination_id=r.destination_id,
            destination_name=dest.name,
            rating=r.rating,
            comment=r.comment,
            created_at=r.created_at
        ))
    return out


@router.post("", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
def create_review(
    review_in: ReviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Post a verified community review and rating for a destination."""
    dest = db.query(Destination).filter(Destination.id == review_in.destination_id).first()
    if not dest:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Destination not found")

    review = Review(
        user_id=current_user.id,
        destination_id=review_in.destination_id,
        rating=review_in.rating,
        comment=review_in.comment
    )
    db.add(review)
    db.commit()
    db.refresh(review)

    _recalculate_destination_rating(review_in.destination_id, db)

    return ReviewResponse(
        id=review.id,
        user_id=review.user_id,
        user_name=current_user.name,
        destination_id=review.destination_id,
        destination_name=dest.name,
        rating=review.rating,
        comment=review.comment,
        created_at=review.created_at
    )


@router.put("/{review_id}", response_model=ReviewResponse)
def update_review(
    review_id: int,
    review_in: ReviewUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a review written by the current user."""
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Review not found")

    if review.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

    if review_in.rating is not None:
        review.rating = review_in.rating
    if review_in.comment is not None:
        review.comment = review_in.comment

    db.commit()
    db.refresh(review)

    _recalculate_destination_rating(review.destination_id, db)

    dest = db.query(Destination).filter(Destination.id == review.destination_id).first()
    return ReviewResponse(
        id=review.id,
        user_id=review.user_id,
        user_name=current_user.name,
        destination_id=review.destination_id,
        destination_name=dest.name if dest else "Destination",
        rating=review.rating,
        comment=review.comment,
        created_at=review.created_at
    )


@router.delete("/{review_id}", status_code=status.HTTP_200_OK)
def delete_review(
    review_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a review (author or admin only)."""
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Review not found")

    if review.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

    dest_id = review.destination_id
    db.delete(review)
    db.commit()

    _recalculate_destination_rating(dest_id, db)
    return {"success": True, "message": "Review deleted successfully"}
