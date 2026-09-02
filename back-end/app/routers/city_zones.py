from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.city_zones import (
    CityZoneCreate,
    CityZoneResponse,
    CityZoneUpdate,
)

from app.crud.city_zones import (
    get_city_zones,
    get_city_zone,
    create_city_zone,
    update_city_zone,
    delete_city_zone,
)


router = APIRouter(
    prefix="/city-zones",
    tags=["City Zones"]
)


# -----------------------------
# GET ALL
# -----------------------------

@router.get(
    "/",
    response_model=list[CityZoneResponse]
)
def read_city_zones(
    db: Session = Depends(get_db)
):
    return get_city_zones(db)


# -----------------------------
# GET BY ID
# -----------------------------

@router.get(
    "/{city_zone_id}",
    response_model=CityZoneResponse
)
def read_city_zone(
    city_zone_id: int,
    db: Session = Depends(get_db)
):
    city_zone = get_city_zone(
        db,
        city_zone_id
    )

    if not city_zone:
        raise HTTPException(
            status_code=404,
            detail="City zone not found"
        )

    return city_zone


# -----------------------------
# CREATE
# -----------------------------

@router.post(
    "/",
    response_model=CityZoneResponse
)
def create_new_city_zone(
    city_zone_data: CityZoneCreate,
    db: Session = Depends(get_db)
):
    return create_city_zone(
        db,
        city_zone_data
    )


# -----------------------------
# UPDATE
# -----------------------------

@router.put(
    "/{city_zone_id}",
    response_model=CityZoneResponse
)
def update_existing_city_zone(
    city_zone_id: int,
    city_zone_data: CityZoneUpdate,
    db: Session = Depends(get_db)
):
    city_zone = update_city_zone(
        db,
        city_zone_id,
        city_zone_data
    )

    if not city_zone:
        raise HTTPException(
            status_code=404,
            detail="City zone not found"
        )

    return city_zone


# -----------------------------
# DELETE
# -----------------------------

@router.delete(
    "/{city_zone_id}"
)
def delete_existing_city_zone(
    city_zone_id: int,
    db: Session = Depends(get_db)
):
    city_zone = delete_city_zone(
        db,
        city_zone_id
    )

    if not city_zone:
        raise HTTPException(
            status_code=404,
            detail="City zone not found"
        )

    return {
        "message": "City zone deleted successfully",
        "id": city_zone_id
    }