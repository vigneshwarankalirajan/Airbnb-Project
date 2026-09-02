from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.crud.notification import (
    get_notifications,
    get_notification,
    create_notification,
    update_notification,
    delete_notification,
)

from app.schemas.notification import (
    NotificationCreate,
    NotificationUpdate,
    NotificationResponse,
)


router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


# GET ALL

@router.get(
    "/",
    response_model=list[NotificationResponse]
)
def read_notifications(
    db: Session = Depends(get_db)
):

    return get_notifications(db)


# GET ONE

@router.get(
    "/{notification_id}",
    response_model=NotificationResponse
)
def read_notification(
    notification_id: int,
    db: Session = Depends(get_db)
):

    notification = get_notification(
        db,
        notification_id
    )

    if not notification:

        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    return notification


# CREATE

@router.post(
    "/",
    response_model=NotificationResponse,
    status_code=201
)
def create_new_notification(
    notification_data: NotificationCreate,
    db: Session = Depends(get_db)
):

    return create_notification(
        db,
        notification_data
    )


# UPDATE

@router.put(
    "/{notification_id}",
    response_model=NotificationResponse
)
def update_existing_notification(
    notification_id: int,
    notification_data: NotificationUpdate,
    db: Session = Depends(get_db)
):

    notification = update_notification(
        db,
        notification_id,
        notification_data
    )

    if not notification:

        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    return notification


# DELETE

@router.delete(
    "/{notification_id}"
)
def delete_existing_notification(
    notification_id: int,
    db: Session = Depends(get_db)
):

    notification = delete_notification(
        db,
        notification_id
    )

    if not notification:

        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    return {
        "message": "Notification deleted successfully",
        "id": notification_id
    }