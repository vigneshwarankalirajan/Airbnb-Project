from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.role_permission import (
    RolepermissionCreate,
    RolepermissionUpdate,
    RolepermissionResponse
)

from app.crud.role_permission import (
    create_role_permission,
    get_role_permissions,
    get_role_permission,
    update_role_permission,
    delete_role_permission
)


router = APIRouter(
    prefix="/role-permissions",
    tags=["Role Permissions"]
)


@router.post(
    "/",
    response_model=RolepermissionResponse
)
def create_new_role_permission(
    role_permission_data: RolepermissionCreate,
    db: Session = Depends(get_db)
):
    return create_role_permission(
        db,
        role_permission_data
    )


@router.get(
    "/",
    response_model=list[RolepermissionResponse]
)
def read_role_permissions(
    db: Session = Depends(get_db)
):
    return get_role_permissions(db)


@router.get(
    "/{role_permission_id}",
    response_model=RolepermissionResponse
)
def read_role_permission(
    role_permission_id: int,
    db: Session = Depends(get_db)
):
    role_permission = get_role_permission(
        db,
        role_permission_id
    )

    if not role_permission:
        raise HTTPException(
            status_code=404,
            detail="Role permission not found"
        )

    return role_permission


@router.put(
    "/{role_permission_id}",
    response_model=RolepermissionResponse
)
def update_existing_role_permission(
    role_permission_id: int,
    role_permission_data: RolepermissionUpdate,
    db: Session = Depends(get_db)
):
    role_permission = update_role_permission(
        db,
        role_permission_id,
        role_permission_data
    )

    if not role_permission:
        raise HTTPException(
            status_code=404,
            detail="Role permission not found"
        )

    return role_permission


@router.delete(
    "/{role_permission_id}"
)
def delete_existing_role_permission(
    role_permission_id: int,
    db: Session = Depends(get_db)
):
    result = delete_role_permission(
        db,
        role_permission_id
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Role permission not found"
        )

    return {
        "message": "Role permission deleted successfully"
    }