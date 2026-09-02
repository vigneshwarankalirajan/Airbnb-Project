from datetime import date, datetime

from pydantic import BaseModel, ConfigDict


# -----------------------------
# BASE
# -----------------------------

class AvailabilityBase(BaseModel):
    property_id: int
    available_date: date
    status: str = "available"


# -----------------------------
# CREATE
# -----------------------------

class AvailabilityCreate(AvailabilityBase):
    pass


# -----------------------------
# UPDATE
# -----------------------------

class AvailabilityUpdate(BaseModel):
    property_id: int | None = None
    available_date: date | None = None
    status: str | None = None


# -----------------------------
# RESPONSE
# -----------------------------

class AvailabilityResponse(AvailabilityBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )