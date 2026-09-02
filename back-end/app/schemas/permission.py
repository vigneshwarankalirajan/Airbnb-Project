from pydantic import BaseModel
from datetime import datetime


class PermissionCreate(BaseModel):
    name: str
    description: str | None = None
    module: str | None = None


class PermissionUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    module: str | None = None


class PermissionResponse(BaseModel):
    id: int
    name: str
    description: str | None = None
    module: str | None = None
    created_at: datetime | None = None

    class Config:
        from_attributes = True