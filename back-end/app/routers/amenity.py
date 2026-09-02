from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.amenity import (
    AmenityCreate,
    AmenityUpdate,
    AmenityResponse
)
from app.crud import amenity as crud


router = APIRouter(
    prefix="/amenities",
    tags=["Amenities"]
)


@router.get("/", response_model=list[AmenityResponse])
def read_amenities(db: Session = Depends(get_db)):
    return crud.get_amenities(db)


@router.post("/", response_model=AmenityResponse)
def create_new_amenity(
    amenity: AmenityCreate,
    db: Session = Depends(get_db)
):
    return crud.create_amenity(db, amenity)


@router.get("/{amenity_id}", response_model=AmenityResponse)
def read_amenity(
    amenity_id: int,
    db: Session = Depends(get_db)
):
    db_amenity = crud.get_amenity(db, amenity_id)

    if not db_amenity:
        raise HTTPException(
            status_code=404,
            detail="Amenity not found"
        )

    return db_amenity


@router.put("/{amenity_id}", response_model=AmenityResponse)
def update_existing_amenity(
    amenity_id: int,
    amenity: AmenityUpdate,
    db: Session = Depends(get_db)
):
    db_amenity = crud.update_amenity(
        db,
        amenity_id,
        amenity
    )

    if not db_amenity:
        raise HTTPException(
            status_code=404,
            detail="Amenity not found"
        )

    return db_amenity


@router.delete("/{amenity_id}")
def delete_existing_amenity(
    amenity_id: int,
    db: Session = Depends(get_db)
):
    db_amenity = crud.delete_amenity(
        db,
        amenity_id
    )

    if not db_amenity:
        raise HTTPException(
            status_code=404,
            detail="Amenity not found"
        )

    return {
        "message": "Amenity deleted successfully",
        "id": amenity_id
    }