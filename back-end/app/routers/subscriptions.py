from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.subscriptions import (
    SubscriptionCreate,
    SubscriptionResponse,
    SubscriptionUpdate,
)

from app.crud.subscriptions import (
    get_subscriptions,
    get_subscription,
    create_subscription,
    update_subscription,
    delete_subscription,
)


router = APIRouter(
    prefix="/subscriptions",
    tags=["Subscriptions"]
)


# -----------------------------
# GET ALL
# -----------------------------

@router.get(
    "/",
    response_model=list[SubscriptionResponse]
)
def read_subscriptions(
    db: Session = Depends(get_db)
):
    return get_subscriptions(db)


# -----------------------------
# GET BY ID
# -----------------------------

@router.get(
    "/{subscription_id}",
    response_model=SubscriptionResponse
)
def read_subscription(
    subscription_id: int,
    db: Session = Depends(get_db)
):
    subscription = get_subscription(
        db,
        subscription_id
    )

    if not subscription:
        raise HTTPException(
            status_code=404,
            detail="Subscription not found"
        )

    return subscription


# -----------------------------
# CREATE
# -----------------------------

@router.post(
    "/",
    response_model=SubscriptionResponse
)
def create_new_subscription(
    subscription_data: SubscriptionCreate,
    db: Session = Depends(get_db)
):
    return create_subscription(
        db,
        subscription_data
    )


# -----------------------------
# UPDATE
# -----------------------------

@router.put(
    "/{subscription_id}",
    response_model=SubscriptionResponse
)
def update_existing_subscription(
    subscription_id: int,
    subscription_data: SubscriptionUpdate,
    db: Session = Depends(get_db)
):
    subscription = update_subscription(
        db,
        subscription_id,
        subscription_data
    )

    if not subscription:
        raise HTTPException(
            status_code=404,
            detail="Subscription not found"
        )

    return subscription


# -----------------------------
# DELETE
# -----------------------------

@router.delete(
    "/{subscription_id}"
)
def delete_existing_subscription(
    subscription_id: int,
    db: Session = Depends(get_db)
):
    subscription = delete_subscription(
        db,
        subscription_id
    )

    if not subscription:
        raise HTTPException(
            status_code=404,
            detail="Subscription not found"
        )

    return {
        "message": "Subscription deleted successfully",
        "id": subscription_id
    }