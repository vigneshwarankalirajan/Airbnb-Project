
from pydantic import BaseModel
from datetime import datetime


class RoleCreate(BaseModel):
    name: str
    description: str | None = None
    status: str | None = None


class RoleUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    status: str | None = None


class RoleResponse(BaseModel):
    id: int
    name: str
    description: str | None = None
    status: str | None = None
    created_at: datetime | None = None

    class Config:
        from_attributes = True
