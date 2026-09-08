from datetime import datetime

from sqlalchemy.orm import Session

from app.models.review import Review
from app.schemas.review import ReviewCreate, ReviewUpdate


# CREATE REVIEW
def create_review(
    db: Session,
    review_data: ReviewCreate
):
    review = Review(
        booking_id=review_data.booking_id,
        property_id=review_data.property_id,
        reviewer_id=review_data.reviewer_id,
        reviewee_id=review_data.reviewee_id,
        rating=review_data.rating,
        review_text=review_data.review_text,
        review_type=review_data.review_type,
        status=review_data.status,
        host_response=review_data.host_response,
    )

    if review_data.host_response:
        review.responded_at = datetime.utcnow()

    db.add(review)
    db.commit()
    db.refresh(review)

    return review


# GET ALL REVIEWS
def get_reviews(
    db: Session,
    skip: int = 0,
    limit: int = 100
):
    return (
        db.query(Review)
        .offset(skip)
        .limit(limit)
        .all()
    )


# GET SINGLE REVIEW
def get_review(
    db: Session,
    review_id: int
):
    return (
        db.query(Review)
        .filter(Review.id == review_id)
        .first()
    )


# UPDATE REVIEW
def update_review(
    db: Session,
    review_id: int,
    review_data: ReviewUpdate
):
    review = (
        db.query(Review)
        .filter(Review.id == review_id)
        .first()
    )

    if not review:
        return None

    update_data = review_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(review, key, value)

    if review.host_response:
        review.responded_at = datetime.utcnow()

    db.commit()
    db.refresh(review)

    return review


# DELETE REVIEW
def delete_review(
    db: Session,
    review_id: int
):
    review = (
        db.query(Review)
        .filter(Review.id == review_id)
        .first()
    )

    if not review:
        return None

    db.delete(review)
    db.commit()

    return review