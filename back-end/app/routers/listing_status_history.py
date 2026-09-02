from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.listing_status_history import (
    ListingStatusHistoryCreate,
    ListingStatusHistoryUpdate,
    ListingStatusHistoryResponse
)

from app.crud.listing_status_history import (
    get_listing_status_histories,
    get_listing_status_history,
    create_listing_status_history,
    update_listing_status_history,
    delete_listing_status_history
)


router = APIRouter(
    prefix="/listing-status-history",
    tags=["Listing Status History"]
)


@router.get(
    "/",
    response_model=list[ListingStatusHistoryResponse]
)
def read_listing_status_histories(
    db: Session = Depends(get_db)
):
    return get_listing_status_histories(db)


@router.post(
    "/",
    response_model=ListingStatusHistoryResponse
)
def create_new_listing_status_history(
    history: ListingStatusHistoryCreate,
    db: Session = Depends(get_db)
):
    return create_listing_status_history(db, history)


@router.get(
    "/{listing_status_history_id}",
    response_model=ListingStatusHistoryResponse
)
def read_listing_status_history(
    listing_status_history_id: int,
    db: Session = Depends(get_db)
):
    history = get_listing_status_history(
        db,
        listing_status_history_id
    )

    if not history:
        raise HTTPException(
            status_code=404,
            detail="Listing status history not found"
        )

    return history


@router.put(
    "/{listing_status_history_id}",
    response_model=ListingStatusHistoryResponse
)
def update_existing_listing_status_history(
    listing_status_history_id: int,
    history: ListingStatusHistoryUpdate,
    db: Session = Depends(get_db)
):
    updated_history = update_listing_status_history(
        db,
        listing_status_history_id,
        history
    )

    if not updated_history:
        raise HTTPException(
            status_code=404,
            detail="Listing status history not found"
        )

    return updated_history


@router.delete(
    "/{listing_status_history_id}"
)
def delete_existing_listing_status_history(
    listing_status_history_id: int,
    db: Session = Depends(get_db)
):
    deleted_history = delete_listing_status_history(
        db,
        listing_status_history_id
    )

    if not deleted_history:
        raise HTTPException(
            status_code=404,
            detail="Listing status history not found"
        )

    return {
        "message": "Listing status history deleted successfully",
        "id": listing_status_history_id
    }