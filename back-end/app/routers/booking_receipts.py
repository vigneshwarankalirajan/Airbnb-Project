from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.booking_receipts import (
    BookingReceiptCreate,
    BookingReceiptResponse,
    BookingReceiptUpdate,
)

from app.crud.booking_receipts import (
    get_booking_receipts,
    get_booking_receipt,
    create_booking_receipt,
    update_booking_receipt,
    delete_booking_receipt,
)


router = APIRouter(
    prefix="/booking-receipts",
    tags=["Booking Receipts"]
)


@router.get(
    "/",
    response_model=list[BookingReceiptResponse]
)
def read_booking_receipts(
    db: Session = Depends(get_db)
):
    return get_booking_receipts(db)


@router.get(
    "/{receipt_id}",
    response_model=BookingReceiptResponse
)
def read_booking_receipt(
    receipt_id: int,
    db: Session = Depends(get_db)
):
    receipt = get_booking_receipt(
        db,
        receipt_id
    )

    if not receipt:
        raise HTTPException(
            status_code=404,
            detail="Booking receipt not found"
        )

    return receipt


@router.post(
    "/",
    response_model=BookingReceiptResponse
)
def create_new_booking_receipt(
    receipt_data: BookingReceiptCreate,
    db: Session = Depends(get_db)
):
    return create_booking_receipt(
        db,
        receipt_data
    )


@router.put(
    "/{receipt_id}",
    response_model=BookingReceiptResponse
)
def update_existing_booking_receipt(
    receipt_id: int,
    receipt_data: BookingReceiptUpdate,
    db: Session = Depends(get_db)
):
    receipt = update_booking_receipt(
        db,
        receipt_id,
        receipt_data
    )

    if not receipt:
        raise HTTPException(
            status_code=404,
            detail="Booking receipt not found"
        )

    return receipt


@router.delete(
    "/{receipt_id}"
)
def delete_existing_booking_receipt(
    receipt_id: int,
    db: Session = Depends(get_db)
):
    receipt = delete_booking_receipt(
        db,
        receipt_id
    )

    if not receipt:
        raise HTTPException(
            status_code=404,
            detail="Booking receipt not found"
        )

    return {
        "message": "Booking receipt deleted successfully",
        "id": receipt_id
    }