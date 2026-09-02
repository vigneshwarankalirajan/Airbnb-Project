from sqlalchemy.orm import Session

from app.models.coupons import Coupon

from app.schemas.coupons import (
    CouponCreate,
    CouponUpdate
)


def get_coupons(db: Session):
    return db.query(Coupon).all()


def get_coupon(
    db: Session,
    coupon_id: int
):
    return (
        db.query(Coupon)
        .filter(Coupon.id == coupon_id)
        .first()
    )


def create_coupon(
    db: Session,
    coupon_data: CouponCreate
):
    new_coupon = Coupon(
        **coupon_data.model_dump()
    )

    db.add(new_coupon)
    db.commit()
    db.refresh(new_coupon)

    return new_coupon


def update_coupon(
    db: Session,
    coupon_id: int,
    coupon_data: CouponUpdate
):
    coupon = get_coupon(
        db,
        coupon_id
    )

    if not coupon:
        return None

    update_data = coupon_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(coupon, key, value)

    db.commit()
    db.refresh(coupon)

    return coupon


def delete_coupon(
    db: Session,
    coupon_id: int
):
    coupon = get_coupon(
        db,
        coupon_id
    )

    if not coupon:
        return None

    db.delete(coupon)
    db.commit()

    return coupon