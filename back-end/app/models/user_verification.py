from datetime import datetime

from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey

from app.database import Base


class UserVerification(Base):
    __tablename__ = "user_verifications"

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

    document_type = Column(
        String,
        nullable=False
    )

    document_number = Column(
        String,
        nullable=False
    )

    document_url = Column(
        Text,
        nullable=True
    )

    verification_status = Column(
        String,
        nullable=False
    )

    reviewed_by = Column(
        Integer,
        nullable=True
    )

    reviewed_at = Column(
        DateTime,
        nullable=True
    )

    created_at = Column(
        DateTime,
        nullable=False
    )