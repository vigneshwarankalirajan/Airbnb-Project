from sqlalchemy.orm import Session

from app.models.pricing import Pricing

from app.schemas.pricing import (
    PricingCreate,
    PricingUpdate
)


def get_pricings(db: Session):
    return db.query(Pricing).all()


def get_pricing(
    db: Session,
    pricing_id: int
):
    return (
        db.query(Pricing)
        .filter(Pricing.id == pricing_id)
        .first()
    )


def create_pricing(
    db: Session,
    pricing_data: PricingCreate
):
    new_pricing = Pricing(
        **pricing_data.model_dump()
    )

    db.add(new_pricing)
    db.commit()
    db.refresh(new_pricing)

    return new_pricing


def update_pricing(
    db: Session,
    pricing_id: int,
    pricing_data: PricingUpdate
):
    pricing = get_pricing(
        db,
        pricing_id
    )

    if not pricing:
        return None

    update_data = pricing_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(pricing, key, value)

    db.commit()
    db.refresh(pricing)

    return pricing


def delete_pricing(
    db: Session,
    pricing_id: int
):
    pricing = get_pricing(
        db,
        pricing_id
    )

    if not pricing:
        return None

    db.delete(pricing)
    db.commit()

    return pricing