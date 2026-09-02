from sqlalchemy.orm import Session

from app.models.property_image import PropertyImage
from app.schemas.property_image import (
    PropertyImageCreate,
    PropertyImageUpdate,
)


def get_property_images(
    db: Session,
    skip: int = 0,
    limit: int = 100
):
    return (
        db.query(PropertyImage)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_property_image(
    db: Session,
    image_id: int
):
    return (
        db.query(PropertyImage)
        .filter(PropertyImage.id == image_id)
        .first()
    )


def create_property_image(
    db: Session,
    image_data: PropertyImageCreate
):
    new_image = PropertyImage(
        property_id=image_data.property_id,
        image_url=image_data.image_url,
        media_type=image_data.media_type,
        display_order=image_data.display_order,
    )

    db.add(new_image)
    db.commit()
    db.refresh(new_image)

    return new_image


def update_property_image(
    db: Session,
    image_id: int,
    image_data: PropertyImageUpdate
):
    image = get_property_image(db, image_id)

    if not image:
        return None

    update_data = image_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(image, key, value)

    db.commit()
    db.refresh(image)

    return image


def delete_property_image(
    db: Session,
    image_id: int
):
    image = get_property_image(db, image_id)

    if not image:
        return None

    db.delete(image)
    db.commit()

    return image