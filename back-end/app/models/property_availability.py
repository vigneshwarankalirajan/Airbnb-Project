from sqlalchemy import (
    Column,
    Integer,
    Date,
    Boolean,
    DateTime,
    ForeignKey,
)
from sqlalchemy.sql import func

from app.database import Base


class PropertyAvailability(Base):

    __tablename__ = "property_availability"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    property_id = Column(
        Integer,
        ForeignKey(
            "properties.id",
            ondelete="CASCADE"
        ),
        nullable=False
    )

    available_from = Column(
        Date,
        nullable=False
    )

    available_to = Column(
        Date,
        nullable=False
    )

    is_available = Column(
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