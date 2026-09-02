from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


# -----------------------------
# BASE
# -----------------------------

class CouponBase(BaseModel):
    code: str
    description: str | None = None
    discount_type: str
    discount_value: Decimal
    minimum_amount: Decimal
    usage_limit: int
    used_count: int = 0
    valid_from: datetime
    valid_until: datetime
    status: str = "active"


# -----------------------------
# CREATE
# -----------------------------

class CouponCreate(CouponBase):
    pass


# -----------------------------
# UPDATE
# -----------------------------

class CouponUpdate(BaseModel):
    code: str | None = None
    description: str | None = None
    discount_type: str | None = None
    discount_value: Decimal | None = None
    minimum_amount: Decimal | None = None
    usage_limit: int | None = None
    used_count: int | None = None
    valid_from: datetime | None = None
    valid_until: datetime | None = None
    status: str | None = None


# -----------------------------
# RESPONSE
# -----------------------------

class CouponResponse(CouponBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )