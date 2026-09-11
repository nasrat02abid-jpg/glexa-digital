from datetime import datetime

from pydantic import BaseModel, ConfigDict


class PortfolioProjectResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    slug: str
    description: str
    category: str
    services: str | None
    project_url: str | None
    image_url: str
    is_featured: bool
    is_published: bool
    display_order: int
    created_at: datetime
    updated_at: datetime
