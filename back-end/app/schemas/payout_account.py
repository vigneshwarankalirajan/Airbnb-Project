from datetime import datetime

from pydantic import BaseModel, ConfigDict


class PayoutAccountBase(BaseModel):

    user_id: int

    account_type: str

    account_holder_name: str

    bank_name: str | None = None

    account_number_last_four: str | None = None

    routing_number: str | None = None

    upi_id: str | None = None

    is_default: bool = False

    status: str = "active"


# CREATE

class PayoutAccountCreate(PayoutAccountBase):
    pass


# UPDATE

class PayoutAccountUpdate(BaseModel):

    user_id: int | None = None

    account_type: str | None = None

    account_holder_name: str | None = None

    bank_name: str | None = None

    account_number_last_four: str | None = None

    routing_number: str | None = None

    upi_id: str | None = None

    is_default: bool | None = None

    status: str | None = None


# RESPONSE

class PayoutAccountResponse(PayoutAccountBase):

    id: int

    created_at: datetime

    updated_at: datetime | None = None

    model_config = ConfigDict(
        from_attributes=True
    )