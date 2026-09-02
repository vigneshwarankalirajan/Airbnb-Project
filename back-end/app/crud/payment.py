from sqlalchemy.orm import Session

from app.models.payment import Payment
from app.schemas.payment import (
    PaymentCreate,
    PaymentUpdate,
)


# -----------------------------
# GET ALL
# -----------------------------

def get_payments(db: Session):

    return (
        db.query(Payment)
        .all()
    )


# -----------------------------
# GET ONE
# -----------------------------

def get_payment(
    db: Session,
    payment_id: int
):

    return (
        db.query(Payment)
        .filter(Payment.id == payment_id)
        .first()
    )


# -----------------------------
# CREATE
# -----------------------------

def create_payment(
    db: Session,
    payment_data: PaymentCreate
):

    new_payment = Payment(
        **payment_data.model_dump()
    )

    db.add(new_payment)

    db.commit()

    db.refresh(new_payment)

    return new_payment


# -----------------------------
# UPDATE
# -----------------------------

def update_payment(
    db: Session,
    payment_id: int,
    payment_data: PaymentUpdate
):

    payment = get_payment(
        db,
        payment_id
    )

    if not payment:
        return None

    update_data = payment_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():

        setattr(
            payment,
            key,
            value
        )

    db.commit()

    db.refresh(payment)

    return payment


# -----------------------------
# DELETE
# -----------------------------

def delete_payment(
    db: Session,
    payment_id: int
):

    payment = get_payment(
        db,
        payment_id
    )

    if not payment:
        return None

    db.delete(payment)

    db.commit()

    return payment