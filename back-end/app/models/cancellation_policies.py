from datetime import datetime

from sqlalchemy import Column, Integer, String, Text, DateTime

from app.database import Base


class CancellationPolicy(Base):
    __tablename__ = "cancellation_policies"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(50),
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    refund_percentage = Column(
        Integer,
        nullable=False
    )

    cancellation_days = Column(
        Integer,
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