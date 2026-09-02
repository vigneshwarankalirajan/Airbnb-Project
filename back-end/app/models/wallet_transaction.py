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


class WalletTransaction(Base):
    __tablename__ = "wallet_transactions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    wallet_id = Column(
        Integer,
        nullable=False
    )

    transaction_type = Column(
        String(30),
        nullable=False
    )

    amount = Column(
        Numeric(14, 2),
        nullable=False
    )

    balance_before = Column(
        Numeric(14, 2),
        nullable=False
    )

    balance_after = Column(
        Numeric(14, 2),
        nullable=False
    )

    reference_type = Column(
        String(50),
        nullable=True
    )

    reference_id = Column(
        Integer,
        nullable=True
    )

    description = Column(
        Text,
        nullable=True
    )

    transaction_status = Column(
        String(20),
        default="pending"
    )

    transaction_date = Column(
        DateTime,
        default=datetime.utcnow
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )