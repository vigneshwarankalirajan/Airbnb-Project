from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class WalletTransactionBase(BaseModel):

    wallet_id: int

    transaction_type: str

    amount: Decimal

    balance_before: Decimal

    balance_after: Decimal

    reference_type: str | None = None

    reference_id: int | None = None

    description: str | None = None

    transaction_status: str = "pending"

    transaction_date: datetime | None = None


class WalletTransactionCreate(
    WalletTransactionBase
):
    pass


class WalletTransactionUpdate(BaseModel):

    wallet_id: int | None = None

    transaction_type: str | None = None

    amount: Decimal | None = None

    balance_before: Decimal | None = None

    balance_after: Decimal | None = None

    reference_type: str | None = None

    reference_id: int | None = None

    description: str | None = None

    transaction_status: str | None = None

    transaction_date: datetime | None = None


class WalletTransactionResponse(
    WalletTransactionBase
):

    id: int

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )