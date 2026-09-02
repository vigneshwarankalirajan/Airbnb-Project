from datetime import datetime

from sqlalchemy import Column, Integer, Date, String, DateTime

from app.database import Base


class PropertyCalendar(Base):
    __tablename__ = "property_calendar"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    property_id = Column(
        Integer,
        nullable=False
    )

    calendar_date = Column(
        Date,
        nullable=False
    )

    status = Column(
        String(20),
        default="available"
    )

    booking_id = Column(
        Integer,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )