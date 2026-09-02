from datetime import datetime

from sqlalchemy import Column, Integer, String, Text, DateTime
from app.database import Base


class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True)

    host_id = Column(Integer, nullable=False)
    category_id = Column(Integer, nullable=False)

    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)

    property_type = Column(String(50), nullable=True)

    address = Column(Text, nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    country = Column(String(100), nullable=True)

    max_guests = Column(Integer, nullable=True)
    bedrooms = Column(Integer, nullable=True)
    bathrooms = Column(Integer, nullable=True)

    status = Column(String(20), default="draft")

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )