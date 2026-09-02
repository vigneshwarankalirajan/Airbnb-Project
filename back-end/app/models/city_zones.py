from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime

from app.database import Base


class CityZone(Base):
    __tablename__ = "city_zones"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    zone_name = Column(
        String(100),
        nullable=False
    )

    city = Column(
        String(100),
        nullable=False
    )

    state = Column(
        String(100),
        nullable=False
    )

    country = Column(
        String(100),
        nullable=False
    )

    status = Column(
        String(20),
        default="active"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )