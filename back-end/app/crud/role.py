
from sqlalchemy.orm import Session
from datetime import datetime

from app.models.role import Role
from app.schemas.role import RoleCreate, RoleUpdate


def create_role(
    db: Session,
    role_data: RoleCreate
):
    role = Role(
        name=role_data.name,
        description=role_data.description,
        status=role_data.status,
        created_at=datetime.utcnow()
    )

    db.add(role)
    db.commit()
    db.refresh(role)

    return role


def get_roles(db: Session):
    return db.query(Role).all()


def get_role(
    db: Session,
    role_id: int
):
    return (
        db.query(Role)
        .filter(Role.id == role_id)
        .first()
    )


def update_role(
    db: Session,
    role_id: int,
    role_data: RoleUpdate
):
    role = (
        db.query(Role)
        .filter(Role.id == role_id)
        .first()
    )

    if not role:
        return None

    update_data = role_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(role, key, value)

    db.commit()
    db.refresh(role)

    return role


def delete_role(
    db: Session,
    role_id: int
):
    role = (
        db.query(Role)
        .filter(Role.id == role_id)
        .first()
    )

    if not role:
        return None

    db.delete(role)
    db.commit()

    return role

