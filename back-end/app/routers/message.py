from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.crud.message import (
    get_messages,
    get_message,
    create_message,
    update_message,
    delete_message,
)

from app.schemas.message import (
    MessageCreate,
    MessageUpdate,
    MessageResponse,
)


router = APIRouter(
    prefix="/messages",
    tags=["Messages"]
)


# =========================================================
# GET ALL
# =========================================================

@router.get(
    "/",
    response_model=list[MessageResponse]
)
def read_messages(
    db: Session = Depends(get_db)
):

    return get_messages(db)


# =========================================================
# GET ONE
# =========================================================

@router.get(
    "/{message_id}",
    response_model=MessageResponse
)
def read_message(
    message_id: int,
    db: Session = Depends(get_db)
):

    message = get_message(
        db,
        message_id
    )

    if message is None:

        raise HTTPException(
            status_code=404,
            detail="Message not found"
        )

    return message


# =========================================================
# CREATE
# =========================================================

@router.post(
    "/",
    response_model=MessageResponse,
    status_code=201
)
def create_new_message(
    message_data: MessageCreate,
    db: Session = Depends(get_db)
):

    return create_message(
        db,
        message_data
    )


# =========================================================
# UPDATE
# =========================================================

@router.put(
    "/{message_id}",
    response_model=MessageResponse
)
def update_existing_message(
    message_id: int,
    message_data: MessageUpdate,
    db: Session = Depends(get_db)
):

    message = update_message(
        db,
        message_id,
        message_data
    )

    if message is None:

        raise HTTPException(
            status_code=404,
            detail="Message not found"
        )

    return message


# =========================================================
# DELETE
# =========================================================

@router.delete(
    "/{message_id}"
)
def delete_existing_message(
    message_id: int,
    db: Session = Depends(get_db)
):

    message = delete_message(
        db,
        message_id
    )

    if message is None:

        raise HTTPException(
            status_code=404,
            detail="Message not found"
        )

    return {
        "message": "Message deleted successfully",
        "id": message_id
    }