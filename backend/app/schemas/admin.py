from pydantic import BaseModel, Field


class DashboardStats(BaseModel):
    inquiries: int
    quotes: int
    applications: int
    total: int


class StatusUpdate(BaseModel):
    status: str = Field(min_length=2, max_length=30)