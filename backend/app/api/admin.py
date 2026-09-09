from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import FileResponse
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.security import get_current_admin
from app.db.session import get_db
from app.models import Inquiry
from app.models.admin import Admin
from app.models.application import JobApplication
from app.models.quote import QuoteRequest
from app.schemas.admin import DashboardStats, StatusUpdate
from app.schemas.application import JobApplicationResponse
from app.schemas.inquiry import ContactInquiryResponse
from app.schemas.quote import QuoteRequestResponse

router = APIRouter(
    prefix="/api/admin",
    tags=["Admin Dashboard"],
    dependencies=[Depends(get_current_admin)],
)

GENERAL_STATUSES = {
    "new",
    "reviewing",
    "contacted",
    "completed",
    "archived",
}

APPLICATION_STATUSES = {
    "new",
    "reviewing",
    "shortlisted",
    "rejected",
    "hired",
}


@router.get(
    "/dashboard/stats",
    response_model=DashboardStats,
)
def get_dashboard_stats(
    db: Session = Depends(get_db),
):
    inquiries_count = db.scalar(
        select(func.count()).select_from(Inquiry)
    ) or 0

    quotes_count = db.scalar(
        select(func.count()).select_from(QuoteRequest)
    ) or 0

    applications_count = db.scalar(
        select(func.count()).select_from(JobApplication)
    ) or 0

    return DashboardStats(
        inquiries=inquiries_count,
        quotes=quotes_count,
        applications=applications_count,
        total=inquiries_count + quotes_count + applications_count,
    )


@router.get(
    "/inquiries",
    response_model=list[ContactInquiryResponse],
)
def list_inquiries(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=100, ge=1, le=200),
    db: Session = Depends(get_db),
):
    return db.scalars(
        select(Inquiry)
        .order_by(Inquiry.created_at.desc())
        .offset(skip)
        .limit(limit)
    ).all()


@router.patch(
    "/inquiries/{inquiry_id}/status",
    response_model=ContactInquiryResponse,
)
def update_inquiry_status(
    inquiry_id: int,
    payload: StatusUpdate,
    db: Session = Depends(get_db),
):
    new_status = payload.status.strip().lower()

    if new_status not in GENERAL_STATUSES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid inquiry status.",
        )

    inquiry = db.get(Inquiry, inquiry_id)

    if inquiry is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Inquiry not found.",
        )

    inquiry.status = new_status
    db.commit()
    db.refresh(inquiry)

    return inquiry


@router.get(
    "/quotes",
    response_model=list[QuoteRequestResponse],
)
def list_quotes(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=100, ge=1, le=200),
    db: Session = Depends(get_db),
):
    return db.scalars(
        select(QuoteRequest)
        .order_by(QuoteRequest.created_at.desc())
        .offset(skip)
        .limit(limit)
    ).all()


@router.patch(
    "/quotes/{quote_id}/status",
    response_model=QuoteRequestResponse,
)
def update_quote_status(
    quote_id: int,
    payload: StatusUpdate,
    db: Session = Depends(get_db),
):
    new_status = payload.status.strip().lower()

    if new_status not in GENERAL_STATUSES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid quotation status.",
        )

    quote = db.get(QuoteRequest, quote_id)

    if quote is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Quotation request not found.",
        )

    quote.status = new_status
    db.commit()
    db.refresh(quote)

    return quote


@router.get(
    "/applications",
    response_model=list[JobApplicationResponse],
)
def list_applications(
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=100, ge=1, le=200),
    db: Session = Depends(get_db),
):
    return db.scalars(
        select(JobApplication)
        .order_by(JobApplication.created_at.desc())
        .offset(skip)
        .limit(limit)
    ).all()


@router.patch(
    "/applications/{application_id}/status",
    response_model=JobApplicationResponse,
)
def update_application_status(
    application_id: int,
    payload: StatusUpdate,
    db: Session = Depends(get_db),
):
    new_status = payload.status.strip().lower()

    if new_status not in APPLICATION_STATUSES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid application status.",
        )

    application = db.get(JobApplication, application_id)

    if application is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job application not found.",
        )

    application.status = new_status
    db.commit()
    db.refresh(application)

    return application


@router.get("/applications/{application_id}/cv")
def download_application_cv(
    application_id: int,
    db: Session = Depends(get_db),
):
    application = db.get(JobApplication, application_id)

    if application is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job application not found.",
        )

    cv_path = Path(application.cv_path).resolve()

    if not cv_path.is_file():
        raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="CV file not found.",
    )

    return FileResponse(
        path=cv_path,
        filename=application.cv_original_name,
        media_type="application/octet-stream",
    )