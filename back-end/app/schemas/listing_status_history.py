from datetime import datetime
from pydantic import BaseModel


class ListingStatusHistoryBase(BaseModel):
    property_id: int
    old_status: str
    new_status: str
    changed_by: int
    reason: str | None = None


class ListingStatusHistoryCreate(ListingStatusHistoryBase):
    pass


class ListingStatusHistoryUpdate(ListingStatusHistoryBase):
    pass


class ListingStatusHistoryResponse(ListingStatusHistoryBase):
    id: int
    created_at: datetime

    model_config = {
        "from_attributes": True
    }