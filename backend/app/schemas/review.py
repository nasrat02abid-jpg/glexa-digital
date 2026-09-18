from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class ReviewCreate(BaseModel):
    customer_name: str = Field(min_length=2, max_length=120)
    company: str | None = Field(default=None, max_length=160)
    service: str = Field(min_length=2, max_length=120)
    rating: int = Field(ge=1, le=5)
    review: str = Field(min_length=20, max_length=2000)
    website: str | None = Field(default=None, max_length=0, exclude=True)

    @field_validator("customer_name", "service", "review")
    @classmethod
    def strip_required_text(cls, value: str) -> str:
        return value.strip()

    @field_validator("company")
    @classmethod
    def normalize_company(cls, value: str | None) -> str | None:
        if value is None:
            return None
        stripped = value.strip()
        return stripped or None


class ReviewResponse(BaseModel):
    id: int
    customer_name: str
    company: str | None
    service: str
    rating: int
    review: str
    status: str
    is_featured: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ReviewModerationUpdate(BaseModel):
    status: str = Field(min_length=7, max_length=20)
    is_featured: bool = False
