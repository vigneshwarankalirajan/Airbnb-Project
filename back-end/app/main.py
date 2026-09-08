from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.users import router as users_router
from app.routers.user_verification import router as user_verification_router
from app.routers.user_preference import router as user_preference_router
from app.routers.admin_user import router as admin_user_router
from app.routers.role import router as role_router
from app.routers.permission import router as permission_router
from app.routers.role_permission import router as role_permission_router
from app.routers.auth import router as auth_router

from app.routers.property import router as property_router
from app.routers.property_image import router as property_image_router
from app.routers.category import router as category_router
from app.routers.amenity import router as amenity_router
from app.routers.property_amenity import router as property_amenity_router
from app.routers.property_rule import router as property_rule_router
from app.routers.listing_status_history import router as listing_status_history_router

from app.routers.city_zones import router as city_zones_router
from app.routers.availability import router as availability_router
from app.routers.property_calendar import router as property_calendar_router
from app.routers.property_calendar_sync import  router as property_calendar_sync_router
from app.routers.booking_rules import  router as booking_rules_router
from app.routers.cancellation_policies import router as cancellation_policies_router

from app.routers.pricing import router as pricing_router
from app.routers.dynamic_pricing_rules import router as dynamic_pricing_rules_router
from app.routers.discount_offers import router as discount_offers_router
from app.routers.coupons import  router as coupons_router
from app.routers.commissions import router as commissions_router
from app.routers.listing_fees import router as listing_fees_router
from app.routers.subscriptions import router as subscriptions_router

from app.routers.inquiries import router as inquiries_router
from app.routers.bookings import  router as bookings_router
from app.routers.booking_guests import  router as booking_guests_router
from app.routers.booking_status_history import router as booking_status_history_router
from app.routers.booking_receipts import router as booking_receipts_router
from app.routers.payment import router as payment_router
from app.routers.payment_method import router as payment_method_router
from app.routers.refund import router as refund_router
from app.routers.payout_account import router as payout_account_router
from app.routers.host_wallet import router as host_wallet_router
from app.routers.host_dashboard import router as host_dashboard_router
from app.routers.wallet_transaction import router as wallet_transaction_router
from app.routers.payout import router as payout_router
from app.routers.finance_transaction import router as finance_transaction_router
from app.routers.currency import router as currency_router
from app.routers.conversation import router as conversations_router
from app.routers.message import router as messages_router
from app.routers.notification import router as notifications_router
from app.routers.notification_preference import router as notification_preference_router
from app.routers.email_sms_log import router as email_sms_log_router
from app.routers.property_availability import  router as property_availability_router
from app.routers.wishlist import router as wishlist_router
from app.routers.wishlist_item import router as wishlist_item_router
from app.routers.review import router as review_router
from app.routers.user_report import router as user_report_router
from app.routers.dispute import router as dispute_router
















app = FastAPI(
    title="Airbnb API",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5175",
        "http://127.0.0.1:5175",

        # If you use these ports also
        "http://localhost:5173",
        "http://127.0.0.1:5173",

        "http://localhost:3000",
        "http://127.0.0.1:3000",

         "http://localhost:5174",
         "http://127.0.0.1:5174",
        
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Existing APIs
app.include_router(users_router)
app.include_router(user_verification_router)
app.include_router(user_preference_router)
app.include_router(admin_user_router)
app.include_router(role_router)
app.include_router(permission_router)
app.include_router(role_permission_router)
app.include_router(auth_router)


# Phase 2
app.include_router(property_router)
app.include_router(property_image_router)
app.include_router(category_router)
app.include_router(amenity_router)
app.include_router(property_amenity_router)
app.include_router(property_rule_router)
app.include_router(listing_status_history_router)

app.include_router(city_zones_router)
app.include_router(availability_router)
app.include_router(property_calendar_router)
app.include_router(property_calendar_sync_router)
app.include_router(booking_rules_router)
app.include_router(cancellation_policies_router)

app.include_router(pricing_router)
app.include_router(dynamic_pricing_rules_router)
app.include_router(discount_offers_router)
app.include_router(coupons_router)
app.include_router(commissions_router)
app.include_router(listing_fees_router)
app.include_router(subscriptions_router)

app.include_router(inquiries_router)
app.include_router(bookings_router)
app.include_router(booking_guests_router)
app.include_router(booking_status_history_router)
app.include_router(booking_receipts_router)
app.include_router(payment_router)
app.include_router(payment_method_router)
app.include_router(refund_router)
app.include_router(payout_account_router)
app.include_router(host_wallet_router)
app.include_router(host_dashboard_router)
app.include_router(wallet_transaction_router)
app.include_router(payout_router)
app.include_router(finance_transaction_router)
app.include_router(currency_router)
app.include_router(conversations_router)
app.include_router(messages_router)
app.include_router(notifications_router)
app.include_router(notification_preference_router)
app.include_router(email_sms_log_router)
app.include_router(property_availability_router)
app.include_router(wishlist_router)
app.include_router(wishlist_item_router)
app.include_router( review_router)
app.include_router(user_report_router)
app.include_router(dispute_router)



@app.get("/")
def root():
    return {
        "message": "Airbnb API is running"
    }