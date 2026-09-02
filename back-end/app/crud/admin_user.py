from datetime import datetime

from sqlalchemy.orm import Session

from app.models.admin_user import AdminUser
from app.schemas.admin_user import (
    AdminUserCreate,
    AdminUserUpdate
)


# Create Admin User
def create_admin_user(
    db: Session,
    admin_data: AdminUserCreate
):
    admin_user = AdminUser(
        user_id=admin_data.user_id,
        admin_type=admin_data.admin_type,
        status=admin_data.status,
        created_at=datetime.utcnow()
    )

    db.add(admin_user)
    db.commit()
    db.refresh(admin_user)

    return admin_user


# Get All Admin Users
def get_admin_users(db: Session):
    return db.query(AdminUser).all()


# Get Admin User by ID
def get_admin_user(
    db: Session,
    admin_user_id: int
):
    return (
        db.query(AdminUser)
        .filter(AdminUser.id == admin_user_id)
        .first()
    )


# Get Admin Users by User ID
def get_admin_users_by_user(
    db: Session,
    user_id: int
):
    return (
        db.query(AdminUser)
        .filter(AdminUser.user_id == user_id)
        .all()
    )


# Update Admin User
def update_admin_user(
    db: Session,
    admin_user_id: int,
    admin_data: AdminUserUpdate
):
    admin_user = (
        db.query(AdminUser)
        .filter(AdminUser.id == admin_user_id)
        .first()
    )

    if not admin_user:
        return None

    admin_user.admin_type = admin_data.admin_type
    admin_user.status = admin_data.status

    db.commit()
    db.refresh(admin_user)

    return admin_user


# Delete Admin User
def delete_admin_user(
    db: Session,
    admin_user_id: int
):
    admin_user = (
        db.query(AdminUser)
        .filter(AdminUser.id == admin_user_id)
        .first()
    )

    if not admin_user:
        return False

    db.delete(admin_user)
    db.commit()

    return True