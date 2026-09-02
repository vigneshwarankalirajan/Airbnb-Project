from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from sqlalchemy.sql import func

from app.database import Base


class Message(Base):

    __tablename__ = "messages"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    conversation_id = Column(
        Integer,
        nullable=False
    )

    sender_id = Column(
        Integer,
        nullable=False
    )

    message_type = Column(
        String(30),
        nullable=False,
        default="text"
    )

    message_text = Column(
        Text,
        nullable=True
    )

    attachment_url = Column(
        Text,
        nullable=True
    )

    is_read = Column(
        Boolean,
        nullable=False,
        default=False
    )

    read_at = Column(
        DateTime,
        nullable=True
    )

    sent_at = Column(
        DateTime,
        server_default=func.now(),
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