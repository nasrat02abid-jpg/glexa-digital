from datetime import datetime

from sqlalchemy import DateTime, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class JobApplication(Base):
    __tablename__ = "job_applications"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    full_name: Mapped[str] = mapped_column(String(150), nullable=False)
    email: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    phone: Mapped[str] = mapped_column(String(50), nullable=False)
    position: Mapped[str] = mapped_column(String(), nullable=False)
    experience: Mapped[str] = mapped_column(String(100), nullable=False)
    portfolio: Mapped[str | None] = mapped_column(String(), nullable=True)
    message: Mapped[str] = mapped_column(Text, nullable=False)

    cv_original_name: Mapped[str] = mapped_column(String(255), nullable=False)
    cv_stored_name: Mapped[str] = mapped_column(String(255), nullable=False)
    cv_path: Mapped[str] = mapped_column(String(500), nullable=False)

    status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="new",
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )