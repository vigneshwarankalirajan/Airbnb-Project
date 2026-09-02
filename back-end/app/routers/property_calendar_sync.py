from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.property_calendar_sync import (
    PropertyCalendarSyncCreate,
    PropertyCalendarSyncResponse,
    PropertyCalendarSyncUpdate,
)

from app.crud.property_calendar_sync import (
    get_property_calendar_syncs,
    get_property_calendar_sync,
    create_property_calendar_sync,
    update_property_calendar_sync,
    delete_property_calendar_sync,
)


router = APIRouter(
    prefix="/property-calendar-sync",
    tags=["Property Calendar Sync"]
)


# -----------------------------
# GET ALL
# -----------------------------

@router.get(
    "/",
    response_model=list[PropertyCalendarSyncResponse]
)
def read_property_calendar_syncs(
    db: Session = Depends(get_db)
):
    return get_property_calendar_syncs(db)


# -----------------------------
# GET BY ID
# -----------------------------

@router.get(
    "/{sync_id}",
    response_model=PropertyCalendarSyncResponse
)
def read_property_calendar_sync(
    sync_id: int,
    db: Session = Depends(get_db)
):
    sync = get_property_calendar_sync(
        db,
        sync_id
    )

    if not sync:
        raise HTTPException(
            status_code=404,
            detail="Property calendar sync not found"
        )

    return sync


# -----------------------------
# CREATE
# -----------------------------

@router.post(
    "/",
    response_model=PropertyCalendarSyncResponse
)
def create_new_property_calendar_sync(
    sync_data: PropertyCalendarSyncCreate,
    db: Session = Depends(get_db)
):
    return create_property_calendar_sync(
        db,
        sync_data
    )


# -----------------------------
# UPDATE
# -----------------------------

@router.put(
    "/{sync_id}",
    response_model=PropertyCalendarSyncResponse
)
def update_existing_property_calendar_sync(
    sync_id: int,
    sync_data: PropertyCalendarSyncUpdate,
    db: Session = Depends(get_db)
):
    sync = update_property_calendar_sync(
        db,
        sync_id,
        sync_data
    )

    if not sync:
        raise HTTPException(
            status_code=404,
            detail="Property calendar sync not found"
        )

    return sync


# -----------------------------
# DELETE
# -----------------------------

@router.delete(
    "/{sync_id}"
)
def delete_existing_property_calendar_sync(
    sync_id: int,
    db: Session = Depends(get_db)
):
    sync = delete_property_calendar_sync(
        db,
        sync_id
    )

    if not sync:
        raise HTTPException(
            status_code=404,
            detail="Property calendar sync not found"
        )

    return {
        "message": "Property calendar sync deleted successfully",
        "id": sync_id
    }