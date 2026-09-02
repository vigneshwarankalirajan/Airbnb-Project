from sqlalchemy.orm import Session

from app.models.property_availability import (
    PropertyAvailability
)

from app.schemas.property_availability import (
    PropertyAvailabilityCreate,
    PropertyAvailabilityUpdate,
)


# CREATE
def create_availability(
    db: Session,
    data: PropertyAvailabilityCreate
):

    availability = PropertyAvailability(
        property_id=data.property_id,
        available_from=data.available_from,
        available_to=data.available_to,
        is_available=data.is_available,
    )

    db.add(availability)

    db.commit()

    db.refresh(availability)

    return availability


# GET ALL
def get_all_availability(
    db: Session
):

    return (
        db.query(PropertyAvailability)
        .order_by(
            PropertyAvailability.id.desc()
        )
        .all()
    )


# GET BY ID
def get_availability_by_id(
    db: Session,
    availability_id: int
):

    return (
        db.query(PropertyAvailability)
        .filter(
            PropertyAvailability.id
            == availability_id
        )
        .first()
    )


# GET BY PROPERTY
def get_availability_by_property(
    db: Session,
    property_id: int
):

    return (
        db.query(PropertyAvailability)
        .filter(
            PropertyAvailability.property_id
            == property_id
        )
        .order_by(
            PropertyAvailability.available_from
        )
        .all()
    )


# UPDATE
def update_availability(
    db: Session,
    availability_id: int,
    data: PropertyAvailabilityUpdate
):

    availability = (
        db.query(PropertyAvailability)
        .filter(
            PropertyAvailability.id
            == availability_id
        )
        .first()
    )

    if not availability:
        return None

    availability.property_id = data.property_id
    availability.available_from = data.available_from
    availability.available_to = data.available_to
    availability.is_available = data.is_available

    db.commit()

    db.refresh(availability)

    return availability


# DELETE
def delete_availability(
    db: Session,
    availability_id: int
):

    availability = (
        db.query(PropertyAvailability)
        .filter(
            PropertyAvailability.id
            == availability_id
        )
        .first()
    )

    if not availability:
        return None

    db.delete(availability)

    db.commit()

    return availability