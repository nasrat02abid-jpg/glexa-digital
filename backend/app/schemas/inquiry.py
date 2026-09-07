from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class ContactInquiryCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=30)
    subject: str = Field(min_length=2, max_length=200)
    message: str = Field(min_length=10, max_length=5000)


class ContactInquiryResponse(ContactInquiryCreate):
    id: int
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)