from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.commissions import (
    CommissionCreate,
    CommissionResponse,
    CommissionUpdate,
)

from app.crud.commissions import (
    get_commissions,
    get_commission,
    create_commission,
    update_commission,
    delete_commission,
)


router = APIRouter(
    prefix="/commissions",
    tags=["Commissions"]
)


# -----------------------------
# GET ALL
# -----------------------------

@router.get(
    "/",
    response_model=list[CommissionResponse]
)
def read_commissions(
    db: Session = Depends(get_db)
):
    return get_commissions(db)


# -----------------------------
# GET BY ID
# -----------------------------

@router.get(
    "/{commission_id}",
    response_model=CommissionResponse
)
def read_commission(
    commission_id: int,
    db: Session = Depends(get_db)
):
    commission = get_commission(
        db,
        commission_id
    )

    if not commission:
        raise HTTPException(
            status_code=404,
            detail="Commission not found"
        )

    return commission


# -----------------------------
# CREATE
# -----------------------------

@router.post(
    "/",
    response_model=CommissionResponse
)
def create_new_commission(
    commission_data: CommissionCreate,
    db: Session = Depends(get_db)
):
    return create_commission(
        db,
        commission_data
    )


# -----------------------------
# UPDATE
# -----------------------------

@router.put(
    "/{commission_id}",
    response_model=CommissionResponse
)
def update_existing_commission(
    commission_id: int,
    commission_data: CommissionUpdate,
    db: Session = Depends(get_db)
):
    commission = update_commission(
        db,
        commission_id,
        commission_data
    )

    if not commission:
        raise HTTPException(
            status_code=404,
            detail="Commission not found"
        )

    return commission


# -----------------------------
# DELETE
# -----------------------------

@router.delete(
    "/{commission_id}"
)
def delete_existing_commission(
    commission_id: int,
    db: Session = Depends(get_db)
):
    commission = delete_commission(
        db,
        commission_id
    )

    if not commission:
        raise HTTPException(
            status_code=404,
            detail="Commission not found"
        )

    return {
        "message": "Commission deleted successfully",
        "id": commission_id
    }