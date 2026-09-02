from sqlalchemy.orm import Session

from app.models.cancellation_policies import (
    CancellationPolicy
)

from app.schemas.cancellation_policies import (
    CancellationPolicyCreate,
    CancellationPolicyUpdate
)


def get_cancellation_policies(db: Session):
    return db.query(CancellationPolicy).all()


def get_cancellation_policy(
    db: Session,
    policy_id: int
):
    return (
        db.query(CancellationPolicy)
        .filter(CancellationPolicy.id == policy_id)
        .first()
    )


def create_cancellation_policy(
    db: Session,
    policy_data: CancellationPolicyCreate
):
    new_policy = CancellationPolicy(
        **policy_data.model_dump()
    )

    db.add(new_policy)
    db.commit()
    db.refresh(new_policy)

    return new_policy


def update_cancellation_policy(
    db: Session,
    policy_id: int,
    policy_data: CancellationPolicyUpdate
):
    policy = get_cancellation_policy(
        db,
        policy_id
    )

    if not policy:
        return None

    update_data = policy_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(policy, key, value)

    db.commit()
    db.refresh(policy)

    return policy


def delete_cancellation_policy(
    db: Session,
    policy_id: int
):
    policy = get_cancellation_policy(
        db,
        policy_id
    )

    if not policy:
        return None

    db.delete(policy)
    db.commit()

    return policy