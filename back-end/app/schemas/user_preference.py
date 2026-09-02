from datetime import datetime

from pydantic import BaseModel, ConfigDict


class UserPreferenceBase(BaseModel):
    language: str | None = None
    currency: str | None = None
    theme: str | None = None
    email_notifications: bool | None = None
    sms_notifications: bool | None = None
    push_notifications: bool | None = None


class UserPreferenceCreate(UserPreferenceBase):
    user_id: int


class UserPreferenceUpdate(UserPreferenceBase):
    pass


class UserPreferenceResponse(UserPreferenceBase):
    id: int
    user_id: int
    created_at: datetime | None = None
    updated_at: datetime | None = None

    model_config = ConfigDict(
        from_attributes=True
    )