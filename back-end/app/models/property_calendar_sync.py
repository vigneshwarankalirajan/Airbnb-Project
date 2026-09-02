from datetime import datetime

from sqlalchemy import Column, Integer, String, Text, DateTime

from app.database import Base


class PropertyCalendarSync(Base):
    __tablename__ = "property_calendar_sync"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    property_id = Column(
        Integer,
        nullable=False
    )

    provider = Column(
        String(50),
        nullable=False
    )

    calendar_url = Column(
        Text,
        nullable=False
    )

    sync_status = Column(
        String(20),
        default="pending"
    )

    last_synced_at = Column(
        DateTime,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )