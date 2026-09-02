from datetime import datetime

from pydantic import BaseModel, ConfigDict


# -----------------------------
# BASE
# -----------------------------

class BookingStatusHistoryBase(BaseModel):
    booking_id: int
    status: str


# -----------------------------
# CREATE
# -----------------------------

class BookingStatusHistoryCreate(
    BookingStatusHistoryBase
):
    pass


# -----------------------------
# UPDATE
# -----------------------------

class BookingStatusHistoryUpdate(BaseModel):
    booking_id: int | None = None
    status: str | None = None


# -----------------------------
# RESPONSE
# -----------------------------

class BookingStatusHistoryResponse(
    BookingStatusHistoryBase
):
    id: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )