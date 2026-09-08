from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db

from app.schemas.wishlist_item import (
    WishlistItemCreate,
    WishlistItemResponse
)

from app.crud.wishlist_item import (
    create_wishlist_item,
    get_wishlist_items,
    get_wishlist_item,
    delete_wishlist_item
)


router = APIRouter(
    prefix="/wishlist-items",
    tags=["Wishlist Items"]
)


# =========================================================
# CREATE WISHLIST ITEM
# =========================================================

@router.post(
    "/",
    response_model=WishlistItemResponse
)
def create_item(
    wishlist_item: WishlistItemCreate,
    db: Session = Depends(get_db)
):
    return create_wishlist_item(
        db,
        wishlist_item
    )


# =========================================================
# GET ALL ITEMS BY WISHLIST ID
# =========================================================

@router.get(
    "/wishlist/{wishlist_id}",
    response_model=List[WishlistItemResponse]
)
def get_items_by_wishlist(
    wishlist_id: int,
    db: Session = Depends(get_db)
):
    return get_wishlist_items(
        db,
        wishlist_id
    )


# =========================================================
# GET SINGLE ITEM
# =========================================================

@router.get(
    "/{item_id}",
    response_model=WishlistItemResponse
)
def get_item(
    item_id: int,
    db: Session = Depends(get_db)
):
    item = get_wishlist_item(
        db,
        item_id
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Wishlist item not found"
        )

    return item


# =========================================================
# DELETE ITEM
# =========================================================

@router.delete(
    "/wishlist/{wishlist_id}/property/{property_id}"
)
def delete_item(
    wishlist_id: int,
    property_id: int,
    db: Session = Depends(get_db)
):
    item = delete_wishlist_item(
        db,
        wishlist_id,
        property_id
    )

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Wishlist item not found"
        )

    return {
        "message": "Property removed from wishlist successfully"
    }