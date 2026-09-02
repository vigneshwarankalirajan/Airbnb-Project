from datetime import datetime

from pydantic import BaseModel, ConfigDict


class PaymentMethodBase(BaseModel):

    user_id: int

    method_type: str

    provider: str

    account_holder_name: str

    last_four_digits: str | None = None

    expiry_month: int | None = None

    expiry_year: int | None = None

    is_default: bool = False

    status: str = "active"


# -----------------------------
# CREATE
# -----------------------------

class PaymentMethodCreate(PaymentMethodBase):
    pass


# -----------------------------
# UPDATE
# -----------------------------

class PaymentMethodUpdate(BaseModel):

    user_id: int | None = None

    method_type: str | None = None

    provider: str | None = None

    account_holder_name: str | None = None

    last_four_digits: str | None = None

    expiry_month: int | None = None

    expiry_year: int | None = None

    is_default: bool | None = None

    status: str | None = None


# -----------------------------
# RESPONSE
# -----------------------------

class PaymentMethodResponse(PaymentMethodBase):

    id: int

    created_at: datetime

    updated_at: datetime | None = None

    model_config = ConfigDict(
        from_attributes=True
    )