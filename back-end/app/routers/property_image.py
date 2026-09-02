from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.property_image import (
    PropertyImageCreate,
    PropertyImageUpdate,
    PropertyImageResponse,
)

from app.crud.property_image import (
    get_property_images,
    get_property_image,
    create_property_image,
    update_property_image,
    delete_property_image,
)


router = APIRouter(
    prefix="/property-images",
    tags=["Property Images"]
)


# GET ALL
@router.get(
    "/",
    response_model=list[PropertyImageResponse]
)
def read_property_images(
    db: Session = Depends(get_db)
):
    return get_property_images(db)


# GET BY ID
@router.get(
    "/{image_id}",
    response_model=PropertyImageResponse
)
def read_property_image(
    image_id: int,
    db: Session = Depends(get_db)
):
    image = get_property_image(db, image_id)

    if not image:
        raise HTTPException(
            status_code=404,
            detail="Property image not found"
        )

    return image


# CREATE
@router.post(
    "/",
    response_model=PropertyImageResponse
)
def create_new_property_image(
    image_data: PropertyImageCreate,
    db: Session = Depends(get_db)
):
    return create_property_image(db, image_data)


# UPDATE
@router.put(
    "/{image_id}",
    response_model=PropertyImageResponse
)
def update_existing_property_image(
    image_id: int,
    image_data: PropertyImageUpdate,
    db: Session = Depends(get_db)
):
    image = update_property_image(
        db,
        image_id,
        image_data
    )

    if not image:
        raise HTTPException(
            status_code=404,
            detail="Property image not found"
        )

    return image


# DELETE
@router.delete(
    "/{image_id}"
)
def delete_existing_property_image(
    image_id: int,
    db: Session = Depends(get_db)
):
    image = delete_property_image(
        db,
        image_id
    )

    if not image:
        raise HTTPException(
            status_code=404,
            detail="Property image not found"
        )

    return {
        "message": "Property image deleted successfully",
        "id": image_id
    }