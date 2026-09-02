from sqlalchemy.orm import Session

from app.models.city_zones import CityZone
from app.schemas.city_zones import (
    CityZoneCreate,
    CityZoneUpdate
)


def get_city_zones(db: Session):
    return db.query(CityZone).all()


def get_city_zone(
    db: Session,
    city_zone_id: int
):
    return (
        db.query(CityZone)
        .filter(CityZone.id == city_zone_id)
        .first()
    )


def create_city_zone(
    db: Session,
    city_zone_data: CityZoneCreate
):
    new_city_zone = CityZone(
        **city_zone_data.model_dump()
    )

    db.add(new_city_zone)
    db.commit()
    db.refresh(new_city_zone)

    return new_city_zone


def update_city_zone(
    db: Session,
    city_zone_id: int,
    city_zone_data: CityZoneUpdate
):
    city_zone = get_city_zone(
        db,
        city_zone_id
    )

    if not city_zone:
        return None

    update_data = city_zone_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(city_zone, key, value)

    db.commit()
    db.refresh(city_zone)

    return city_zone


def delete_city_zone(
    db: Session,
    city_zone_id: int
):
    city_zone = get_city_zone(
        db,
        city_zone_id
    )

    if not city_zone:
        return None

    db.delete(city_zone)
    db.commit()

    return city_zone