from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Numeric,
    DateTime
)

from app.database import Base


class BookingReceipt(Base):
    __tablename__ = "booking_receipts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    booking_id = Column(
        Integer,
        nullable=False
    )

    receipt_number = Column(
        String(50),
        nullable=False
    )

    subtotal = Column(
        Numeric(12, 2),
        nullable=False
    )

    cleaning_fee = Column(
        Numeric(12, 2),
        nullable=False
    )

    service_fee = Column(
        Numeric(12, 2),
        nullable=False
    )

    tax_amount = Column(
        Numeric(12, 2),
        nullable=False
    )

    discount_amount = Column(
        Numeric(12, 2),
        nullable=False
    )

    total_amount = Column(
        Numeric(12, 2),
        nullable=False
    )

    currency = Column(
        String(10),
        nullable=False
    )

    payment_status = Column(
        String(20),
        default="pending"
    )

    issued_at = Column(
        DateTime,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )