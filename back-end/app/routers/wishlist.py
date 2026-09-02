from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from sqlalchemy.orm import Session

from app.database import get_db

from app.crud.wishlist import (
    create_wishlist,
    get_wishlist,
    get_user_wishlists,
    update_wishlist,
    delete_wishlist,
)

from app.schemas.wishlist import (
    WishlistCreate,
    WishlistUpdate,
    WishlistResponse,
)


router = APIRouter(
    prefix="/wishlists",
    tags=["Wishlists"]
)


@router.post(
    "/",
    response_model=WishlistResponse
)
def create(
    wishlist_data: WishlistCreate,
    db: Session = Depends(get_db)
):
    return create_wishlist(
        db,
        wishlist_data
    )


@router.get(
    "/{wishlist_id}",
    response_model=WishlistResponse
)
def get(
    wishlist_id: int,
    db: Session = Depends(get_db)
):
    wishlist = get_wishlist(
        db,
        wishlist_id
    )

    if not wishlist:
        raise HTTPException(
            status_code=404,
            detail="Wishlist not found"
        )

    return wishlist


@router.get(
    "/user/{user_id}",
    response_model=list[WishlistResponse]
)
def get_by_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    return get_user_wishlists(
        db,
        user_id
    )


@router.put(
    "/{wishlist_id}",
    response_model=WishlistResponse
)
def update(
    wishlist_id: int,
    wishlist_data: WishlistUpdate,
    db: Session = Depends(get_db)
):
    wishlist = update_wishlist(
        db,
        wishlist_id,
        wishlist_data
    )

    if not wishlist:
        raise HTTPException(
            status_code=404,
            detail="Wishlist not found"
        )

    return wishlist


@router.delete(
    "/{wishlist_id}"
)
def delete(
    wishlist_id: int,
    db: Session = Depends(get_db)
):
    deleted = delete_wishlist(
        db,
        wishlist_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Wishlist not found"
        )

    return {
        "message": "Wishlist deleted successfully"
    }