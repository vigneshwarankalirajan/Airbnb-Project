from datetime import date, datetime

from pydantic import BaseModel


class PropertyAvailabilityCreate(BaseModel):

    property_id: int
    available_from: date
    available_to: date
    is_available: bool = True


class PropertyAvailabilityUpdate(BaseModel):

    property_id: int
    available_from: date
    available_to: date
    is_available: bool


class PropertyAvailabilityResponse(BaseModel):

    id: int
    property_id: int
    available_from: date
    available_to: date
    is_available: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True