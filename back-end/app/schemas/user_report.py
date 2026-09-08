from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class UserReportCreate(BaseModel):
    reporter_id: int
    reported_user_id: int
    booking_id: Optional[int] = None

    reason: str
    description: str

    priority: Optional[str] = "medium"


class UserReportUpdate(BaseModel):
    report_status: Optional[str] = None
    priority: Optional[str] = None
    admin_notes: Optional[str] = None
    resolved_by: Optional[int] = None
    resolved_at: Optional[datetime] = None


class UserReportResponse(BaseModel):
    id: int

    reporter_id: int
    reported_user_id: int
    booking_id: Optional[int]

    reason: str
    description: str

    report_status: str
    priority: str

    admin_notes: Optional[str]
    resolved_by: Optional[int]
    resolved_at: Optional[datetime]

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)