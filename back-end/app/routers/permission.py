from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.permission import (
    PermissionCreate,
    PermissionUpdate,
    PermissionResponse
)

from app.crud.permission import (
    create_permission,
    get_permissions,
    get_permission,
    update_permission,
    delete_permission
)


router = APIRouter(
    prefix="/permissions",
    tags=["Permissions"]
)


@router.post(
    "/",
    response_model=PermissionResponse
)
def create_new_permission(
    permission_data: PermissionCreate,
    db: Session = Depends(get_db)
):
    return create_permission(
        db,
        permission_data
    )


@router.get(
    "/",
    response_model=list[PermissionResponse]
)
def read_permissions(
    db: Session = Depends(get_db)
):
    return get_permissions(db)


@router.get(
    "/{permission_id}",
    response_model=PermissionResponse
)
def read_permission(
    permission_id: int,
    db: Session = Depends(get_db)
):
    permission = get_permission(
        db,
        permission_id
    )

    if not permission:
        raise HTTPException(
            status_code=404,
            detail="Permission not found"
        )

    return permission


@router.put(
    "/{permission_id}",
    response_model=PermissionResponse
)
def update_existing_permission(
    permission_id: int,
    permission_data: PermissionUpdate,
    db: Session = Depends(get_db)
):
    permission = update_permission(
        db,
        permission_id,
        permission_data
    )

    if not permission:
        raise HTTPException(
            status_code=404,
            detail="Permission not found"
        )

    return permission


@router.delete(
    "/{permission_id}"
)
def delete_existing_permission(
    permission_id: int,
    db: Session = Depends(get_db)
):
    permission = delete_permission(
        db,
        permission_id
    )

    if not permission:
        raise HTTPException(
            status_code=404,
            detail="Permission not found"
        )

    return {
        "message": "Permission deleted successfully"
    }