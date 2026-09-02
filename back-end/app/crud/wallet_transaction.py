from sqlalchemy.orm import Session

from app.models.wallet_transaction import WalletTransaction

from app.schemas.wallet_transaction import (
    WalletTransactionCreate,
    WalletTransactionUpdate,
)


def get_wallet_transactions(
    db: Session
):

    return (
        db.query(WalletTransaction)
        .all()
    )


def get_wallet_transaction(
    db: Session,
    transaction_id: int
):

    return (
        db.query(WalletTransaction)
        .filter(
            WalletTransaction.id == transaction_id
        )
        .first()
    )


def create_wallet_transaction(
    db: Session,
    transaction_data: WalletTransactionCreate
):

    new_transaction = WalletTransaction(
        **transaction_data.model_dump()
    )

    db.add(new_transaction)

    db.commit()

    db.refresh(new_transaction)

    return new_transaction


def update_wallet_transaction(
    db: Session,
    transaction_id: int,
    transaction_data: WalletTransactionUpdate
):

    transaction = get_wallet_transaction(
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


def delete_wallet_transaction(
    db: Session,
    transaction_id: int
):

    transaction = get_wallet_transaction(
        db,
        transaction_id
    )

    if not transaction:
        return None

    db.delete(transaction)

    db.commit()

    return transaction