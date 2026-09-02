from datetime import date, datetime

from decimal import Decimal

from pydantic import BaseModel, ConfigDict


# -----------------------------
# BASE
# -----------------------------

class PricingBase(BaseModel):
    property_id: int

    base_price: Decimal
    cleaning_fee: Decimal
    service_fee: Decimal
    tax_percentage: Decimal

    start_date: date
    end_date: date

    currency: str


# -----------------------------
# CREATE
# -----------------------------

class PricingCreate(PricingBase):
    pass


# -----------------------------
# UPDATE
# -----------------------------

class PricingUpdate(BaseModel):
    property_id: int | None = None

    base_price: Decimal | None = None
    cleaning_fee: Decimal | None = None
    service_fee: Decimal | None = None
    tax_percentage: Decimal | None = None

    start_date: date | None = None
    end_date: date | None = None

    currency: str | None = None


# -----------------------------
# RESPONSE
# -----------------------------

class PricingResponse(PricingBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )