from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
)

from app.database import Base


class PayoutAccount(Base):
    __tablename__ = "payout_accounts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        nullable=False
    )

    account_type = Column(
        String(30),
        nullable=False
    )

    account_holder_name = Column(
        String(150),
        nullable=False
    )

    bank_name = Column(
        String(150),
        nullable=True
    )

    account_number_last_four = Column(
        String(4),
        nullable=True
    )

    routing_number = Column(
        String(50),
        nullable=True
    )

    upi_id = Column(
        String(100),
        nullable=True
    )

    is_default = Column(
        Boolean,
        default=False
    )

    status = Column(
        String(20),
        default="active"
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