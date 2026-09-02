from datetime import datetime

from pydantic import BaseModel, ConfigDict


class EmailSmsLogBase(BaseModel):
    user_id: int

    channel: str
    recipient: str

    subject: str | None = None
    message: str

    reference_type: str | None = None
    reference_id: int | None = None

    delivery_status: str = "pending"

    provider: str | None = None
    provider_message_id: str | None = None

    failure_reason: str | None = None

    sent_at: datetime | None = None
    delivered_at: datetime | None = None


class EmailSmsLogCreate(EmailSmsLogBase):
    pass


class EmailSmsLogUpdate(BaseModel):
    channel: str | None = None
    recipient: str | None = None

    subject: str | None = None
    message: str | None = None

    reference_type: str | None = None
    reference_id: int | None = None

    delivery_status: str | None = None

    provider: str | None = None
    provider_message_id: str | None = None

    failure_reason: str | None = None

    sent_at: datetime | None = None
    delivered_at: datetime | None = None


class EmailSmsLogResponse(EmailSmsLogBase):
    id: int

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )