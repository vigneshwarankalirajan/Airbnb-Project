from sqlalchemy.orm import Session

from app.models.permission import Permission
from app.schemas.permission import (
    PermissionCreate,
    PermissionUpdate
)


def create_permission(
    db: Session,
    permission_data: PermissionCreate
):
    permission = Permission(
        name=permission_data.name,
        description=permission_data.description,
        module=permission_data.module
    )

    db.add(permission)
    db.commit()
    db.refresh(permission)

    return permission


def get_permissions(db: Session):
    return db.query(Permission).all()


def get_permission(
    db: Session,
    permission_id: int
):
    return db.query(Permission).filter(
        Permission.id == permission_id
    ).first()


def update_permission(
    db: Session,
    permission_id: int,
    permission_data: PermissionUpdate
):
    permission = get_permission(
        db,
        permission_id
    )

    if not permission:
        return None

    update_data = permission_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(permission, key, value)

    db.commit()
    db.refresh(permission)

    return permission


def delete_permission(
    db: Session,
    permission_id: int
):
    permission = get_permission(
        db,
        permission_id
    )

    if not permission:
        return None

    db.delete(permission)
    db.commit()

    return permission