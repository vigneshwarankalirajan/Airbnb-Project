import React, { useState } from "react";

import {
  ArrowRight,
  ChevronDown,
  Loader2,
  ShieldCheck,
  Users,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import AvailabilityCalendar from "./AvailabilityCalendar";



function BookingCard({
  property,
  basePrice,
  rating,

  checkIn,
  checkOut,
  guests,

  setCheckIn,
  setCheckOut,
  setGuests,

  availability,
  pricing,

  checkingAvailability,
  bookingLoading,
  bookingError,

  onCheckAvailability,
  onBooking,
}) {
  const [guestOpen, setGuestOpen] =
    useState(false);

  const title =
    property?.title ||
    property?.name ||
    "Beautiful stay";

  const propertyType =
    property?.property_type ||
    property?.type ||
    "Entire property";

  const maxGuests = Math.max(
    Number(
      property?.max_guests ??
        property?.maxGuests ??
        10
    ),
    1
  );

  const formatPrice = (value) =>
    Number(value || 0).toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 2,
      }
    );

  const nights =
    Number(pricing?.nights) || 0;

  const nightlyPrice =
    Number(
      pricing?.nightly_price ??
        basePrice ??
        0
    );

  const subtotal =
    Number(
      pricing?.subtotal ??
        nightlyPrice * nights
    );

  const cleaningFee =
    Number(
      pricing?.cleaning_fee || 0
    );

  const serviceFee =
    Number(
      pricing?.service_fee || 0
    );

  const total =
    Number(
      pricing?.total_amount ??
        pricing?.total ??
        subtotal +
          cleaningFee +
          serviceFee
    );

  return (
    <div className="w-full">

      <section className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-lg sm:p-6">

        {/* =================================================
            PRICE
        ================================================= */}

        <div className="flex items-start justify-between">

          <div>

            <p className="text-xs font-medium text-gray-500">
              From
            </p>

            <div className="mt-1">

              <span className="text-2xl font-bold text-gray-900">
                ₹{formatPrice(basePrice)}
              </span>

              <span className="ml-1 text-sm text-gray-500">
                / night
              </span>

            </div>

          </div>

          {rating && (
            <div className="rounded-full bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-700">
              ★ {rating}
            </div>
          )}

        </div>

        {/* =================================================
            PROPERTY INFO
        ================================================= */}

        <div className="mt-4">

          <h3 className="line-clamp-2 text-sm font-bold text-gray-900">
            {title}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            {propertyType}
          </p>

          {property?.city && (
            <p className="mt-1 text-xs text-gray-400">
              {property.city}
            </p>
          )}

        </div>

        {/* =================================================
            GUESTS
        ================================================= */}

        <div className="relative mt-5 rounded-2xl border border-gray-200 p-4">

          <button
            type="button"
            onClick={() =>
              setGuestOpen(
                (previous) =>
                  !previous
              )
            }
            className="flex w-full items-center justify-between"
          >

            <div className="flex items-center gap-3">

              <Users
                size={18}
                className="text-gray-500"
              />

              <div className="text-left">

                <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  Guests
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {guests}{" "}
                  {guests === 1
                    ? "guest"
                    : "guests"}
                </p>

              </div>

            </div>

            <ChevronDown
              size={18}
              className={`transition ${
                guestOpen
                  ? "rotate-180"
                  : ""
              }`}
            />

          </button>

          {guestOpen && (
            <div className="absolute left-3 right-3 top-full z-50 mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-bold">
                    Guests
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Maximum {maxGuests}
                  </p>

                </div>

                <div className="flex items-center gap-3">

                  <button
                    type="button"
                    onClick={() =>
                      setGuests(
                        Math.max(
                          1,
                          guests - 1
                        )
                      )
                    }
                    disabled={
                      guests <= 1
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-lg disabled:opacity-30"
                  >
                    −
                  </button>

                  <span className="w-5 text-center text-sm font-bold">
                    {guests}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setGuests(
                        Math.min(
                          maxGuests,
                          guests + 1
                        )
                      )
                    }
                    disabled={
                      guests >=
                      maxGuests
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-lg disabled:opacity-30"
                  >
                    +
                  </button>

                </div>

              </div>

            </div>
          )}

        </div>

        {/* =================================================
            AVAILABILITY CALENDAR
        ================================================= */}

        <div className="mt-5">

          <AvailabilityCalendar
            checkIn={checkIn}
            checkOut={checkOut}
            setCheckIn={
              setCheckIn
            }
            setCheckOut={
              setCheckOut
            }
          />

        </div>

        {/* =================================================
            CHECK AVAILABILITY
        ================================================= */}

        <button
          type="button"
          onClick={
            onCheckAvailability
          }
          disabled={
            checkingAvailability ||
            !checkIn ||
            !checkOut
          }
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#123d78] px-5 py-3.5 text-sm font-bold text-[#123d78] transition hover:bg-[#123d78] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >

          {checkingAvailability ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />

              Checking...
            </>
          ) : (
            "Check availability"
          )}

        </button>

        {/* =================================================
            AVAILABILITY STATUS
        ================================================= */}

        {availability && (
          <div
            className={`mt-4 flex gap-3 rounded-2xl p-4 ${
              availability.available
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
            }`}
          >

            {availability.available ? (
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0"
              />
            ) : (
              <AlertCircle
                size={18}
                className="mt-0.5 shrink-0"
              />
            )}

            <div>

              <p className="text-sm font-bold">
                {availability.available
                  ? "Available"
                  : "Not available"}
              </p>

              <p className="mt-1 text-xs">
                {availability.available
                  ? "This property is available for your selected dates."
                  : "Please select different dates."}
              </p>

            </div>

          </div>
        )}

        {/* =================================================
            PRICE BREAKDOWN
        ================================================= */}

        {pricing && (
          <div className="mt-5 border-t border-gray-200 pt-5">

            <h3 className="text-sm font-bold text-gray-900">
              Price details
            </h3>

            <div className="mt-4 space-y-3">

              <div className="flex justify-between text-sm">

                <span className="text-gray-600">
                  ₹{formatPrice(nightlyPrice)}
                  {" × "}
                  {nights}{" "}
                  {nights === 1
                    ? "night"
                    : "nights"}
                </span>

                <span className="font-medium">
                  ₹{formatPrice(subtotal)}
                </span>

              </div>

              {cleaningFee > 0 && (
                <div className="flex justify-between text-sm">

                  <span className="text-gray-600">
                    Cleaning fee
                  </span>

                  <span>
                    ₹{formatPrice(cleaningFee)}
                  </span>

                </div>
              )}

              {serviceFee > 0 && (
                <div className="flex justify-between text-sm">

                  <span className="text-gray-600">
                    Service fee
                  </span>

                  <span>
                    ₹{formatPrice(serviceFee)}
                  </span>

                </div>
              )}

            </div>

            <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-5">

              <span className="text-base font-bold text-gray-900">
                Total
              </span>

              <span className="text-xl font-bold text-gray-900">
                ₹{formatPrice(total)}
              </span>

            </div>

          </div>
        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {bookingError && (
          <div className="mt-4 flex gap-2 rounded-2xl bg-red-50 p-4 text-xs font-medium text-red-600">

            <AlertCircle
              size={17}
              className="mt-0.5 shrink-0"
            />

            <span>
              {bookingError}
            </span>

          </div>
        )}

        {/* =================================================
            RESERVE
        ================================================= */}

        <button
          type="button"
          onClick={onBooking}
          disabled={
            bookingLoading ||
            checkingAvailability ||
            !checkIn ||
            !checkOut
          }
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123d78] px-5 py-4 text-sm font-bold text-white shadow-md transition hover:bg-[#0d2f60] disabled:cursor-not-allowed disabled:opacity-50"
        >

          {bookingLoading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />

              Booking...
            </>
          ) : (
            <>
              Reserve your stay

              <ArrowRight
                size={18}
              />
            </>
          )}

        </button>

        <p className="mt-3 text-center text-xs text-gray-500">
          You won't be charged yet
        </p>

        {/* =================================================
            SECURITY
        ================================================= */}

        <div className="mt-5 flex gap-3 rounded-2xl bg-gray-50 p-4">

          <ShieldCheck
            size={19}
            className="mt-0.5 shrink-0 text-[#123d78]"
          />

          <div>

            <p className="text-xs font-bold text-gray-900">
              Secure booking
            </p>

            <p className="mt-1 text-[11px] leading-5 text-gray-500">
              Your booking details are securely processed.
            </p>

          </div>

        </div>

      </section>
    </div>
  );
}

export default BookingCard;