from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.user_verification import (
    UserVerificationCreate,
    UserVerificationUpdate,
    UserVerificationResponse
)

from app.crud.user_verification import (
    create_user_verification,
    get_user_verifications,
    get_user_verification,
    get_verifications_by_user,
    update_user_verification,
    delete_user_verification
)


router = APIRouter(
    prefix="/user-verifications",
    tags=["User Verifications"]
)


@router.post(
    "/",
    response_model=UserVerificationResponse
)
def create_verification(
    verification_data: UserVerificationCreate,
    db: Session = Depends(get_db)
):
    return create_user_verification(
        db,
        verification_data
    )


@router.get(
    "/",
    response_model=list[UserVerificationResponse]
)
def read_verifications(
    db: Session = Depends(get_db)
):
    return get_user_verifications(db)


@router.get(
    "/{verification_id}",
    response_model=UserVerificationResponse
)
def read_verification(
    verification_id: int,
    db: Session = Depends(get_db)
):
    verification = get_user_verification(
        db,
        verification_id
    )

    if not verification:
        raise HTTPException(
            status_code=404,
            detail="User verification not found"
        )

    return verification


@router.get(
    "/user/{user_id}",
    response_model=list[UserVerificationResponse]
)
def read_user_verifications(
    user_id: int,
    db: Session = Depends(get_db)
):
    return get_verifications_by_user(
        db,
        user_id
    )


@router.put(
    "/{verification_id}",
    response_model=UserVerificationResponse
)
def update_verification(
    verification_id: int,
    verification_data: UserVerificationUpdate,
    db: Session = Depends(get_db)
):
    verification = update_user_verification(
        db,
        verification_id,
        verification_data
    )

    if not verification:
        raise HTTPException(
            status_code=404,
            detail="User verification not found"
        )

    return verification


@router.delete(
    "/{verification_id}"
)
def delete_verification(
    verification_id: int,
    db: Session = Depends(get_db)
):
    result = delete_user_verification(
        db,
        verification_id
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="User verification not found"
        )

    return {
        "message": "User verification deleted successfully"
    }