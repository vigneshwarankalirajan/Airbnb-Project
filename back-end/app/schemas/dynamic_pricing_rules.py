from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


# -----------------------------
# BASE
# -----------------------------

class DynamicPricingRuleBase(BaseModel):
    property_id: int
    rule_name: str
    rule_type: str
    adjustment_percentage: Decimal
    start_date: date
    end_date: date
    status: str = "active"


# -----------------------------
# CREATE
# -----------------------------

class DynamicPricingRuleCreate(
    DynamicPricingRuleBase
):
    pass


# -----------------------------
# UPDATE
# -----------------------------

class DynamicPricingRuleUpdate(BaseModel):
    property_id: int | None = None
    rule_name: str | None = None
    rule_type: str | None = None
    adjustment_percentage: Decimal | None = None
    start_date: date | None = None
    end_date: date | None = None
    status: str | None = None


# -----------------------------
# RESPONSE
# -----------------------------

class DynamicPricingRuleResponse(
    DynamicPricingRuleBase
):
    id: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )