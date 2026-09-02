from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Numeric,
    Date,
    DateTime
)

from app.database import Base


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    guest_id = Column(
        Integer,
        nullable=False
    )

    host_id = Column(
        Integer,
        nullable=False
    )

    property_id = Column(
        Integer,
        nullable=False
    )

    check_in = Column(
        Date,
        nullable=False
    )

    check_out = Column(
        Date,
        nullable=False
    )

    guest_count = Column(
        Integer,
        nullable=False
    )

    booking_status = Column(
        String(20),
        default="pending"
    )

    total_amount = Column(
        Numeric(12, 2),
        nullable=False
    )

    currency = Column(
        String(10),
        nullable=False
    )

    booking_method = Column(
        String(30),
        nullable=False
    )

    special_request = Column(
        Text,
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