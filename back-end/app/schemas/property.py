from datetime import datetime
from pydantic import BaseModel, ConfigDict


class PropertyBase(BaseModel):
    host_id: int
    category_id: int
    title: str
    description: str | None = None
    property_type: str | None = None
    address: str | None = None
    city: str | None = None
    state: str | None = None
    country: str | None = None
    max_guests: int | None = None
    bedrooms: int | None = None
    bathrooms: int | None = None
    status: str = "draft"


# -----------------------------
# CREATE
# -----------------------------

class PropertyCreate(PropertyBase):
    pass


# -----------------------------
# UPDATE
# -----------------------------

class PropertyUpdate(BaseModel):
    host_id: int | None = None
    category_id: int | None = None
    title: str | None = None
    description: str | None = None
    property_type: str | None = None
    address: str | None = None
    city: str | None = None
    state: str | None = None
    country: str | None = None
    max_guests: int | None = None
    bedrooms: int | None = None
    bathrooms: int | None = None
    status: str | None = None


# -----------------------------
# RESPONSE
# -----------------------------

class PropertyResponse(PropertyBase):
    id: int
    created_at: datetime
    updated_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)