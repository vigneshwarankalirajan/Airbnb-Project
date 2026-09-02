from sqlalchemy.orm import Session

from app.models.currency import Currency

from app.schemas.currency import (
    CurrencyCreate,
    CurrencyUpdate,
)


# =========================================================
# GET ALL
# =========================================================

def get_currencies(db: Session):

    return (
        db.query(Currency)
        .all()
    )


# =========================================================
# GET ONE
# =========================================================

def get_currency(
    db: Session,
    currency_id: int
):

    return (
        db.query(Currency)
        .filter(
            Currency.id == currency_id
        )
        .first()
    )


# =========================================================
# CREATE
# =========================================================

def create_currency(
    db: Session,
    currency_data: CurrencyCreate
):

    new_currency = Currency(
        **currency_data.model_dump()
    )

    db.add(new_currency)

    db.commit()

    db.refresh(new_currency)

    return new_currency


# =========================================================
# UPDATE
# =========================================================

def update_currency(
    db: Session,
    currency_id: int,
    currency_data: CurrencyUpdate
):

    currency = get_currency(
        db,
        currency_id
    )

    if not currency:
        return None

    update_data = currency_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():

        setattr(
            currency,
            key,
            value
        )

    db.commit()

    db.refresh(currency)

    return currency


# =========================================================
# DELETE
# =========================================================

def delete_currency(
    db: Session,
    currency_id: int
):

    currency = get_currency(
        db,
        currency_id
    )

    if not currency:
        return None

    db.delete(currency)

    db.commit()

    return currency