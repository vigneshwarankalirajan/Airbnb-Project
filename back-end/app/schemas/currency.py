from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


# =========================================================
# CREATE
# =========================================================

class CurrencyCreate(BaseModel):

    code: str

    name: str

    symbol: str

    exchange_rate: Decimal

    is_base_currency: bool = False

    status: str = "active"


# =========================================================
# UPDATE
# =========================================================

class CurrencyUpdate(BaseModel):

    code: str | None = None

    name: str | None = None

    symbol: str | None = None

    exchange_rate: Decimal | None = None

    is_base_currency: bool | None = None

    status: str | None = None


# =========================================================
# RESPONSE
# =========================================================

class CurrencyResponse(BaseModel):

    id: int

    code: str

    name: str

    symbol: str

    exchange_rate: Decimal

    is_base_currency: bool

    status: str

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )