from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.payment import (
    PaymentCreate,
    PaymentResponse,
    PaymentUpdate,
)

from app.crud.payment import (
    get_payments,
    get_payment,
    create_payment,
    update_payment,
    delete_payment,
)


router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)


# -----------------------------
# GET ALL
# -----------------------------

@router.get(
    "/",
    response_model=list[PaymentResponse]
)
def read_payments(
    db: Session = Depends(get_db)
):

    return get_payments(db)


# -----------------------------
# GET ONE
# -----------------------------

@router.get(
    "/{payment_id}",
    response_model=PaymentResponse
)
def read_payment(
    payment_id: int,
    db: Session = Depends(get_db)
):

    payment = get_payment(
        db,
        payment_id
    )

    if not payment:

        raise HTTPException(
            status_code=404,
            detail="Payment not found"
        )

    return payment


# -----------------------------
# CREATE
# -----------------------------

@router.post(
    "/",
    response_model=PaymentResponse
)
def create_new_payment(
    payment_data: PaymentCreate,
    db: Session = Depends(get_db)
):

    return create_payment(
        db,
        payment_data
    )


# -----------------------------
# UPDATE
# -----------------------------

@router.put(
    "/{payment_id}",
    response_model=PaymentResponse
)
def update_existing_payment(
    payment_id: int,
    payment_data: PaymentUpdate,
    db: Session = Depends(get_db)
):

    payment = update_payment(
        db,
        payment_id,
        payment_data
    )

    if not payment:

        raise HTTPException(
            status_code=404,
            detail="Payment not found"
        )

    return payment


# -----------------------------
# DELETE
# -----------------------------

@router.delete(
    "/{payment_id}"
)
def delete_existing_payment(
    payment_id: int,
    db: Session = Depends(get_db)
):

    payment = delete_payment(
        db,
        payment_id
    )

    if not payment:

        raise HTTPException(
            status_code=404,
            detail="Payment not found"
        )

    return {
        "message": "Payment deleted successfully",
        "id": payment_id
    }