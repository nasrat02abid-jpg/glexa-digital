from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import get_current_admin
from app.db.session import get_db
from app.models.review import CustomerReview
from app.schemas.review import ReviewModerationUpdate, ReviewResponse

router = APIRouter(
    prefix="/api/admin/reviews",
    tags=["Admin Reviews"],
    dependencies=[Depends(get_current_admin)],
)

ALLOWED_STATUSES = {"pending", "approved", "rejected"}


@router.get("", response_model=list[ReviewResponse])
def list_reviews(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=100, ge=1, le=200),
    db: Session = Depends(get_db),
):
    return db.scalars(
        select(CustomerReview)
        .order_by(CustomerReview.created_at.desc())
        .offset(skip)
        .limit(limit)
    ).all()


@router.patch("/{review_id}", response_model=ReviewResponse)
def moderate_review(
    review_id: int,
    payload: ReviewModerationUpdate,
    db: Session = Depends(get_db),
):
    review = db.get(CustomerReview, review_id)
    if review is None:
        raise HTTPException(status_code=404, detail="Review not found.")

    new_status = payload.status.strip().lower()
    if new_status not in ALLOWED_STATUSES:
        raise HTTPException(status_code=400, detail="Invalid review status.")

    review.status = new_status
    review.is_featured = payload.is_featured if new_status == "approved" else False
    db.commit()
    db.refresh(review)
    return review


@router.delete("/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_review(review_id: int, db: Session = Depends(get_db)):
    review = db.get(CustomerReview, review_id)
    if review is None:
        raise HTTPException(status_code=404, detail="Review not found.")

    db.delete(review)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
