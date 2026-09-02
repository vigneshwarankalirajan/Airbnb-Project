from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.notification_preference import (
    NotificationPreferenceCreate,
    NotificationPreferenceUpdate,
    NotificationPreferenceResponse
)

from app.crud.notification_preference import (
    create_notification_preference,
    get_notification_preference_by_user_id,
    update_notification_preference,
    delete_notification_preference
)


router = APIRouter(
    prefix="/notification-preferences",
    tags=["Notification Preferences"]
)


# CREATE
@router.post(
    "/",
    response_model=NotificationPreferenceResponse,
    status_code=status.HTTP_201_CREATED
)
def create_preference(
    preference: NotificationPreferenceCreate,
    db: Session = Depends(get_db)
):
    existing = get_notification_preference_by_user_id(
        db,
        preference.user_id
    )

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Notification preferences already exist for this user"
        )

    return create_notification_preference(
        db,
        preference
    )


# GET
@router.get(
    "/{user_id}",
    response_model=NotificationPreferenceResponse
)
def get_preference(
    user_id: int,
    db: Session = Depends(get_db)
):
    preference = get_notification_preference_by_user_id(
        db,
        user_id
    )

    if not preference:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification preferences not found"
        )

    return preference


# UPDATE
@router.put(
    "/{user_id}",
    response_model=NotificationPreferenceResponse
)
def update_preference(
    user_id: int,
    preference: NotificationPreferenceUpdate,
    db: Session = Depends(get_db)
):
    db_preference = get_notification_preference_by_user_id(
        db,
        user_id
    )

    if not db_preference:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification preferences not found"
        )

    return update_notification_preference(
        db,
        db_preference,
        preference
    )


# DELETE
@router.delete(
    "/{user_id}"
)
def delete_preference(
    user_id: int,
    db: Session = Depends(get_db)
):
    db_preference = get_notification_preference_by_user_id(
        db,
        user_id
    )

    if not db_preference:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification preferences not found"
        )

    delete_notification_preference(
        db,
        db_preference
    )

    return {
        "message": "Notification preferences deleted successfully"
    }