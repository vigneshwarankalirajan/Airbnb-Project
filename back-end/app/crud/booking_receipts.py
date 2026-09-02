from sqlalchemy.orm import Session

from app.models.booking_receipts import BookingReceipt

from app.schemas.booking_receipts import (
    BookingReceiptCreate,
    BookingReceiptUpdate
)


def get_booking_receipts(db: Session):
    return db.query(BookingReceipt).all()


def get_booking_receipt(
    db: Session,
    receipt_id: int
):
    return (
        db.query(BookingReceipt)
        .filter(BookingReceipt.id == receipt_id)
        .first()
    )


def create_booking_receipt(
    db: Session,
    receipt_data: BookingReceiptCreate
):
    new_receipt = BookingReceipt(
        **receipt_data.model_dump()
    )

    db.add(new_receipt)
    db.commit()
    db.refresh(new_receipt)

    return new_receipt


def update_booking_receipt(
    db: Session,
    receipt_id: int,
    receipt_data: BookingReceiptUpdate
):
    receipt = get_booking_receipt(
        db,
        receipt_id
    )

    if not receipt:
        return None

    update_data = receipt_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(receipt, key, value)

    db.commit()
    db.refresh(receipt)

    return receipt


def delete_booking_receipt(
    db: Session,
    receipt_id: int
):
    receipt = get_booking_receipt(
        db,
        receipt_id
    )

    if not receipt:
        return None

    db.delete(receipt)
    db.commit()

    return receipt