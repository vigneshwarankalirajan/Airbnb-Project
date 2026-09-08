from sqlalchemy import (
    Column,
    Integer,
    Text,
    String,
    Numeric,
    DateTime,
)
from sqlalchemy.sql import func

from app.database import Base


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)

    booking_id = Column(Integer, nullable=False)
    property_id = Column(Integer, nullable=False)

    reviewer_id = Column(Integer, nullable=False)
    reviewee_id = Column(Integer, nullable=False)

    rating = Column(Numeric(2, 1), nullable=False)

    review_text = Column(Text, nullable=True)

    review_type = Column(String(30), nullable=False)

    status = Column(String(20), nullable=False, default="active")

    host_response = Column(Text, nullable=True)

    responded_at = Column(DateTime, nullable=True)

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