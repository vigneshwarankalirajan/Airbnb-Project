from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class BookingReceiptBase(BaseModel):
    booking_id: int
    receipt_number: str
    subtotal: Decimal
    cleaning_fee: Decimal
    service_fee: Decimal
    tax_amount: Decimal
    discount_amount: Decimal
    total_amount: Decimal
    currency: str
    payment_status: str = "pending"
    issued_at: datetime | None = None


class BookingReceiptCreate(BookingReceiptBase):
    pass


class BookingReceiptUpdate(BaseModel):
    booking_id: int | None = None
    receipt_number: str | None = None
    subtotal: Decimal | None = None
    cleaning_fee: Decimal | None = None
    service_fee: Decimal | None = None
    tax_amount: Decimal | None = None
    discount_amount: Decimal | None = None
    total_amount: Decimal | None = None
    currency: str | None = None
    payment_status: str | None = None
    issued_at: datetime | None = None


class BookingReceiptResponse(BookingReceiptBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )