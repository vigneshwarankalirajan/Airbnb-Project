from sqlalchemy.orm import Session

from app.models.listing_status_history import ListingStatusHistory
from app.schemas.listing_status_history import (
    ListingStatusHistoryCreate,
    ListingStatusHistoryUpdate
)


def get_listing_status_histories(db: Session):
    return db.query(ListingStatusHistory).all()


def get_listing_status_history(
    db: Session,
    listing_status_history_id: int
):
    return (
        db.query(ListingStatusHistory)
        .filter(ListingStatusHistory.id == listing_status_history_id)
        .first()
    )


def create_listing_status_history(
    db: Session,
    history: ListingStatusHistoryCreate
):
    db_history = ListingStatusHistory(
        property_id=history.property_id,
        old_status=history.old_status,
        new_status=history.new_status,
        changed_by=history.changed_by,
        reason=history.reason
    )

    db.add(db_history)
    db.commit()
    db.refresh(db_history)

    return db_history


def update_listing_status_history(
    db: Session,
    listing_status_history_id: int,
    history: ListingStatusHistoryUpdate
):
    db_history = get_listing_status_history(
        db,
        listing_status_history_id
    )

    if not db_history:
        return None

    db_history.property_id = history.property_id
    db_history.old_status = history.old_status
    db_history.new_status = history.new_status
    db_history.changed_by = history.changed_by
    db_history.reason = history.reason

    db.commit()
    db.refresh(db_history)

    return db_history


def delete_listing_status_history(
    db: Session,
    listing_status_history_id: int
):
    db_history = get_listing_status_history(
        db,
        listing_status_history_id
    )

    if not db_history:
        return None

    db.delete(db_history)
    db.commit()

    return db_history