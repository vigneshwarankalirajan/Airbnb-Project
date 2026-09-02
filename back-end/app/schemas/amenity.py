from datetime import datetime
from pydantic import BaseModel, ConfigDict


class AmenityBase(BaseModel):
    name: str
    description: str | None = None


class AmenityCreate(AmenityBase):
    pass


class AmenityUpdate(AmenityBase):
    pass


class AmenityResponse(AmenityBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)