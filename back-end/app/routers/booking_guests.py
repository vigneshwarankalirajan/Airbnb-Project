from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.booking_guests import (
    BookingGuestCreate,
    BookingGuestResponse,
    BookingGuestUpdate,
)

from app.crud.booking_guests import (
    get_booking_guests,
    get_booking_guest,
    create_booking_guest,
    update_booking_guest,
    delete_booking_guest,
)


router = APIRouter(
    prefix="/booking-guests",
    tags=["Booking Guests"]
)


# -----------------------------
# GET ALL
# -----------------------------

@router.get(
    "/",
    response_model=list[BookingGuestResponse]
)
def read_booking_guests(
    db: Session = Depends(get_db)
):
    return get_booking_guests(db)


# -----------------------------
# GET BY ID
# -----------------------------

@router.get(
    "/{guest_id}",
    response_model=BookingGuestResponse
)
def read_booking_guest(
    guest_id: int,
    db: Session = Depends(get_db)
):
    guest = get_booking_guest(
        db,
        guest_id
    )

    if not guest:
        raise HTTPException(
            status_code=404,
            detail="Booking guest not found"
        )

    return guest


# -----------------------------
# CREATE
# -----------------------------

@router.post(
    "/",
    response_model=BookingGuestResponse
)
def create_new_booking_guest(
    guest_data: BookingGuestCreate,
    db: Session = Depends(get_db)
):
    return create_booking_guest(
        db,
        guest_data
    )


# -----------------------------
# UPDATE
# -----------------------------

@router.put(
    "/{guest_id}",
    response_model=BookingGuestResponse
)
def update_existing_booking_guest(
    guest_id: int,
    guest_data: BookingGuestUpdate,
    db: Session = Depends(get_db)
):
    guest = update_booking_guest(
        db,
        guest_id,
        guest_data
    )

    if not guest:
        raise HTTPException(
            status_code=404,
            detail="Booking guest not found"
        )

    return guest


# -----------------------------
# DELETE
# -----------------------------

@router.delete(
    "/{guest_id}"
)
def delete_existing_booking_guest(
    guest_id: int,
    db: Session = Depends(get_db)
):
    guest = delete_booking_guest(
        db,
        guest_id
    )

    if not guest:
        raise HTTPException(
            status_code=404,
            detail="Booking guest not found"
        )

    return {
        "message": "Booking guest deleted successfully",
        "id": guest_id
    }