import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getPropertyImages } from "../../api/propertyImagesApi";
import PropertyHeader from "./PropertyHeader";
import PropertyGallery from "./PropertyGallery";
import PropertyInfo from "./PropertyInfo";
import PropertyAmenities from "./PropertyAmenities";
import PropertyLocation from "./PropertyLocation";
import PropertyReviews from "./PropertyReviews";
import BookingCard from "./BookingCard";
import PaymentMethod from "./PaymentMethod";
import HouseRules from "./HouseRules";
import PropertyPolicies from "./PropertyPolicies";
import PropertyFAQ from "./PropertyFAQ";


const API_URL = "http://127.0.0.1:8000";

const fallbackImages = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90",
];

function getErrorMessage(value) {
  if (!value) return "Something went wrong.";

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value
      .map((item) =>
        typeof item === "string"
          ? item
          : item?.msg || item?.message || JSON.stringify(item)
      )
      .join(", ");
  }

  return (
    value?.detail ||
    value?.message ||
    value?.error ||
    "Something went wrong."
  );
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function calculateNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  const difference =
    end.getTime() - start.getTime();

  return Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );
}

function PropertyDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  // ---------------------------------------------------------
  // PROPERTY
  // ---------------------------------------------------------

  const [property, setProperty] = useState(null);
  const [propertyImages, setPropertyImages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------------------------------------------------
  // BOOKING
  // ---------------------------------------------------------

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [availability, setAvailability] = useState(null);
  const [checkingAvailability, setCheckingAvailability] =
    useState(false);

  const [pricing, setPricing] = useState(null);

  const [bookingLoading, setBookingLoading] =
    useState(false);

  const [bookingError, setBookingError] = useState("");

  // ---------------------------------------------------------
  // FAVORITE
  // ---------------------------------------------------------

  const [favorite, setFavorite] = useState(false);

  // ---------------------------------------------------------
  // PAYMENT METHODS
  // ---------------------------------------------------------

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState(null);


  // =========================================================
  // FETCH PROPERTY
  // =========================================================

  useEffect(() => {
    if (!id) {
      setError("Property ID is missing.");
      setLoading(false);
      return;
    }

    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/properties/${id}`
        );

        const text = await response.text();

        let data;

        try {
          data = text ? JSON.parse(text) : null;
        } catch {
          data = text;
        }

        if (!response.ok) {
          throw new Error(
            getErrorMessage(data) ||
              `Property API failed: ${response.status}`
          );
        }

        const propertyData =
          data?.data ||
          data?.property ||
          data;

        if (!propertyData) {
          throw new Error(
            "Property details not found."
          );
        }

        console.log(
          "PROPERTY:",
          propertyData
        );

        setProperty(propertyData);
      } catch (err) {
        console.error(
          "PROPERTY ERROR:",
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

    fetchProperty();
  }, [id]);

  // =========================================================
  // FETCH PROPERTY IMAGES
  // =========================================================

  useEffect(() => {
    if (!id) return;

    const loadImages = async () => {
      try {
        const response =
          await getPropertyImages();

        const imageList =
          Array.isArray(response)
            ? response
            : response?.data ||
              response?.items ||
              [];

        const filtered =
          imageList
            .filter(
              (item) =>
                String(item?.property_id) ===
                String(id)
            )
            .sort(
              (a, b) =>
                Number(a?.display_order || 0) -
                Number(b?.display_order || 0)
            )
            .map(
              (item) =>
                item?.image_url ||
                item?.url
            )
            .filter(Boolean);

        setPropertyImages(filtered);
      } catch (err) {
        console.error(
          "PROPERTY IMAGES ERROR:",
          err
        );

        setPropertyImages([]);
      }
    };

    loadImages();
  }, [id]);

  // =========================================================
  // IMAGES
  // =========================================================

  const images = useMemo(() => {
    if (propertyImages.length > 0) {
      return propertyImages;
    }

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
            image?.image_url ||
            image?.imageUrl ||
            image?.url
          );
        })
        .filter(Boolean);
    }

    if (property?.image_url) {
      return [property.image_url];
    }

    if (property?.image) {
      return [property.image];
    }

    return fallbackImages;
  }, [property, propertyImages]);

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
    property?.house_rules ||
    property?.rules ||
    property?.property_rules ||
    [];

  // =========================================================
  // PRICE
  // =========================================================

  const basePrice = Number(
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
  // RESET BOOKING DATA
  // =========================================================

  const resetBookingData = () => {
    setAvailability(null);
    setPricing(null);
    setBookingError("");
  };

  // =========================================================
  // FALLBACK PRICING
  // =========================================================

  const createFallbackPricing = () => {
    const nights = calculateNights(
      checkIn,
      checkOut
    );

    if (nights <= 0) {
      throw new Error(
        "Please select valid check-in and check-out dates."
      );
    }

    const subtotal =
      basePrice * nights;

    const fallback = {
      nights,
      nightly_price: basePrice,
      subtotal,
      cleaning_fee: 0,
      service_fee: 0,
      total_amount: subtotal,
      currency: "INR",
    };

    setPricing(fallback);

    return fallback;
  };

  // =========================================================
  // PRICING
  // =========================================================

  const calculatePricing = async () => {
    const nights = calculateNights(
      checkIn,
      checkOut
    );

    if (nights <= 0) {
      throw new Error(
        "Check-out date must be after check-in date."
      );
    }

    try {
      const response = await fetch(
        `${API_URL}/pricing/`
      );

      const text = await response.text();

      let data = null;

      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = null;
      }

      if (!response.ok) {
        return createFallbackPricing();
      }

      const pricingData =
        data?.data ||
        data?.pricing ||
        data;

      const nightlyPrice = Number(
        pricingData?.nightly_price ??
          pricingData?.price_per_night ??
          pricingData?.base_price ??
          basePrice
      );

      const subtotal = Number(
        pricingData?.subtotal ??
          nightlyPrice * nights
      );

      const cleaningFee = Number(
        pricingData?.cleaning_fee ?? 0
      );

      const serviceFee = Number(
        pricingData?.service_fee ?? 0
      );

      const total = Number(
        pricingData?.total_amount ??
          pricingData?.total ??
          subtotal +
            cleaningFee +
            serviceFee
      );

      const result = {
        ...pricingData,
        nights,
        nightly_price: nightlyPrice,
        subtotal,
        cleaning_fee: cleaningFee,
        service_fee: serviceFee,
        total_amount: total,
        currency:
          pricingData?.currency || "INR",
      };

      setPricing(result);

      return result;
    } catch (err) {
      console.error(
        "PRICING ERROR:",
        err
      );

      return createFallbackPricing();
    }
  };

  // =========================================================
  // CHECK AVAILABILITY
  // =========================================================

  const performAvailabilityCheck =
    async () => {
      if (!checkIn || !checkOut) {
        throw new Error(
          "Please select check-in and check-out dates."
        );
      }

      if (checkOut <= checkIn) {
        throw new Error(
          "Check-out date must be after check-in."
        );
      }

      try {
        setCheckingAvailability(true);
        setBookingError("");

        const response = await fetch(
          `${API_URL}/property-availability/property/${id}`
        );

        const text = await response.text();

        let data = null;

        try {
          data = text ? JSON.parse(text) : null;
        } catch {
          data = text;
        }

        if (!response.ok) {
          throw new Error(
            getErrorMessage(data) ||
              `Availability API failed: ${response.status}`
          );
        }

        console.log(
          "AVAILABILITY RESPONSE:",
          data
        );

        /*
         * Normalize response.
         */

        let records = [];

        if (Array.isArray(data)) {
          records = data;
        } else if (
          Array.isArray(data?.data)
        ) {
          records = data.data;
        } else if (
          Array.isArray(data?.items)
        ) {
          records = data.items;
        } else if (
          data &&
          typeof data === "object"
        ) {
          records = [data];
        }

        /*
         * Determine availability.
         *
         * If API explicitly says false,
         * then unavailable.
         */

        let isAvailable = true;

        const explicitFalse =
          records.some(
            (record) =>
              record?.is_available === false ||
              record?.available === false ||
              record?.status ===
                "unavailable"
          );

        if (explicitFalse) {
          isAvailable = false;
        }

        /*
         * Date-range records.
         */

        if (
          isAvailable &&
          records.length > 0
        ) {
          const dateRecords =
            records.filter(
              (record) =>
                record?.available_from ||
                record?.start_date ||
                record?.date
            );

          if (dateRecords.length > 0) {
            const matchingRecord =
              dateRecords.find(
                (record) => {
                  const start =
                    record?.available_from ||
                    record?.start_date ||
                    record?.date;

                  const end =
                    record?.available_to ||
                    record?.end_date ||
                    record?.date ||
                    start;

                  return (
                    start <= checkIn &&
                    end >= checkOut
                  );
                }
              );

            /*
             * Only reject when API has
             * meaningful availability
             * date records and none match.
             */

            if (
              !matchingRecord &&
              dateRecords.some(
                (record) =>
                  record?.is_available !==
                    undefined ||
                  record?.available !==
                    undefined
              )
            ) {
              isAvailable = false;
            }
          }
        }

        const result = {
          available: isAvailable,
          records,
        };

        setAvailability(result);

        if (!isAvailable) {
          setPricing(null);

          throw new Error(
            "This property is not available for the selected dates."
          );
        }

        const price =
          await calculatePricing();

        return {
          available: true,
          records,
          pricing: price,
        };
      } finally {
        setCheckingAvailability(false);
      }
    };

  const checkAvailability = async () => {
    try {
      await performAvailabilityCheck();
    } catch (err) {
      console.error(
        "AVAILABILITY ERROR:",
        err
      );

      setAvailability({
        available: false,
        records: [],
      });

      setBookingError(
        err.message ||
          "Unable to check availability."
      );
    }
  };

  // =========================================================
  // CREATE BOOKING
  // =========================================================

  const createBooking = async () => {
    const totalAmount = Number(
      pricing?.total_amount ||
        pricing?.total ||
        0
    );

    const payload = {
      guest_id:
        Number(
          localStorage.getItem(
            "guest_id"
          )
        ) || 1,

      host_id:
        Number(
          property?.host_id
        ) || 5,

      property_id:
        Number(id),

      check_in:
        checkIn,

      check_out:
        checkOut,

      guest_count:
        Number(guests),

      booking_status:
        "pending",

      total_amount:
        totalAmount.toFixed(2),

      currency:
        pricing?.currency ||
        "INR",

      booking_method:
        "online",

      special_request:
        null,
    };

    console.log(
      "BOOKING PAYLOAD:",
      payload
    );

    const response =
      await fetch(
        `${API_URL}/bookings/`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Accept:
              "application/json",
          },

          body:
            JSON.stringify(payload),
        }
      );

    const text =
      await response.text();

    let data = null;

    try {
      data =
        text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    console.log(
      "BOOKING STATUS:",
      response.status
    );

    console.log(
      "BOOKING RESPONSE:",
      data
    );

    if (!response.ok) {
      throw new Error(
        getErrorMessage(data) ||
          `Booking failed: ${response.status}`
      );
    }

    /*
     * Support all common API response formats.
     */

    const booking =
      data?.data ||
      data?.booking ||
      data;

    const bookingId =
      booking?.id ??
      booking?.booking_id ??
      booking?.bookingId ??
      data?.id ??
      data?.booking_id ??
      data?.bookingId;

    console.log(
      "BOOKING ID:",
      bookingId
    );

    if (
      bookingId === undefined ||
      bookingId === null ||
      bookingId === ""
    ) {
      throw new Error(
        "Booking created successfully, but Booking ID was not returned by the API."
      );
    }

    /*
     * Save fallback data.
     */

    localStorage.setItem(
      "last_booking_id",
      String(bookingId)
    );

    localStorage.setItem(
      "last_booking",
      JSON.stringify({
        ...booking,
        property_id: Number(id),
        property_title:
          property?.title ||
          property?.name ||
          "Property",
        check_in: checkIn,
        check_out: checkOut,
        guest_count: Number(guests),
        total_amount: totalAmount,
        currency:
          pricing?.currency ||
          "INR",
      })
    );

    /*
     * IMPORTANT:
     * Navigate only after API success.
     */

    navigate(
      `/booking-confirmation/${bookingId}`,
      {
        replace: true,

        state: {
          booking,
          property,
          checkIn,
          checkOut,
          guestCount:
            Number(guests),
          totalAmount,
        },
      }
    );
  };

  // =========================================================
  // RESERVE
  // =========================================================

  const handleBooking = async () => {
    try {
      setBookingError("");

      if (!checkIn || !checkOut) {
        throw new Error(
          "Please select check-in and check-out dates."
        );
      }

      if (checkOut <= checkIn) {
        throw new Error(
          "Check-out date must be after check-in date."
        );
      }

      setBookingLoading(true);

      /*
       * ALWAYS check availability before
       * creating booking.
       *
       * This prevents Reserve from being
       * disabled just because state was
       * not updated yet.
       */

      const result =
        await performAvailabilityCheck();

      if (!result?.available) {
        throw new Error(
          "Property is not available for the selected dates."
        );
      }

      /*
       * Now create booking.
       */

      await createBooking();
    } catch (err) {
      console.error(
        "RESERVE ERROR:",
        err
      );

      setBookingError(
        err.message ||
          "Unable to complete booking."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-white">

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          <div className="h-8 w-28 animate-pulse rounded bg-gray-200" />

          <div className="mt-8 h-[500px] animate-pulse rounded-[28px] bg-gray-200" />

        </div>

      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error || !property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

        <div className="w-full max-w-md rounded-[28px] bg-white p-8 text-center shadow-lg">

          <h1 className="text-2xl font-bold text-gray-900">
            Property not found
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            {error ||
              "Unable to load property."}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(-1)
            }
            className="mt-6 rounded-full bg-[#123d78] px-6 py-3 text-sm font-bold text-white"
          >
            Go Back
          </button>

        </div>

      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-white">

      <PropertyHeader
        property={property}
        rating={rating}
        favorite={favorite}
        setFavorite={setFavorite}
        onBack={() =>
          navigate(-1)
        }
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <PropertyGallery
          images={images}
          title={
            property?.title ||
            property?.name ||
            "Property"
          }
        />

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_370px]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="min-w-0">

            <PropertyInfo
              property={property}
              rating={rating}
            />

            <PropertyAmenities
              amenities={amenities}
            />

            <PropertyLocation
              property={property}
            />

            <PropertyReviews
              property={property}
              rating={rating}
            />

            <HouseRules
              rules={rules}
            />

            <PropertyPolicies
              property={property}
            />

            <PropertyFAQ
              property={property}
            />

          </div>

          {/* =================================================
              RIGHT
          ================================================= */}

          <aside className="h-fit">

            <BookingCard
              property={property}
              basePrice={basePrice}
              rating={rating}

              checkIn={checkIn}
              checkOut={checkOut}
              guests={guests}

              setCheckIn={(value) => {
                setCheckIn(value);
                resetBookingData();
              }}

              setCheckOut={(value) => {
                setCheckOut(value);
                resetBookingData();
              }}

              setGuests={setGuests}

              availability={availability}
              pricing={pricing}

              checkingAvailability={
                checkingAvailability
              }

              bookingLoading={
                bookingLoading
              }

              bookingError={
                bookingError
              }

              onCheckAvailability={
                checkAvailability
              }

              onBooking={
                handleBooking
              }
            />

            <PaymentMethod
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={
                setSelectedPaymentMethod
              }
              userId={
                Number(localStorage.getItem("user_id")) ||
                Number(localStorage.getItem("guest_id")) ||
                1
              }
              disabled={bookingLoading}
              onPaymentMethodChange={(method) => {
                setSelectedPaymentMethod(method);
              }}
            />

            

          </aside>

        </div>

      </main>
    </div>
  );
}

export default PropertyDetails;