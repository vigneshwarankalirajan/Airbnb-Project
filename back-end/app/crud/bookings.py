from sqlalchemy.orm import Session

from app.models.bookings import Booking

from app.schemas.bookings import (
    BookingCreate,
    BookingUpdate
)


def get_bookings(db: Session):
    return db.query(Booking).all()


def get_booking(
    db: Session,
    booking_id: int
):
    return (
        db.query(Booking)
        .filter(Booking.id == booking_id)
        .first()
    )


def create_booking(
    db: Session,
    booking_data: BookingCreate
):
    new_booking = Booking(
        **booking_data.model_dump()
    )

    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)

    return new_booking


def update_booking(
    db: Session,
    booking_id: int,
    booking_data: BookingUpdate
):
    booking = get_booking(
        db,
        booking_id
    )

    if not booking:
        return None

    update_data = booking_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(booking, key, value)

    db.commit()
    db.refresh(booking)

    return booking


def delete_booking(
    db: Session,
    booking_id: int
):
    booking = get_booking(
        db,
        booking_id
    )

    if not booking:
        return None

    db.delete(booking)
    db.commit()

    return booking