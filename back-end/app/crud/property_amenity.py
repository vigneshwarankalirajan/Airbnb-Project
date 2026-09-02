from sqlalchemy.orm import Session

from app.models.property_amenity import PropertyAmenity
from app.schemas.property_amenity import (
    PropertyAmenityCreate,
    PropertyAmenityUpdate
)


def get_property_amenities(db: Session):
    return db.query(PropertyAmenity).all()


def get_property_amenity(
    db: Session,
    property_amenity_id: int
):
    return (
        db.query(PropertyAmenity)
        .filter(PropertyAmenity.id == property_amenity_id)
        .first()
    )


def create_property_amenity(
    db: Session,
    property_amenity: PropertyAmenityCreate
):
    db_property_amenity = PropertyAmenity(
        property_id=property_amenity.property_id,
        amenity_id=property_amenity.amenity_id
    )

    db.add(db_property_amenity)
    db.commit()
    db.refresh(db_property_amenity)

    return db_property_amenity


def update_property_amenity(
    db: Session,
    property_amenity_id: int,
    property_amenity: PropertyAmenityUpdate
):
    db_property_amenity = get_property_amenity(
        db,
        property_amenity_id
    )

    if not db_property_amenity:
        return None

    db_property_amenity.property_id = property_amenity.property_id
    db_property_amenity.amenity_id = property_amenity.amenity_id

    db.commit()
    db.refresh(db_property_amenity)

    return db_property_amenity


def delete_property_amenity(
    db: Session,
    property_amenity_id: int
):
    db_property_amenity = get_property_amenity(
        db,
        property_amenity_id
    )

    if not db_property_amenity:
        return None

    db.delete(db_property_amenity)
    db.commit()

    return db_property_amenity