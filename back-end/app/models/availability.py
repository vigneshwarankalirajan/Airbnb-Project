from datetime import datetime

from sqlalchemy import Column, Integer, Date, String, DateTime

from app.database import Base


class Availability(Base):
    __tablename__ = "availability"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    property_id = Column(
        Integer,
        nullable=False
    )

    available_date = Column(
        Date,
        nullable=False
    )

    status = Column(
        String(20),
        default="available"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )