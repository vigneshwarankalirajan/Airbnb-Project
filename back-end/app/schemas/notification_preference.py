from datetime import datetime
from pydantic import BaseModel, ConfigDict


class NotificationPreferenceBase(BaseModel):
    booking_notifications: bool = True
    payment_notifications: bool = True
    message_notifications: bool = True
    promotional_notifications: bool = False
    email_notifications: bool = True
    sms_notifications: bool = True
    push_notifications: bool = True


class NotificationPreferenceCreate(NotificationPreferenceBase):
    user_id: int


class NotificationPreferenceUpdate(BaseModel):
    booking_notifications: bool | None = None
    payment_notifications: bool | None = None
    message_notifications: bool | None = None
    promotional_notifications: bool | None = None
    email_notifications: bool | None = None
    sms_notifications: bool | None = None
    push_notifications: bool | None = None


class NotificationPreferenceResponse(NotificationPreferenceBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)