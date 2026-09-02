from pydantic import BaseModel


class PropertyAmenityCreate(BaseModel):
    property_id: int
    amenity_id: int


class PropertyAmenityUpdate(BaseModel):
    property_id: int
    amenity_id: int


class PropertyAmenityResponse(BaseModel):
    id: int
    property_id: int
    amenity_id: int

    class Config:
        from_attributes = True