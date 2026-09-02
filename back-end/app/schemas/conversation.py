from datetime import datetime

from pydantic import BaseModel, ConfigDict
from typing import Optional


class ConversationBase(BaseModel):

    booking_id: Optional[int] = None

    created_by: int

    conversation_type: str

    subject: Optional[str] = None

    status: str = "active"

    last_message_at: Optional[datetime] = None


class ConversationCreate(ConversationBase):
    pass


class ConversationUpdate(BaseModel):

    booking_id: Optional[int] = None

    conversation_type: Optional[str] = None

    subject: Optional[str] = None

    status: Optional[str] = None

    last_message_at: Optional[datetime] = None


class ConversationResponse(ConversationBase):

    id: int

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )