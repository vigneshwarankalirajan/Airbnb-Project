from datetime import datetime

from pydantic import BaseModel, ConfigDict


class AdminUserCreate(BaseModel):
    user_id: int
    admin_type: str
    status: str


class AdminUserUpdate(BaseModel):
    admin_type: str
    status: str


class AdminUserResponse(BaseModel):
    id: int
    user_id: int
    admin_type: str
    status: str
    created_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)