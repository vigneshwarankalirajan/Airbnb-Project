from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.coupons import (
    CouponCreate,
    CouponResponse,
    CouponUpdate,
)

from app.crud.coupons import (
    get_coupons,
    get_coupon,
    create_coupon,
    update_coupon,
    delete_coupon,
)


router = APIRouter(
    prefix="/coupons",
    tags=["Coupons"]
)


# -----------------------------
# GET ALL
# -----------------------------

@router.get(
    "/",
    response_model=list[CouponResponse]
)
def read_coupons(
    db: Session = Depends(get_db)
):
    return get_coupons(db)


# -----------------------------
# GET BY ID
# -----------------------------

@router.get(
    "/{coupon_id}",
    response_model=CouponResponse
)
def read_coupon(
    coupon_id: int,
    db: Session = Depends(get_db)
):
    coupon = get_coupon(
        db,
        coupon_id
    )

    if not coupon:
        raise HTTPException(
            status_code=404,
            detail="Coupon not found"
        )

    return coupon


# -----------------------------
# CREATE
# -----------------------------

@router.post(
    "/",
    response_model=CouponResponse
)
def create_new_coupon(
    coupon_data: CouponCreate,
    db: Session = Depends(get_db)
):
    return create_coupon(
        db,
        coupon_data
    )


# -----------------------------
# UPDATE
# -----------------------------

@router.put(
    "/{coupon_id}",
    response_model=CouponResponse
)
def update_existing_coupon(
    coupon_id: int,
    coupon_data: CouponUpdate,
    db: Session = Depends(get_db)
):
    coupon = update_coupon(
        db,
        coupon_id,
        coupon_data
    )

    if not coupon:
        raise HTTPException(
            status_code=404,
            detail="Coupon not found"
        )

    return coupon


# -----------------------------
# DELETE
# -----------------------------

@router.delete(
    "/{coupon_id}"
)
def delete_existing_coupon(
    coupon_id: int,
    db: Session = Depends(get_db)
):
    coupon = delete_coupon(
        db,
        coupon_id
    )

    if not coupon:
        raise HTTPException(
            status_code=404,
            detail="Coupon not found"
        )

    return {
        "message": "Coupon deleted successfully",
        "id": coupon_id
    }