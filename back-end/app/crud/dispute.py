from datetime import datetime

from sqlalchemy.orm import Session

from app.models.dispute import Dispute
from app.schemas.dispute import (
    DisputeCreate,
    DisputeUpdate
)


# =====================================================
# GET ALL DISPUTES
# =====================================================

def get_disputes(
    db: Session,
    skip: int = 0,
    limit: int = 100
):

    return (
        db.query(Dispute)
        .order_by(Dispute.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


# =====================================================
# GET DISPUTE BY ID
# =====================================================

def get_dispute(
    db: Session,
    dispute_id: int
):

    return (
        db.query(Dispute)
        .filter(
            Dispute.id == dispute_id
        )
        .first()
    )


# =====================================================
# CREATE DISPUTE
# =====================================================

def create_dispute(
    db: Session,
    dispute_data: DisputeCreate
):

    dispute = Dispute(

        booking_id=dispute_data.booking_id,

        raised_by=dispute_data.raised_by,

        against_user_id=dispute_data.against_user_id,

        dispute_type=dispute_data.dispute_type,

        subject=dispute_data.subject,

        description=dispute_data.description,

        dispute_status="open",

        priority=dispute_data.priority or "medium"
    )

    db.add(dispute)

    db.commit()

    db.refresh(dispute)

    return dispute


# =====================================================
# UPDATE DISPUTE
# =====================================================

def update_dispute(
    db: Session,
    dispute_id: int,
    dispute_data: DisputeUpdate
):

    dispute = (
        db.query(Dispute)
        .filter(
            Dispute.id == dispute_id
        )
        .first()
    )

    if not dispute:
        return None

    update_data = dispute_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():

        setattr(
            dispute,
            field,
            value
        )

    dispute.updated_at = datetime.utcnow()

    db.commit()

    db.refresh(dispute)

    return dispute


# =====================================================
# DELETE DISPUTE
# =====================================================

def delete_dispute(
    db: Session,
    dispute_id: int
):

    dispute = (
        db.query(Dispute)
        .filter(
            Dispute.id == dispute_id
        )
        .first()
    )

    if not dispute:
        return None

    db.delete(dispute)

    db.commit()

    return dispute