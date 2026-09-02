from sqlalchemy.orm import Session

from app.models.listing_fees import ListingFee

from app.schemas.listing_fees import (
    ListingFeeCreate,
    ListingFeeUpdate
)


def get_listing_fees(db: Session):
    return db.query(ListingFee).all()


def get_listing_fee(
    db: Session,
    fee_id: int
):
    return (
        db.query(ListingFee)
        .filter(ListingFee.id == fee_id)
        .first()
    )


def create_listing_fee(
    db: Session,
    fee_data: ListingFeeCreate
):
    new_fee = ListingFee(
        **fee_data.model_dump()
    )

    db.add(new_fee)
    db.commit()
    db.refresh(new_fee)

    return new_fee


def update_listing_fee(
    db: Session,
    fee_id: int,
    fee_data: ListingFeeUpdate
):
    fee = get_listing_fee(
        db,
        fee_id
    )

    if not fee:
        return None

    update_data = fee_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(fee, key, value)

    db.commit()
    db.refresh(fee)

    return fee


def delete_listing_fee(
    db: Session,
    fee_id: int
):
    fee = get_listing_fee(
        db,
        fee_id
    )

    if not fee:
        return None

    db.delete(fee)
    db.commit()

    return fee