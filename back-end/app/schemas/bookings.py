from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


# -----------------------------
# BASE
# -----------------------------

class BookingBase(BaseModel):
    guest_id: int
    host_id: int
    property_id: int
    check_in: date
    check_out: date
    guest_count: int
    booking_status: str = "pending"
    total_amount: Decimal
    currency: str
    booking_method: str
    special_request: str | None = None


# -----------------------------
# CREATE
# -----------------------------

class BookingCreate(BookingBase):
    pass


# -----------------------------
# UPDATE
# -----------------------------

class BookingUpdate(BaseModel):
    guest_id: int | None = None
    host_id: int | None = None
    property_id: int | None = None
    check_in: date | None = None
    check_out: date | None = None
    guest_count: int | None = None
    booking_status: str | None = None
    total_amount: Decimal | None = None
    currency: str | None = None
    booking_method: str | None = None
    special_request: str | None = None


# -----------------------------
# RESPONSE
# -----------------------------

class BookingResponse(BookingBase):
    id: int
    created_at: datetime
    updated_at: datetime | None = None

    model_config = ConfigDict(
        from_attributes=True
    )