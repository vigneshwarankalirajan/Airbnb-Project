from sqlalchemy.orm import Session

from app.models.commissions import Commission

from app.schemas.commissions import (
    CommissionCreate,
    CommissionUpdate
)


def get_commissions(db: Session):
    return db.query(Commission).all()


def get_commission(
    db: Session,
    commission_id: int
):
    return (
        db.query(Commission)
        .filter(Commission.id == commission_id)
        .first()
    )


def create_commission(
    db: Session,
    commission_data: CommissionCreate
):
    new_commission = Commission(
        **commission_data.model_dump()
    )

    db.add(new_commission)
    db.commit()
    db.refresh(new_commission)

    return new_commission


def update_commission(
    db: Session,
    commission_id: int,
    commission_data: CommissionUpdate
):
    commission = get_commission(
        db,
        commission_id
    )

    if not commission:
        return None

    update_data = commission_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(commission, key, value)

    db.commit()
    db.refresh(commission)

    return commission


def delete_commission(
    db: Session,
    commission_id: int
):
    commission = get_commission(
        db,
        commission_id
    )

    if not commission:
        return None

    db.delete(commission)
    db.commit()

    return commission