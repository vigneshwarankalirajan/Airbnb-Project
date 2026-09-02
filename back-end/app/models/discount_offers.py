from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Numeric,
    Date,
    DateTime
)

from app.database import Base


class DiscountOffer(Base):
    __tablename__ = "discount_offers"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    property_id = Column(
        Integer,
        nullable=False
    )

    offer_name = Column(
        String(100),
        nullable=False
    )

    offer_type = Column(
        String(50),
        nullable=False
    )

    discount_percentage = Column(
        Numeric(5, 2),
        nullable=False
    )

    minimum_nights = Column(
        Integer,
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

    status = Column(
        String(20),
        default="active"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )