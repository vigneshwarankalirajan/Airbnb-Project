from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.property_calendar import (
    PropertyCalendarCreate,
    PropertyCalendarResponse,
    PropertyCalendarUpdate,
)

from app.crud.property_calendar import (
    get_property_calendars,
    get_property_calendar,
    create_property_calendar,
    update_property_calendar,
    delete_property_calendar,
)


router = APIRouter(
    prefix="/property-calendar",
    tags=["Property Calendar"]
)


# -----------------------------
# GET ALL
# -----------------------------

@router.get(
    "/",
    response_model=list[PropertyCalendarResponse]
)
def read_property_calendars(
    db: Session = Depends(get_db)
):
    return get_property_calendars(db)


# -----------------------------
# GET BY ID
# -----------------------------

@router.get(
    "/{calendar_id}",
    response_model=PropertyCalendarResponse
)
def read_property_calendar(
    calendar_id: int,
    db: Session = Depends(get_db)
):
    calendar = get_property_calendar(
        db,
        calendar_id
    )

    if not calendar:
        raise HTTPException(
            status_code=404,
            detail="Property calendar not found"
        )

    return calendar


# -----------------------------
# CREATE
# -----------------------------

@router.post(
    "/",
    response_model=PropertyCalendarResponse
)
def create_new_property_calendar(
    calendar_data: PropertyCalendarCreate,
    db: Session = Depends(get_db)
):
    return create_property_calendar(
        db,
        calendar_data
    )


# -----------------------------
# UPDATE
# -----------------------------

@router.put(
    "/{calendar_id}",
    response_model=PropertyCalendarResponse
)
def update_existing_property_calendar(
    calendar_id: int,
    calendar_data: PropertyCalendarUpdate,
    db: Session = Depends(get_db)
):
    calendar = update_property_calendar(
        db,
        calendar_id,
        calendar_data
    )

    if not calendar:
        raise HTTPException(
            status_code=404,
            detail="Property calendar not found"
        )

    return calendar


# -----------------------------
# DELETE
# -----------------------------

@router.delete(
    "/{calendar_id}"
)
def delete_existing_property_calendar(
    calendar_id: int,
    db: Session = Depends(get_db)
):
    calendar = delete_property_calendar(
        db,
        calendar_id
    )

    if not calendar:
        raise HTTPException(
            status_code=404,
            detail="Property calendar not found"
        )

    return {
        "message": "Property calendar deleted successfully",
        "id": calendar_id
    }