from sqlalchemy.orm import Session

from app.models.payment_method import PaymentMethod

from app.schemas.payment_method import (
    PaymentMethodCreate,
    PaymentMethodUpdate,
)


# GET ALL

def get_payment_methods(db: Session):

    return (
        db.query(PaymentMethod)
        .all()
    )


# GET ONE

def get_payment_method(
    db: Session,
    payment_method_id: int
):

    return (
        db.query(PaymentMethod)
        .filter(
            PaymentMethod.id == payment_method_id
        )
        .first()
    )


# CREATE

def create_payment_method(
    db: Session,
    payment_method_data: PaymentMethodCreate
):

    new_payment_method = PaymentMethod(
        **payment_method_data.model_dump()
    )

    db.add(new_payment_method)

    db.commit()

    db.refresh(new_payment_method)

    return new_payment_method


# UPDATE

def update_payment_method(
    db: Session,
    payment_method_id: int,
    payment_method_data: PaymentMethodUpdate
):

    payment_method = get_payment_method(
        db,
        payment_method_id
    )

    if not payment_method:
        return None

    update_data = payment_method_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():

        setattr(
            payment_method,
            key,
            value
        )

    db.commit()

    db.refresh(payment_method)

    return payment_method


# DELETE

def delete_payment_method(
    db: Session,
    payment_method_id: int
):

    payment_method = get_payment_method(
        db,
        payment_method_id
    )

    if not payment_method:
        return None

    db.delete(payment_method)

    db.commit()

    return payment_method