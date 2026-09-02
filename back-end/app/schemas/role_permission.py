from pydantic import BaseModel
from datetime import datetime


class RolepermissionCreate(BaseModel):
    role_id: int
    permission_id: int


class RolepermissionUpdate(BaseModel):
    role_id: int | None = None
    permission_id: int | None = None


class RolepermissionResponse(BaseModel):
    id: int
    role_id: int
    permission_id: int
    created_at: datetime | None = None

    class Config:
        from_attributes = True