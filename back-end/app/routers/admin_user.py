from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.admin_user import (
    AdminUserCreate,
    AdminUserUpdate,
    AdminUserResponse
)

from app.crud.admin_user import (
    create_admin_user,
    get_admin_users,
    get_admin_user,
    get_admin_users_by_user,
    update_admin_user,
    delete_admin_user
)

router = APIRouter(
    prefix="/admin-users",
    tags=["Admin Users"]
)


# Create Admin User
@router.post(
    "/",
    response_model=AdminUserResponse
)
def create_new_admin_user(
    admin_data: AdminUserCreate,
    db: Session = Depends(get_db)
):
    return create_admin_user(
        db,
        admin_data
    )


# Read All Admin Users
@router.get(
    "/",
    response_model=list[AdminUserResponse]
)
def read_admin_users(
    db: Session = Depends(get_db)
):
    return get_admin_users(db)


# Read Single Admin User
@router.get(
    "/{admin_id}",
    response_model=AdminUserResponse
)
def read_admin_user(
    admin_id: int,
    db: Session = Depends(get_db)
):
    admin_user = get_admin_user(
        db,
        admin_id
    )

    if not admin_user:
        raise HTTPException(
            status_code=404,
            detail="Admin user not found"
        )

    return admin_user


# Update Admin User
@router.put(
    "/{admin_id}",
    response_model=AdminUserResponse
)
def update_existing_admin_user(
    admin_id: int,
    admin_data: AdminUserUpdate,
    db: Session = Depends(get_db)
):
    admin_user = update_admin_user(
        db,
        admin_id,
        admin_data
    )

    if not admin_user:
        raise HTTPException(
            status_code=404,
            detail="Admin user not found"
        )

    return admin_user


# Delete Admin User
@router.delete(
    "/{admin_id}"
)
def delete_existing_admin_user(
    admin_id: int,
    db: Session = Depends(get_db)
):
    result = delete_admin_user(
        db,
        admin_id
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Admin user not found"
        )

    return {
        "message": "Admin user deleted successfully"
    }


# Get Admin Users by User ID
@router.get(
    "/user/{user_id}",
    response_model=list[AdminUserResponse]
)
def read_admin_users_by_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    return get_admin_users_by_user(
        db,
        user_id
    )