from datetime import datetime

from sqlalchemy import Column, Integer, Numeric, String, Text, DateTime

from app.database import Base


class Refund(Base):
    __tablename__ = "refunds"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    payment_id = Column(
        Integer,
        nullable=False
    )

    amount = Column(
        Numeric(12, 2),
        nullable=False
    )

    reason = Column(
        Text,
        nullable=True
    )

    refund_status = Column(
        String(30),
        default="pending"
    )

    refund_transaction_id = Column(
        String(150),
        nullable=True
    )

    refunded_at = Column(
        DateTime,
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