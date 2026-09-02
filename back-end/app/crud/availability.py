from sqlalchemy.orm import Session

from app.models.availability import Availability
from app.schemas.availability import (
    AvailabilityCreate,
    AvailabilityUpdate
)


def get_availabilities(db: Session):
    return db.query(Availability).all()


def get_availability(
    db: Session,
    availability_id: int
):
    return (
        db.query(Availability)
        .filter(Availability.id == availability_id)
        .first()
    )


def create_availability(
    db: Session,
    availability_data: AvailabilityCreate
):
    new_availability = Availability(
        **availability_data.model_dump()
    )

    db.add(new_availability)
    db.commit()
    db.refresh(new_availability)

    return new_availability


def update_availability(
    db: Session,
    availability_id: int,
    availability_data: AvailabilityUpdate
):
    availability = get_availability(
        db,
        availability_id
    )

    if not availability:
        return None

    update_data = availability_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(availability, key, value)

    db.commit()
    db.refresh(availability)

    return availability


def delete_availability(
    db: Session,
    availability_id: int
):
    availability = get_availability(
        db,
        availability_id
    )

    if not availability:
        return None

    db.delete(availability)
    db.commit()

    return availability