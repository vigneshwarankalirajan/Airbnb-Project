from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.payout import (
    PayoutCreate,
    PayoutResponse,
    PayoutUpdate,
)

from app.crud.payout import (
    get_payouts,
    get_payout,
    create_payout,
    update_payout,
    delete_payout,
)


router = APIRouter(
    prefix="/payouts",
    tags=["Payouts"]
)


@router.get(
    "/",
    response_model=list[PayoutResponse]
)
def read_payouts(
    db: Session = Depends(get_db)
):

    return get_payouts(db)


@router.get(
    "/{payout_id}",
    response_model=PayoutResponse
)
def read_payout(
    payout_id: int,
    db: Session = Depends(get_db)
):

    payout = get_payout(
        db,
        payout_id
    )

    if not payout:
        raise HTTPException(
            status_code=404,
            detail="Payout not found"
        )

    return payout


@router.post(
    "/",
    response_model=PayoutResponse
)
def create_new_payout(
    payout_data: PayoutCreate,
    db: Session = Depends(get_db)
):

    return create_payout(
        db,
        payout_data
    )


@router.put(
    "/{payout_id}",
    response_model=PayoutResponse
)
def update_existing_payout(
    payout_id: int,
    payout_data: PayoutUpdate,
    db: Session = Depends(get_db)
):

    payout = update_payout(
        db,
        payout_id,
        payout_data
    )

    if not payout:
        raise HTTPException(
            status_code=404,
            detail="Payout not found"
        )

    return payout


@router.delete(
    "/{payout_id}"
)
def delete_existing_payout(
    payout_id: int,
    db: Session = Depends(get_db)
):

    payout = delete_payout(
        db,
        payout_id
    )

    if not payout:
        raise HTTPException(
            status_code=404,
            detail="Payout not found"
        )

    return {
        "message": "Payout deleted successfully",
        "id": payout_id
    }