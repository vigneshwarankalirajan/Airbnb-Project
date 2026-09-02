from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.property import (
    PropertyCreate,
    PropertyResponse,
    PropertyUpdate,
)

from app.crud.property import (
    get_properties,
    get_property,
    create_property,
    update_property,
    delete_property,
)


router = APIRouter(
    prefix="/properties",
    tags=["Properties"]
)


@router.get(
    "/",
    response_model=list[PropertyResponse]
)
def read_properties(
    db: Session = Depends(get_db)
):
    return get_properties(db)


@router.get(
    "/{property_id}",
    response_model=PropertyResponse
)
def read_property(
    property_id: int,
    db: Session = Depends(get_db)
):
    property = get_property(db, property_id)

    if not property:
        raise HTTPException(
            status_code=404,
            detail="Property not found"
        )

    return property


@router.post(
    "/",
    response_model=PropertyResponse
)
def create_new_property(
    property_data: PropertyCreate,
    db: Session = Depends(get_db)
):
    return create_property(
        db,
        property_data
    )


@router.put(
    "/{property_id}",
    response_model=PropertyResponse
)
def update_existing_property(
    property_id: int,
    property_data: PropertyUpdate,
    db: Session = Depends(get_db)
):
    property = update_property(
        db,
        property_id,
        property_data
    )

    if not property:
        raise HTTPException(
            status_code=404,
            detail="Property not found"
        )

    return property


@router.delete(
    "/{property_id}"
)
def delete_existing_property(
    property_id: int,
    db: Session = Depends(get_db)
):
    property = delete_property(
        db,
        property_id
    )

    if not property:
        raise HTTPException(
            status_code=404,
            detail="Property not found"
        )

    return {
        "message": "Property deleted successfully",
        "id": property_id
    }