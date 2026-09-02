import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  CalendarDays,
  Users,
  Home,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";
import {
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

function BookingConfirmation() {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const location = useLocation();

  const [booking, setBooking] = useState(
    location.state?.booking || null
  );

  const [property, setProperty] = useState(
    location.state?.property || null
  );

  const [loading, setLoading] = useState(!booking);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD BOOKING
  // =====================================================

  useEffect(() => {
    if (!bookingId) {
      setError("Booking ID is missing.");
      setLoading(false);
      return;
    }

    const loadBooking = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API_URL}/bookings/${bookingId}`
        );

        console.log("Booking confirmation API:", response.data);

        setBooking(response.data);

        // =================================================
        // LOAD PROPERTY USING property_id
        // =================================================

        if (response.data?.property_id) {
          try {
            const propertyResponse = await axios.get(
              `${API_URL}/properties/${response.data.property_id}`
            );

            console.log(
              "Property confirmation API:",
              propertyResponse.data
            );

            setProperty(propertyResponse.data);
          } catch (propertyError) {
            console.error(
              "Property API Error:",
              propertyError
            );
          }
        }
      } catch (err) {
        console.error(
          "Booking Confirmation API Error:",
          err
        );

        setError(
          err?.response?.data?.detail ||
            "Unable to load booking details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [bookingId]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]">
        <div className="text-center">
          <Loader2
            size={42}
            className="mx-auto animate-spin text-[#e61e4d]"
          />

          <p className="mt-4 text-sm font-medium text-gray-500">
            Loading your booking...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7] px-5">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertCircle
              size={34}
              className="text-red-500"
            />
          </div>

          <h1 className="mt-5 text-xl font-bold text-gray-900">
            Booking details unavailable
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {error || "Unable to find this booking."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 rounded-xl bg-[#e61e4d] px-6 py-3 text-sm font-semibold text-white hover:bg-[#d91545]"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // BOOKING DATA
  // =====================================================

  const checkIn =
    booking?.check_in ||
    location.state?.checkIn ||
    "";

  const checkOut =
    booking?.check_out ||
    location.state?.checkOut ||
    "";

  const guestCount =
    booking?.guest_count ||
    location.state?.guestCount ||
    1;

  const totalAmount =
    booking?.total_amount ||
    location.state?.totalAmount ||
    0;

  const currency =
    booking?.currency || "INR";

  const bookingStatus =
    booking?.booking_status || "pending";

  const propertyName =
    property?.title ||
    property?.name ||
    location.state?.property?.title ||
    location.state?.property?.name ||
    "Your reservation";

  const propertyCity =
    property?.city ||
    location.state?.property?.city ||
    "";

  const propertyImage =
    property?.image_url ||
    property?.image ||
    location.state?.property?.image_url ||
    location.state?.property?.image ||
    "";

  // =====================================================
  // STATUS
  // =====================================================

  const isConfirmed =
    bookingStatus === "confirmed";

  return (
    <div className="min-h-screen bg-[#f7f7f7]">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center px-4 py-5">

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 transition hover:text-black"
          >
            <ArrowLeft size={20} />
            Home
          </button>

        </div>
      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="mx-auto max-w-4xl px-4 py-10">

        {/* =================================================
            SUCCESS
        ================================================= */}

        <section className="rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">

          <div
            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
              isConfirmed
                ? "bg-green-100"
                : "bg-yellow-100"
            }`}
          >
            <CheckCircle
              size={46}
              className={
                isConfirmed
                  ? "text-green-600"
                  : "text-yellow-600"
              }
            />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            {isConfirmed
              ? "Booking confirmed!"
              : "Booking request received!"}
          </h1>

          <p className="mt-3 text-gray-500">
            {isConfirmed
              ? "Your reservation has been successfully confirmed."
              : "Your reservation has been successfully created and is pending confirmation."}
          </p>

          {bookingId && (
            <p className="mt-4 text-sm text-gray-500">
              Booking ID:

              <span className="ml-1 font-bold text-gray-900">
                #{bookingId}
              </span>
            </p>
          )}

          {/* STATUS */}

          <div className="mt-5">
            <span
              className={`inline-flex rounded-full px-4 py-2 text-xs font-bold uppercase ${
                isConfirmed
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {bookingStatus}
            </span>
          </div>

        </section>

        {/* =================================================
            PROPERTY DETAILS
        ================================================= */}

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex gap-5">

            {propertyImage ? (
              <img
                src={propertyImage}
                alt={propertyName}
                className="h-28 w-28 rounded-2xl object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-gray-100">
                <Home
                  size={35}
                  className="text-gray-400"
                />
              </div>
            )}

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {propertyName}
              </h2>

              {propertyCity && (
                <p className="mt-2 text-sm text-gray-500">
                  {propertyCity}
                </p>
              )}

              {booking?.property_id && (
                <p className="mt-2 text-xs text-gray-400">
                  Property ID: {booking.property_id}
                </p>
              )}
            </div>

          </div>

          {/* =================================================
              TRIP DETAILS
          ================================================= */}

          <div className="mt-8 grid gap-5 border-t pt-6 sm:grid-cols-3">

            {/* CHECK IN */}

            <div className="flex gap-3">
              <CalendarDays
                size={21}
                className="text-gray-700"
              />

              <div>
                <p className="text-xs text-gray-500">
                  Check-in
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {checkIn || "-"}
                </p>
              </div>
            </div>

            {/* CHECK OUT */}

            <div className="flex gap-3">
              <CalendarDays
                size={21}
                className="text-gray-700"
              />

              <div>
                <p className="text-xs text-gray-500">
                  Check-out
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {checkOut || "-"}
                </p>
              </div>
            </div>

            {/* GUESTS */}

            <div className="flex gap-3">
              <Users
                size={21}
                className="text-gray-700"
              />

              <div>
                <p className="text-xs text-gray-500">
                  Guests
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {guestCount}
                </p>
              </div>
            </div>

          </div>

          {/* =================================================
              TOTAL
          ================================================= */}

          <div className="mt-6 flex items-center justify-between border-t pt-6">

            <span className="font-semibold text-gray-900">
              Total amount
            </span>

            <span className="text-2xl font-bold text-gray-900">
              {currency === "INR" ? "₹" : currency}{" "}
              {Number(totalAmount).toLocaleString(
                "en-IN"
              )}
            </span>

          </div>

          {/* =================================================
              BOOKING METHOD
          ================================================= */}

          {booking?.booking_method && (
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-500">
                Booking method
              </span>

              <span className="font-semibold capitalize text-gray-900">
                {booking.booking_method}
              </span>
            </div>
          )}

          {/* =================================================
              SPECIAL REQUEST
          ================================================= */}

          {booking?.special_request && (
            <div className="mt-5 rounded-2xl bg-gray-50 p-4">

              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Special request
              </p>

              <p className="mt-2 text-sm text-gray-700">
                {booking.special_request}
              </p>

            </div>
          )}

        </section>

        {/* =================================================
            ACTION
        ================================================= */}

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-6 w-full rounded-xl bg-[#e61e4d] px-6 py-4 font-semibold text-white transition hover:bg-[#d91545]"
        >
          Continue exploring
        </button>

      </main>
    </div>
  );
}

export default BookingConfirmation;