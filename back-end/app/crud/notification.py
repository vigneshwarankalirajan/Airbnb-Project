from sqlalchemy.orm import Session

from app.models.notification import Notification

from app.schemas.notification import (
    NotificationCreate,
    NotificationUpdate,
)


# GET ALL

def get_notifications(
    db: Session
):

    return (
        db.query(Notification)
        .all()
    )


# GET ONE

def get_notification(
    db: Session,
    notification_id: int
):

    return (
        db.query(Notification)
        .filter(
            Notification.id == notification_id
        )
        .first()
    )


# CREATE

def create_notification(
    db: Session,
    notification_data: NotificationCreate
):

    new_notification = Notification(
        **notification_data.model_dump()
    )

    db.add(new_notification)

    db.commit()

    db.refresh(new_notification)

    return new_notification


# UPDATE

def update_notification(
    db: Session,
    notification_id: int,
    notification_data: NotificationUpdate
):

    notification = get_notification(
        db,
        notification_id
    )

    if not notification:
        return None

    update_data = notification_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():

        setattr(
            notification,
            key,
            value
        )

    db.commit()

    db.refresh(notification)

    return notification


# DELETE

def delete_notification(
    db: Session,
    notification_id: int
):

    notification = get_notification(
        db,
        notification_id
    )

    if not notification:
        return None

    db.delete(notification)

    db.commit()

    return notification