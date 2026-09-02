from datetime import datetime

from sqlalchemy.orm import Session

from app.models.user_preference import UserPreference
from app.schemas.user_preference import (
    UserPreferenceCreate,
    UserPreferenceUpdate
)


def create_user_preference(
    db: Session,
    preference_data: UserPreferenceCreate
):
    preference = UserPreference(
        user_id=preference_data.user_id,
        language=preference_data.language,
        currency=preference_data.currency,
        theme=preference_data.theme,
        email_notifications=preference_data.email_notifications,
        sms_notifications=preference_data.sms_notifications,
        push_notifications=preference_data.push_notifications,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.add(preference)
    db.commit()
    db.refresh(preference)

    return preference


def get_user_preferences(
    db: Session
):
    return (
        db.query(UserPreference)
        .order_by(UserPreference.id)
        .all()
    )


def get_user_preference(
    db: Session,
    preference_id: int
):
    return (
        db.query(UserPreference)
        .filter(UserPreference.id == preference_id)
        .first()
    )


def get_preferences_by_user(
    db: Session,
    user_id: int
):
    return (
        db.query(UserPreference)
        .filter(UserPreference.user_id == user_id)
        .order_by(UserPreference.id)
        .all()
    )


def update_user_preference(
    db: Session,
    preference_id: int,
    preference_data: UserPreferenceUpdate
):
    preference = (
        db.query(UserPreference)
        .filter(UserPreference.id == preference_id)
        .first()
    )

    if not preference:
        return None

    preference.language = preference_data.language
    preference.currency = preference_data.currency
    preference.theme = preference_data.theme
    preference.email_notifications = (
        preference_data.email_notifications
    )
    preference.sms_notifications = (
        preference_data.sms_notifications
    )
    preference.push_notifications = (
        preference_data.push_notifications
    )
    preference.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(preference)

    return preference


def delete_user_preference(
    db: Session,
    preference_id: int
):
    preference = (
        db.query(UserPreference)
        .filter(UserPreference.id == preference_id)
        .first()
    )

    if not preference:
        return None

    db.delete(preference)
    db.commit()

    return preference