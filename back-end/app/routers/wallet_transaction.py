from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.wallet_transaction import (
    WalletTransactionCreate,
    WalletTransactionResponse,
    WalletTransactionUpdate,
)

from app.crud.wallet_transaction import (
    get_wallet_transactions,
    get_wallet_transaction,
    create_wallet_transaction,
    update_wallet_transaction,
    delete_wallet_transaction,
)


router = APIRouter(
    prefix="/wallet-transactions",
    tags=["Wallet Transactions"]
)


@router.get(
    "/",
    response_model=list[WalletTransactionResponse]
)
def read_wallet_transactions(
    db: Session = Depends(get_db)
):

    return get_wallet_transactions(db)


@router.get(
    "/{transaction_id}",
    response_model=WalletTransactionResponse
)
def read_wallet_transaction(
    transaction_id: int,
    db: Session = Depends(get_db)
):

    transaction = get_wallet_transaction(
        db,
        transaction_id
    )

    if not transaction:

        raise HTTPException(
            status_code=404,
            detail="Wallet transaction not found"
        )

    return transaction


@router.post(
    "/",
    response_model=WalletTransactionResponse
)
def create_new_wallet_transaction(
    transaction_data: WalletTransactionCreate,
    db: Session = Depends(get_db)
):

    return create_wallet_transaction(
        db,
        transaction_data
    )


@router.put(
    "/{transaction_id}",
    response_model=WalletTransactionResponse
)
def update_existing_wallet_transaction(
    transaction_id: int,
    transaction_data: WalletTransactionUpdate,
    db: Session = Depends(get_db)
):

    transaction = update_wallet_transaction(
        db,
        transaction_id,
        transaction_data
    )

    if not transaction:

        raise HTTPException(
            status_code=404,
            detail="Wallet transaction not found"
        )

    return transaction


@router.delete(
    "/{transaction_id}"
)
def delete_existing_wallet_transaction(
    transaction_id: int,
    db: Session = Depends(get_db)
):

    transaction = delete_wallet_transaction(
        db,
        transaction_id
    )

    if not transaction:

        raise HTTPException(
            status_code=404,
            detail="Wallet transaction not found"
        )

    return {
        "message": "Wallet transaction deleted successfully",
        "id": transaction_id
    }