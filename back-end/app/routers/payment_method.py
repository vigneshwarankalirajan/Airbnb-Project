from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.payment_method import (
    PaymentMethodCreate,
    PaymentMethodResponse,
    PaymentMethodUpdate,
)

from app.crud.payment_method import (
    get_payment_methods,
    get_payment_method,
    create_payment_method,
    update_payment_method,
    delete_payment_method,
)


router = APIRouter(
    prefix="/payment-methods",
    tags=["Payment Methods"]
)


# GET ALL

@router.get(
    "/",
    response_model=list[PaymentMethodResponse]
)
def read_payment_methods(
    db: Session = Depends(get_db)
):

    return get_payment_methods(db)


# GET ONE

@router.get(
    "/{payment_method_id}",
    response_model=PaymentMethodResponse
)
def read_payment_method(
    payment_method_id: int,
    db: Session = Depends(get_db)
):

    payment_method = get_payment_method(
        db,
        payment_method_id
    )

    if not payment_method:

        raise HTTPException(
            status_code=404,
            detail="Payment method not found"
        )

    return payment_method


# CREATE

@router.post(
    "/",
    response_model=PaymentMethodResponse
)
def create_new_payment_method(
    payment_method_data: PaymentMethodCreate,
    db: Session = Depends(get_db)
):

    return create_payment_method(
        db,
        payment_method_data
    )


# UPDATE

@router.put(
    "/{payment_method_id}",
    response_model=PaymentMethodResponse
)
def update_existing_payment_method(
    payment_method_id: int,
    payment_method_data: PaymentMethodUpdate,
    db: Session = Depends(get_db)
):

    payment_method = update_payment_method(
        db,
        payment_method_id,
        payment_method_data
    )

    if not payment_method:

        raise HTTPException(
            status_code=404,
            detail="Payment method not found"
        )

    return payment_method


# DELETE

@router.delete(
    "/{payment_method_id}"
)
def delete_existing_payment_method(
    payment_method_id: int,
    db: Session = Depends(get_db)
):

    payment_method = delete_payment_method(
        db,
        payment_method_id
    )

    if not payment_method:

        raise HTTPException(
            status_code=404,
            detail="Payment method not found"
        )

    return {
        "message": "Payment method deleted successfully",
        "id": payment_method_id
    }