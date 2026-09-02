from datetime import datetime

from pydantic import BaseModel, ConfigDict


# -----------------------------
# BASE
# -----------------------------

class CancellationPolicyBase(BaseModel):
    name: str
    description: str | None = None
    refund_percentage: int
    cancellation_days: int
    status: str = "active"


# -----------------------------
# CREATE
# -----------------------------

class CancellationPolicyCreate(
    CancellationPolicyBase
):
    pass


# -----------------------------
# UPDATE
# -----------------------------

class CancellationPolicyUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    refund_percentage: int | None = None
    cancellation_days: int | None = None
    status: str | None = None


# -----------------------------
# RESPONSE
# -----------------------------

class CancellationPolicyResponse(
    CancellationPolicyBase
):
    id: int
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )