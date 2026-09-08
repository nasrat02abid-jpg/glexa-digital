from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


class JobApplicationResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    phone: str
    position: str
    experience: str
    portfolio: str | None
    message: str
    cv_original_name: str
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)