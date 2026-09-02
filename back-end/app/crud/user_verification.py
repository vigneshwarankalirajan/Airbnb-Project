from datetime import datetime

from sqlalchemy.orm import Session

from app.models.user_verification import UserVerification

from app.schemas.user_verification import (
    UserVerificationCreate,
    UserVerificationUpdate
)


def create_user_verification(
    db: Session,
    verification_data: UserVerificationCreate
):
    verification = UserVerification(
        user_id=verification_data.user_id,
        document_type=verification_data.document_type,
        document_number=verification_data.document_number,
        document_url=verification_data.document_url,
        verification_status=verification_data.verification_status,
        created_at=datetime.now()
    )

    db.add(verification)
    db.commit()
    db.refresh(verification)

    return verification


def get_user_verifications(
    db: Session
):
    return db.query(UserVerification).all()


def get_user_verification(
    db: Session,
    verification_id: int
):
    return (
        db.query(UserVerification)
        .filter(UserVerification.id == verification_id)
        .first()
    )


def get_verifications_by_user(
    db: Session,
    user_id: int
):
    return (
        db.query(UserVerification)
        .filter(UserVerification.user_id == user_id)
        .all()
    )


def update_user_verification(
    db: Session,
    verification_id: int,
    verification_data: UserVerificationUpdate
):
    verification = (
        db.query(UserVerification)
        .filter(UserVerification.id == verification_id)
        .first()
    )

    if not verification:
        return None

    update_data = verification_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(verification, field, value)

    db.commit()
    db.refresh(verification)

    return verification


def delete_user_verification(
    db: Session,
    verification_id: int
):
    verification = (
        db.query(UserVerification)
        .filter(UserVerification.id == verification_id)
        .first()
    )

    if not verification:
        return False

    db.delete(verification)
    db.commit()

    return True