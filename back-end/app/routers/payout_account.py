from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.payout_account import (
    PayoutAccountCreate,
    PayoutAccountResponse,
    PayoutAccountUpdate,
)

from app.crud.payout_account import (
    get_payout_accounts,
    get_payout_account,
    create_payout_account,
    update_payout_account,
    delete_payout_account,
)


router = APIRouter(
    prefix="/payout-accounts",
    tags=["Payout Accounts"]
)


# GET ALL

@router.get(
    "/",
    response_model=list[PayoutAccountResponse]
)
def read_payout_accounts(
    db: Session = Depends(get_db)
):

    return get_payout_accounts(db)


# GET ONE

@router.get(
    "/{payout_account_id}",
    response_model=PayoutAccountResponse
)
def read_payout_account(
    payout_account_id: int,
    db: Session = Depends(get_db)
):

    payout_account = get_payout_account(
        db,
        payout_account_id
    )

    if not payout_account:

        raise HTTPException(
            status_code=404,
            detail="Payout account not found"
        )

    return payout_account


# CREATE

@router.post(
    "/",
    response_model=PayoutAccountResponse
)
def create_new_payout_account(
    payout_account_data: PayoutAccountCreate,
    db: Session = Depends(get_db)
):

    return create_payout_account(
        db,
        payout_account_data
    )


# UPDATE

@router.put(
    "/{payout_account_id}",
    response_model=PayoutAccountResponse
)
def update_existing_payout_account(
    payout_account_id: int,
    payout_account_data: PayoutAccountUpdate,
    db: Session = Depends(get_db)
):

    payout_account = update_payout_account(
        db,
        payout_account_id,
        payout_account_data
    )

    if not payout_account:

        raise HTTPException(
            status_code=404,
            detail="Payout account not found"
        )

    return payout_account


# DELETE

@router.delete(
    "/{payout_account_id}"
)
def delete_existing_payout_account(
    payout_account_id: int,
    db: Session = Depends(get_db)
):

    payout_account = delete_payout_account(
        db,
        payout_account_id
    )

    if not payout_account:

        raise HTTPException(
            status_code=404,
            detail="Payout account not found"
        )

    return {
        "message": "Payout account deleted successfully",
        "id": payout_account_id
    }