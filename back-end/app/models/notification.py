from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Boolean,
    DateTime,
)
from sqlalchemy.sql import func

from app.database import Base


class Notification(Base):

    __tablename__ = "notifications"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        nullable=False
    )

    notification_type = Column(
        String(50),
        nullable=False
    )

    title = Column(
        String(200),
        nullable=False
    )

    message = Column(
        Text,
        nullable=False
    )

    reference_type = Column(
        String(50),
        nullable=True
    )

    reference_id = Column(
        Integer,
        nullable=True
    )

    is_read = Column(
        Boolean,
        default=False,
        nullable=False
    )

    read_at = Column(
        DateTime,
        nullable=True
    )

    status = Column(
        String(20),
        default="sent",
        nullable=False
    )

    created_at = Column(
        DateTime,
        server_default=func.now(),
        nullable=False
    )

    updated_at = Column(
        DateTime,
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )