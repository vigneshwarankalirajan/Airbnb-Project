from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    Numeric,
    Date,
    String,
    DateTime
)

from app.database import Base


class Pricing(Base):
    __tablename__ = "pricing"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    property_id = Column(
        Integer,
        nullable=False
    )

    base_price = Column(
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

    tax_percentage = Column(
        Numeric(5, 2),
        nullable=False
    )

    start_date = Column(
        Date,
        nullable=False
    )

    end_date = Column(
        Date,
        nullable=False
    )

    currency = Column(
        String(10),
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )