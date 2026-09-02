from datetime import datetime

from pydantic import BaseModel, ConfigDict


# -----------------------------
# BASE
# -----------------------------

class CityZoneBase(BaseModel):
    zone_name: str
    city: str
    state: str
    country: str
    status: str = "active"


# -----------------------------
# CREATE
# -----------------------------

class CityZoneCreate(CityZoneBase):
    pass


# -----------------------------
# UPDATE
# -----------------------------

class CityZoneUpdate(BaseModel):
    zone_name: str | None = None
    city: str | None = None
    state: str | None = None
    country: str | None = None
    status: str | None = None


# -----------------------------
# RESPONSE
# -----------------------------

class CityZoneResponse(CityZoneBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )