from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, Field


class FinanceTransactionCreate(BaseModel):

    transaction_type: str = Field(
        ...,
        max_length=50
    )

    reference_type: str | None = Field(
        default=None,
        max_length=50
    )

    reference_id: int | None = None

    user_id: int

    currency_id: int

    amount: Decimal = Field(
        ...,
        max_digits=14,
        decimal_places=2
    )

    direction: str = Field(
        ...,
        max_length=20
    )

    transaction_status: str = Field(
        default="pending",
        max_length=30
    )

    description: str | None = None

    transaction_date: datetime | None = None


class FinanceTransactionUpdate(BaseModel):

    transaction_type: str | None = Field(
        default=None,
        max_length=50
    )

    reference_type: str | None = Field(
        default=None,
        max_length=50
    )

    reference_id: int | None = None

    user_id: int | None = None

    currency_id: int | None = None

    amount: Decimal | None = Field(
        default=None,
        max_digits=14,
        decimal_places=2
    )

    direction: str | None = Field(
        default=None,
        max_length=20
    )

    transaction_status: str | None = Field(
        default=None,
        max_length=30
    )

    description: str | None = None

    transaction_date: datetime | None = None


class FinanceTransactionResponse(BaseModel):

    id: int

    transaction_type: str

    reference_type: str | None

    reference_id: int | None

    user_id: int

    currency_id: int

    amount: Decimal

    direction: str

    transaction_status: str

    description: str | None

    transaction_date: datetime

    created_at: datetime

    updated_at: datetime

    class Config:
        from_attributes = True