from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    Text,
    String,
    DateTime
)

from app.database import Base


class Inquiry(Base):
    __tablename__ = "inquiries"

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

    message = Column(
        Text,
        nullable=False
    )

    response = Column(
        Text,
        nullable=True
    )

    status = Column(
        String(20),
        default="pending"
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