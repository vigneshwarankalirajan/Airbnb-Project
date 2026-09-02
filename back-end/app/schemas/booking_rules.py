from datetime import datetime, time

from pydantic import BaseModel, ConfigDict


# -----------------------------
# BASE
# -----------------------------

class BookingRuleBase(BaseModel):
    property_id: int
    minimum_stay: int
    maximum_stay: int
    advance_notice_hours: int
    same_day_booking: bool = False
    check_in_start: time
    check_in_end: time
    check_out_time: time


# -----------------------------
# CREATE
# -----------------------------

class BookingRuleCreate(BookingRuleBase):
    pass


# -----------------------------
# UPDATE
# -----------------------------

class BookingRuleUpdate(BaseModel):
    property_id: int | None = None
    minimum_stay: int | None = None
    maximum_stay: int | None = None
    advance_notice_hours: int | None = None
    same_day_booking: bool | None = None
    check_in_start: time | None = None
    check_in_end: time | None = None
    check_out_time: time | None = None


# -----------------------------
# RESPONSE
# -----------------------------

class BookingRuleResponse(BookingRuleBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )