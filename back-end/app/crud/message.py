from sqlalchemy.orm import Session

from app.models.message import Message

from app.schemas.message import (
    MessageCreate,
    MessageUpdate,
)


# =========================================================
# GET ALL
# =========================================================

def get_messages(db: Session):

    return (
        db.query(Message)
        .all()
    )


# =========================================================
# GET ONE
# =========================================================

def get_message(
    db: Session,
    message_id: int
):

    return (
        db.query(Message)
        .filter(
            Message.id == message_id
        )
        .first()
    )


# =========================================================
# CREATE
# =========================================================

def create_message(
    db: Session,
    message_data: MessageCreate
):

    new_message = Message(
        **message_data.model_dump(
            exclude_unset=True
        )
    )

    db.add(new_message)

    db.commit()

    db.refresh(new_message)

    return new_message


# =========================================================
# UPDATE
# =========================================================

def update_message(
    db: Session,
    message_id: int,
    message_data: MessageUpdate
):

    message = get_message(
        db,
        message_id
    )

    if not message:
        return None

    update_data = message_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():

        setattr(
            message,
            key,
            value
        )

    db.commit()

    db.refresh(message)

    return message


# =========================================================
# DELETE
# =========================================================

def delete_message(
    db: Session,
    message_id: int
):

    message = get_message(
        db,
        message_id
    )

    if not message:
        return None

    db.delete(message)

    db.commit()

    return message