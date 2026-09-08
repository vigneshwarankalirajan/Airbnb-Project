from typing import List

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.crud.dispute import (
    get_disputes,
    get_dispute,
    create_dispute,
    update_dispute,
    delete_dispute
)

from app.schemas.dispute import (
    DisputeCreate,
    DisputeUpdate,
    DisputeResponse
)


router = APIRouter(
    prefix="/disputes",
    tags=["Disputes"]
)


# =====================================================
# GET ALL
# =====================================================

@router.get(
    "/",
    response_model=List[DisputeResponse]
)
def get_all_disputes(

    skip: int = Query(
        0,
        ge=0
    ),

    limit: int = Query(
        100,
        ge=1,
        le=500
    ),

    db: Session = Depends(get_db)

):

    return get_disputes(

        db=db,

        skip=skip,

        limit=limit

    )


# =====================================================
# GET BY ID
# =====================================================

@router.get(
    "/{dispute_id}",
    response_model=DisputeResponse
)
def get_dispute_by_id(

    dispute_id: int,

    db: Session = Depends(get_db)

):

    dispute = get_dispute(

        db=db,

        dispute_id=dispute_id

    )

    if not dispute:

        raise HTTPException(

            status_code=404,

            detail="Dispute not found"

        )

    return dispute


# =====================================================
# POST - CREATE
# =====================================================

@router.post(
    "/",
    response_model=DisputeResponse,
    status_code=201
)
def create_new_dispute(

    dispute_data: DisputeCreate,

    db: Session = Depends(get_db)

):

    return create_dispute(

        db=db,

        dispute_data=dispute_data

    )


# =====================================================
# PUT - UPDATE
# =====================================================

@router.put(
    "/{dispute_id}",
    response_model=DisputeResponse
)
def update_existing_dispute(

    dispute_id: int,

    dispute_data: DisputeUpdate,

    db: Session = Depends(get_db)

):

    dispute = update_dispute(

        db=db,

        dispute_id=dispute_id,

        dispute_data=dispute_data

    )

    if not dispute:

        raise HTTPException(

            status_code=404,

            detail="Dispute not found"

        )

    return dispute


# =====================================================
# DELETE
# =====================================================

@router.delete(
    "/{dispute_id}"
)
def delete_existing_dispute(

    dispute_id: int,

    db: Session = Depends(get_db)

):

    dispute = delete_dispute(

        db=db,

        dispute_id=dispute_id

    )

    if not dispute:

        raise HTTPException(

            status_code=404,

            detail="Dispute not found"

        )

    return {

        "message": "Dispute deleted successfully",

        "dispute_id": dispute_id

    }