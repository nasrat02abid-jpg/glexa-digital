import os
from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends, File, Form, HTTPException, Query, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.review import CustomerReview
from app.schemas.review import ReviewResponse

router = APIRouter(prefix="/api/reviews", tags=["Customer Reviews"])

UPLOAD_ROOT = Path(os.getenv("UPLOAD_ROOT", "uploads")).resolve()
REVIEWS_DIR = UPLOAD_ROOT / "reviews"
REVIEWS_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}
MAX_PHOTO_BYTES = 5 * 1024 * 1024


async def save_review_photo(photo: UploadFile) -> str:
    extension = ALLOWED_TYPES.get(photo.content_type or "")
    if extension is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Photo must be JPG, PNG or WebP.",
        )

    content = await photo.read(MAX_PHOTO_BYTES + 1)
    if not content:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please select a reviewer photo.",
        )
    if len(content) > MAX_PHOTO_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Photo must not exceed 5 MB.",
        )

    filename = f"{uuid4().hex}{extension}"
    (REVIEWS_DIR / filename).write_bytes(content)
    return f"/uploads/reviews/{filename}"


def delete_review_photo(photo_url: str | None) -> None:
    if not photo_url or not photo_url.startswith("/uploads/reviews/"):
        return
    file_path = (UPLOAD_ROOT / photo_url.removeprefix("/uploads/")).resolve()
    if REVIEWS_DIR in file_path.parents:
        file_path.unlink(missing_ok=True)


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
async def submit_review(
    customer_name: str = Form(..., min_length=2, max_length=120),
    company: str | None = Form(None, max_length=160),
    service: str = Form(..., min_length=2, max_length=120),
    rating: int = Form(..., ge=1, le=5),
    review_text: str = Form(..., alias="review", min_length=20, max_length=2000),
    website: str | None = Form(None, max_length=0),
    photo: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    photo_url = await save_review_photo(photo)
    review = CustomerReview(
        customer_name=customer_name.strip(),
        company=company.strip() if company else None,
        service=service.strip(),
        rating=rating,
        review=review_text.strip(),
        photo_url=photo_url,
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
        delete_review_photo(photo_url)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to submit your review.",
        ) from exc
