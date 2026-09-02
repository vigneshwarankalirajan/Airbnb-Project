from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.database import Base


class ListingStatusHistory(Base):
    __tablename__ = "listing_status_history"

    id = Column(Integer, primary_key=True, index=True)

    property_id = Column(Integer, nullable=False)

    old_status = Column(String(20), nullable=False)

    new_status = Column(String(20), nullable=False)

    changed_by = Column(Integer, nullable=False)

    reason = Column(Text, nullable=True)

    created_at = Column(
        DateTime,
        server_default=func.now(),
        nullable=False
    )