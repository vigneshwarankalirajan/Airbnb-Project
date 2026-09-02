from sqlalchemy.orm import Session

from app.models.inquiries import Inquiry

from app.schemas.inquiries import (
    InquiryCreate,
    InquiryUpdate
)


def get_inquiries(db: Session):
    return db.query(Inquiry).all()


def get_inquiry(
    db: Session,
    inquiry_id: int
):
    return (
        db.query(Inquiry)
        .filter(Inquiry.id == inquiry_id)
        .first()
    )


def create_inquiry(
    db: Session,
    inquiry_data: InquiryCreate
):
    new_inquiry = Inquiry(
        **inquiry_data.model_dump()
    )

    db.add(new_inquiry)
    db.commit()
    db.refresh(new_inquiry)

    return new_inquiry


def update_inquiry(
    db: Session,
    inquiry_id: int,
    inquiry_data: InquiryUpdate
):
    inquiry = get_inquiry(
        db,
        inquiry_id
    )

    if not inquiry:
        return None

    update_data = inquiry_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(inquiry, key, value)

    db.commit()
    db.refresh(inquiry)

    return inquiry


def delete_inquiry(
    db: Session,
    inquiry_id: int
):
    inquiry = get_inquiry(
        db,
        inquiry_id
    )

    if not inquiry:
        return None

    db.delete(inquiry)
    db.commit()

    return inquiry