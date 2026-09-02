from sqlalchemy.orm import Session

from app.models.booking_status_history import (
    BookingStatusHistory
)

from app.schemas.booking_status_history import (
    BookingStatusHistoryCreate,
    BookingStatusHistoryUpdate
)


def get_booking_status_histories(
    db: Session
):
    return db.query(
        BookingStatusHistory
    ).all()


def get_booking_status_history(
    db: Session,
    history_id: int
):
    return (
        db.query(BookingStatusHistory)
        .filter(
            BookingStatusHistory.id == history_id
        )
        .first()
    )


def create_booking_status_history(
    db: Session,
    history_data: BookingStatusHistoryCreate
):
    new_history = BookingStatusHistory(
        **history_data.model_dump()
    )

    db.add(new_history)
    db.commit()
    db.refresh(new_history)

    return new_history


def update_booking_status_history(
    db: Session,
    history_id: int,
    history_data: BookingStatusHistoryUpdate
):
    history = get_booking_status_history(
        db,
        history_id
    )

    if not history:
        return None

    update_data = history_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(history, key, value)

    db.commit()
    db.refresh(history)

    return history


def delete_booking_status_history(
    db: Session,
    history_id: int
):
    history = get_booking_status_history(
        db,
        history_id
    )

    if not history:
        return None

    db.delete(history)
    db.commit()

    return history