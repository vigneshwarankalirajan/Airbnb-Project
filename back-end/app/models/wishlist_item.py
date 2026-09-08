from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class WishlistItem(Base):
    __tablename__ = "wishlist_items"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    wishlist_id = Column(
        Integer,
        ForeignKey("wishlists.id", ondelete="CASCADE"),
        nullable=False
    )

    property_id = Column(
        Integer,
        ForeignKey("properties.id", ondelete="CASCADE"),
        nullable=False
    )

    added_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    # Relationships
    wishlist = relationship(
        "Wishlist",
        back_populates="items"
    )

    property = relationship(
        "Property"
    )