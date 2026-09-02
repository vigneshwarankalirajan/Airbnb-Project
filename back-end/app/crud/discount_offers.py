from sqlalchemy.orm import Session

from app.models.discount_offers import DiscountOffer

from app.schemas.discount_offers import (
    DiscountOfferCreate,
    DiscountOfferUpdate
)


def get_discount_offers(db: Session):
    return db.query(DiscountOffer).all()


def get_discount_offer(
    db: Session,
    offer_id: int
):
    return (
        db.query(DiscountOffer)
        .filter(DiscountOffer.id == offer_id)
        .first()
    )


def create_discount_offer(
    db: Session,
    offer_data: DiscountOfferCreate
):
    new_offer = DiscountOffer(
        **offer_data.model_dump()
    )

    db.add(new_offer)
    db.commit()
    db.refresh(new_offer)

    return new_offer


def update_discount_offer(
    db: Session,
    offer_id: int,
    offer_data: DiscountOfferUpdate
):
    offer = get_discount_offer(
        db,
        offer_id
    )

    if not offer:
        return None

    update_data = offer_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(offer, key, value)

    db.commit()
    db.refresh(offer)

    return offer


def delete_discount_offer(
    db: Session,
    offer_id: int
):
    offer = get_discount_offer(
        db,
        offer_id
    )

    if not offer:
        return None

    db.delete(offer)
    db.commit()

    return offer