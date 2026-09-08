from typing import List

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.crud.host_penalty import (
    get_host_penalties,
    get_host_penalty,
    create_host_penalty,
    update_host_penalty,
    delete_host_penalty
)

from app.schemas.host_penalty import (
    HostPenaltyCreate,
    HostPenaltyUpdate,
    HostPenaltyResponse
)


router = APIRouter(
    prefix="/host-penalties",
    tags=["Host Penalties"]
)


# =====================================================
# GET ALL
# =====================================================

@router.get(
    "/",
    response_model=List[HostPenaltyResponse]
)
def get_all_host_penalties(

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

    return get_host_penalties(

        db=db,

        skip=skip,

        limit=limit
    )


# =====================================================
# GET BY ID
# =====================================================

@router.get(
    "/{penalty_id}",
    response_model=HostPenaltyResponse
)
def get_host_penalty_by_id(

    penalty_id: int,

    db: Session = Depends(get_db)

):

    penalty = get_host_penalty(

        db=db,

        penalty_id=penalty_id
    )

    if not penalty:

        raise HTTPException(
            status_code=404,
            detail="Host penalty not found"
        )

    return penalty


# =====================================================
# POST - CREATE
# =====================================================

@router.post(
    "/",
    response_model=HostPenaltyResponse,
    status_code=201
)
def create_new_host_penalty(

    penalty_data: HostPenaltyCreate,

    db: Session = Depends(get_db)

):

    return create_host_penalty(

        db=db,

        penalty_data=penalty_data
    )


# =====================================================
# PUT - UPDATE
# =====================================================

@router.put(
    "/{penalty_id}",
    response_model=HostPenaltyResponse
)
def update_existing_host_penalty(

    penalty_id: int,

    penalty_data: HostPenaltyUpdate,

    db: Session = Depends(get_db)

):

    penalty = update_host_penalty(

        db=db,

        penalty_id=penalty_id,

        penalty_data=penalty_data
    )

    if not penalty:

        raise HTTPException(
            status_code=404,
            detail="Host penalty not found"
        )

    return penalty


# =====================================================
# DELETE
# =====================================================

@router.delete(
    "/{penalty_id}"
)
def delete_existing_host_penalty(

    penalty_id: int,

    db: Session = Depends(get_db)

):

    penalty = delete_host_penalty(

        db=db,

        penalty_id=penalty_id
    )

    if not penalty:

        raise HTTPException(
            status_code=404,
            detail="Host penalty not found"
        )

    return {
        "message": "Host penalty deleted successfully",
        "penalty_id": penalty_id
    }