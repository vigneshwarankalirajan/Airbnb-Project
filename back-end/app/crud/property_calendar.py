from sqlalchemy.orm import Session

from app.models.property_calendar import PropertyCalendar

from app.schemas.property_calendar import (
    PropertyCalendarCreate,
    PropertyCalendarUpdate
)


def get_property_calendars(db: Session):
    return db.query(PropertyCalendar).all()


def get_property_calendar(
    db: Session,
    calendar_id: int
):
    return (
        db.query(PropertyCalendar)
        .filter(PropertyCalendar.id == calendar_id)
        .first()
    )


def create_property_calendar(
    db: Session,
    calendar_data: PropertyCalendarCreate
):
    new_calendar = PropertyCalendar(
        **calendar_data.model_dump()
    )

    db.add(new_calendar)
    db.commit()
    db.refresh(new_calendar)

    return new_calendar


def update_property_calendar(
    db: Session,
    calendar_id: int,
    calendar_data: PropertyCalendarUpdate
):
    calendar = get_property_calendar(
        db,
        calendar_id
    )

    if not calendar:
        return None

    update_data = calendar_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(calendar, key, value)

    db.commit()
    db.refresh(calendar)

    return calendar


def delete_property_calendar(
    db: Session,
    calendar_id: int
):
    calendar = get_property_calendar(
        db,
        calendar_id
    )

    if not calendar:
        return None

    db.delete(calendar)
    db.commit()

    return calendar