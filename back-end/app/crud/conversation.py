from sqlalchemy.orm import Session

from app.models.conversation import Conversation

from app.schemas.conversation import (
    ConversationCreate,
    ConversationUpdate,
)


# GET ALL

def get_conversations(db: Session):

    return (
        db.query(Conversation)
        .all()
    )


# GET ONE

def get_conversation(
    db: Session,
    conversation_id: int
):

    return (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id
        )
        .first()
    )


# CREATE

def create_conversation(
    db: Session,
    conversation_data: ConversationCreate
):

    new_conversation = Conversation(
        **conversation_data.model_dump()
    )

    db.add(new_conversation)

    db.commit()

    db.refresh(new_conversation)

    return new_conversation


# UPDATE

def update_conversation(
    db: Session,
    conversation_id: int,
    conversation_data: ConversationUpdate
):

    conversation = get_conversation(
        db,
        conversation_id
    )

    if not conversation:
        return None

    update_data = conversation_data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():

        setattr(
            conversation,
            key,
            value
        )

    db.commit()

    db.refresh(conversation)

    return conversation


# DELETE

def delete_conversation(
    db: Session,
    conversation_id: int
):

    conversation = get_conversation(
        db,
        conversation_id
    )

    if not conversation:
        return None

    db.delete(conversation)

    db.commit()

    return conversation