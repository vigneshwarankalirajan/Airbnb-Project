from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class RefundBase(BaseModel):

    payment_id: int

    amount: Decimal

    reason: str | None = None

    refund_status: str = "pending"

    refund_transaction_id: str | None = None

    refunded_at: datetime | None = None


class RefundCreate(RefundBase):
    pass


class RefundUpdate(BaseModel):

    payment_id: int | None = None

    amount: Decimal | None = None

    reason: str | None = None

    refund_status: str | None = None

    refund_transaction_id: str | None = None

    refunded_at: datetime | None = None


class RefundResponse(RefundBase):

    id: int

    created_at: datetime

    updated_at: datetime | None = None

    model_config = ConfigDict(
        from_attributes=True
    )