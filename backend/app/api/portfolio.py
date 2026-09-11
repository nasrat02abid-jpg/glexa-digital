from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.portfolio import PortfolioProject
from app.schemas.portfolio import PortfolioProjectResponse

router = APIRouter(prefix="/api/portfolio", tags=["Portfolio"])


@router.get("", response_model=list[PortfolioProjectResponse])
def list_portfolio_projects(
    featured: bool | None = None,
    category: str | None = None,
    limit: int = Query(default=100, ge=1, le=200),
    db: Session = Depends(get_db),
):
    query = select(PortfolioProject).where(
        PortfolioProject.is_published.is_(True)
    )

    if featured is not None:
        query = query.where(PortfolioProject.is_featured.is_(featured))
    if category:
        query = query.where(PortfolioProject.category == category.strip())

    return db.scalars(
        query.order_by(
            PortfolioProject.display_order.asc(),
            PortfolioProject.created_at.desc(),
        ).limit(limit)
    ).all()


@router.get("/{slug}", response_model=PortfolioProjectResponse)
def get_portfolio_project(slug: str, db: Session = Depends(get_db)):
    project = db.scalar(
        select(PortfolioProject).where(
            PortfolioProject.slug == slug,
            PortfolioProject.is_published.is_(True),
        )
    )
    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Portfolio project not found.",
        )
    return project
