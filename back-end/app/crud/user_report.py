from datetime import datetime

from sqlalchemy.orm import Session

from app.models.user_report import UserReport
from app.schemas.user_report import (
    UserReportCreate,
    UserReportUpdate
)


def create_user_report(
    db: Session,
    report_data: UserReportCreate
):
    report = UserReport(
        reporter_id=report_data.reporter_id,
        reported_user_id=report_data.reported_user_id,
        booking_id=report_data.booking_id,
        reason=report_data.reason,
        description=report_data.description,
        priority=report_data.priority or "medium",
        report_status="pending"
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    return report


def get_user_report(
    db: Session,
    report_id: int
):
    return (
        db.query(UserReport)
        .filter(UserReport.id == report_id)
        .first()
    )


def get_user_reports(
    db: Session,
    skip: int = 0,
    limit: int = 100
):
    return (
        db.query(UserReport)
        .order_by(UserReport.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_reports_by_reporter(
    db: Session,
    reporter_id: int
):
    return (
        db.query(UserReport)
        .filter(UserReport.reporter_id == reporter_id)
        .order_by(UserReport.created_at.desc())
        .all()
    )


def get_reports_by_reported_user(
    db: Session,
    reported_user_id: int
):
    return (
        db.query(UserReport)
        .filter(UserReport.reported_user_id == reported_user_id)
        .order_by(UserReport.created_at.desc())
        .all()
    )


def update_user_report(
    db: Session,
    report_id: int,
    report_data: UserReportUpdate
):
    report = get_user_report(db, report_id)

    if not report:
        return None

    update_data = report_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(report, field, value)

    report.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(report)

    return report


def delete_user_report(
    db: Session,
    report_id: int
):
    report = get_user_report(db, report_id)

    if not report:
        return None

    db.delete(report)
    db.commit()

    return report