from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.property_amenity import (
    PropertyAmenityCreate,
    PropertyAmenityUpdate,
    PropertyAmenityResponse
)
from app.crud import property_amenity as crud


router = APIRouter(
    prefix="/property-amenities",
    tags=["Property Amenities"]
)


@router.get("/", response_model=list[PropertyAmenityResponse])
def read_property_amenities(
    db: Session = Depends(get_db)
):
    return crud.get_property_amenities(db)


@router.post("/", response_model=PropertyAmenityResponse)
def create_new_property_amenity(
    property_amenity: PropertyAmenityCreate,
    db: Session = Depends(get_db)
):
    return crud.create_property_amenity(
        db,
        property_amenity
    )


@router.get(
    "/{property_amenity_id}",
    response_model=PropertyAmenityResponse
)
def read_property_amenity(
    property_amenity_id: int,
    db: Session = Depends(get_db)
):
    db_property_amenity = crud.get_property_amenity(
        db,
        property_amenity_id
    )

    if not db_property_amenity:
        raise HTTPException(
            status_code=404,
            detail="Property amenity not found"
        )

    return db_property_amenity


@router.put(
    "/{property_amenity_id}",
    response_model=PropertyAmenityResponse
)
def update_existing_property_amenity(
    property_amenity_id: int,
    property_amenity: PropertyAmenityUpdate,
    db: Session = Depends(get_db)
):
    db_property_amenity = crud.update_property_amenity(
        db,
        property_amenity_id,
        property_amenity
    )

    if not db_property_amenity:
        raise HTTPException(
            status_code=404,
            detail="Property amenity not found"
        )

    return db_property_amenity


@router.delete("/{property_amenity_id}")
def delete_existing_property_amenity(
    property_amenity_id: int,
    db: Session = Depends(get_db)
):
    db_property_amenity = crud.delete_property_amenity(
        db,
        property_amenity_id
    )

    if not db_property_amenity:
        raise HTTPException(
            status_code=404,
            detail="Property amenity not found"
        )

    return {
        "message": "Property amenity deleted successfully",
        "id": property_amenity_id
    }