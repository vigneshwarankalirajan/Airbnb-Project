from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Numeric,
    Date,
    DateTime
)

from app.database import Base


class DynamicPricingRule(Base):
    __tablename__ = "dynamic_pricing_rules"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    property_id = Column(
        Integer,
        nullable=False
    )

    rule_name = Column(
        String(100),
        nullable=False
    )

    rule_type = Column(
        String(50),
        nullable=False
    )

    adjustment_percentage = Column(
        Numeric(5, 2),
        nullable=False
    )

    start_date = Column(
        Date,
        nullable=False
    )

    end_date = Column(
        Date,
        nullable=False
    )

    status = Column(
        String(20),
        default="active"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )