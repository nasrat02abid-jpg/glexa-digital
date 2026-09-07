from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.inquiry import Inquiry
from app.schemas.inquiry import (
    ContactInquiryCreate,
    ContactInquiryResponse,
)

router = APIRouter(
    prefix="/api/inquiries",
    tags=["Inquiries"],
)


@router.post(
    "/contact",
    response_model=ContactInquiryResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_contact_inquiry(
    payload: ContactInquiryCreate,
    db: Session = Depends(get_db),
):
    try:
        inquiry = Inquiry(
    full_name=payload.full_name.strip(),
    email=str(payload.email).lower(),
    phone=payload.phone.strip(),
    subject=payload.subject.strip(),
    message=payload.message.strip(),
    status="new",
)

        db.add(inquiry)
        db.commit()
        db.refresh(inquiry)

        return inquiry

    except Exception as exc:
        db.rollback()

        raise HTTPException(
    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
    detail="Unable to submit the inquiry.",
) from exc