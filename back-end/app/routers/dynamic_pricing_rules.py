from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.dynamic_pricing_rules import (
    DynamicPricingRuleCreate,
    DynamicPricingRuleResponse,
    DynamicPricingRuleUpdate,
)

from app.crud.dynamic_pricing_rules import (
    get_dynamic_pricing_rules,
    get_dynamic_pricing_rule,
    create_dynamic_pricing_rule,
    update_dynamic_pricing_rule,
    delete_dynamic_pricing_rule,
)


router = APIRouter(
    prefix="/dynamic-pricing-rules",
    tags=["Dynamic Pricing Rules"]
)


# -----------------------------
# GET ALL
# -----------------------------

@router.get(
    "/",
    response_model=list[DynamicPricingRuleResponse]
)
def read_dynamic_pricing_rules(
    db: Session = Depends(get_db)
):
    return get_dynamic_pricing_rules(db)


# -----------------------------
# GET BY ID
# -----------------------------

@router.get(
    "/{rule_id}",
    response_model=DynamicPricingRuleResponse
)
def read_dynamic_pricing_rule(
    rule_id: int,
    db: Session = Depends(get_db)
):
    rule = get_dynamic_pricing_rule(
        db,
        rule_id
    )

    if not rule:
        raise HTTPException(
            status_code=404,
            detail="Dynamic pricing rule not found"
        )

    return rule


# -----------------------------
# CREATE
# -----------------------------

@router.post(
    "/",
    response_model=DynamicPricingRuleResponse
)
def create_new_dynamic_pricing_rule(
    rule_data: DynamicPricingRuleCreate,
    db: Session = Depends(get_db)
):
    return create_dynamic_pricing_rule(
        db,
        rule_data
    )


# -----------------------------
# UPDATE
# -----------------------------

@router.put(
    "/{rule_id}",
    response_model=DynamicPricingRuleResponse
)
def update_existing_dynamic_pricing_rule(
    rule_id: int,
    rule_data: DynamicPricingRuleUpdate,
    db: Session = Depends(get_db)
):
    rule = update_dynamic_pricing_rule(
        db,
        rule_id,
        rule_data
    )

    if not rule:
        raise HTTPException(
            status_code=404,
            detail="Dynamic pricing rule not found"
        )

    return rule


# -----------------------------
# DELETE
# -----------------------------

@router.delete(
    "/{rule_id}"
)
def delete_existing_dynamic_pricing_rule(
    rule_id: int,
    db: Session = Depends(get_db)
):
    rule = delete_dynamic_pricing_rule(
        db,
        rule_id
    )

    if not rule:
        raise HTTPException(
            status_code=404,
            detail="Dynamic pricing rule not found"
        )

    return {
        "message": "Dynamic pricing rule deleted successfully",
        "id": rule_id
    }