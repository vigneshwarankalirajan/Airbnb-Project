from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


# -----------------------------
# BASE
# -----------------------------

class ListingFeeBase(BaseModel):
    property_id: int
    fee_type: str
    amount: Decimal
    currency: str
    status: str = "active"


# -----------------------------
# CREATE
# -----------------------------

class ListingFeeCreate(ListingFeeBase):
    pass


# -----------------------------
# UPDATE
# -----------------------------

class ListingFeeUpdate(BaseModel):
    property_id: int | None = None
    fee_type: str | None = None
    amount: Decimal | None = None
    currency: str | None = None
    status: str | None = None


# -----------------------------
# RESPONSE
# -----------------------------

class ListingFeeResponse(ListingFeeBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )