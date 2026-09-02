from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.crud.property_availability import (
    create_availability,
    get_all_availability,
    get_availability_by_id,
    get_availability_by_property,
    update_availability,
    delete_availability,
)

from app.schemas.property_availability import (
    PropertyAvailabilityCreate,
    PropertyAvailabilityUpdate,
    PropertyAvailabilityResponse,
)


router = APIRouter(
    prefix="/property-availability",
    tags=["Property Availability"]
)


# ----------------------------------------
# CREATE
# ----------------------------------------

@router.post(
    "/",
    response_model=PropertyAvailabilityResponse
)
def create(
    data: PropertyAvailabilityCreate,
    db: Session = Depends(get_db)
):

    if data.available_to <= data.available_from:

        raise HTTPException(
            status_code=400,
            detail="available_to must be after available_from"
        )

    return create_availability(
        db,
        data
    )


# ----------------------------------------
# GET ALL
# ----------------------------------------

@router.get(
    "/",
    response_model=list[PropertyAvailabilityResponse]
)
def get_all(
    db: Session = Depends(get_db)
):

    return get_all_availability(db)


# ----------------------------------------
# GET BY PROPERTY
# ----------------------------------------

@router.get(
    "/property/{property_id}",
    response_model=list[PropertyAvailabilityResponse]
)
def get_by_property(
    property_id: int,
    db: Session = Depends(get_db)
):

    return get_availability_by_property(
        db,
        property_id
    )


# ----------------------------------------
# GET BY ID
# ----------------------------------------

@router.get(
    "/{availability_id}",
    response_model=PropertyAvailabilityResponse
)
def get_one(
    availability_id: int,
    db: Session = Depends(get_db)
):

    availability = get_availability_by_id(
        db,
        availability_id
    )

    if not availability:

        raise HTTPException(
            status_code=404,
            detail="Availability not found"
        )

    return availability


# ----------------------------------------
# UPDATE
# ----------------------------------------

@router.put(
    "/{availability_id}",
    response_model=PropertyAvailabilityResponse
)
def update(
    availability_id: int,
    data: PropertyAvailabilityUpdate,
    db: Session = Depends(get_db)
):

    if data.available_to <= data.available_from:

        raise HTTPException(
            status_code=400,
            detail="available_to must be after available_from"
        )

    availability = update_availability(
        db,
        availability_id,
        data
    )

    if not availability:

        raise HTTPException(
            status_code=404,
            detail="Availability not found"
        )

    return availability


# ----------------------------------------
# DELETE
# ----------------------------------------

@router.delete(
    "/{availability_id}"
)
def delete(
    availability_id: int,
    db: Session = Depends(get_db)
):

    availability = delete_availability(
        db,
        availability_id
    )

    if not availability:

        raise HTTPException(
            status_code=404,
            detail="Availability not found"
        )

    return {
        "message": "Availability deleted successfully",
        "id": availability_id
    }