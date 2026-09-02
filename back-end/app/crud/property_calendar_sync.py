from sqlalchemy.orm import Session

from app.models.property_calendar_sync import (
    PropertyCalendarSync
)

from app.schemas.property_calendar_sync import (
    PropertyCalendarSyncCreate,
    PropertyCalendarSyncUpdate
)


def get_property_calendar_syncs(db: Session):
    return db.query(PropertyCalendarSync).all()


def get_property_calendar_sync(
    db: Session,
    sync_id: int
):
    return (
        db.query(PropertyCalendarSync)
        .filter(PropertyCalendarSync.id == sync_id)
        .first()
    )


def create_property_calendar_sync(
    db: Session,
    sync_data: PropertyCalendarSyncCreate
):
    new_sync = PropertyCalendarSync(
        **sync_data.model_dump()
    )

    db.add(new_sync)
    db.commit()
    db.refresh(new_sync)

    return new_sync


def update_property_calendar_sync(
    db: Session,
    sync_id: int,
    sync_data: PropertyCalendarSyncUpdate
):
    sync = get_property_calendar_sync(
        db,
        sync_id
    )

    if not sync:
        return None

    update_data = sync_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(sync, key, value)

    db.commit()
    db.refresh(sync)

    return sync


def delete_property_calendar_sync(
    db: Session,
    sync_id: int
):
    sync = get_property_calendar_sync(
        db,
        sync_id
    )

    if not sync:
        return None

    db.delete(sync)
    db.commit()

    return sync