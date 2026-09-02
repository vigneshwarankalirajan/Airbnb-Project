from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.cancellation_policies import (
    CancellationPolicyCreate,
    CancellationPolicyResponse,
    CancellationPolicyUpdate,
)

from app.crud.cancellation_policies import (
    get_cancellation_policies,
    get_cancellation_policy,
    create_cancellation_policy,
    update_cancellation_policy,
    delete_cancellation_policy,
)


router = APIRouter(
    prefix="/cancellation-policies",
    tags=["Cancellation Policies"]
)


# -----------------------------
# GET ALL
# -----------------------------

@router.get(
    "/",
    response_model=list[CancellationPolicyResponse]
)
def read_cancellation_policies(
    db: Session = Depends(get_db)
):
    return get_cancellation_policies(db)


# -----------------------------
# GET BY ID
# -----------------------------

@router.get(
    "/{policy_id}",
    response_model=CancellationPolicyResponse
)
def read_cancellation_policy(
    policy_id: int,
    db: Session = Depends(get_db)
):
    policy = get_cancellation_policy(
        db,
        policy_id
    )

    if not policy:
        raise HTTPException(
            status_code=404,
            detail="Cancellation policy not found"
        )

    return policy


# -----------------------------
# CREATE
# -----------------------------

@router.post(
    "/",
    response_model=CancellationPolicyResponse
)
def create_new_cancellation_policy(
    policy_data: CancellationPolicyCreate,
    db: Session = Depends(get_db)
):
    return create_cancellation_policy(
        db,
        policy_data
    )


# -----------------------------
# UPDATE
# -----------------------------

@router.put(
    "/{policy_id}",
    response_model=CancellationPolicyResponse
)
def update_existing_cancellation_policy(
    policy_id: int,
    policy_data: CancellationPolicyUpdate,
    db: Session = Depends(get_db)
):
    policy = update_cancellation_policy(
        db,
        policy_id,
        policy_data
    )

    if not policy:
        raise HTTPException(
            status_code=404,
            detail="Cancellation policy not found"
        )

    return policy


# -----------------------------
# DELETE
# -----------------------------

@router.delete(
    "/{policy_id}"
)
def delete_existing_cancellation_policy(
    policy_id: int,
    db: Session = Depends(get_db)
):
    policy = delete_cancellation_policy(
        db,
        policy_id
    )

    if not policy:
        raise HTTPException(
            status_code=404,
            detail="Cancellation policy not found"
        )

    return {
        "message": "Cancellation policy deleted successfully",
        "id": policy_id
    }