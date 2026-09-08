from pathlib import Path
from uuid import uuid4

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    UploadFile,
    status,
)
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.application import JobApplication
from app.schemas.application import JobApplicationResponse

router = APIRouter(
    prefix="/api/applications",
    tags=["Job Applications"],
)

BACKEND_DIRECTORY = Path(__file__).resolve().parents[2]
CV_DIRECTORY = BACKEND_DIRECTORY / "uploads" / "cvs"
CV_DIRECTORY.mkdir(parents=True, exist_ok=True)

ALLOWED_EXTENSIONS = {".pdf", ".doc", ".docx"}
ALLOWED_CONTENT_TYPES = {
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}

MAX_FILE_SIZE = 5 * 1024 * 1024


@router.post(
    "",
    response_model=JobApplicationResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_job_application(
    full_name: str = Form(..., min_length=2, max_length=150),
    email: str = Form(..., min_length=5, max_length=255),
    phone: str = Form(..., min_length=7, max_length=50),
    position: str = Form(..., min_length=2, max_length=150),
    experience: str = Form(..., min_length=2, max_length=100),
    portfolio: str | None = Form(default=None, max_length=500),
    message: str = Form(..., min_length=10, max_length=5000),
    cv: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    original_name = Path(cv.filename or "").name
    extension = Path(original_name).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF, DOC and DOCX files are allowed.",
        )

    if cv.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded CV file type is invalid.",
        )

    file_content = await cv.read()

    if not file_content:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded CV file is empty.",
        )

    if len(file_content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The CV file must not exceed 5 MB.",
        )

    stored_name = f"{uuid4().hex}{extension}"
    destination = CV_DIRECTORY / stored_name

    try:
        destination.write_bytes(file_content)

        application = JobApplication(
            full_name=full_name.strip(),
            email=email.strip().lower(),
            phone=phone.strip(),
            position=position.strip(),
            experience=experience.strip(),
            portfolio=portfolio.strip() if portfolio else None,
            message=message.strip(),
            cv_original_name=original_name,
            cv_stored_name=stored_name,
            cv_path=str(destination),
            status="new",
        )

        db.add(application)
        db.commit()
        db.refresh(application)

        return application

    except Exception as exc:
        db.rollback()

        if destination.exists():
            destination.unlink()

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to submit the job application.",
        ) from exc

    finally:
        await cv.close()