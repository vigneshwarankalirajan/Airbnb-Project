from datetime import datetime

from pydantic import BaseModel


class NotificationCreate(BaseModel):

    user_id: int
    notification_type: str
    title: str
    message: str

    reference_type: str | None = None
    reference_id: int | None = None

    is_read: bool = False

    read_at: datetime | None = None

    status: str = "sent"


class NotificationUpdate(BaseModel):

    notification_type: str | None = None
    title: str | None = None
    message: str | None = None

    reference_type: str | None = None
    reference_id: int | None = None

    is_read: bool | None = None
    read_at: datetime | None = None

    status: str | None = None


class NotificationResponse(BaseModel):

    id: int
    user_id: int

    notification_type: str
    title: str
    message: str

    reference_type: str | None
    reference_id: int | None

    is_read: bool
    read_at: datetime | None

    status: str

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True