from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


# -----------------------------
# BASE
# -----------------------------

class CommissionBase(BaseModel):
    property_id: int
    commission_type: str
    commission_percentage: Decimal
    guest_service_fee: Decimal
    host_commission: Decimal


# -----------------------------
# CREATE
# -----------------------------

class CommissionCreate(CommissionBase):
    pass


# -----------------------------
# UPDATE
# -----------------------------

class CommissionUpdate(BaseModel):
    property_id: int | None = None
    commission_type: str | None = None
    commission_percentage: Decimal | None = None
    guest_service_fee: Decimal | None = None
    host_commission: Decimal | None = None


# -----------------------------
# RESPONSE
# -----------------------------

class CommissionResponse(CommissionBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )