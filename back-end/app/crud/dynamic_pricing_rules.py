from sqlalchemy.orm import Session

from app.models.dynamic_pricing_rules import (
    DynamicPricingRule
)

from app.schemas.dynamic_pricing_rules import (
    DynamicPricingRuleCreate,
    DynamicPricingRuleUpdate
)


def get_dynamic_pricing_rules(db: Session):
    return db.query(DynamicPricingRule).all()


def get_dynamic_pricing_rule(
    db: Session,
    rule_id: int
):
    return (
        db.query(DynamicPricingRule)
        .filter(DynamicPricingRule.id == rule_id)
        .first()
    )


def create_dynamic_pricing_rule(
    db: Session,
    rule_data: DynamicPricingRuleCreate
):
    new_rule = DynamicPricingRule(
        **rule_data.model_dump()
    )

    db.add(new_rule)
    db.commit()
    db.refresh(new_rule)

    return new_rule


def update_dynamic_pricing_rule(
    db: Session,
    rule_id: int,
    rule_data: DynamicPricingRuleUpdate
):
    rule = get_dynamic_pricing_rule(
        db,
        rule_id
    )

    if not rule:
        return None

    update_data = rule_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(rule, key, value)

    db.commit()
    db.refresh(rule)

    return rule


def delete_dynamic_pricing_rule(
    db: Session,
    rule_id: int
):
    rule = get_dynamic_pricing_rule(
        db,
        rule_id
    )

    if not rule:
        return None

    db.delete(rule)
    db.commit()

    return rule