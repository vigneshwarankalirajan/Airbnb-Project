from sqlalchemy import Column, Integer

from app.database import Base


class PropertyAmenity(Base):
    __tablename__ = "property_amenities"

    id = Column(Integer, primary_key=True, index=True)
    property_id = Column(Integer, nullable=False)
    amenity_id = Column(Integer, nullable=False)