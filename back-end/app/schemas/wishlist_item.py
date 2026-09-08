from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class WishlistItemBase(BaseModel):
    wishlist_id: int
    property_id: int


class WishlistItemCreate(WishlistItemBase):
    pass


class WishlistItemResponse(BaseModel):
    id: int
    wishlist_id: int
    property_id: int
    added_at: datetime

    class Config:
        from_attributes = True