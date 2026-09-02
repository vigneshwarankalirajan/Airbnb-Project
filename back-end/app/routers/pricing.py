from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.pricing import (
    PricingCreate,
    PricingResponse,
    PricingUpdate,
)

from app.crud.pricing import (
    get_pricings,
    get_pricing,
    create_pricing,
    update_pricing,
    delete_pricing,
)


router = APIRouter(
    prefix="/pricing",
    tags=["Pricing"]
)


# -----------------------------
# GET ALL
# -----------------------------

@router.get(
    "/",
    response_model=list[PricingResponse]
)
def read_pricings(
    db: Session = Depends(get_db)
):
    return get_pricings(db)


# -----------------------------
# GET BY ID
# -----------------------------

@router.get(
    "/{pricing_id}",
    response_model=PricingResponse
)
def read_pricing(
    pricing_id: int,
    db: Session = Depends(get_db)
):
    pricing = get_pricing(
        db,
        pricing_id
    )

    if not pricing:
        raise HTTPException(
            status_code=404,
            detail="Pricing not found"
        )

    return pricing


# -----------------------------
# CREATE
# -----------------------------

@router.post(
    "/",
    response_model=PricingResponse
)
def create_new_pricing(
    pricing_data: PricingCreate,
    db: Session = Depends(get_db)
):
    return create_pricing(
        db,
        pricing_data
    )


# -----------------------------
# UPDATE
# -----------------------------

@router.put(
    "/{pricing_id}",
    response_model=PricingResponse
)
def update_existing_pricing(
    pricing_id: int,
    pricing_data: PricingUpdate,
    db: Session = Depends(get_db)
):
    pricing = update_pricing(
        db,
        pricing_id,
        pricing_data
    )

    if not pricing:
        raise HTTPException(
            status_code=404,
            detail="Pricing not found"
        )

    return pricing


# -----------------------------
# DELETE
# -----------------------------

@router.delete(
    "/{pricing_id}"
)
def delete_existing_pricing(
    pricing_id: int,
    db: Session = Depends(get_db)
):
    pricing = delete_pricing(
        db,
        pricing_id
    )

    if not pricing:
        raise HTTPException(
            status_code=404,
            detail="Pricing not found"
        )

    return {
        "message": "Pricing deleted successfully",
        "id": pricing_id
    }