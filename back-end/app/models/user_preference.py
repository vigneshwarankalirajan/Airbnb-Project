from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from app.database import Base


class UserPreference(Base):
    __tablename__ = "user_preferences"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    language = Column(
        String,
        nullable=True
    )

    currency = Column(
        String,
        nullable=True
    )

    theme = Column(
        String,
        nullable=True
    )

    email_notifications = Column(
        Boolean,
        nullable=True
    )

    sms_notifications = Column(
        Boolean,
        nullable=True
    )

    push_notifications = Column(
        Boolean,
        nullable=True
    )

    created_at = Column(
        DateTime,
        nullable=True
    )

    updated_at = Column(
        DateTime,
        nullable=True
    )