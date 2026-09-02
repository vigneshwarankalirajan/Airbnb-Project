from datetime import datetime, time

from pydantic import BaseModel, ConfigDict


class PropertyRuleBase(BaseModel):
    property_id: int
    smoking_allowed: bool = False
    pets_allowed: bool = False
    parties_allowed: bool = False
    check_in_time: time | None = None
    check_out_time: time | None = None
    additional_rules: str | None = None


class PropertyRuleCreate(PropertyRuleBase):
    pass


class PropertyRuleUpdate(PropertyRuleBase):
    pass


class PropertyRuleResponse(PropertyRuleBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)