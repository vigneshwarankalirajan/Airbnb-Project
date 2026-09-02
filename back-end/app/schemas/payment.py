from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


# -----------------------------
# BASE
# -----------------------------

class PaymentBase(BaseModel):

    booking_id: int

    currency_id: int

    amount: Decimal

    payment_method: str

    transaction_id: str | None = None

    payment_status: str = "pending"

    paid_at: datetime | None = None

    failure_reason: str | None = None


# -----------------------------
# CREATE
# -----------------------------

class PaymentCreate(PaymentBase):
    pass


# -----------------------------
# UPDATE
# -----------------------------

class PaymentUpdate(BaseModel):

    booking_id: int | None = None

    currency_id: int | None = None

    amount: Decimal | None = None

    payment_method: str | None = None

    transaction_id: str | None = None

    payment_status: str | None = None

    paid_at: datetime | None = None

    failure_reason: str | None = None


# -----------------------------
# RESPONSE
# -----------------------------

class PaymentResponse(PaymentBase):

    id: int

    created_at: datetime

    updated_at: datetime | None = None

    model_config = ConfigDict(
        from_attributes=True
    )