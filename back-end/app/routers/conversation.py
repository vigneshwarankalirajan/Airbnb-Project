from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.crud.conversation import (
    get_conversations,
    get_conversation,
    create_conversation,
    update_conversation,
    delete_conversation,
)

from app.schemas.conversation import (
    ConversationCreate,
    ConversationUpdate,
    ConversationResponse,
)


router = APIRouter(
    prefix="/conversations",
    tags=["Conversations"]
)


# =========================================================
# GET ALL CONVERSATIONS
# =========================================================

@router.get(
    "/",
    response_model=list[ConversationResponse]
)
def read_conversations(
    db: Session = Depends(get_db)
):
    return get_conversations(db)


# =========================================================
# GET ONE CONVERSATION
# =========================================================

@router.get(
    "/{conversation_id}",
    response_model=ConversationResponse
)
def read_conversation(
    conversation_id: int,
    db: Session = Depends(get_db)
):

    conversation = get_conversation(
        db,
        conversation_id
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found"
        )

    return conversation


# =========================================================
# CREATE CONVERSATION
# =========================================================

@router.post(
    "/",
    response_model=ConversationResponse,
    status_code=201
)
def create_new_conversation(
    conversation_data: ConversationCreate,
    db: Session = Depends(get_db)
):

    return create_conversation(
        db,
        conversation_data
    )


# =========================================================
# UPDATE CONVERSATION
# =========================================================

@router.put(
    "/{conversation_id}",
    response_model=ConversationResponse
)
def update_existing_conversation(
    conversation_id: int,
    conversation_data: ConversationUpdate,
    db: Session = Depends(get_db)
):

    conversation = update_conversation(
        db,
        conversation_id,
        conversation_data
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found"
        )

    return conversation


# =========================================================
# DELETE CONVERSATION
# =========================================================

@router.delete(
    "/{conversation_id}"
)
def delete_existing_conversation(
    conversation_id: int,
    db: Session = Depends(get_db)
):

    conversation = delete_conversation(
        db,
        conversation_id
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found"
        )

    return {
        "message": "Conversation deleted successfully",
        "id": conversation_id
    }