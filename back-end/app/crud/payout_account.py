from sqlalchemy.orm import Session

from app.models.payout_account import PayoutAccount

from app.schemas.payout_account import (
    PayoutAccountCreate,
    PayoutAccountUpdate,
)


def get_payout_accounts(db: Session):

    return (
        db.query(PayoutAccount)
        .all()
    )


def get_payout_account(
    db: Session,
    payout_account_id: int
):

    return (
        db.query(PayoutAccount)
        .filter(
            PayoutAccount.id == payout_account_id
        )
        .first()
    )


def create_payout_account(
    db: Session,
    payout_account_data: PayoutAccountCreate
):

    new_payout_account = PayoutAccount(
        **payout_account_data.model_dump()
    )

    db.add(new_payout_account)

    db.commit()

    db.refresh(new_payout_account)

    return new_payout_account


def update_payout_account(
    db: Session,
    payout_account_id: int,
    payout_account_data: PayoutAccountUpdate
):

    payout_account = get_payout_account(
        db,
        payout_account_id
    )

    if not payout_account:
        return None

    update_data = payout_account_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():

        setattr(
            payout_account,
            key,
            value
        )

    db.commit()

    db.refresh(payout_account)

    return payout_account


def delete_payout_account(
    db: Session,
    payout_account_id: int
):

    payout_account = get_payout_account(
        db,
        payout_account_id
    )

    if not payout_account:
        return None

    db.delete(payout_account)

    db.commit()

    return payout_account