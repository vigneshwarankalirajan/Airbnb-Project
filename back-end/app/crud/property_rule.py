from sqlalchemy.orm import Session

from app.models.property_rule import PropertyRule
from app.schemas.property_rule import (
    PropertyRuleCreate,
    PropertyRuleUpdate,
)


def get_property_rules(db: Session):
    return db.query(PropertyRule).all()


def get_property_rule(
    db: Session,
    property_rule_id: int
):
    return (
        db.query(PropertyRule)
        .filter(PropertyRule.id == property_rule_id)
        .first()
    )


def create_property_rule(
    db: Session,
    property_rule: PropertyRuleCreate
):
    db_property_rule = PropertyRule(
        **property_rule.model_dump()
    )

    db.add(db_property_rule)
    db.commit()
    db.refresh(db_property_rule)

    return db_property_rule


def update_property_rule(
    db: Session,
    property_rule_id: int,
    property_rule: PropertyRuleUpdate
):
    db_property_rule = (
        db.query(PropertyRule)
        .filter(PropertyRule.id == property_rule_id)
        .first()
    )

    if not db_property_rule:
        return None

    update_data = property_rule.model_dump()

    for key, value in update_data.items():
        setattr(db_property_rule, key, value)

    db.commit()
    db.refresh(db_property_rule)

    return db_property_rule


def delete_property_rule(
    db: Session,
    property_rule_id: int
):
    db_property_rule = (
        db.query(PropertyRule)
        .filter(PropertyRule.id == property_rule_id)
        .first()
    )

    if not db_property_rule:
        return None

    db.delete(db_property_rule)
    db.commit()

    return db_property_rule