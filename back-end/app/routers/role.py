
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.role import (
    RoleCreate,
    RoleUpdate,
    RoleResponse
)

from app.crud.role import (
    create_role,
    get_roles,
    get_role,
    update_role,
    delete_role
)


router = APIRouter(
    prefix="/roles",
    tags=["Roles"]
)


@router.post(
    "/",
    response_model=RoleResponse
)
def create_new_role(
    role_data: RoleCreate,
    db: Session = Depends(get_db)
):
    return create_role(
        db,
        role_data
    )


@router.get(
    "/",
    response_model=list[RoleResponse]
)
def read_roles(
    db: Session = Depends(get_db)
):
    return get_roles(db)


@router.get(
    "/{role_id}",
    response_model=RoleResponse
)
def read_role(
    role_id: int,
    db: Session = Depends(get_db)
):
    role = get_role(
        db,
        role_id
    )

    if not role:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    return role


@router.put(
    "/{role_id}",
    response_model=RoleResponse
)
def update_existing_role(
    role_id: int,
    role_data: RoleUpdate,
    db: Session = Depends(get_db)
):
    role = update_role(
        db,
        role_id,
        role_data
    )

    if not role:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    return role


@router.delete(
    "/{role_id}"
)
def delete_existing_role(
    role_id: int,
    db: Session = Depends(get_db)
):
    role = delete_role(
        db,
        role_id
    )

    if not role:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    return {
        "message": "Role deleted successfully"
    }

