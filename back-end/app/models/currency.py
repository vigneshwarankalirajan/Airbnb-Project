from sqlalchemy import (
    Column,
    Integer,
    String,
    Numeric,
    Boolean,
    DateTime
)

from datetime import datetime

from app.database import Base


class Currency(Base):

    __tablename__ = "currencies"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    code = Column(
        String(10),
        nullable=False,
        unique=True,
        index=True
    )

    name = Column(
        String(100),
        nullable=False
    )

    symbol = Column(
        String(10),
        nullable=False
    )

    exchange_rate = Column(
        Numeric(12, 6),
        nullable=False
    )

    is_base_currency = Column(
        Boolean,
        default=False,
        nullable=False
    )

    status = Column(
        String(20),
        default="active",
        nullable=False
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