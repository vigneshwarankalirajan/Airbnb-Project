from datetime import datetime, time

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, Text, Time
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class PropertyRule(Base):
    __tablename__ = "property_rules"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    property_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("properties.id"),
        nullable=False
    )

    smoking_allowed: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False
    )

    pets_allowed: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False
    )

    parties_allowed: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False
    )

    check_in_time: Mapped[time | None] = mapped_column(
        Time,
        nullable=True
    )

    check_out_time: Mapped[time | None] = mapped_column(
        Time,
        nullable=True
    )

    additional_rules: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        default=datetime.utcnow
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )