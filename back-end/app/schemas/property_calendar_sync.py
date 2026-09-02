from datetime import datetime

from pydantic import BaseModel, ConfigDict


# -----------------------------
# BASE
# -----------------------------

class PropertyCalendarSyncBase(BaseModel):
    property_id: int
    provider: str
    calendar_url: str
    sync_status: str = "pending"
    last_synced_at: datetime | None = None


# -----------------------------
# CREATE
# -----------------------------

class PropertyCalendarSyncCreate(
    PropertyCalendarSyncBase
):
    pass


# -----------------------------
# UPDATE
# -----------------------------

class PropertyCalendarSyncUpdate(BaseModel):
    property_id: int | None = None
    provider: str | None = None
    calendar_url: str | None = None
    sync_status: str | None = None
    last_synced_at: datetime | None = None


# -----------------------------
# RESPONSE
# -----------------------------

class PropertyCalendarSyncResponse(
    PropertyCalendarSyncBase
):
    id: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )