from datetime import datetime

from pydantic import BaseModel, ConfigDict


# -----------------------------
# BASE
# -----------------------------

class InquiryBase(BaseModel):
    guest_id: int
    host_id: int
    property_id: int
    message: str
    response: str | None = None
    status: str = "pending"


# -----------------------------
# CREATE
# -----------------------------

class InquiryCreate(InquiryBase):
    pass


# -----------------------------
# UPDATE
# -----------------------------

class InquiryUpdate(BaseModel):
    guest_id: int | None = None
    host_id: int | None = None
    property_id: int | None = None
    message: str | None = None
    response: str | None = None
    status: str | None = None


# -----------------------------
# RESPONSE
# -----------------------------

class InquiryResponse(InquiryBase):
    id: int
    created_at: datetime
    updated_at: datetime | None = None

    model_config = ConfigDict(
        from_attributes=True
    )