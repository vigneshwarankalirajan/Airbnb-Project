from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.review import (
    ReviewCreate,
    ReviewUpdate,
    ReviewResponse,
)

from app.crud.review import (
    create_review,
    get_reviews,
    get_review,
    update_review,
    delete_review,
)


router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"]
)


# CREATE REVIEW
@router.post(
    "/",
    response_model=ReviewResponse,
    status_code=status.HTTP_201_CREATED
)
def create_review_api(
    review_data: ReviewCreate,
    db: Session = Depends(get_db)
):
    return create_review(db, review_data)


# GET ALL REVIEWS
@router.get(
    "/",
    response_model=List[ReviewResponse]
)
def get_reviews_api(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    return get_reviews(db, skip, limit)


# GET SINGLE REVIEW
@router.get(
    "/{review_id}",
    response_model=ReviewResponse
)
def get_review_api(
    review_id: int,
    db: Session = Depends(get_db)
):
    review = get_review(db, review_id)

    if not review:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    return review


# UPDATE REVIEW
@router.put(
    "/{review_id}",
    response_model=ReviewResponse
)
def update_review_api(
    review_id: int,
    review_data: ReviewUpdate,
    db: Session = Depends(get_db)
):
    review = update_review(
        db,
        review_id,
        review_data
    )

    if not review:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    return review


# DELETE REVIEW
@router.delete("/{review_id}")
def delete_review_api(
    review_id: int,
    db: Session = Depends(get_db)
):
    review = delete_review(
        db,
        review_id
    )

    if not review:
        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )

    return {
        "message": "Review deleted successfully",
        "id": review_id
    }