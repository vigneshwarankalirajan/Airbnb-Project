from datetime import datetime

from sqlalchemy import Column, Integer, Numeric, String, Text, DateTime

from app.database import Base


class Payment(Base):
    __tablename__ = "payments"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    booking_id = Column(
        Integer,
        nullable=False
    )

    currency_id = Column(
        Integer,
        nullable=False
    )

    amount = Column(
        Numeric(12, 2),
        nullable=False
    )

    payment_method = Column(
        String(50),
        nullable=False
    )

    transaction_id = Column(
        String(100),
        nullable=True
    )

    payment_status = Column(
        String(30),
        default="pending"
    )

    paid_at = Column(
        DateTime,
        nullable=True
    )

    failure_reason = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )