from datetime import datetime

from pydantic import BaseModel, ConfigDict


class PropertyImageBase(BaseModel):
    property_id: int
    image_url: str
    media_type: str
    display_order: int = 0


class PropertyImageCreate(PropertyImageBase):
    pass


class PropertyImageUpdate(BaseModel):
    property_id: int | None = None
    image_url: str | None = None
    media_type: str | None = None
    display_order: int | None = None


class PropertyImageResponse(PropertyImageBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)