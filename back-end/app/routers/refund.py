from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.refund import (
    RefundCreate,
    RefundResponse,
    RefundUpdate,
)

from app.crud.refund import (
    get_refunds,
    get_refund,
    create_refund,
    update_refund,
    delete_refund,
)


router = APIRouter(
    prefix="/refunds",
    tags=["Refunds"]
)


@router.get(
    "/",
    response_model=list[RefundResponse]
)
def read_refunds(
    db: Session = Depends(get_db)
):

    return get_refunds(db)


@router.get(
    "/{refund_id}",
    response_model=RefundResponse
)
def read_refund(
    refund_id: int,
    db: Session = Depends(get_db)
):

    refund = get_refund(
        db,
        refund_id
    )

    if not refund:
        raise HTTPException(
            status_code=404,
            detail="Refund not found"
        )

    return refund


@router.post(
    "/",
    response_model=RefundResponse
)
def create_new_refund(
    refund_data: RefundCreate,
    db: Session = Depends(get_db)
):

    return create_refund(
        db,
        refund_data
    )


@router.put(
    "/{refund_id}",
    response_model=RefundResponse
)
def update_existing_refund(
    refund_id: int,
    refund_data: RefundUpdate,
    db: Session = Depends(get_db)
):

    refund = update_refund(
        db,
        refund_id,
        refund_data
    )

    if not refund:
        raise HTTPException(
            status_code=404,
            detail="Refund not found"
        )

    return refund


@router.delete(
    "/{refund_id}"
)
def delete_existing_refund(
    refund_id: int,
    db: Session = Depends(get_db)
):

    refund = delete_refund(
        db,
        refund_id
    )

    if not refund:
        raise HTTPException(
            status_code=404,
            detail="Refund not found"
        )

    return {
        "message": "Refund deleted successfully",
        "id": refund_id
    }