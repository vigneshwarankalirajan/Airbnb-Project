from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class WishlistCreate(BaseModel):
    user_id: int
    name: str
    description: Optional[str] = None
    is_private: bool = False


class WishlistUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    is_private: Optional[bool] = None


class WishlistResponse(BaseModel):
    id: int
    user_id: int
    name: str
    description: Optional[str] = None
    is_private: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True