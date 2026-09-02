from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.crud.finance_transaction import (
    get_finance_transactions,
    get_finance_transaction,
    create_finance_transaction,
    update_finance_transaction,
    delete_finance_transaction,
)

from app.schemas.finance_transaction import (
    FinanceTransactionCreate,
    FinanceTransactionUpdate,
    FinanceTransactionResponse,
)


router = APIRouter(
    prefix="/finance-transactions",
    tags=["Finance Transactions"]
)


# =========================================================
# GET ALL
# =========================================================

@router.get(
    "/",
    response_model=list[FinanceTransactionResponse]
)
def get_all_finance_transactions(
    db: Session = Depends(get_db)
):
    return get_finance_transactions(db)


# =========================================================
# GET ONE
# =========================================================

@router.get(
    "/{transaction_id}",
    response_model=FinanceTransactionResponse
)
def get_one_finance_transaction(
    transaction_id: int,
    db: Session = Depends(get_db)
):

    transaction = get_finance_transaction(
        db,
        transaction_id
    )

    if not transaction:
        raise HTTPException(
            status_code=404,
            detail="Finance transaction not found"
        )

    return transaction


# =========================================================
# CREATE
# =========================================================

@router.post(
    "/",
    response_model=FinanceTransactionResponse
)
def create_new_finance_transaction(
    transaction_data: FinanceTransactionCreate,
    db: Session = Depends(get_db)
):

    return create_finance_transaction(
        db,
        transaction_data
    )


# =========================================================
# UPDATE
# =========================================================

@router.put(
    "/{transaction_id}",
    response_model=FinanceTransactionResponse
)
def update_existing_finance_transaction(
    transaction_id: int,
    transaction_data: FinanceTransactionUpdate,
    db: Session = Depends(get_db)
):

    transaction = update_finance_transaction(
        db,
        transaction_id,
        transaction_data
    )

    if not transaction:
        raise HTTPException(
            status_code=404,
            detail="Finance transaction not found"
        )

    return transaction


# =========================================================
# DELETE
# =========================================================

@router.delete(
    "/{transaction_id}"
)
def delete_existing_finance_transaction(
    transaction_id: int,
    db: Session = Depends(get_db)
):

    transaction = delete_finance_transaction(
        db,
        transaction_id
    )

    if not transaction:
        raise HTTPException(
            status_code=404,
            detail="Finance transaction not found"
        )

    return {
        "message": "Finance transaction deleted successfully",
        "id": transaction_id
    }