from typing import List

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db

from app.crud.user_report import (
    create_user_report,
    get_user_report,
    get_user_reports,
    get_reports_by_reporter,
    get_reports_by_reported_user,
    update_user_report,
    delete_user_report
)

from app.schemas.user_report import (
    UserReportCreate,
    UserReportResponse,
    UserReportUpdate
)


router = APIRouter(
    prefix="/user-reports",
    tags=["User Reports"]
)


# CREATE
@router.post(
    "/",
    response_model=UserReportResponse,
    status_code=201
)
def create_report(
    report_data: UserReportCreate,
    db: Session = Depends(get_db)
):
    return create_user_report(
        db,
        report_data
    )


# GET ALL
@router.get(
    "/",
    response_model=List[UserReportResponse]
)
def get_all_reports(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db)
):
    return get_user_reports(
        db,
        skip,
        limit
    )


# GET BY ID
@router.get(
    "/{report_id}",
    response_model=UserReportResponse
)
def get_report(
    report_id: int,
    db: Session = Depends(get_db)
):
    report = get_user_report(
        db,
        report_id
    )

    if not report:
        raise HTTPException(
            status_code=404,
            detail="User report not found"
        )

    return report


# GET BY REPORTER
@router.get(
    "/reporter/{reporter_id}",
    response_model=List[UserReportResponse]
)
def get_reports_from_reporter(
    reporter_id: int,
    db: Session = Depends(get_db)
):
    return get_reports_by_reporter(
        db,
        reporter_id
    )


# GET REPORTS AGAINST USER
@router.get(
    "/reported-user/{reported_user_id}",
    response_model=List[UserReportResponse]
)
def get_reports_against_user(
    reported_user_id: int,
    db: Session = Depends(get_db)
):
    return get_reports_by_reported_user(
        db,
        reported_user_id
    )


# UPDATE
@router.put(
    "/{report_id}",
    response_model=UserReportResponse
)
def update_report(
    report_id: int,
    report_data: UserReportUpdate,
    db: Session = Depends(get_db)
):
    report = update_user_report(
        db,
        report_id,
        report_data
    )

    if not report:
        raise HTTPException(
            status_code=404,
            detail="User report not found"
        )

    return report


# DELETE
@router.delete(
    "/{report_id}"
)
def delete_report(
    report_id: int,
    db: Session = Depends(get_db)
):
    report = delete_user_report(
        db,
        report_id
    )

    if not report:
        raise HTTPException(
            status_code=404,
            detail="User report not found"
        )

    return {
        "message": "User report deleted successfully",
        "report_id": report_id
    }