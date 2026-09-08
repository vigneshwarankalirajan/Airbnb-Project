from datetime import datetime
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, ConfigDict


# =====================================================
# CREATE
# =====================================================

class HostPenaltyCreate(BaseModel):

    host_id: int

    booking_id: Optional[int] = None

    dispute_id: Optional[int] = None

    penalty_type: str

    reason: str

    penalty_amount: Decimal

    currency_id: int

    severity: Optional[str] = "medium"

    admin_notes: Optional[str] = None

    imposed_by: int


# =====================================================
# UPDATE
# =====================================================

class HostPenaltyUpdate(BaseModel):

    host_id: Optional[int] = None

    booking_id: Optional[int] = None

    dispute_id: Optional[int] = None

    penalty_type: Optional[str] = None

    reason: Optional[str] = None

    penalty_amount: Optional[Decimal] = None

    currency_id: Optional[int] = None

    penalty_status: Optional[str] = None

    severity: Optional[str] = None

    admin_notes: Optional[str] = None

    imposed_by: Optional[int] = None

    imposed_at: Optional[datetime] = None

    resolved_at: Optional[datetime] = None


# =====================================================
# RESPONSE
# =====================================================

class HostPenaltyResponse(BaseModel):

    id: int

    host_id: int

    booking_id: Optional[int]

    dispute_id: Optional[int]

    penalty_type: str

    reason: str

    penalty_amount: Decimal

    currency_id: int

    penalty_status: str

    severity: str

    admin_notes: Optional[str]

    imposed_by: int

    imposed_at: datetime

    resolved_at: Optional[datetime]

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )