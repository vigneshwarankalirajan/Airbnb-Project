from sqlalchemy import (
    Column,
    Integer,
    String,
    Numeric,
    Text,
    DateTime,
)
from sqlalchemy.sql import func

from app.database import Base


class FinanceTransaction(Base):

    __tablename__ = "finance_transactions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    transaction_type = Column(
        String(50),
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

    user_id = Column(
        Integer,
        nullable=False,
        index=True
    )

    currency_id = Column(
        Integer,
        nullable=False,
        index=True
    )

    amount = Column(
        Numeric(14, 2),
        nullable=False
    )

    direction = Column(
        String(20),
        nullable=False
    )

    transaction_status = Column(
        String(30),
        nullable=False,
        default="pending"
    )

    description = Column(
        Text,
        nullable=True
    )

    transaction_date = Column(
        DateTime,
        nullable=False,
        server_default=func.now()
    )

    created_at = Column(
        DateTime,
        nullable=False,
        server_default=func.now()
    )

    updated_at = Column(
        DateTime,
        nullable=False,
        server_default=func.now(),
        onupdate=func.now()
    )