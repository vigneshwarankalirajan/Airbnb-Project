from datetime import datetime

from sqlalchemy.orm import Session

from app.models.host_penalty import HostPenalty

from app.schemas.host_penalty import (
    HostPenaltyCreate,
    HostPenaltyUpdate
)


# =====================================================
# GET ALL
# =====================================================

def get_host_penalties(
    db: Session,
    skip: int = 0,
    limit: int = 100
):

    return (
        db.query(HostPenalty)
        .order_by(
            HostPenalty.created_at.desc()
        )
        .offset(skip)
        .limit(limit)
        .all()
    )


# =====================================================
# GET BY ID
# =====================================================

def get_host_penalty(
    db: Session,
    penalty_id: int
):

    return (
        db.query(HostPenalty)
        .filter(
            HostPenalty.id == penalty_id
        )
        .first()
    )


# =====================================================
# CREATE
# =====================================================

def create_host_penalty(
    db: Session,
    penalty_data: HostPenaltyCreate
):

    penalty = HostPenalty(

        host_id=penalty_data.host_id,

        booking_id=penalty_data.booking_id,

        dispute_id=penalty_data.dispute_id,

        penalty_type=penalty_data.penalty_type,

        reason=penalty_data.reason,

        penalty_amount=penalty_data.penalty_amount,

        currency_id=penalty_data.currency_id,

        penalty_status="active",

        severity=penalty_data.severity or "medium",

        admin_notes=penalty_data.admin_notes,

        imposed_by=penalty_data.imposed_by
    )

    db.add(penalty)

    db.commit()

    db.refresh(penalty)

    return penalty


# =====================================================
# UPDATE
# =====================================================

def update_host_penalty(
    db: Session,
    penalty_id: int,
    penalty_data: HostPenaltyUpdate
):

    penalty = (
        db.query(HostPenalty)
        .filter(
            HostPenalty.id == penalty_id
        )
        .first()
    )

    if not penalty:
        return None

    update_data = penalty_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():

        setattr(
            penalty,
            field,
            value
        )

    penalty.updated_at = datetime.utcnow()

    db.commit()

    db.refresh(penalty)

    return penalty


# =====================================================
# DELETE
# =====================================================

def delete_host_penalty(
    db: Session,
    penalty_id: int
):

    penalty = (
        db.query(HostPenalty)
        .filter(
            HostPenalty.id == penalty_id
        )
        .first()
    )

    if not penalty:
        return None

    db.delete(penalty)

    db.commit()

    return penalty