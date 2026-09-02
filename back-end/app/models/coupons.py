from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Numeric,
    DateTime
)

from app.database import Base


class Coupon(Base):
    __tablename__ = "coupons"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    code = Column(
        String(50),
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    discount_type = Column(
        String(20),
        nullable=False
    )

    discount_value = Column(
        Numeric(12, 2),
        nullable=False
    )

    minimum_amount = Column(
        Numeric(12, 2),
        nullable=False
    )

    usage_limit = Column(
        Integer,
        nullable=False
    )

    used_count = Column(
        Integer,
        default=0
    )

    valid_from = Column(
        DateTime,
        nullable=False
    )

    valid_until = Column(
        DateTime,
        nullable=False
    )

    status = Column(
        String(20),
        default="active"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )