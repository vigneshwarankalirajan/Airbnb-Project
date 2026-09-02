from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.listing_fees import (
    ListingFeeCreate,
    ListingFeeResponse,
    ListingFeeUpdate,
)

from app.crud.listing_fees import (
    get_listing_fees,
    get_listing_fee,
    create_listing_fee,
    update_listing_fee,
    delete_listing_fee,
)


router = APIRouter(
    prefix="/listing-fees",
    tags=["Listing Fees"]
)


# -----------------------------
# GET ALL
# -----------------------------

@router.get(
    "/",
    response_model=list[ListingFeeResponse]
)
def read_listing_fees(
    db: Session = Depends(get_db)
):
    return get_listing_fees(db)


# -----------------------------
# GET BY ID
# -----------------------------

@router.get(
    "/{fee_id}",
    response_model=ListingFeeResponse
)
def read_listing_fee(
    fee_id: int,
    db: Session = Depends(get_db)
):
    fee = get_listing_fee(
        db,
        fee_id
    )

    if not fee:
        raise HTTPException(
            status_code=404,
            detail="Listing fee not found"
        )

    return fee


# -----------------------------
# CREATE
# -----------------------------

@router.post(
    "/",
    response_model=ListingFeeResponse
)
def create_new_listing_fee(
    fee_data: ListingFeeCreate,
    db: Session = Depends(get_db)
):
    return create_listing_fee(
        db,
        fee_data
    )


# -----------------------------
# UPDATE
# -----------------------------

@router.put(
    "/{fee_id}",
    response_model=ListingFeeResponse
)
def update_existing_listing_fee(
    fee_id: int,
    fee_data: ListingFeeUpdate,
    db: Session = Depends(get_db)
):
    fee = update_listing_fee(
        db,
        fee_id,
        fee_data
    )

    if not fee:
        raise HTTPException(
            status_code=404,
            detail="Listing fee not found"
        )

    return fee


# -----------------------------
# DELETE
# -----------------------------

@router.delete(
    "/{fee_id}"
)
def delete_existing_listing_fee(
    fee_id: int,
    db: Session = Depends(get_db)
):
    fee = delete_listing_fee(
        db,
        fee_id
    )

    if not fee:
        raise HTTPException(
            status_code=404,
            detail="Listing fee not found"
        )

    return {
        "message": "Listing fee deleted successfully",
        "id": fee_id
    }