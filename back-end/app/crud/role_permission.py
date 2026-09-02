from sqlalchemy.orm import Session

from app.models.role_permission import RolePermission
from app.schemas.role_permission import (
    RolepermissionCreate,
    RolepermissionUpdate
)


def create_role_permission(
    db: Session,
    role_permission_data: RolepermissionCreate
):
    new_role_permission = RolePermission(
        role_id=role_permission_data.role_id,
        permission_id=role_permission_data.permission_id
    )

    db.add(new_role_permission)
    db.commit()
    db.refresh(new_role_permission)

    return new_role_permission


def get_role_permissions(db: Session):
    return db.query(RolePermission).all()


def get_role_permission(
    db: Session,
    role_permission_id: int
):
    return (
        db.query(RolePermission)
        .filter(RolePermission.id == role_permission_id)
        .first()
    )


def update_role_permission(
    db: Session,
    role_permission_id: int,
    role_permission_data: RolepermissionUpdate
):
    role_permission = (
        db.query(RolePermission)
        .filter(RolePermission.id == role_permission_id)
        .first()
    )

    if not role_permission:
        return None

    if role_permission_data.role_id is not None:
        role_permission.role_id = role_permission_data.role_id

    if role_permission_data.permission_id is not None:
        role_permission.permission_id = role_permission_data.permission_id

    db.commit()
    db.refresh(role_permission)

    return role_permission


def delete_role_permission(
    db: Session,
    role_permission_id: int
):
    role_permission = (
        db.query(RolePermission)
        .filter(RolePermission.id == role_permission_id)
        .first()
    )

    if not role_permission:
        return False

    db.delete(role_permission)
    db.commit()

    return True