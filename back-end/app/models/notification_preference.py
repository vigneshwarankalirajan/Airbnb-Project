from sqlalchemy import Column, Integer, Boolean, DateTime
from sqlalchemy.sql import func

from app.database import Base


class NotificationPreference(Base):
    __tablename__ = "notification_preferences"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, nullable=False, unique=True, index=True)

    booking_notifications = Column(
        Boolean,
        nullable=False,
        default=True
    )

    payment_notifications = Column(
        Boolean,
        nullable=False,
        default=True
    )

    message_notifications = Column(
        Boolean,
        nullable=False,
        default=True
    )

    promotional_notifications = Column(
        Boolean,
        nullable=False,
        default=False
    )

    email_notifications = Column(
        Boolean,
        nullable=False,
        default=True
    )

    sms_notifications = Column(
        Boolean,
        nullable=False,
        default=True
    )

    push_notifications = Column(
        Boolean,
        nullable=False,
        default=True
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