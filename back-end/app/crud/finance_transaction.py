from sqlalchemy.orm import Session

from app.models.finance_transaction import FinanceTransaction

from app.schemas.finance_transaction import (
    FinanceTransactionCreate,
    FinanceTransactionUpdate,
)


# =========================================================
# GET ALL
# =========================================================

def get_finance_transactions(db: Session):

    return (
        db.query(FinanceTransaction)
        .all()
    )


# =========================================================
# GET ONE
# =========================================================

def get_finance_transaction(
    db: Session,
    transaction_id: int
):

    return (
        db.query(FinanceTransaction)
        .filter(
            FinanceTransaction.id == transaction_id
        )
        .first()
    )


# =========================================================
# CREATE
# =========================================================

def create_finance_transaction(
    db: Session,
    transaction_data: FinanceTransactionCreate
):

    new_transaction = FinanceTransaction(
        **transaction_data.model_dump()
    )

    db.add(new_transaction)

    db.commit()

    db.refresh(new_transaction)

    return new_transaction


# =========================================================
# UPDATE
# =========================================================

def update_finance_transaction(
    db: Session,
    transaction_id: int,
    transaction_data: FinanceTransactionUpdate
):

    transaction = get_finance_transaction(
        db,
        transaction_id
    )

    if not transaction:
        return None

    update_data = transaction_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():

        setattr(
            transaction,
            key,
            value
        )

    db.commit()

    db.refresh(transaction)

    return transaction


# =========================================================
# DELETE
# =========================================================

def delete_finance_transaction(
    db: Session,
    transaction_id: int
):

    transaction = get_finance_transaction(
        db,
        transaction_id
    )

    if not transaction:
        return None

    db.delete(transaction)

    db.commit()

    return transaction