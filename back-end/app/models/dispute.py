from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.database import Base


class Dispute(Base):
    __tablename__ = "disputes"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    booking_id = Column(
        Integer,
        nullable=True,
        index=True
    )

    raised_by = Column(
        Integer,
        nullable=False,
        index=True
    )

    against_user_id = Column(
        Integer,
        nullable=False,
        index=True
    )

    dispute_type = Column(
        String(50),
        nullable=False
    )

    subject = Column(
        String(200),
        nullable=False
    )

    description = Column(
        Text,
        nullable=False
    )

    dispute_status = Column(
        String(30),
        nullable=False,
        default="open"
    )

    priority = Column(
        String(20),
        nullable=False,
        default="medium"
    )

    resolution = Column(
        Text,
        nullable=True
    )

    resolved_by = Column(
        Integer,
        nullable=True
    )

    resolved_at = Column(
        DateTime,
        nullable=True
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