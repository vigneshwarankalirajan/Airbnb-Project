from sqlalchemy.orm import Session

from app.models.notification_preference import NotificationPreference
from app.schemas.notification_preference import (
    NotificationPreferenceCreate,
    NotificationPreferenceUpdate
)


def create_notification_preference(
    db: Session,
    preference: NotificationPreferenceCreate
):
    db_preference = NotificationPreference(
        user_id=preference.user_id,
        booking_notifications=preference.booking_notifications,
        payment_notifications=preference.payment_notifications,
        message_notifications=preference.message_notifications,
        promotional_notifications=preference.promotional_notifications,
        email_notifications=preference.email_notifications,
        sms_notifications=preference.sms_notifications,
        push_notifications=preference.push_notifications,
    )

    db.add(db_preference)
    db.commit()
    db.refresh(db_preference)

    return db_preference


def get_notification_preference_by_user_id(
    db: Session,
    user_id: int
):
    return (
        db.query(NotificationPreference)
        .filter(NotificationPreference.user_id == user_id)
        .first()
    )


def update_notification_preference(
    db: Session,
    db_preference: NotificationPreference,
    preference: NotificationPreferenceUpdate
):
    update_data = preference.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(db_preference, field, value)

    db.commit()
    db.refresh(db_preference)

    return db_preference


def delete_notification_preference(
    db: Session,
    db_preference: NotificationPreference
):
    db.delete(db_preference)
    db.commit()

    return True