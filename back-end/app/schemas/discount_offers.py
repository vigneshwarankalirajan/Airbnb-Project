from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


# -----------------------------
# BASE
# -----------------------------

class DiscountOfferBase(BaseModel):
    property_id: int
    offer_name: str
    offer_type: str
    discount_percentage: Decimal
    minimum_nights: int
    start_date: date
    end_date: date
    status: str = "active"


# -----------------------------
# CREATE
# -----------------------------

class DiscountOfferCreate(DiscountOfferBase):
    pass


# -----------------------------
# UPDATE
# -----------------------------

class DiscountOfferUpdate(BaseModel):
    property_id: int | None = None
    offer_name: str | None = None
    offer_type: str | None = None
    discount_percentage: Decimal | None = None
    minimum_nights: int | None = None
    start_date: date | None = None
    end_date: date | None = None
    status: str | None = None


# -----------------------------
# RESPONSE
# -----------------------------

class DiscountOfferResponse(DiscountOfferBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )