from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status
)

from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.email_sms_log import (
    EmailSmsLogCreate,
    EmailSmsLogUpdate,
    EmailSmsLogResponse
)

from app.crud.email_sms_log import (
    create_email_sms_log,
    get_email_sms_log,
    get_email_sms_logs,
    get_email_sms_logs_by_user,
    update_email_sms_log,
    delete_email_sms_log
)


router = APIRouter(
    prefix="/email-sms-logs",
    tags=["Email SMS Logs"]
)


# --------------------------------------------------
# CREATE
# --------------------------------------------------

@router.post(
    "/",
    response_model=EmailSmsLogResponse,
    status_code=status.HTTP_201_CREATED
)
def create_log(
    log: EmailSmsLogCreate,
    db: Session = Depends(get_db)
):
    return create_email_sms_log(
        db,
        log
    )


# --------------------------------------------------
# GET ALL
# --------------------------------------------------

@router.get(
    "/",
    response_model=list[EmailSmsLogResponse]
)
def get_all_logs(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    return get_email_sms_logs(
        db,
        skip,
        limit
    )


# --------------------------------------------------
# GET BY USER
# --------------------------------------------------

@router.get(
    "/user/{user_id}",
    response_model=list[EmailSmsLogResponse]
)
def get_logs_by_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    return get_email_sms_logs_by_user(
        db,
        user_id
    )


# --------------------------------------------------
# GET BY ID
# --------------------------------------------------

@router.get(
    "/{log_id}",
    response_model=EmailSmsLogResponse
)
def get_log(
    log_id: int,
    db: Session = Depends(get_db)
):
    db_log = get_email_sms_log(
        db,
        log_id
    )

    if not db_log:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email/SMS log not found"
        )

    return db_log


# --------------------------------------------------
# UPDATE
# --------------------------------------------------

@router.put(
    "/{log_id}",
    response_model=EmailSmsLogResponse
)
def update_log(
    log_id: int,
    log: EmailSmsLogUpdate,
    db: Session = Depends(get_db)
):
    db_log = get_email_sms_log(
        db,
        log_id
    )

    if not db_log:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email/SMS log not found"
        )

    return update_email_sms_log(
        db,
        db_log,
        log
    )


# --------------------------------------------------
# DELETE
# --------------------------------------------------

@router.delete(
    "/{log_id}"
)
def delete_log(
    log_id: int,
    db: Session = Depends(get_db)
):
    db_log = get_email_sms_log(
        db,
        log_id
    )

    if not db_log:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email/SMS log not found"
        )

    delete_email_sms_log(
        db,
        db_log
    )

    return {
        "message": "Email/SMS log deleted successfully"
    }