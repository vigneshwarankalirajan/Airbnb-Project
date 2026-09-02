from datetime import datetime

from sqlalchemy import Column, Integer, Numeric, String, DateTime

from app.database import Base


class HostWallet(Base):
    __tablename__ = "host_wallets"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        nullable=False
    )

    currency_id = Column(
        Integer,
        nullable=False
    )

    available_balance = Column(
        Numeric(14, 2),
        default=0
    )

    pending_balance = Column(
        Numeric(14, 2),
        default=0
    )

    total_earnings = Column(
        Numeric(14, 2),
        default=0
    )

    total_withdrawn = Column(
        Numeric(14, 2),
        default=0
    )

    wallet_status = Column(
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