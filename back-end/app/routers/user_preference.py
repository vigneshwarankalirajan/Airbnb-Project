from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.user_preference import (
    UserPreferenceCreate,
    UserPreferenceUpdate,
    UserPreferenceResponse
)

from app.crud.user_preference import (
    create_user_preference,
    get_user_preferences,
    get_user_preference,
    get_preferences_by_user,
    update_user_preference,
    delete_user_preference
)


router = APIRouter(
    prefix="/user-preferences",
    tags=["User Preferences"]
)


@router.post(
    "/",
    response_model=UserPreferenceResponse
)
def create_preference(
    preference_data: UserPreferenceCreate,
    db: Session = Depends(get_db)
):
    return create_user_preference(
        db,
        preference_data
    )


@router.get(
    "/",
    response_model=list[UserPreferenceResponse]
)
def read_preferences(
    db: Session = Depends(get_db)
):
    return get_user_preferences(db)


# Keep this route before /{preference_id}
@router.get(
    "/user/{user_id}",
    response_model=list[UserPreferenceResponse]
)
def read_user_preferences(
    user_id: int,
    db: Session = Depends(get_db)
):
    return get_preferences_by_user(
        db,
        user_id
    )


@router.get(
    "/{preference_id}",
    response_model=UserPreferenceResponse
)
def read_preference(
    preference_id: int,
    db: Session = Depends(get_db)
):
    preference = get_user_preference(
        db,
        preference_id
    )

    if not preference:
        raise HTTPException(
            status_code=404,
            detail="User preference not found"
        )

    return preference


@router.put(
    "/{preference_id}",
    response_model=UserPreferenceResponse
)
def update_preference(
    preference_id: int,
    preference_data: UserPreferenceUpdate,
    db: Session = Depends(get_db)
):
    preference = update_user_preference(
        db,
        preference_id,
        preference_data
    )

    if not preference:
        raise HTTPException(
            status_code=404,
            detail="User preference not found"
        )

    return preference


@router.delete(
    "/{preference_id}"
)
def delete_preference(
    preference_id: int,
    db: Session = Depends(get_db)
):
    result = delete_user_preference(
        db,
        preference_id
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="User preference not found"
        )

    return {
        "message": "User preference deleted successfully"
    }