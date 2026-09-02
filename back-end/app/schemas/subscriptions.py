from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


# -----------------------------
# BASE
# -----------------------------

class SubscriptionBase(BaseModel):
    user_id: int
    plan_name: str
    billing_period: str
    amount: Decimal
    start_date: date
    end_date: date
    status: str = "active"


# -----------------------------
# CREATE
# -----------------------------

class SubscriptionCreate(SubscriptionBase):
    pass


# -----------------------------
# UPDATE
# -----------------------------

class SubscriptionUpdate(BaseModel):
    user_id: int | None = None
    plan_name: str | None = None
    billing_period: str | None = None
    amount: Decimal | None = None
    start_date: date | None = None
    end_date: date | None = None
    status: str | None = None


# -----------------------------
# RESPONSE
# -----------------------------

class SubscriptionResponse(SubscriptionBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )