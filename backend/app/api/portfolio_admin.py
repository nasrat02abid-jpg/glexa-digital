import os
import re
from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends, File, Form, HTTPException, Query, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import get_current_admin
from app.db.session import get_db
from app.models.portfolio import PortfolioProject
from app.schemas.portfolio import PortfolioProjectResponse

router = APIRouter(
    prefix="/api/admin/portfolio",
    tags=["Admin Portfolio"],
    dependencies=[Depends(get_current_admin)],
)

UPLOAD_ROOT = Path(os.getenv("UPLOAD_ROOT", "uploads")).resolve()
PORTFOLIO_DIR = UPLOAD_ROOT / "portfolio"
PORTFOLIO_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}
MAX_IMAGE_BYTES = 8 * 1024 * 1024


def make_slug(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "project"


def unique_slug(db: Session, title: str, exclude_id: int | None = None) -> str:
    base = make_slug(title)
    candidate = base
    number = 2
    while True:
        query = select(PortfolioProject.id).where(PortfolioProject.slug == candidate)
        if exclude_id is not None:
            query = query.where(PortfolioProject.id != exclude_id)
        if db.scalar(query) is None:
            return candidate
        candidate = f"{base}-{number}"
        number += 1


async def save_image(image: UploadFile) -> str:
    extension = ALLOWED_TYPES.get(image.content_type or "")
    if extension is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image must be JPG, PNG or WebP.",
        )
    content = await image.read(MAX_IMAGE_BYTES + 1)
    if len(content) > MAX_IMAGE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image must not exceed 8 MB.",
        )
    filename = f"{uuid4().hex}{extension}"
    (PORTFOLIO_DIR / filename).write_bytes(content)
    return f"/uploads/portfolio/{filename}"


def delete_image(image_url: str | None) -> None:
    if not image_url or not image_url.startswith("/uploads/portfolio/"):
        return
    file_path = (UPLOAD_ROOT / image_url.removeprefix("/uploads/")).resolve()
    if PORTFOLIO_DIR in file_path.parents:
        file_path.unlink(missing_ok=True)


@router.get("", response_model=list[PortfolioProjectResponse])
def list_admin_portfolio(
    limit: int = Query(default=200, ge=1, le=500),
    db: Session = Depends(get_db),
):
    return db.scalars(
        select(PortfolioProject)
        .order_by(PortfolioProject.display_order.asc(), PortfolioProject.created_at.desc())
        .limit(limit)
    ).all()


@router.post("", response_model=PortfolioProjectResponse, status_code=201)
async def create_portfolio_project(
    title: str = Form(..., min_length=2, max_length=180),
    description: str = Form(..., min_length=10),
    category: str = Form(..., min_length=2, max_length=100),
    services: str | None = Form(None),
    project_url: str | None = Form(None),
    is_featured: bool = Form(False),
    is_published: bool = Form(True),
    display_order: int = Form(0),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    image_url = await save_image(image)
    project = PortfolioProject(
        title=title.strip(),
        slug=unique_slug(db, title),
        description=description.strip(),
        category=category.strip(),
        services=services.strip() if services else None,
        project_url=project_url.strip() if project_url else None,
        image_url=image_url,
        is_featured=is_featured,
        is_published=is_published,
        display_order=display_order,
    )
    try:
        db.add(project)
        db.commit()
        db.refresh(project)
    except Exception:
        db.rollback()
        delete_image(image_url)
        raise
    return project


@router.put("/{project_id}", response_model=PortfolioProjectResponse)
async def update_portfolio_project(
    project_id: int,
    title: str = Form(..., min_length=2, max_length=180),
    description: str = Form(..., min_length=10),
    category: str = Form(..., min_length=2, max_length=100),
    services: str | None = Form(None),
    project_url: str | None = Form(None),
    is_featured: bool = Form(False),
    is_published: bool = Form(True),
    display_order: int = Form(0),
    image: UploadFile | None = File(None),
    db: Session = Depends(get_db),
):
    project = db.get(PortfolioProject, project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Portfolio project not found.")

    old_image_url = project.image_url
    new_image_url = await save_image(image) if image else None
    project.title = title.strip()
    project.slug = unique_slug(db, title, exclude_id=project.id)
    project.description = description.strip()
    project.category = category.strip()
    project.services = services.strip() if services else None
    project.project_url = project_url.strip() if project_url else None
    project.is_featured = is_featured
    project.is_published = is_published
    project.display_order = display_order
    if new_image_url:
        project.image_url = new_image_url

    try:
        db.commit()
        db.refresh(project)
    except Exception:
        db.rollback()
        delete_image(new_image_url)
        raise
    if new_image_url:
        delete_image(old_image_url)
    return project


@router.delete("/{project_id}", status_code=204)
def delete_portfolio_project(project_id: int, db: Session = Depends(get_db)):
    project = db.get(PortfolioProject, project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Portfolio project not found.")
    image_url = project.image_url
    db.delete(project)
    db.commit()
    delete_image(image_url)
