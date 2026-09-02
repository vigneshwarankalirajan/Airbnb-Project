from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.crud.currency import (
    get_currencies,
    get_currency,
    create_currency,
    update_currency,
    delete_currency,
)

from app.schemas.currency import (
    CurrencyCreate,
    CurrencyUpdate,
    CurrencyResponse,
)


router = APIRouter(
    prefix="/currencies",
    tags=["Currencies"]
)


# =========================================================
# GET ALL
# =========================================================

@router.get(
    "/",
    response_model=list[CurrencyResponse]
)
def get_all_currencies(
    db: Session = Depends(get_db)
):

    return get_currencies(db)


# =========================================================
# GET ONE
# =========================================================

@router.get(
    "/{currency_id}",
    response_model=CurrencyResponse
)
def get_one_currency(
    currency_id: int,
    db: Session = Depends(get_db)
):

    currency = get_currency(
        db,
        currency_id
    )

    if not currency:

        raise HTTPException(
            status_code=404,
            detail="Currency not found"
        )

    return currency


# =========================================================
# CREATE
# =========================================================

@router.post(
    "/",
    response_model=CurrencyResponse
)
def create_new_currency(
    currency_data: CurrencyCreate,
    db: Session = Depends(get_db)
):

    return create_currency(
        db,
        currency_data
    )


# =========================================================
# UPDATE
# =========================================================

@router.put(
    "/{currency_id}",
    response_model=CurrencyResponse
)
def update_existing_currency(
    currency_id: int,
    currency_data: CurrencyUpdate,
    db: Session = Depends(get_db)
):

    currency = update_currency(
        db,
        currency_id,
        currency_data
    )

    if not currency:

        raise HTTPException(
            status_code=404,
            detail="Currency not found"
        )

    return currency


# =========================================================
# DELETE
# =========================================================

@router.delete(
    "/{currency_id}"
)
def delete_existing_currency(
    currency_id: int,
    db: Session = Depends(get_db)
):

    currency = delete_currency(
        db,
        currency_id
    )

    if not currency:

        raise HTTPException(
            status_code=404,
            detail="Currency not found"
        )

    return {
        "message": "Currency deleted successfully",
        "id": currency_id
    }