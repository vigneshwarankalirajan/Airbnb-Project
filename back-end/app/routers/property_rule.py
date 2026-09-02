from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.crud import property_rule as crud
from app.schemas.property_rule import (
    PropertyRuleCreate,
    PropertyRuleResponse,
    PropertyRuleUpdate,
)


router = APIRouter(
    prefix="/property-rules",
    tags=["Property Rules"]
)


@router.get(
    "/",
    response_model=list[PropertyRuleResponse]
)
def read_property_rules(
    db: Session = Depends(get_db)
):
    return crud.get_property_rules(db)


@router.post(
    "/",
    response_model=PropertyRuleResponse
)
def create_new_property_rule(
    property_rule: PropertyRuleCreate,
    db: Session = Depends(get_db)
):
    return crud.create_property_rule(
        db,
        property_rule
    )


@router.get(
    "/{property_rule_id}",
    response_model=PropertyRuleResponse
)
def read_property_rule(
    property_rule_id: int,
    db: Session = Depends(get_db)
):
    db_property_rule = crud.get_property_rule(
        db,
        property_rule_id
    )

    if not db_property_rule:
        raise HTTPException(
            status_code=404,
            detail="Property rule not found"
        )

    return db_property_rule


@router.put(
    "/{property_rule_id}",
    response_model=PropertyRuleResponse
)
def update_existing_property_rule(
    property_rule_id: int,
    property_rule: PropertyRuleUpdate,
    db: Session = Depends(get_db)
):
    db_property_rule = crud.update_property_rule(
        db,
        property_rule_id,
        property_rule
    )

    if not db_property_rule:
        raise HTTPException(
            status_code=404,
            detail="Property rule not found"
        )

    return db_property_rule


@router.delete(
    "/{property_rule_id}"
)
def delete_existing_property_rule(
    property_rule_id: int,
    db: Session = Depends(get_db)
):
    db_property_rule = crud.delete_property_rule(
        db,
        property_rule_id
    )

    if not db_property_rule:
        raise HTTPException(
            status_code=404,
            detail="Property rule not found"
        )

    return {
        "message": "Property rule deleted successfully",
        "id": property_rule_id
    }