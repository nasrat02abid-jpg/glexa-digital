from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.quote import QuoteRequest
from app.schemas.quote import QuoteRequestCreate, QuoteRequestResponse

router = APIRouter(
    prefix="/api/quotes",
    tags=["Quotes"],
)


@router.post(
    "",
    response_model=QuoteRequestResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_quote_request(
    payload: QuoteRequestCreate,
    db: Session = Depends(get_db),
):
    try:
        quote_request = QuoteRequest(
            full_name=payload.full_name.strip(),
            company=payload.company.strip() if payload.company else None,
            email=str(payload.email).lower(),
            phone=payload.phone.strip(),
            service=payload.service.strip(),
            budget=payload.budget.strip(),
            deadline=payload.deadline,
            details=payload.details.strip(),
            status="new",
        )

        db.add(quote_request)
        db.commit()
        db.refresh(quote_request)

        return quote_request

    except Exception as exc:
        db.rollback()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to submit the quotation request.",
        ) from exc