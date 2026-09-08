from datetime import datetime
from decimal import Decimal
from typing import Optional

from pydantic import BaseModel, Field, ConfigDict


class ReviewCreate(BaseModel):
    booking_id: int
    property_id: int
    reviewer_id: int
    reviewee_id: int

    rating: Decimal = Field(
        ...,
        ge=1,
        le=5,
        decimal_places=1
    )

    review_text: Optional[str] = None

    review_type: str

    status: str = "active"

    host_response: Optional[str] = None


class ReviewUpdate(BaseModel):
    rating: Optional[Decimal] = Field(
        None,
        ge=1,
        le=5,
        decimal_places=1
    )

    review_text: Optional[str] = None

    review_type: Optional[str] = None

    status: Optional[str] = None

    host_response: Optional[str] = None

    responded_at: Optional[datetime] = None


class ReviewResponse(BaseModel):
    id: int

    booking_id: int
    property_id: int

    reviewer_id: int
    reviewee_id: int

    rating: Decimal

    review_text: Optional[str]

    review_type: str
    status: str

    host_response: Optional[str]

    responded_at: Optional[datetime]

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)