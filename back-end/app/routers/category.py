from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.category import (
    CategoryCreate,
    CategoryResponse,
    CategoryUpdate,
)
from app.crud.category import (
    get_categories,
    get_category,
    create_category,
    update_category,
    delete_category,
)


router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


# GET ALL
@router.get(
    "/",
    response_model=list[CategoryResponse]
)
def read_categories(
    db: Session = Depends(get_db)
):
    return get_categories(db)


# POST
@router.post(
    "/",
    response_model=CategoryResponse
)
def create_new_category(
    category: CategoryCreate,
    db: Session = Depends(get_db)
):
    return create_category(db, category)


# GET BY ID
@router.get(
    "/{category_id}",
    response_model=CategoryResponse
)
def read_category(
    category_id: int,
    db: Session = Depends(get_db)
):
    category = get_category(db, category_id)

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    return category


# PUT
@router.put(
    "/{category_id}",
    response_model=CategoryResponse
)
def update_existing_category(
    category_id: int,
    category: CategoryUpdate,
    db: Session = Depends(get_db)
):
    updated_category = update_category(
        db,
        category_id,
        category
    )

    if not updated_category:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    return updated_category


# DELETE
@router.delete(
    "/{category_id}"
)
def delete_existing_category(
    category_id: int,
    db: Session = Depends(get_db)
):
    deleted_category = delete_category(
        db,
        category_id
    )

    if not deleted_category:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    return {
        "message": "Category deleted successfully",
        "id": category_id
    }