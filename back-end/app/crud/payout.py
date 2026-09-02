from sqlalchemy.orm import Session

from app.models.payout import Payout

from app.schemas.payout import (
    PayoutCreate,
    PayoutUpdate,
)


def get_payouts(db: Session):

    return db.query(Payout).all()


def get_payout(
    db: Session,
    payout_id: int
):

    return (
        db.query(Payout)
        .filter(Payout.id == payout_id)
        .first()
    )


def create_payout(
    db: Session,
    payout_data: PayoutCreate
):

    new_payout = Payout(
        **payout_data.model_dump()
    )

    db.add(new_payout)
    db.commit()
    db.refresh(new_payout)

    return new_payout


def update_payout(
    db: Session,
    payout_id: int,
    payout_data: PayoutUpdate
):

    payout = get_payout(
        db,
        payout_id
    )

    if not payout:
        return None

    update_data = payout_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(
            payout,
            key,
            value
        )

    db.commit()
    db.refresh(payout)

    return payout


def delete_payout(
    db: Session,
    payout_id: int
):

    payout = get_payout(
        db,
        payout_id
    )

    if not payout:
        return None

    db.delete(payout)
    db.commit()

    return payout