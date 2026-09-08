from sqlalchemy import Column, Integer, String, Text, DateTime, Numeric
from sqlalchemy.sql import func

from app.database import Base


class HostPenalty(Base):
    __tablename__ = "host_penalties"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    host_id = Column(
        Integer,
        nullable=False,
        index=True
    )

    booking_id = Column(
        Integer,
        nullable=True,
        index=True
    )

    dispute_id = Column(
        Integer,
        nullable=True,
        index=True
    )

    penalty_type = Column(
        String(50),
        nullable=False
    )

    reason = Column(
        Text,
        nullable=False
    )

    penalty_amount = Column(
        Numeric(14, 2),
        nullable=False
    )

    currency_id = Column(
        Integer,
        nullable=False
    )

    penalty_status = Column(
        String(30),
        nullable=False,
        default="active"
    )

    severity = Column(
        String,
        nullable=False,
        default="medium"
    )

    admin_notes = Column(
        Text,
        nullable=True
    )

    imposed_by = Column(
        Integer,
        nullable=False
    )

    imposed_at = Column(
        DateTime,
        nullable=False,
        server_default=func.now()
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