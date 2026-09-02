from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.discount_offers import (
    DiscountOfferCreate,
    DiscountOfferResponse,
    DiscountOfferUpdate,
)

from app.crud.discount_offers import (
    get_discount_offers,
    get_discount_offer,
    create_discount_offer,
    update_discount_offer,
    delete_discount_offer,
)


router = APIRouter(
    prefix="/discount-offers",
    tags=["Discount Offers"]
)


# -----------------------------
# GET ALL
# -----------------------------

@router.get(
    "/",
    response_model=list[DiscountOfferResponse]
)
def read_discount_offers(
    db: Session = Depends(get_db)
):
    return get_discount_offers(db)


# -----------------------------
# GET BY ID
# -----------------------------

@router.get(
    "/{offer_id}",
    response_model=DiscountOfferResponse
)
def read_discount_offer(
    offer_id: int,
    db: Session = Depends(get_db)
):
    offer = get_discount_offer(
        db,
        offer_id
    )

    if not offer:
        raise HTTPException(
            status_code=404,
            detail="Discount offer not found"
        )

    return offer


# -----------------------------
# CREATE
# -----------------------------

@router.post(
    "/",
    response_model=DiscountOfferResponse
)
def create_new_discount_offer(
    offer_data: DiscountOfferCreate,
    db: Session = Depends(get_db)
):
    return create_discount_offer(
        db,
        offer_data
    )


# -----------------------------
# UPDATE
# -----------------------------

@router.put(
    "/{offer_id}",
    response_model=DiscountOfferResponse
)
def update_existing_discount_offer(
    offer_id: int,
    offer_data: DiscountOfferUpdate,
    db: Session = Depends(get_db)
):
    offer = update_discount_offer(
        db,
        offer_id,
        offer_data
    )

    if not offer:
        raise HTTPException(
            status_code=404,
            detail="Discount offer not found"
        )

    return offer


# -----------------------------
# DELETE
# -----------------------------

@router.delete(
    "/{offer_id}"
)
def delete_existing_discount_offer(
    offer_id: int,
    db: Session = Depends(get_db)
):
    offer = delete_discount_offer(
        db,
        offer_id
    )

    if not offer:
        raise HTTPException(
            status_code=404,
            detail="Discount offer not found"
        )

    return {
        "message": "Discount offer deleted successfully",
        "id": offer_id
    }