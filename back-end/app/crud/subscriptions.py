from sqlalchemy.orm import Session

from app.models.subscriptions import Subscription

from app.schemas.subscriptions import (
    SubscriptionCreate,
    SubscriptionUpdate
)


def get_subscriptions(db: Session):
    return db.query(Subscription).all()


def get_subscription(
    db: Session,
    subscription_id: int
):
    return (
        db.query(Subscription)
        .filter(Subscription.id == subscription_id)
        .first()
    )


def create_subscription(
    db: Session,
    subscription_data: SubscriptionCreate
):
    new_subscription = Subscription(
        **subscription_data.model_dump()
    )

    db.add(new_subscription)
    db.commit()
    db.refresh(new_subscription)

    return new_subscription


def update_subscription(
    db: Session,
    subscription_id: int,
    subscription_data: SubscriptionUpdate
):
    subscription = get_subscription(
        db,
        subscription_id
    )

    if not subscription:
        return None

    update_data = subscription_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(subscription, key, value)

    db.commit()
    db.refresh(subscription)

    return subscription


def delete_subscription(
    db: Session,
    subscription_id: int
):
    subscription = get_subscription(
        db,
        subscription_id
    )

    if not subscription:
        return None

    db.delete(subscription)
    db.commit()

    return subscription