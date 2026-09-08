from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.database import Base


class UserReport(Base):
    __tablename__ = "user_reports"

    id = Column(Integer, primary_key=True, index=True)

    reporter_id = Column(Integer, nullable=False, index=True)
    reported_user_id = Column(Integer, nullable=False, index=True)

    booking_id = Column(Integer, nullable=True, index=True)

    reason = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)

    report_status = Column(
        String(30),
        nullable=False,
        default="pending"
    )

    priority = Column(
        String(20),
        nullable=False,
        default="medium"
    )

    admin_notes = Column(Text, nullable=True)

    resolved_by = Column(Integer, nullable=True)

    resolved_at = Column(DateTime, nullable=True)

    created_at = Column(
        DateTime,
        nullable=False,
        server_default=func.now()
    )

    updated_at = Column(
        DateTime,
        nullable=False,
        server_default=func.now(),
        onupdate=func.now()
    )