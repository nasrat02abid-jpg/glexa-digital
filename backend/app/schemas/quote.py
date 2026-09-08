from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class QuoteRequestCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=150)
    company: str | None = Field(default=None, max_length=150)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=50)
    service: str = Field(min_length=2, max_length=150)
    budget: str = Field(min_length=2, max_length=100)
    deadline: date | None = None
    details: str = Field(min_length=10, max_length=5000)


class QuoteRequestResponse(QuoteRequestCreate):
    id: int
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)