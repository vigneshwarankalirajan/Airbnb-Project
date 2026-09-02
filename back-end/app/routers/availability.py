from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.availability import (
    AvailabilityCreate,
    AvailabilityResponse,
    AvailabilityUpdate,
)

from app.crud.availability import (
    get_availabilities,
    get_availability,
    create_availability,
    update_availability,
    delete_availability,
)


router = APIRouter(
    prefix="/availability",
    tags=["Availability"]
)


# -----------------------------
# GET ALL
# -----------------------------

@router.get(
    "/",
    response_model=list[AvailabilityResponse]
)
def read_availabilities(
    db: Session = Depends(get_db)
):
    return get_availabilities(db)


# -----------------------------
# GET BY ID
# -----------------------------

@router.get(
    "/{availability_id}",
    response_model=AvailabilityResponse
)
def read_availability(
    availability_id: int,
    db: Session = Depends(get_db)
):
    availability = get_availability(
        db,
        availability_id
    )

    if not availability:
        raise HTTPException(
            status_code=404,
            detail="Availability not found"
        )

    return availability


# -----------------------------
# CREATE
# -----------------------------

@router.post(
    "/",
    response_model=AvailabilityResponse
)
def create_new_availability(
    availability_data: AvailabilityCreate,
    db: Session = Depends(get_db)
):
    return create_availability(
        db,
        availability_data
    )


# -----------------------------
# UPDATE
# -----------------------------

@router.put(
    "/{availability_id}",
    response_model=AvailabilityResponse
)
def update_existing_availability(
    availability_id: int,
    availability_data: AvailabilityUpdate,
    db: Session = Depends(get_db)
):
    availability = update_availability(
        db,
        availability_id,
        availability_data
    )

    if not availability:
        raise HTTPException(
            status_code=404,
            detail="Availability not found"
        )

    return availability


# -----------------------------
# DELETE
# -----------------------------

@router.delete(
    "/{availability_id}"
)
def delete_existing_availability(
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