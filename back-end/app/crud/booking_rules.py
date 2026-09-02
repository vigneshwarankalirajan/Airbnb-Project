from sqlalchemy.orm import Session

from app.models.booking_rules import BookingRule

from app.schemas.booking_rules import (
    BookingRuleCreate,
    BookingRuleUpdate
)


def get_booking_rules(db: Session):
    return db.query(BookingRule).all()


def get_booking_rule(
    db: Session,
    booking_rule_id: int
):
    return (
        db.query(BookingRule)
        .filter(BookingRule.id == booking_rule_id)
        .first()
    )


def create_booking_rule(
    db: Session,
    booking_rule_data: BookingRuleCreate
):
    new_booking_rule = BookingRule(
        **booking_rule_data.model_dump()
    )

    db.add(new_booking_rule)
    db.commit()
    db.refresh(new_booking_rule)

    return new_booking_rule


def update_booking_rule(
    db: Session,
    booking_rule_id: int,
    booking_rule_data: BookingRuleUpdate
):
    booking_rule = get_booking_rule(
        db,
        booking_rule_id
    )

    if not booking_rule:
        return None

    update_data = booking_rule_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(booking_rule, key, value)

    db.commit()
    db.refresh(booking_rule)

    return booking_rule


def delete_booking_rule(
    db: Session,
    booking_rule_id: int
):
    booking_rule = get_booking_rule(
        db,
        booking_rule_id
    )

    if not booking_rule:
        return None

    db.delete(booking_rule)
    db.commit()

    return booking_rule