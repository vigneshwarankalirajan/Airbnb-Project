import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Heart,
  MapPin,
  Share2,
  ShieldCheck,
  Star,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

const API_URL = "http://127.0.0.1:8000";

const fallbackImages = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90",
];

const formatApiError = (value) => {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(formatApiError).join(" ");
  }

  if (value && typeof value === "object") {
    if (value.msg) {
      return value.loc
        ? `${value.loc.at(-1)}: ${value.msg}`
        : value.msg;
    }

    return value.message || value.detail || JSON.stringify(value);
  }

  return value ? String(value) : "Unable to create booking.";
};

function PropertyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // =========================================================
  // PROPERTY
  // =========================================================

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // BOOKING STATE
  // =========================================================

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [checkingAvailability, setCheckingAvailability] =
    useState(false);

  const [availability, setAvailability] =
    useState(null);

  const [pricing, setPricing] = useState(null);

  const [bookingLoading, setBookingLoading] =
    useState(false);

  const [bookingError, setBookingError] =
    useState("");

  const [favorite, setFavorite] =
    useState(false);

  // =========================================================
  // FETCH PROPERTY
  // =========================================================

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError("");

        console.log(
          "Fetching property:",
          id
        );

        const response = await fetch(
          `${API_URL}/properties/${id}`
        );

        if (!response.ok) {
          throw new Error(
            `Property API failed: ${response.status}`
          );
        }

        const data = await response.json();

        console.log(
          "Property API Response:",
          data
        );

        const propertyData =
          data?.data ||
          data?.property ||
          data;

        setProperty(propertyData);

        // Default guests
        setGuests(
          propertyData?.max_guests ||
            propertyData?.maxGuests ||
            1
        );
      } catch (err) {
        console.error(
          "Property Details Error:",
          err
        );

        setError(
          err.message ||
            "Unable to load property."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  // =========================================================
  // IMAGES
  // =========================================================

  const images = useMemo(() => {
    if (
      Array.isArray(property?.images) &&
      property.images.length > 0
    ) {
      return property.images
        .map((image) => {
          if (typeof image === "string") {
            return image;
          }

          return (
            image?.url ||
            image?.image_url ||
            image?.imageUrl
          );
        })
        .filter(Boolean);
    }

    if (property?.image) {
      return [property.image];
    }

    if (property?.image_url) {
      return [property.image_url];
    }

    return fallbackImages;
  }, [property]);

  // =========================================================
  // AMENITIES
  // =========================================================

  const amenities =
    property?.amenities ||
    property?.property_amenities ||
    [];

  // =========================================================
  // RULES
  // =========================================================

  const rules =
    property?.rules ||
    property?.property_rules ||
    [];

  // =========================================================
  // PRICE
  // =========================================================

  const basePrice =
    Number(
      property?.price ??
        property?.price_per_night ??
        property?.nightly_price ??
        2500
    );

  // =========================================================
  // RATING
  // =========================================================

  const rating =
    property?.rating ??
    property?.average_rating ??
    "New";

  // =========================================================
  // CHECK AVAILABILITY
  // =========================================================

  const checkAvailability = async () => {
    if (!checkIn || !checkOut) {
      setBookingError(
        "Please select check-in and check-out dates."
      );

      return;
    }

    if (checkOut <= checkIn) {
      setBookingError(
        "Check-out date must be after check-in."
      );

      return;
    }

    setBookingError("");
    setCheckingAvailability(true);
    setAvailability(null);
    setPricing(null);

    try {
      console.log(
        "Checking availability:",
        {
          property_id: id,
          check_in: checkIn,
          check_out: checkOut,
          guests,
        }
      );

      /*
       * Availability API
       *
       * Expected:
       * GET /availability/
       *
       * Query:
       * property_id
       * check_in
       * check_out
       * guests
       */

      const response = await fetch(
        `${API_URL}/property-availability/property/${id}`
      );

      if (!response.ok) {
        throw new Error(
          `Availability API failed: ${response.status}`
        );
      }

      const data = await response.json();

      console.log(
        "Availability API Response:",
        data
      );

      const availabilityRecords = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : data
            ? [data]
            : [];

      const available = availabilityRecords.some((record) =>
        record?.is_available !== false &&
        record?.available_from <= checkIn &&
        record?.available_to >= checkOut
      );

      setAvailability({
        records: availabilityRecords,
        available,
      });

      // =====================================================
      // PRICING
      // =====================================================

      if (available) {
        await calculatePricing();
      }
    } catch (err) {
      console.error(
        "Availability Error:",
        err
      );

      setBookingError(
        err.message ||
          "Unable to check availability."
      );
    } finally {
      setCheckingAvailability(false);
    }
  };

  // =========================================================
  // CALCULATE PRICING
  // =========================================================

  const calculatePricing = async () => {
    try {
      const start = new Date(checkIn);
      const end = new Date(checkOut);

      const milliseconds =
        end.getTime() -
        start.getTime();

      const nights = Math.ceil(
        milliseconds /
          (1000 * 60 * 60 * 24)
      );

      /*
       * Pricing API
       *
       * If your backend endpoint is different,
       * change only this URL.
       */

      const response = await fetch(
        `${API_URL}/pricing/`
      );

      if (response.ok) {
        const data = await response.json();

        console.log(
          "Pricing API Response:",
          data
        );

        const pricingData =
          data?.data ||
          data?.pricing ||
          data;

        setPricing({
          ...pricingData,
          nights:
            pricingData?.nights ||
            nights,

          nightly_price:
            pricingData?.nightly_price ??
            pricingData?.price_per_night ??
            basePrice,

          subtotal:
            pricingData?.subtotal ??
            basePrice * nights,

          cleaning_fee:
            pricingData?.cleaning_fee ??
            0,

          service_fee:
            pricingData?.service_fee ??
            0,

          total_amount:
            pricingData?.total_amount ??
            pricingData?.total ??
            basePrice * nights,
        });

        return;
      }

      // =====================================================
      // FALLBACK PRICE CALCULATION
      // =====================================================

      setPricing({
        nights,
        nightly_price: basePrice,
        subtotal: basePrice * nights,
        cleaning_fee: 0,
        service_fee: 0,
        total_amount:
          basePrice * nights,
      });
    } catch (err) {
      console.error(
        "Pricing API Error:",
        err
      );

      // Fallback calculation
      const start = new Date(checkIn);
      const end = new Date(checkOut);

      const nights = Math.ceil(
        (end.getTime() -
          start.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      setPricing({
        nights,
        nightly_price: basePrice,
        subtotal:
          basePrice * nights,
        cleaning_fee: 0,
        service_fee: 0,
        total_amount:
          basePrice * nights,
      });
    }
  };

  // =========================================================
  // BOOKING
  // =========================================================

  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      setBookingError(
        "Please select your dates."
      );

      return;
    }

    if (!availability?.available) {
      setBookingError(
        "Please check availability first."
      );

      return;
    }

    setBookingLoading(true);
    setBookingError("");

    try {
      const bookingData = {
        guest_id:
          Number(localStorage.getItem("guest_id")) || 1,
        host_id: Number(property?.host_id) || 5,
        property_id: Number(id),
        check_in: checkIn,
        check_out: checkOut,
        guest_count: Number(guests),
        booking_status: "pending",
        total_amount: Number(pricing?.total_amount || pricing?.total || 0).toFixed(2),
        currency: pricing?.currency || "INR",
        booking_method: "online",
        special_request: null,
      };

      console.log(
        "Creating booking:",
        bookingData
      );

      /*
       * BOOKING API
       */

      const response = await fetch(
        `${API_URL}/bookings/`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Accept:
              "application/json",
          },

          body: JSON.stringify(
            bookingData
          ),
        }
      );

      if (!response.ok) {
        const errorData =
          await response.json().catch(
            () => null
          );

        throw new Error(
          formatApiError(
            errorData?.detail ||
              errorData?.message ||
              `Booking API failed: ${response.status}`
          )
        );
      }

      const booking =
        await response.json();

      console.log(
        "Booking Created:",
        booking
      );

      const bookingId =
        booking?.id ||
        booking?.booking_id ||
        booking?.data?.id ||
        booking?.data?.booking_id;

      if (!bookingId) {
        throw new Error(
          "Booking created but booking ID was not returned."
        );
      }

      navigate(
        `/booking-confirmation/${bookingId}`
      );
    } catch (err) {
      console.error(
        "Booking Error:",
        err
      );

      setBookingError(formatApiError(err.message));
    } finally {
      setBookingLoading(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          <div className="h-10 w-28 animate-pulse rounded-full bg-gray-200" />

          <div className="mt-8 grid h-[520px] grid-cols-1 gap-3 md:grid-cols-2">

            <div className="animate-pulse rounded-[30px] bg-gray-200" />

            <div className="grid grid-cols-2 gap-3">
              <div className="animate-pulse rounded-[30px] bg-gray-200" />
              <div className="animate-pulse rounded-[30px] bg-gray-200" />
              <div className="animate-pulse rounded-[30px] bg-gray-200" />
              <div className="animate-pulse rounded-[30px] bg-gray-200" />
            </div>

          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error || !property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4">

        <div className="w-full max-w-md rounded-[30px] bg-white p-10 text-center shadow-xl">

          <h1 className="text-2xl font-bold text-gray-900">
            Property not found
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            {error ||
              "Unable to load property details."}
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 rounded-full bg-[#123d78] px-6 py-3 text-sm font-bold text-white"
          >
            Go Back
          </button>

        </div>

      </div>
    );
  }

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="min-h-screen bg-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <div className="flex items-center gap-2">

            <button
              onClick={() =>
                setFavorite(!favorite)
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-50"
            >
              <Heart
                size={18}
                className={
                  favorite
                    ? "fill-[#e61e4d] text-[#e61e4d]"
                    : "text-gray-700"
                }
              />
            </button>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-50"
            >
              <Share2 size={18} />
            </button>

          </div>

        </div>

      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* =====================================================
            TITLE
        ===================================================== */}

        <div className="mb-7">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e61e4d]">
            PREMIUM STAY
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {property.title ||
              property.name ||
              "Beautiful stay"}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">

            <span className="flex items-center gap-1 font-semibold text-gray-900">
              <Star
                size={15}
                fill="currentColor"
              />
              {rating}
            </span>

            <span className="text-gray-300">
              •
            </span>

            <span className="flex items-center gap-1 text-gray-600">
              <MapPin size={15} />

              {property.address
                ? `${property.address}, `
                : ""}

              {property.city ||
                property.location?.city ||
                "Location"}
            </span>

          </div>

        </div>

        {/* =====================================================
            IMAGE GALLERY
        ===================================================== */}

        <div className="grid min-h-[320px] gap-2 overflow-hidden rounded-[28px] sm:h-[520px] md:grid-cols-[1.35fr_1fr] md:rounded-[32px]">

          <div className="relative overflow-hidden">

            <img
              src={images[0]}
              alt={
                property.title ||
                "Property"
              }
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          </div>

          <div
            className={`grid min-h-0 gap-2 ${
              images.length === 2
                ? "grid-cols-1 grid-rows-2"
                : "grid-cols-2 grid-rows-2"
            }`}
          >

            {images
              .slice(1, 5)
              .map((image, index) => (
                <div
                  key={index}
                  className="relative min-h-0 overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`Property ${
                      index + 2
                    }`}
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />

                  {index === 3 && images.length > 5 && (
                    <span className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white">
                      +{images.length - 5} more
                    </span>
                  )}
                </div>
              ))}

          </div>

        </div>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_390px]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div>

            {/* BASIC INFO */}

            <section className="border-b border-gray-200 pb-8">

              <h2 className="text-2xl font-bold text-gray-900">
                {property.property_type ||
                  property.type ||
                  "Entire property"}
              </h2>

              <p className="mt-2 text-gray-500">
                {property.max_guests ??
                  property.guests ??
                  0}{" "}
                guests ·{" "}
                {property.bedrooms ??
                  0}{" "}
                bedrooms ·{" "}
                {property.bathrooms ??
                  0}{" "}
                bathrooms
              </p>

            </section>

            {/* HIGHLIGHTS */}

            <section className="border-b border-gray-200 py-8">

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">

                <div className="flex gap-4">

                  <ShieldCheck className="text-[#123d78]" />

                  <div>
                    <p className="font-semibold">
                      Verified stay
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Trusted property
                    </p>
                  </div>

                </div>

                <div className="flex gap-4">

                  <CalendarDays className="text-[#123d78]" />

                  <div>
                    <p className="font-semibold">
                      Easy booking
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Secure reservation
                    </p>
                  </div>

                </div>

                <div className="flex gap-4">

                  <MapPin className="text-[#123d78]" />

                  <div>
                    <p className="font-semibold">
                      Great location
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Popular destination
                    </p>
                  </div>

                </div>

              </div>

            </section>

            {/* DESCRIPTION */}

            <section className="border-b border-gray-200 py-8">

              <h2 className="text-2xl font-bold">
                About this place
              </h2>

              <p className="mt-4 whitespace-pre-line text-base leading-8 text-gray-600">
                {property.description ||
                  "Enjoy a comfortable and memorable stay at this beautiful property."}
              </p>

            </section>

            {/* AMENITIES */}

            <section className="border-b border-gray-200 py-8">

              <h2 className="text-2xl font-bold">
                What this place offers
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

                {amenities.length > 0
                  ? amenities.map(
                      (amenity, index) => {

                        const name =
                          typeof amenity ===
                          "string"
                            ? amenity
                            : amenity?.name ||
                              amenity?.title ||
                              amenity?.amenity_name ||
                              "Amenity";

                        return (
                          <div
                            key={index}
                            className="flex items-center gap-4 rounded-2xl border border-gray-100 p-4 transition hover:border-blue-100 hover:bg-blue-50/30"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                              <Check
                                size={17}
                                className="text-[#123d78]"
                              />
                            </div>

                            <span className="font-medium text-gray-700">
                              {name}
                            </span>
                          </div>
                        );
                      }
                    )
                  : [
                      "WiFi",
                      "Free parking",
                      "Air conditioning",
                      "Breakfast",
                      "Swimming pool",
                      "24/7 support",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-4 rounded-2xl border border-gray-100 p-4"
                      >
                        <Check
                          size={17}
                          className="text-[#123d78]"
                        />

                        <span className="font-medium text-gray-700">
                          {item}
                        </span>
                      </div>
                    ))}

              </div>

            </section>

            {/* RULES */}

            <section className="py-8">

              <h2 className="text-2xl font-bold">
                House rules
              </h2>

              <div className="mt-5 space-y-3">

                {rules.length > 0
                  ? rules.map(
                      (rule, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 text-gray-600"
                        >
                          <Check size={17} />

                          {typeof rule ===
                          "string"
                            ? rule
                            : rule?.name ||
                              rule?.rule ||
                              rule?.title}
                        </div>
                      )
                    )
                  : (
                    <>
                      <p className="text-gray-600">
                        Check-in after 2:00 PM
                      </p>

                      <p className="text-gray-600">
                        Check-out before 11:00 AM
                      </p>

                      <p className="text-gray-600">
                        No smoking inside
                      </p>
                    </>
                  )}

              </div>

            </section>

          </div>

          {/* =================================================
              BOOKING CARD
          ================================================= */}

          <aside>

            <div className="sticky top-28 rounded-[30px] border border-gray-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.10)]">

              {/* PRICE */}

              <div className="flex items-end justify-between">

                <div>

                  <span className="text-2xl font-bold text-gray-900">
                    ₹
                    {Number(
                      pricing?.nightly_price ||
                        basePrice
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </span>

                  <span className="text-sm text-gray-500">
                    {" "}
                    / night
                  </span>

                </div>

                <div className="flex items-center gap-1 text-sm font-semibold">

                  <Star
                    size={15}
                    fill="currentColor"
                  />

                  {rating}

                </div>

              </div>

              {/* DATES */}

              <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-2xl border border-gray-300">

                <div className="border-r border-gray-300 p-4">

                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Check-in
                  </label>

                  <input
                    type="date"
                    value={checkIn}
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(e) => {
                      setCheckIn(
                        e.target.value
                      );
                      setAvailability(null);
                      setPricing(null);
                      setBookingError("");
                    }}
                    className="mt-2 w-full bg-transparent text-sm font-semibold outline-none"
                  />

                </div>

                <div className="p-4">

                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Check-out
                  </label>

                  <input
                    type="date"
                    value={checkOut}
                    min={
                      checkIn ||
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(e) => {
                      setCheckOut(
                        e.target.value
                      );
                      setAvailability(null);
                      setPricing(null);
                      setBookingError("");
                    }}
                    className="mt-2 w-full bg-transparent text-sm font-semibold outline-none"
                  />

                </div>

              </div>

              {/* GUESTS */}

              <div className="mt-3 rounded-2xl border border-gray-300 p-4">

                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  Guests
                </label>

                <select
                  value={guests}
                  onChange={(e) => {
                    setGuests(
                      Number(
                        e.target.value
                      )
                    );

                    setAvailability(null);
                    setPricing(null);
                  }}
                  className="mt-2 w-full bg-transparent text-sm font-semibold outline-none"
                >

                  {Array.from(
                    {
                      length:
                        property.max_guests ||
                        10,
                    },
                    (_, index) => (
                      <option
                        key={
                          index + 1
                        }
                        value={
                          index + 1
                        }
                      >
                        {index + 1}{" "}
                        {index === 0
                          ? "guest"
                          : "guests"}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* CHECK AVAILABILITY */}

              <button
                onClick={
                  checkAvailability
                }
                disabled={
                  checkingAvailability
                }
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#123d78] py-3.5 text-sm font-bold text-[#123d78] transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
              >

                <CalendarDays size={17} />

                {checkingAvailability
                  ? "Checking..."
                  : "Check availability"}

              </button>

              {/* AVAILABLE */}

              {availability?.available && (
                <div className="mt-4 rounded-2xl bg-green-50 p-4">

                  <p className="font-bold text-green-700">
                    ✓ Available
                  </p>

                  <p className="mt-1 text-xs text-green-600">
                    This property is available for
                    your selected dates.
                  </p>

                </div>
              )}

              {/* NOT AVAILABLE */}

              {availability &&
                !availability.available && (
                  <div className="mt-4 rounded-2xl bg-red-50 p-4">

                    <p className="font-bold text-red-700">
                      {availability.records?.length
                        ? "Not available"
                        : "Availability not configured"}
                    </p>

                    <p className="mt-1 text-xs text-red-600">
                      {availability.records?.length
                        ? "Please select different dates."
                        : "This property does not have an availability schedule yet."}
                    </p>

                  </div>
                )}

              {/* PRICE BREAKDOWN */}

              {pricing && (
                <div className="mt-5 border-t pt-5">

                  <div className="flex justify-between text-sm text-gray-600">

                    <span>
                      ₹
                      {Number(
                        pricing.nightly_price ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}

                      {" × "}

                      {pricing.nights ||
                        1}{" "}
                      nights
                    </span>

                    <span>
                      ₹
                      {Number(
                        pricing.subtotal ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>

                  {Number(
                    pricing.cleaning_fee
                  ) > 0 && (
                    <div className="mt-3 flex justify-between text-sm text-gray-600">

                      <span>
                        Cleaning fee
                      </span>

                      <span>
                        ₹
                        {Number(
                          pricing.cleaning_fee
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </div>
                  )}

                  {Number(
                    pricing.service_fee
                  ) > 0 && (
                    <div className="mt-3 flex justify-between text-sm text-gray-600">

                      <span>
                        Service fee
                      </span>

                      <span>
                        ₹
                        {Number(
                          pricing.service_fee
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </div>
                  )}

                  <div className="mt-5 flex justify-between border-t pt-5 text-lg font-bold text-gray-900">

                    <span>
                      Total
                    </span>

                    <span>
                      ₹
                      {Number(
                        pricing.total_amount ||
                          pricing.total ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>

                </div>
              )}

              {/* BOOKING ERROR */}

              {bookingError && (
                <div className="mt-4 rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">
                  {bookingError}
                </div>
              )}

              {/* RESERVE */}

              <button
                onClick={
                  handleBooking
                }
                disabled={
                  bookingLoading ||
                  !availability?.available
                }
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#123d78] px-6 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-[#0d2f60] disabled:cursor-not-allowed disabled:opacity-50"
              >

                {bookingLoading
                  ? "Creating booking..."
                  : "Reserve your stay"}

                {!bookingLoading && (
                  <ArrowRight
                    size={17}
                  />
                )}

              </button>

              <p className="mt-4 text-center text-xs text-gray-500">
                You won't be charged yet
              </p>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}

export default PropertyDetails;