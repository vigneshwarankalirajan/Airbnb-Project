from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.booking_status_history import (
    BookingStatusHistoryCreate,
    BookingStatusHistoryResponse,
    BookingStatusHistoryUpdate,
)

from app.crud.booking_status_history import (
    get_booking_status_histories,
    get_booking_status_history,
    create_booking_status_history,
    update_booking_status_history,
    delete_booking_status_history,
)


router = APIRouter(
    prefix="/booking-status-history",
    tags=["Booking Status History"]
)


# -----------------------------
# GET ALL
# -----------------------------

@router.get(
    "/",
    response_model=list[BookingStatusHistoryResponse]
)
def read_booking_status_histories(
    db: Session = Depends(get_db)
):
    return get_booking_status_histories(db)


# -----------------------------
# GET BY ID
# -----------------------------

@router.get(
    "/{history_id}",
    response_model=BookingStatusHistoryResponse
)
def read_booking_status_history(
    history_id: int,
    db: Session = Depends(get_db)
):
    history = get_booking_status_history(
        db,
        history_id
    )

    if not history:
        raise HTTPException(
            status_code=404,
            detail="Booking status history not found"
        )

    return history


# -----------------------------
# CREATE
# -----------------------------

@router.post(
    "/",
    response_model=BookingStatusHistoryResponse
)
def create_new_booking_status_history(
    history_data: BookingStatusHistoryCreate,
    db: Session = Depends(get_db)
):
    return create_booking_status_history(
        db,
        history_data
    )


# -----------------------------
# UPDATE
# -----------------------------

@router.put(
    "/{history_id}",
    response_model=BookingStatusHistoryResponse
)
def update_existing_booking_status_history(
    history_id: int,
    history_data: BookingStatusHistoryUpdate,
    db: Session = Depends(get_db)
):
    history = update_booking_status_history(
        db,
        history_id,
        history_data
    )

    if not history:
        raise HTTPException(
            status_code=404,
            detail="Booking status history not found"
        )

    return history


# -----------------------------
# DELETE
# -----------------------------

@router.delete(
    "/{history_id}"
)
def delete_existing_booking_status_history(
    history_id: int,
    db: Session = Depends(get_db)
):
    history = delete_booking_status_history(
        db,
        history_id
    )

    if not history:
        raise HTTPException(
            status_code=404,
            detail="Booking status history not found"
        )

    return {
        "message": "Booking status history deleted successfully",
        "id": history_id
    }