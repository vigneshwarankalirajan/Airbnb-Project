from sqlalchemy.orm import Session

from app.models.property import Property
from app.schemas.property import PropertyCreate, PropertyUpdate


def get_properties(db: Session):
    return db.query(Property).all()


def get_property(db: Session, property_id: int):
    return (
        db.query(Property)
        .filter(Property.id == property_id)
        .first()
    )


def create_property(
    db: Session,
    property_data: PropertyCreate
):
    new_property = Property(
        **property_data.model_dump()
    )

    db.add(new_property)
    db.commit()
    db.refresh(new_property)

    return new_property


def update_property(
    db: Session,
    property_id: int,
    property_data: PropertyUpdate
):
    property = get_property(db, property_id)

    if not property:
        return None

    update_data = property_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(property, key, value)

    db.commit()
    db.refresh(property)

    return property


def delete_property(
    db: Session,
    property_id: int
):
    property = get_property(db, property_id)

    if not property:
        return None

    db.delete(property)
    db.commit()

    return property