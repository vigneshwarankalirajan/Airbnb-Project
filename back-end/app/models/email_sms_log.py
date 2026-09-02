from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.database import Base


class EmailSmsLog(Base):
    __tablename__ = "email_sms_logs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        nullable=False,
        index=True
    )

    channel = Column(
        String(20),
        nullable=False
    )

    recipient = Column(
        String(255),
        nullable=False
    )

    subject = Column(
        String(255),
        nullable=True
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

    delivery_status = Column(
        String(50),
        nullable=False,
        default="pending"
    )

    provider = Column(
        String(100),
        nullable=True
    )

    provider_message_id = Column(
        String(150),
        nullable=True
    )

    failure_reason = Column(
        Text,
        nullable=True
    )

    sent_at = Column(
        DateTime,
        nullable=True
    )

    delivered_at = Column(
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