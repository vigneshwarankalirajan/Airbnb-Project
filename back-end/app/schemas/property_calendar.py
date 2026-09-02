from datetime import date, datetime

from pydantic import BaseModel, ConfigDict


# -----------------------------
# BASE
# -----------------------------

class PropertyCalendarBase(BaseModel):
    property_id: int
    calendar_date: date
    status: str = "available"
    booking_id: int | None = None


# -----------------------------
# CREATE
# -----------------------------

class PropertyCalendarCreate(PropertyCalendarBase):
    pass


# -----------------------------
# UPDATE
# -----------------------------

class PropertyCalendarUpdate(BaseModel):
    property_id: int | None = None
    calendar_date: date | None = None
    status: str | None = None
    booking_id: int | None = None


# -----------------------------
# RESPONSE
# -----------------------------

class PropertyCalendarResponse(PropertyCalendarBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )