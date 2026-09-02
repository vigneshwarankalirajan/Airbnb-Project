from sqlalchemy.orm import Session

from app.models.amenity import Amenity
from app.schemas.amenity import AmenityCreate, AmenityUpdate


def get_amenities(db: Session):
    return db.query(Amenity).all()


def get_amenity(db: Session, amenity_id: int):
    return db.query(Amenity).filter(Amenity.id == amenity_id).first()


def create_amenity(db: Session, amenity: AmenityCreate):
    db_amenity = Amenity(
        name=amenity.name,
        description=amenity.description
    )

    db.add(db_amenity)
    db.commit()
    db.refresh(db_amenity)

    return db_amenity


def update_amenity(
    db: Session,
    amenity_id: int,
    amenity: AmenityUpdate
):
    db_amenity = get_amenity(db, amenity_id)

    if not db_amenity:
        return None

    db_amenity.name = amenity.name
    db_amenity.description = amenity.description

    db.commit()
    db.refresh(db_amenity)

    return db_amenity


def delete_amenity(db: Session, amenity_id: int):
    db_amenity = get_amenity(db, amenity_id)

    if not db_amenity:
        return None

    db.delete(db_amenity)
    db.commit()

    return db_amenity