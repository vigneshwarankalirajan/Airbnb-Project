from sqlalchemy.orm import Session

from app.models.refund import Refund

from app.schemas.refund import (
    RefundCreate,
    RefundUpdate,
)


def get_refunds(db: Session):

    return db.query(Refund).all()


def get_refund(
    db: Session,
    refund_id: int
):

    return (
        db.query(Refund)
        .filter(Refund.id == refund_id)
        .first()
    )


def create_refund(
    db: Session,
    refund_data: RefundCreate
):

    new_refund = Refund(
        **refund_data.model_dump()
    )

    db.add(new_refund)
    db.commit()
    db.refresh(new_refund)

    return new_refund


def update_refund(
    db: Session,
    refund_id: int,
    refund_data: RefundUpdate
):

    refund = get_refund(
        db,
        refund_id
    )

    if not refund:
        return None

    update_data = refund_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(refund, key, value)

    db.commit()
    db.refresh(refund)

    return refund


def delete_refund(
    db: Session,
    refund_id: int
):

    refund = get_refund(
        db,
        refund_id
    )

    if not refund:
        return None

    db.delete(refund)
    db.commit()

    return refund