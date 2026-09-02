from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    Numeric,
    String,
    Text,
    DateTime,
)

from app.database import Base


class Payout(Base):
    __tablename__ = "payouts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    wallet_id = Column(
        Integer,
        nullable=False
    )

    payout_account_id = Column(
        Integer,
        nullable=False
    )

    amount = Column(
        Numeric(14, 2),
        nullable=False
    )

    currency_id = Column(
        Integer,
        nullable=False
    )

    payout_status = Column(
        String(30),
        default="pending"
    )

    transaction_id = Column(
        String(150),
        nullable=True
    )

    failure_reason = Column(
        Text,
        nullable=True
    )

    processed_at = Column(
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