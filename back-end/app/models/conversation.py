from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.database import Base


class Conversation(Base):

    __tablename__ = "conversations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    booking_id = Column(
        Integer,
        nullable=True
    )

    created_by = Column(
        Integer,
        nullable=False
    )

    conversation_type = Column(
        String(30),
        nullable=False
    )

    subject = Column(
        String(200),
        nullable=True
    )

    status = Column(
        String(20),
        nullable=False,
        default="active"
    )

    last_message_at = Column(
        DateTime,
        nullable=True
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