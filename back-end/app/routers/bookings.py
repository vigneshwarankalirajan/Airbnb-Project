from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.bookings import (
    BookingCreate,
    BookingResponse,
    BookingUpdate,
)

from app.crud.bookings import (
    get_bookings,
    get_booking,
    create_booking,
    update_booking,
    delete_booking,
)


router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"]
)


# -----------------------------
# GET ALL
# -----------------------------

@router.get(
    "/",
    response_model=list[BookingResponse]
)
def read_bookings(
    db: Session = Depends(get_db)
):
    return get_bookings(db)


# -----------------------------
# GET BY ID
# -----------------------------

@router.get(
    "/{booking_id}",
    response_model=BookingResponse
)
def read_booking(
    booking_id: int,
    db: Session = Depends(get_db)
):
    booking = get_booking(
        db,
        booking_id
    )

    if not booking:
        raise HTTPException(
            status_code=404,
            detail="Booking not found"
        )

    return booking


# -----------------------------
# CREATE
# -----------------------------

@router.post(
    "/",
    response_model=BookingResponse
)
def create_new_booking(
    booking_data: BookingCreate,
    db: Session = Depends(get_db)
):
    return create_booking(
        db,
        booking_data
    )


# -----------------------------
# UPDATE
# -----------------------------

@router.put(
    "/{booking_id}",
    response_model=BookingResponse
)
def update_existing_booking(
    booking_id: int,
    booking_data: BookingUpdate,
    db: Session = Depends(get_db)
):
    booking = update_booking(
        db,
        booking_id,
        booking_data
    )

    if not booking:
        raise HTTPException(
            status_code=404,
            detail="Booking not found"
        )

    return booking


# -----------------------------
# DELETE
# -----------------------------

@router.delete(
    "/{booking_id}"
)
def delete_existing_booking(
    booking_id: int,
    db: Session = Depends(get_db)
):
    booking = delete_booking(
        db,
        booking_id
    )

    if not booking:
        raise HTTPException(
            status_code=404,
            detail="Booking not found"
        )

    return {
        "message": "Booking deleted successfully",
        "id": booking_id
    }