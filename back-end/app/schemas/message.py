from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class MessageBase(BaseModel):

    conversation_id: int

    sender_id: int

    message_type: str = "text"

    message_text: Optional[str] = None

    attachment_url: Optional[str] = None

    is_read: bool = False

    read_at: Optional[datetime] = None

    sent_at: Optional[datetime] = None


class MessageCreate(MessageBase):
    pass


class MessageUpdate(BaseModel):

    message_type: Optional[str] = None

    message_text: Optional[str] = None

    attachment_url: Optional[str] = None

    is_read: Optional[bool] = None

    read_at: Optional[datetime] = None


class MessageResponse(MessageBase):

    id: int

    created_at: datetime

    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )