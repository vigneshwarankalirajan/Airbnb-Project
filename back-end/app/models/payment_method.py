from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
)

from app.database import Base


class PaymentMethod(Base):
    __tablename__ = "payment_methods"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        nullable=False
    )

    method_type = Column(
        String(50),
        nullable=False
    )

    provider = Column(
        String(100),
        nullable=False
    )

    account_holder_name = Column(
        String(150),
        nullable=False
    )

    last_four_digits = Column(
        String(4),
        nullable=True
    )

    expiry_month = Column(
        Integer,
        nullable=True
    )

    expiry_year = Column(
        Integer,
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