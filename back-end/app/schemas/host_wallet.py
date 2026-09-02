from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class HostWalletBase(BaseModel):

    user_id: int

    currency_id: int

    available_balance: Decimal = 0

    pending_balance: Decimal = 0

    total_earnings: Decimal = 0

    total_withdrawn: Decimal = 0

    wallet_status: str = "active"


class HostWalletCreate(HostWalletBase):
    pass


class HostWalletUpdate(BaseModel):

    user_id: int | None = None

    currency_id: int | None = None

    available_balance: Decimal | None = None

    pending_balance: Decimal | None = None

    total_earnings: Decimal | None = None

    total_withdrawn: Decimal | None = None

    wallet_status: str | None = None


class HostWalletResponse(HostWalletBase):

    id: int

    created_at: datetime

    updated_at: datetime | None = None

    model_config = ConfigDict(
        from_attributes=True
    )