from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.review import CustomerReview
from app.schemas.review import ReviewCreate, ReviewResponse

router = APIRouter(prefix="/api/reviews", tags=["Customer Reviews"])


@router.get("", response_model=list[ReviewResponse])
def list_published_reviews(
    featured: bool | None = Query(default=None),
    limit: int = Query(default=50, ge=1, le=100),
    db: Session = Depends(get_db),
):
    statement = select(CustomerReview).where(
        CustomerReview.status == "approved"
    )

    if featured is not None:
        statement = statement.where(CustomerReview.is_featured == featured)

    return db.scalars(
        statement.order_by(CustomerReview.created_at.desc()).limit(limit)
    ).all()


@router.post(
    "",
    response_model=ReviewResponse,
    status_code=status.HTTP_201_CREATED,
)
def submit_review(
    payload: ReviewCreate,
    db: Session = Depends(get_db),
):
    review = CustomerReview(
        customer_name=payload.customer_name,
        company=payload.company,
        service=payload.service,
        rating=payload.rating,
        review=payload.review,
        status="pending",
        is_featured=False,
    )

    try:
        db.add(review)
        db.commit()
        db.refresh(review)
        return review
    except Exception as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to submit your review.",
        ) from exc
