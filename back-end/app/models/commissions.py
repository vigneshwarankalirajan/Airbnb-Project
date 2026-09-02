from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Numeric,
    DateTime
)

from app.database import Base


class Commission(Base):
    __tablename__ = "commissions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    property_id = Column(
        Integer,
        nullable=False
    )

    commission_type = Column(
        String(30),
        nullable=False
    )

    commission_percentage = Column(
        Numeric(5, 2),
        nullable=False
    )

    guest_service_fee = Column(
        Numeric(12, 2),
        nullable=False
    )

    host_commission = Column(
        Numeric(12, 2),
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )