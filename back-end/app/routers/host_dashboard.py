import os

import jwt
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.bookings import Booking
from app.models.property import Property


SECRET_KEY = os.getenv("SECRET_KEY", "airbnb-secret-key")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

router = APIRouter(
    prefix="/api/host",
    tags=["Host Dashboard"],
)

bearer_scheme = HTTPBearer(auto_error=False)


def get_host_id(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
):
    if not credentials:
        raise HTTPException(status_code=401, detail="Authentication required")

    try:
        payload = jwt.decode(
            credentials.credentials,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )
    except jwt.PyJWTError as error:
        raise HTTPException(status_code=401, detail="Invalid or expired token") from error

    if str(payload.get("role", "")).lower() != "host":
        raise HTTPException(status_code=403, detail="Host access required")

    try:
        return int(payload["sub"])
    except (KeyError, TypeError, ValueError) as error:
        raise HTTPException(status_code=401, detail="Invalid user identity") from error


@router.get("/dashboard")
def read_host_dashboard(
    host_id: int = Depends(get_host_id),
    db: Session = Depends(get_db),
):
    properties = db.query(Property).filter(Property.host_id == host_id).count()
    bookings = db.query(Booking).filter(Booking.host_id == host_id).count()
    earnings = (
        db.query(func.coalesce(func.sum(Booking.total_amount), 0))
        .filter(
            Booking.host_id == host_id,
            Booking.booking_status == "confirmed",
        )
        .scalar()
    )

    return {
        "properties": properties,
        "bookings": bookings,
        "earnings": earnings,
    }
