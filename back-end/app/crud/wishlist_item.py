from sqlalchemy.orm import Session

from app.models.wishlist_item import WishlistItem
from app.schemas.wishlist_item import WishlistItemCreate


# =========================================================
# CREATE WISHLIST ITEM
# =========================================================

def create_wishlist_item(
    db: Session,
    wishlist_item: WishlistItemCreate
):
    # Check whether property is already in wishlist
    existing_item = (
        db.query(WishlistItem)
        .filter(
            WishlistItem.wishlist_id
            == wishlist_item.wishlist_id,
            WishlistItem.property_id
            == wishlist_item.property_id
        )
        .first()
    )

    if existing_item:
        return existing_item

    db_item = WishlistItem(
        wishlist_id=wishlist_item.wishlist_id,
        property_id=wishlist_item.property_id
    )

    db.add(db_item)
    db.commit()
    db.refresh(db_item)

    return db_item


# =========================================================
# GET ALL ITEMS BY WISHLIST
# =========================================================

def get_wishlist_items(
    db: Session,
    wishlist_id: int
):
    return (
        db.query(WishlistItem)
        .filter(
            WishlistItem.wishlist_id == wishlist_id
        )
        .all()
    )


# =========================================================
# GET SINGLE WISHLIST ITEM
# =========================================================

def get_wishlist_item(
    db: Session,
    item_id: int
):
    return (
        db.query(WishlistItem)
        .filter(
            WishlistItem.id == item_id
        )
        .first()
    )


# =========================================================
# CHECK PROPERTY IN WISHLIST
# =========================================================

def get_item_by_property(
    db: Session,
    wishlist_id: int,
    property_id: int
):
    return (
        db.query(WishlistItem)
        .filter(
            WishlistItem.wishlist_id == wishlist_id,
            WishlistItem.property_id == property_id
        )
        .first()
    )


# =========================================================
# DELETE WISHLIST ITEM
# =========================================================

def delete_wishlist_item(
    db: Session,
    wishlist_id: int,
    property_id: int
):
    item = (
        db.query(WishlistItem)
        .filter(
            WishlistItem.wishlist_id == wishlist_id,
            WishlistItem.property_id == property_id
        )
        .first()
    )

    if not item:
        return None

    db.delete(item)
    db.commit()

    return item