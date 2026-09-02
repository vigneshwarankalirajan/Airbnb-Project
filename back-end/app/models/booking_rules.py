from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    Boolean,
    Time,
    DateTime
)

from app.database import Base


class BookingRule(Base):
    __tablename__ = "booking_rules"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    property_id = Column(
        Integer,
        nullable=False
    )

    minimum_stay = Column(
        Integer,
        nullable=False
    )

    maximum_stay = Column(
        Integer,
        nullable=False
    )

    advance_notice_hours = Column(
        Integer,
        nullable=False
    )

    same_day_booking = Column(
        Boolean,
        default=False
    )

    check_in_start = Column(
        Time,
        nullable=False
    )

    check_in_end = Column(
        Time,
        nullable=False
    )

    check_out_time = Column(
        Time,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )