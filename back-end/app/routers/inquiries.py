from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.inquiries import (
    InquiryCreate,
    InquiryResponse,
    InquiryUpdate,
)

from app.crud.inquiries import (
    get_inquiries,
    get_inquiry,
    create_inquiry,
    update_inquiry,
    delete_inquiry,
)


router = APIRouter(
    prefix="/inquiries",
    tags=["Inquiries"]
)


# -----------------------------
# GET ALL
# -----------------------------

@router.get(
    "/",
    response_model=list[InquiryResponse]
)
def read_inquiries(
    db: Session = Depends(get_db)
):
    return get_inquiries(db)


# -----------------------------
# GET BY ID
# -----------------------------

@router.get(
    "/{inquiry_id}",
    response_model=InquiryResponse
)
def read_inquiry(
    inquiry_id: int,
    db: Session = Depends(get_db)
):
    inquiry = get_inquiry(
        db,
        inquiry_id
    )

    if not inquiry:
        raise HTTPException(
            status_code=404,
            detail="Inquiry not found"
        )

    return inquiry


# -----------------------------
# CREATE
# -----------------------------

@router.post(
    "/",
    response_model=InquiryResponse
)
def create_new_inquiry(
    inquiry_data: InquiryCreate,
    db: Session = Depends(get_db)
):
    return create_inquiry(
        db,
        inquiry_data
    )


# -----------------------------
# UPDATE
# -----------------------------

@router.put(
    "/{inquiry_id}",
    response_model=InquiryResponse
)
def update_existing_inquiry(
    inquiry_id: int,
    inquiry_data: InquiryUpdate,
    db: Session = Depends(get_db)
):
    inquiry = update_inquiry(
        db,
        inquiry_id,
        inquiry_data
    )

    if not inquiry:
        raise HTTPException(
            status_code=404,
            detail="Inquiry not found"
        )

    return inquiry


# -----------------------------
# DELETE
# -----------------------------

@router.delete(
    "/{inquiry_id}"
)
def delete_existing_inquiry(
    inquiry_id: int,
    db: Session = Depends(get_db)
):
    inquiry = delete_inquiry(
        db,
        inquiry_id
    )

    if not inquiry:
        raise HTTPException(
            status_code=404,
            detail="Inquiry not found"
        )

    return {
        "message": "Inquiry deleted successfully",
        "id": inquiry_id
    }