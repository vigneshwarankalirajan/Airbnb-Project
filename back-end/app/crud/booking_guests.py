from sqlalchemy.orm import Session

from app.models.booking_guests import BookingGuest

from app.schemas.booking_guests import (
    BookingGuestCreate,
    BookingGuestUpdate
)


def get_booking_guests(db: Session):
    return db.query(BookingGuest).all()


def get_booking_guest(
    db: Session,
    guest_id: int
):
    return (
        db.query(BookingGuest)
        .filter(BookingGuest.id == guest_id)
        .first()
    )


def create_booking_guest(
    db: Session,
    guest_data: BookingGuestCreate
):
    new_guest = BookingGuest(
        **guest_data.model_dump()
    )

    db.add(new_guest)
    db.commit()
    db.refresh(new_guest)

    return new_guest


def update_booking_guest(
    db: Session,
    guest_id: int,
    guest_data: BookingGuestUpdate
):
    guest = get_booking_guest(
        db,
        guest_id
    )

    if not guest:
        return None

    update_data = guest_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(guest, key, value)

    db.commit()
    db.refresh(guest)

    return guest


def delete_booking_guest(
    db: Session,
    guest_id: int
):
    guest = get_booking_guest(
        db,
        guest_id
    )

    if not guest:
        return None

    db.delete(guest)
    db.commit()

    return guest