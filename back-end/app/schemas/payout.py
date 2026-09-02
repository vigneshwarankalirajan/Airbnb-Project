from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class PayoutBase(BaseModel):

    wallet_id: int
    payout_account_id: int
    amount: Decimal
    currency_id: int

    payout_status: str = "pending"

    transaction_id: str | None = None

    failure_reason: str | None = None

    processed_at: datetime | None = None


class PayoutCreate(PayoutBase):
    pass


class PayoutUpdate(BaseModel):

    wallet_id: int | None = None
    payout_account_id: int | None = None
    amount: Decimal | None = None
    currency_id: int | None = None

    payout_status: str | None = None

    transaction_id: str | None = None

    failure_reason: str | None = None

    processed_at: datetime | None = None


class PayoutResponse(PayoutBase):

    id: int

    created_at: datetime

    updated_at: datetime | None = None

    model_config = ConfigDict(
        from_attributes=True
    )