from datetime import datetime

from pydantic import BaseModel, ConfigDict


class UserVerificationCreate(BaseModel):
    user_id: int
    document_type: str
    document_number: str
    document_url: str | None = None
    verification_status: str


class UserVerificationUpdate(BaseModel):
    document_type: str | None = None
    document_number: str | None = None
    document_url: str | None = None
    verification_status: str | None = None
    reviewed_by: int | None = None
    reviewed_at: datetime | None = None


class UserVerificationResponse(BaseModel):
    id: int
    user_id: int
    document_type: str
    document_number: str
    document_url: str | None = None
    verification_status: str
    reviewed_by: int | None = None
    reviewed_at: datetime | None = None
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )