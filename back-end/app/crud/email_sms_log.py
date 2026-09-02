from sqlalchemy.orm import Session

from app.models.email_sms_log import EmailSmsLog

from app.schemas.email_sms_log import (
    EmailSmsLogCreate,
    EmailSmsLogUpdate
)


def create_email_sms_log(
    db: Session,
    log: EmailSmsLogCreate
):
    db_log = EmailSmsLog(
        user_id=log.user_id,
        channel=log.channel,
        recipient=log.recipient,
        subject=log.subject,
        message=log.message,
        reference_type=log.reference_type,
        reference_id=log.reference_id,
        delivery_status=log.delivery_status,
        provider=log.provider,
        provider_message_id=log.provider_message_id,
        failure_reason=log.failure_reason,
        sent_at=log.sent_at,
        delivered_at=log.delivered_at,
    )

    db.add(db_log)
    db.commit()
    db.refresh(db_log)

    return db_log


def get_email_sms_log(
    db: Session,
    log_id: int
):
    return (
        db.query(EmailSmsLog)
        .filter(EmailSmsLog.id == log_id)
        .first()
    )


def get_email_sms_logs(
    db: Session,
    skip: int = 0,
    limit: int = 100
):
    return (
        db.query(EmailSmsLog)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_email_sms_logs_by_user(
    db: Session,
    user_id: int
):
    return (
        db.query(EmailSmsLog)
        .filter(EmailSmsLog.user_id == user_id)
        .order_by(EmailSmsLog.id.desc())
        .all()
    )


def update_email_sms_log(
    db: Session,
    db_log: EmailSmsLog,
    log: EmailSmsLogUpdate
):
    update_data = log.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(db_log, field, value)

    db.commit()
    db.refresh(db_log)

    return db_log


def delete_email_sms_log(
    db: Session,
    db_log: EmailSmsLog
):
    db.delete(db_log)
    db.commit()

    return True