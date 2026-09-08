from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    get_current_admin,
    verify_password,
)
from app.db.session import get_db
from app.models.admin import Admin
from app.schemas.auth import AdminLogin, AdminResponse, TokenResponse

router = APIRouter(
    prefix="/api/admin/auth",
    tags=["Admin Authentication"],
)


@router.post(
    "/login",
    response_model=TokenResponse,
)
def admin_login(
    payload: AdminLogin,
    db: Session = Depends(get_db),
):
    email = str(payload.email).strip().lower()

    admin = db.scalar(
        select(Admin).where(Admin.email == email)
    )

    if (
        admin is None
        or not admin.is_active
        or not verify_password(payload.password, admin.password_hash)
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    return TokenResponse(
        access_token=create_access_token(admin.id),
    )


@router.get(
    "/me",
    response_model=AdminResponse,
)
def get_admin_profile(
    current_admin: Admin = Depends(get_current_admin),
):
    return current_admin