from datetime import datetime

from pydantic import BaseModel, ConfigDict


# -----------------------------
# BASE
# -----------------------------

class BookingGuestBase(BaseModel):
    booking_id: int
    first_name: str
    last_name: str
    email: str
    phone: str
    guest_type: str


# -----------------------------
# CREATE
# -----------------------------

class BookingGuestCreate(BookingGuestBase):
    pass


# -----------------------------
# UPDATE
# -----------------------------

class BookingGuestUpdate(BaseModel):
    booking_id: int | None = None
    first_name: str | None = None
    last_name: str | None = None
    email: str | None = None
    phone: str | None = None
    guest_type: str | None = None


# -----------------------------
# RESPONSE
# -----------------------------

class BookingGuestResponse(BookingGuestBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )