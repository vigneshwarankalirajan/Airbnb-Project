from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.booking_rules import (
    BookingRuleCreate,
    BookingRuleResponse,
    BookingRuleUpdate,
)

from app.crud.booking_rules import (
    get_booking_rules,
    get_booking_rule,
    create_booking_rule,
    update_booking_rule,
    delete_booking_rule,
)


router = APIRouter(
    prefix="/booking-rules",
    tags=["Booking Rules"]
)


# -----------------------------
# GET ALL
# -----------------------------

@router.get(
    "/",
    response_model=list[BookingRuleResponse]
)
def read_booking_rules(
    db: Session = Depends(get_db)
):
    return get_booking_rules(db)


# -----------------------------
# GET BY ID
# -----------------------------

@router.get(
    "/{booking_rule_id}",
    response_model=BookingRuleResponse
)
def read_booking_rule(
    booking_rule_id: int,
    db: Session = Depends(get_db)
):
    booking_rule = get_booking_rule(
        db,
        booking_rule_id
    )

    if not booking_rule:
        raise HTTPException(
            status_code=404,
            detail="Booking rule not found"
        )

    return booking_rule


# -----------------------------
# CREATE
# -----------------------------

@router.post(
    "/",
    response_model=BookingRuleResponse
)
def create_new_booking_rule(
    booking_rule_data: BookingRuleCreate,
    db: Session = Depends(get_db)
):
    return create_booking_rule(
        db,
        booking_rule_data
    )


# -----------------------------
# UPDATE
# -----------------------------

@router.put(
    "/{booking_rule_id}",
    response_model=BookingRuleResponse
)
def update_existing_booking_rule(
    booking_rule_id: int,
    booking_rule_data: BookingRuleUpdate,
    db: Session = Depends(get_db)
):
    booking_rule = update_booking_rule(
        db,
        booking_rule_id,
        booking_rule_data
    )

    if not booking_rule:
        raise HTTPException(
            status_code=404,
            detail="Booking rule not found"
        )

    return booking_rule


# -----------------------------
# DELETE
# -----------------------------

@router.delete(
    "/{booking_rule_id}"
)
def delete_existing_booking_rule(
    booking_rule_id: int,
    db: Session = Depends(get_db)
):
    booking_rule = delete_booking_rule(
        db,
        booking_rule_id
    )

    if not booking_rule:
        raise HTTPException(
            status_code=404,
            detail="Booking rule not found"
        )

    return {
        "message": "Booking rule deleted successfully",
        "id": booking_rule_id
    }