import React, {
  useEffect,
  useState,
} from "react";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Users,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const API_URL =
  "http://127.0.0.1:8000";

function BookingConfirmation() {
  const { bookingId } =
    useParams();

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const [booking, setBooking] =
    useState(
      location.state?.booking ||
        null
    );

  const [property, setProperty] =
    useState(
      location.state?.property ||
        null
    );

  const [loading, setLoading] =
    useState(!location.state?.booking);

  const [error, setError] =
    useState("");

  // =========================================================
  // FETCH BOOKING
  // =========================================================

  useEffect(() => {
    if (!bookingId) {
      setError(
        "Booking ID is missing."
      );

      setLoading(false);

      return;
    }

    /*
     * If state already contains booking,
     * we can display immediately.
     */

    if (
      location.state?.booking
    ) {
      setLoading(false);
      return;
    }

    const fetchBooking =
      async () => {
        try {
          setLoading(true);

          const response =
            await fetch(
              `${API_URL}/bookings/${bookingId}`
            );

          const text =
            await response.text();

          let data = null;

          try {
            data =
              text
                ? JSON.parse(text)
                : null;
          } catch {
            data = text;
          }

          if (!response.ok) {
            throw new Error(
              data?.detail ||
                data?.message ||
                "Unable to load booking."
            );
          }

          const bookingData =
            data?.data ||
            data?.booking ||
            data;

          setBooking(
            bookingData
          );

          /*
           * Property may already be
           * inside booking response.
           */

          if (
            bookingData?.property
          ) {
            setProperty(
              bookingData.property
            );
          }

          /*
           * Otherwise fetch property.
           */

          const propertyId =
            bookingData?.property_id;

          if (
            propertyId &&
            !bookingData?.property
          ) {
            const propertyResponse =
              await fetch(
                `${API_URL}/properties/${propertyId}`
              );

            if (
              propertyResponse.ok
            ) {
              const propertyData =
                await propertyResponse.json();

              setProperty(
                propertyData?.data ||
                  propertyData?.property ||
                  propertyData
              );
            }
          }
        } catch (err) {
          console.error(
            "CONFIRMATION ERROR:",
            err
          );

          /*
           * Local fallback.
           */

          const saved =
            localStorage.getItem(
              "last_booking"
            );

          if (saved) {
            try {
              setBooking(
                JSON.parse(saved)
              );
            } catch {
              setError(
                err.message ||
                  "Unable to load booking."
              );
            }
          } else {
            setError(
              err.message ||
                "Unable to load booking."
            );
          }
        } finally {
          setLoading(false);
        }
      };

    fetchBooking();
  }, [
    bookingId,
    location.state,
  ]);

  // =========================================================
  // HELPERS
  // =========================================================

  const formatDate = (
    value
  ) => {
    if (!value) return "-";

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return value;
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatPrice = (
    value
  ) =>
    Number(
      value || 0
    ).toLocaleString(
      "en-IN"
    );

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#123d78]" />

          <p className="mt-4 text-sm text-gray-500">
            Loading booking...
          </p>

        </div>

      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error && !booking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

        <div className="w-full max-w-md rounded-[28px] bg-white p-8 text-center shadow-lg">

          <h1 className="text-xl font-bold text-gray-900">
            Booking not found
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/")
            }
            className="mt-6 rounded-full bg-[#123d78] px-6 py-3 text-sm font-bold text-white"
          >
            Go Home
          </button>

        </div>

      </div>
    );
  }

  // =========================================================
  // DATA
  // =========================================================

  const propertyTitle =
    property?.title ||
    property?.name ||
    booking?.property_title ||
    "Your property";

  const city =
    property?.city ||
    property?.location?.city ||
    booking?.city ||
    "";

  const checkIn =
    booking?.check_in ||
    location.state?.checkIn;

  const checkOut =
    booking?.check_out ||
    location.state?.checkOut;

  const guestCount =
    booking?.guest_count ||
    location.state?.guestCount ||
    1;

  const totalAmount =
    booking?.total_amount ||
    location.state?.totalAmount ||
    0;

  const image =
    property?.image_url ||
    property?.image ||
    property?.images?.[0]?.image_url ||
    property?.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85";

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-3xl">

        {/* SUCCESS */}

        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">

            <CheckCircle2
              size={48}
              className="text-green-600"
            />

          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Booking confirmed!
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Your reservation has been successfully created.
          </p>

          <p className="mt-3 text-sm font-bold text-[#123d78]">
            Booking ID: #{bookingId}
          </p>

        </div>

        {/* CARD */}

        <div className="mt-10 overflow-hidden rounded-[30px] bg-white shadow-xl">

          <img
            src={image}
            alt={propertyTitle}
            className="h-64 w-full object-cover"
          />

          <div className="p-6 sm:p-8">

            <h2 className="text-2xl font-bold text-gray-900">
              {propertyTitle}
            </h2>

            {city && (
              <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">

                <MapPin size={16} />

                {city}

              </p>
            )}

            {/* DETAILS */}

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

              <div className="rounded-2xl bg-gray-50 p-4">

                <CalendarDays
                  size={20}
                  className="text-[#123d78]"
                />

                <p className="mt-3 text-xs font-semibold text-gray-500">
                  Check-in
                </p>

                <p className="mt-1 text-sm font-bold text-gray-900">
                  {formatDate(
                    checkIn
                  )}
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 p-4">

                <CalendarDays
                  size={20}
                  className="text-[#123d78]"
                />

                <p className="mt-3 text-xs font-semibold text-gray-500">
                  Check-out
                </p>

                <p className="mt-1 text-sm font-bold text-gray-900">
                  {formatDate(
                    checkOut
                  )}
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 p-4">

                <Users
                  size={20}
                  className="text-[#123d78]"
                />

                <p className="mt-3 text-xs font-semibold text-gray-500">
                  Guests
                </p>

                <p className="mt-1 text-sm font-bold text-gray-900">
                  {guestCount}
                </p>

              </div>

            </div>

            {/* TOTAL */}

            <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">

              <span className="text-base font-semibold text-gray-600">
                Total amount
              </span>

              <span className="text-2xl font-bold text-gray-900">
                ₹
                {formatPrice(
                  totalAmount
                )}
              </span>

            </div>

            {/* BUTTONS */}

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/bookings"
                  )
                }
                className="flex items-center justify-center gap-2 rounded-2xl border-2 border-[#123d78] px-5 py-3.5 text-sm font-bold text-[#123d78] hover:bg-[#123d78] hover:text-white"
              >
                My bookings
                <ArrowRight
                  size={17}
                />
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/")
                }
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#123d78] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#0d2f60]"
              >
                Continue exploring
                <ArrowRight
                  size={17}
                />
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BookingConfirmation;