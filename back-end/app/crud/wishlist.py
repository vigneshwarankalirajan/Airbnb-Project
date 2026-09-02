from sqlalchemy.orm import Session

from app.models.wishlist import Wishlist
from app.schemas.wishlist import (
    WishlistCreate,
    WishlistUpdate,
)


def create_wishlist(
    db: Session,
    wishlist_data: WishlistCreate
):
    wishlist = Wishlist(
        user_id=wishlist_data.user_id,
        name=wishlist_data.name,
        description=wishlist_data.description,
        is_private=wishlist_data.is_private,
    )

    db.add(wishlist)
    db.commit()
    db.refresh(wishlist)

    return wishlist


def get_wishlist(
    db: Session,
    wishlist_id: int
):
    return (
        db.query(Wishlist)
        .filter(Wishlist.id == wishlist_id)
        .first()
    )


def get_user_wishlists(
    db: Session,
    user_id: int
):
    return (
        db.query(Wishlist)
        .filter(Wishlist.user_id == user_id)
        .order_by(Wishlist.created_at.desc())
        .all()
    )


def update_wishlist(
    db: Session,
    wishlist_id: int,
    wishlist_data: WishlistUpdate
):
    wishlist = get_wishlist(
        db,
        wishlist_id
    )

    if not wishlist:
        return None

    update_data = wishlist_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(wishlist, key, value)

    db.commit()
    db.refresh(wishlist)

    return wishlist


def delete_wishlist(
    db: Session,
    wishlist_id: int
):
    wishlist = get_wishlist(
        db,
        wishlist_id
    )

    if not wishlist:
        return None

    db.delete(wishlist)
    db.commit()

    return True