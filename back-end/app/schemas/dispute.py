from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


# =========================
# CREATE SCHEMA
# =========================

class DisputeCreate(BaseModel):

    booking_id: Optional[int] = None

    raised_by: int

    against_user_id: int

    dispute_type: str

    subject: str

    description: str

    priority: Optional[str] = "medium"


# =========================
# UPDATE SCHEMA
# =========================

class DisputeUpdate(BaseModel):

    booking_id: Optional[int] = None

    raised_by: Optional[int] = None

    against_user_id: Optional[int] = None

    dispute_type: Optional[str] = None

    subject: Optional[str] = None

    description: Optional[str] = None

    dispute_status: Optional[str] = None

    priority: Optional[str] = None

    resolution: Optional[str] = None

    resolved_by: Optional[int] = None

    resolved_at: Optional[datetime] = None


# =========================
# RESPONSE SCHEMA
# =========================

class DisputeResponse(BaseModel):

    id: int

    booking_id: Optional[int]

    raised_by: int

    against_user_id: int

    dispute_type: str

    subject: str

    description: str

    dispute_status: str

    priority: str

    resolution: Optional[str]

    resolved_by: Optional[int]

    resolved_at: Optional[datetime]

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )