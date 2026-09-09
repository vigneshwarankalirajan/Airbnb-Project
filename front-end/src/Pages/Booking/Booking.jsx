import React, { useEffect, useMemo, useState } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";

import {
  getPricingByProperty,
  getPropertyAvailability,
  createBooking,
} from "../../api/bookingApi";

import { createPayment } from "../../api/paymentApi";

import {
  getPaymentMethods,
  createPaymentMethod,
} from "../../api/paymentMethodApi";

import {
  getPropertyImagesByProperty,
} from "../../api/propertyImagesApi";

// Booking UI components
import BookingHeader from "./BookingHeader";
import SpecialRequests from "./SpecialRequests";
import SecureBooking from "./SecureBooking";
import PropertySummary from "./PropertySummary";
import PriceDetails from "./PriceDetails";
import AvailabilityStatus from "./AvailabilityStatus";
import ReserveButton from "./ReserveButton";

// Payment UI
import PaymentMethod from "../Payment/PaymentMethod";

function Booking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // =========================================================
  // PROPERTY
  // =========================================================

  const property = location.state?.property || {};

  const propertyId =
    Number(id) || Number(property?.id);


  const [propertyImages, setPropertyImages] =
    useState([]);

  const getPropertyImageUrl = (image) => {
    if (!image) return "";

    if (typeof image === "string") {
      return image;
    }

    return (
      image?.image_url ||
      image?.imageUrl ||
      image?.url ||
      image?.image ||
      image?.photo ||
      image?.src ||
      ""
    );
  };

  const propertyImage =
    getPropertyImageUrl(propertyImages[0]) ||
    getPropertyImageUrl(property?.image_url) ||
    getPropertyImageUrl(property?.image);

  // =========================================================
  // LOAD IMAGES FOR THE SELECTED PROPERTY
  // =========================================================
  useEffect(() => {
    let cancelled = false;

    const loadPropertyImages = async () => {
      if (!propertyId) {
        setPropertyImages([]);
        return;
      }

      try {
        const response =
          await getPropertyImagesByProperty(propertyId);

        console.log(
          "PROPERTY IMAGES API:",
          propertyId,
          response
        );

        if (cancelled) return;

        const rawData = response?.data ?? response;
        let images = [];

        if (Array.isArray(rawData)) {
          images = rawData;
        } else if (Array.isArray(rawData?.images)) {
          images = rawData.images;
        } else if (Array.isArray(rawData?.results)) {
          images = rawData.results;
        } else if (rawData) {
          images = [rawData];
        }

        setPropertyImages(images);
      } catch (error) {
        console.error(
          "PROPERTY IMAGES API ERROR:",
          error
        );

        if (!cancelled) {
          setPropertyImages([]);
        }
      }
    };

    loadPropertyImages();

    return () => {
      cancelled = true;
    };
  }, [propertyId]);

  // =========================================================
  // STATE
  // =========================================================

  const [checkIn, setCheckIn] = useState(
    location.state?.checkIn || ""
  );

  const [checkOut, setCheckOut] = useState(
    location.state?.checkOut || ""
  );

  const [guestCount, setGuestCount] = useState(
    Number(location.state?.guestCount || 2)
  );

  const [specialRequest, setSpecialRequest] =
    useState("");

  const [pricing, setPricing] =
    useState(null);

  const [availability, setAvailability] =
    useState(null);

  const [loadingPrice, setLoadingPrice] =
    useState(true);

  const [loadingAvailability, setLoadingAvailability] =
    useState(false);

  const [bookingLoading, setBookingLoading] =
    useState(false);

  const [paymentLoading, setPaymentLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [guestOpen, setGuestOpen] =
    useState(false);

  // =========================================================
  // PAYMENT
  // =========================================================

  const [paymentMethods, setPaymentMethods] =
    useState([]);

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState(null);

  const [loadingPaymentMethods, setLoadingPaymentMethods] =
    useState(true);

  // =========================================================
  // RESET WHEN PROPERTY CHANGES
  //
  // IMPORTANT:
  // Do NOT use location.key here.
  // Otherwise selecting dates can reset the dates.
  // =========================================================

  useEffect(() => {
    setCheckIn(
      location.state?.checkIn || ""
    );

    setCheckOut(
      location.state?.checkOut || ""
    );

    setGuestCount(
      Number(
        location.state?.guestCount || 2
      )
    );

    setSpecialRequest("");

    setPricing(null);

    setAvailability(null);

    setError("");

    setGuestOpen(false);

    setSelectedPaymentMethod(null);
  }, [propertyId]);

  // =========================================================
  // LOAD PRICING
  // =========================================================

  useEffect(() => {
    let cancelled = false;

    const loadPricing = async () => {
      if (!propertyId) {
        if (!cancelled) {
          setPricing(null);
          setLoadingPrice(false);
        }

        return;
      }

      try {
        if (!cancelled) {
          setLoadingPrice(true);
          setError("");
        }

        const response =
          await getPricingByProperty(
            propertyId
          );

        console.log(
          "PRICING API:",
          response
        );

        let data =
          response?.data ?? response;

        if (Array.isArray(data)) {
          data =
            data.find(
              (item) =>
                Number(
                  item?.property_id
                ) === propertyId
            ) ||
            data[0] ||
            null;
        }

        if (!cancelled) {
          setPricing(data);
        }
      } catch (err) {
        console.error(
          "Pricing API Error:",
          err
        );

        if (!cancelled) {
          setPricing(null);

          setError(
            err?.response?.data?.detail ||
              err?.message ||
              "Unable to load pricing."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingPrice(false);
        }
      }
    };

    loadPricing();

    return () => {
      cancelled = true;
    };
  }, [propertyId]);

  // =========================================================
  // LOAD AVAILABILITY
  //
  // Runs whenever property/date changes.
  // =========================================================

  useEffect(() => {
    let cancelled = false;

    const loadAvailability = async () => {
      if (!propertyId) {
        if (!cancelled) {
          setAvailability(null);
          setLoadingAvailability(false);
        }

        return;
      }

      // Dates not selected yet
      if (!checkIn || !checkOut) {
        if (!cancelled) {
          setAvailability(null);
          setLoadingAvailability(false);
        }

        return;
      }

      const start = new Date(
        `${checkIn}T00:00:00`
      );

      const end = new Date(
        `${checkOut}T00:00:00`
      );

      // Invalid date range
      if (
        Number.isNaN(start.getTime()) ||
        Number.isNaN(end.getTime()) ||
        start >= end
      ) {
        if (!cancelled) {
          setAvailability(null);
          setLoadingAvailability(false);
        }

        return;
      }

      try {
        if (!cancelled) {
          setLoadingAvailability(true);

          // Clear old result while checking
          setAvailability(null);

          setError("");
        }

        const response =
          await getPropertyAvailability(
            propertyId
          );

        console.log(
          "AVAILABILITY API:",
          response
        );

        const rawData =
          response?.data ?? response;

        let records = [];

        /*
         * Supported API response formats:
         *
         * []
         *
         * { availability: [] }
         *
         * { data: [] }
         *
         * { results: [] }
         *
         * { available_from: ..., available_to: ... }
         */

        if (Array.isArray(rawData)) {
          records = rawData;
        } else if (
          Array.isArray(
            rawData?.availability
          )
        ) {
          records =
            rawData.availability;
        } else if (
          Array.isArray(
            rawData?.data
          )
        ) {
          records = rawData.data;
        } else if (
          Array.isArray(
            rawData?.results
          )
        ) {
          records = rawData.results;
        } else if (rawData) {
          records = [rawData];
        }

        console.log(
          "NORMALIZED AVAILABILITY:",
          records
        );

        if (!cancelled) {
          setAvailability(records);
        }
      } catch (err) {
        console.error(
          "Availability API Error:",
          err
        );

        if (!cancelled) {
          setAvailability(null);

          setError(
            err?.response?.data?.detail ||
              "Unable to check property availability."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingAvailability(false);
        }
      }
    };

    loadAvailability();

    return () => {
      cancelled = true;
    };
  }, [
    propertyId,
    checkIn,
    checkOut,
  ]);

  // =========================================================
  // LOAD SAVED PAYMENT METHODS
  // =========================================================

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  const loadPaymentMethods =
    async () => {
      try {
        setLoadingPaymentMethods(
          true
        );

        const response =
          await getPaymentMethods();

        console.log(
          "PAYMENT METHODS API:",
          response
        );

        const rawData =
          response?.data ?? response;

        const methods = Array.isArray(
          rawData
        )
          ? rawData
          : Array.isArray(
              rawData?.payment_methods
            )
          ? rawData.payment_methods
          : [];

        const activeMethods =
          methods.filter(
            (method) =>
              method?.status !==
                "inactive" &&
              method?.status !==
                "disabled"
          );

        setPaymentMethods(
          activeMethods
        );

        const defaultMethod =
          activeMethods.find(
            (method) =>
              method?.is_default ===
              true
          ) ||
          activeMethods[0] ||
          null;

        setSelectedPaymentMethod(
          defaultMethod
        );
      } catch (err) {
        console.error(
          "PAYMENT METHODS ERROR:",
          err
        );

        setPaymentMethods([]);

        setSelectedPaymentMethod(
          null
        );
      } finally {
        setLoadingPaymentMethods(
          false
        );
      }
    };

  // =========================================================
  // NUMBER OF NIGHTS
  // =========================================================

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) {
      return 0;
    }

    const start = new Date(
      checkIn.includes("T")
        ? checkIn
        : `${checkIn}T00:00:00`
    );

    const end = new Date(
      checkOut.includes("T")
        ? checkOut
        : `${checkOut}T00:00:00`
    );

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      return 0;
    }

    const difference =
      end.getTime() -
      start.getTime();

    const result = Math.round(
      difference /
        (1000 * 60 * 60 * 24)
    );

    return result > 0
      ? result
      : 0;
  }, [
    checkIn,
    checkOut,
  ]);

  // =========================================================
  // PRICE CALCULATION
  // =========================================================

  const priceDetails = useMemo(() => {
    if (!pricing) {
      return {
        basePrice: 0,
        cleaningFee: 0,
        serviceFee: 0,
        guestFee: 0,
        tax: 0,
        total: 0,
      };
    }

    const basePrice =
      Number(
        pricing?.base_price || 0
      );

    const cleaningFee =
      Number(
        pricing?.cleaning_fee || 0
      );

    const serviceFee =
      Number(
        pricing?.service_fee || 0
      );

    const extraGuestFee =
      Number(
        pricing?.extra_guest_fee ??
          pricing?.additional_guest_fee ??
          pricing?.guest_fee ??
          basePrice * 0.1
      );

    const taxPercentage =
      Number(
        pricing?.tax_percentage || 0
      );

    if (!nights) {
      return {
        basePrice,
        cleaningFee: 0,
        serviceFee: 0,
        guestFee: 0,
        tax: 0,
        total: 0,
      };
    }

    const stayAmount =
      basePrice * nights;

    const guestFee =
      extraGuestFee *
      Math.max(
        guestCount - 1,
        0
      ) *
      nights;

    const tax =
      ((stayAmount +
        cleaningFee +
        serviceFee +
        guestFee) *
        taxPercentage) /
      100;

    const total =
      stayAmount +
      cleaningFee +
      serviceFee +
      guestFee +
      tax;

    return {
      basePrice,
      cleaningFee,
      serviceFee,
      guestFee,
      tax,
      total,
    };
  }, [
    pricing,
    nights,
    guestCount,
  ]);

  // =========================================================
  // CHECK AVAILABILITY
  // =========================================================

  const isDateAvailable =
    useMemo(() => {
      // API has not completed yet
      if (!availability) {
        return false;
      }

      // Dates required
      if (!checkIn || !checkOut) {
        return false;
      }

      const selectedCheckIn =
        new Date(
          `${checkIn}T00:00:00`
        );

      const selectedCheckOut =
        new Date(
          `${checkOut}T00:00:00`
        );

      // Invalid date
      if (
        Number.isNaN(
          selectedCheckIn.getTime()
        ) ||
        Number.isNaN(
          selectedCheckOut.getTime()
        )
      ) {
        return false;
      }

      // Checkout must be after check-in
      if (
        selectedCheckIn >=
        selectedCheckOut
      ) {
        return false;
      }

      /*
       * IMPORTANT:
       *
       * Empty array means there are no
       * unavailable/blocked records.
       *
       * Therefore selected dates are
       * considered available.
       */

      if (
        availability.length === 0
      ) {
        return true;
      }

      /*
       * If records exist, evaluate them.
       */

      return availability.some(
        (record) => {
          // Explicit unavailable
          if (
            record?.is_available ===
            false
          ) {
            return false;
          }

          if (
            record?.available ===
            false
          ) {
            return false;
          }

          if (
            String(
              record?.status || ""
            ).toLowerCase() ===
            "unavailable"
          ) {
            return false;
          }

          /*
           * Some APIs may return an
           * explicit available=true record.
           */

          if (
            record?.is_available ===
              true &&
            !record?.available_from &&
            !record?.available_to
          ) {
            return true;
          }

          if (
            record?.available ===
              true &&
            !record?.available_from &&
            !record?.available_to
          ) {
            return true;
          }

          const availableFrom =
            record?.available_from
              ? new Date(
                  `${String(
                    record.available_from
                  ).slice(
                    0,
                    10
                  )}T00:00:00`
                )
              : null;

          const availableTo =
            record?.available_to
              ? new Date(
                  `${String(
                    record.available_to
                  ).slice(
                    0,
                    10
                  )}T00:00:00`
                )
              : null;

          const hasValidFrom =
            availableFrom &&
            !Number.isNaN(
              availableFrom.getTime()
            );

          const hasValidTo =
            availableTo &&
            !Number.isNaN(
              availableTo.getTime()
            );

          const validFrom =
            !hasValidFrom ||
            selectedCheckIn >=
              availableFrom;

          const validTo =
            !hasValidTo ||
            selectedCheckOut <=
              availableTo;

          return (
            validFrom &&
            validTo
          );
        }
      );
    }, [
      availability,
      checkIn,
      checkOut,
    ]);

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatBookingDate =
    (value) => {
      if (!value) {
        return "Select date";
      }

      const date = new Date(
        String(value).includes("T")
          ? value
          : `${value}T00:00:00`
      );

      if (
        Number.isNaN(
          date.getTime()
        )
      ) {
        return "Select date";
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

  // =========================================================
  // CREATE PAYMENT METHOD
  // =========================================================

  const saveNewPaymentMethod =
    async () => {
      if (
        !selectedPaymentMethod ||
        !selectedPaymentMethod.is_new ||
        !selectedPaymentMethod.save_payment_method
      ) {
        return null;
      }

      const userId =
        Number(
          localStorage.getItem(
            "guest_id"
          )
        ) || 1;

      const methodType =
        selectedPaymentMethod.method_type;

      // -------------------------------------------------------
      // CREDIT CARD
      // -------------------------------------------------------

      if (
        methodType ===
        "credit_card"
      ) {
        const cleanCardNumber =
          String(
            selectedPaymentMethod.card_number ||
              ""
          ).replace(/\D/g, "");

        const expiry =
          selectedPaymentMethod.expiry ||
          "";

        const [month, year] =
          expiry.split("/");

        if (
          !cleanCardNumber ||
          cleanCardNumber.length <
            4
        ) {
          throw new Error(
            "Invalid card details."
          );
        }

        const payload = {
          user_id: userId,

          method_type:
            "credit_card",

          provider:
            selectedPaymentMethod.provider ||
            "Visa",

          account_holder_name:
            selectedPaymentMethod.account_holder_name ||
            "",

          last_four_digits:
            cleanCardNumber.slice(-4),

          expiry_month:
            Number(month) || null,

          expiry_year: year
            ? Number(`20${year}`)
            : null,

          is_default: true,

          status: "active",
        };

        console.log(
          "SAVE PAYMENT METHOD:",
          payload
        );

        return createPaymentMethod(
          payload
        );
      }

      // -------------------------------------------------------
      // UPI
      // -------------------------------------------------------

      if (
        methodType === "upi"
      ) {
        const payload = {
          user_id: userId,

          method_type: "upi",

          provider:
            selectedPaymentMethod.provider ||
            "UPI",

          account_holder_name:
            selectedPaymentMethod.account_holder_name ||
            null,

          last_four_digits: null,

          expiry_month: null,

          expiry_year: null,

          is_default: true,

          status: "active",
        };

        console.log(
          "SAVE UPI PAYMENT METHOD:",
          payload
        );

        return createPaymentMethod(
          payload
        );
      }

      // -------------------------------------------------------
      // NET BANKING
      // -------------------------------------------------------

      if (
        methodType ===
        "net_banking"
      ) {
        const payload = {
          user_id: userId,

          method_type:
            "net_banking",

          provider:
            selectedPaymentMethod.provider ||
            "Net Banking",

          account_holder_name:
            selectedPaymentMethod.account_holder_name ||
            null,

          last_four_digits: null,

          expiry_month: null,

          expiry_year: null,

          is_default: true,

          status: "active",
        };

        console.log(
          "SAVE NET BANKING PAYMENT METHOD:",
          payload
        );

        return createPaymentMethod(
          payload
        );
      }

      return null;
    };

  // =========================================================
  // RESERVE + PAYMENT
  // =========================================================

  const handleReserve =
    async () => {
      try {
        setError("");

        // -----------------------------------------------------
        // PROPERTY
        // -----------------------------------------------------

        if (!propertyId) {
          setError(
            "Property ID is missing."
          );
          return;
        }

        // -----------------------------------------------------
        // DATES
        // -----------------------------------------------------

        if (!nights) {
          setError(
            "Please select valid check-in and check-out dates."
          );
          return;
        }

        // -----------------------------------------------------
        // AVAILABILITY
        // -----------------------------------------------------

        if (!isDateAvailable) {
          setError(
            "Selected dates are not available."
          );
          return;
        }

        // -----------------------------------------------------
        // PRICE
        // -----------------------------------------------------

        if (
          !priceDetails.total ||
          priceDetails.total <= 0
        ) {
          setError(
            "Pricing is not available for this property."
          );
          return;
        }

        // -----------------------------------------------------
        // PAYMENT METHOD
        // -----------------------------------------------------

        if (!selectedPaymentMethod) {
          setError(
            "Please select a payment method."
          );
          return;
        }

        // -----------------------------------------------------
        // GUEST ID
        // -----------------------------------------------------

        const guestId =
          Number(
            localStorage.getItem(
              "guest_id"
            )
          ) || 1;

        // -----------------------------------------------------
        // HOST ID
        // -----------------------------------------------------

        const hostId =
          Number(
            property?.host_id
          ) || 5;

        // -----------------------------------------------------
        // BOOKING PAYLOAD
        // -----------------------------------------------------

        const bookingPayload = {
          guest_id: guestId,

          host_id: hostId,

          property_id:
            propertyId,

          check_in:
            checkIn,

          check_out:
            checkOut,

          guest_count:
            guestCount,

          booking_status:
            "confirmed",

          total_amount:
            priceDetails.total.toFixed(
              2
            ),

          currency:
            pricing?.currency ||
            "INR",

          booking_method:
            "online",

          special_request:
            specialRequest ||
            null,
        };

        console.log(
          "CREATE BOOKING PAYLOAD:",
          bookingPayload
        );

        // -----------------------------------------------------
        // CREATE BOOKING
        // -----------------------------------------------------

        setBookingLoading(true);

        const bookingResponse =
          await createBooking(
            bookingPayload
          );

        console.log(
          "BOOKING RESPONSE:",
          bookingResponse
        );

        const createdBooking =
          bookingResponse?.data ||
          bookingResponse;

        const bookingId =
          createdBooking?.id ||
          createdBooking?.booking_id;

        if (!bookingId) {
          throw new Error(
            "Booking was created but booking ID was not returned."
          );
        }

        console.log(
          "CREATED BOOKING ID:",
          bookingId
        );

        // -----------------------------------------------------
        // CREATE PAYMENT
        // -----------------------------------------------------

        setPaymentLoading(true);

        const paymentPayload = {
          booking_id:
            Number(bookingId),

          currency_id:
            Number(
              pricing?.currency_id
            ) || 1,

          amount:
            priceDetails.total.toFixed(
              2
            ),

          payment_method:
            selectedPaymentMethod.method_type,
        };

        console.log(
          "PAYMENT PAYLOAD:",
          paymentPayload
        );

        const paymentResponse =
          await createPayment(
            paymentPayload
          );

        console.log(
          "PAYMENT RESPONSE:",
          paymentResponse
        );

        const payment =
          paymentResponse?.data ||
          paymentResponse;

        // -----------------------------------------------------
        // PAYMENT STATUS
        // -----------------------------------------------------

        if (
          payment?.payment_status !==
          "paid"
        ) {
          throw new Error(
            payment?.failure_reason ||
              "Payment was not successful."
          );
        }

        console.log(
          "PAYMENT SUCCESS:",
          payment
        );

        // -----------------------------------------------------
        // SAVE NEW PAYMENT METHOD
        // -----------------------------------------------------

        try {
          await saveNewPaymentMethod();

          await loadPaymentMethods();
        } catch (saveError) {
          console.error(
            "SAVE PAYMENT METHOD ERROR:",
            saveError
          );
        }

        // -----------------------------------------------------
        // BOOKING CONFIRMATION
        // -----------------------------------------------------

        navigate(
          `/booking-confirmation/${bookingId}`,
          {
            state: {
              booking:
                createdBooking,

              payment:
                payment,

              paymentMethod:
                selectedPaymentMethod,

              property:
                property,

              checkIn:
                checkIn,

              checkOut:
                checkOut,

              guestCount:
                guestCount,

              totalAmount:
                priceDetails.total,
            },
          }
        );
      } catch (err) {
        console.error(
          "BOOKING / PAYMENT ERROR:",
          err
        );

        setError(
          err?.response?.data?.detail ||
            err?.message ||
            "Unable to complete booking and payment."
        );
      } finally {
        setBookingLoading(false);
        setPaymentLoading(false);
      }
    };

  // =========================================================
  // FORMAT CURRENCY
  // =========================================================

  const formatCurrency =
    (value) => {
      return Number(
        value || 0
      ).toLocaleString(
        "en-IN",
        {
          maximumFractionDigits: 2,
        }
      );
    };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-[#f7f7f7]">

      <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-5 sm:py-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <BookingHeader />

        {/* =================================================
            MAIN LAYOUT
        ================================================= */}

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="min-w-0">

            {/* =================================================
                YOUR TRIP
            ================================================= */}

            <section className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm sm:p-7">

              <h1 className="text-2xl font-bold text-[#10213f]">
                Your trip
              </h1>

              {/* =================================================
                  DATES
              ================================================= */}

              <div className="mt-7 grid gap-5 sm:grid-cols-2">

                {/* CHECK-IN */}

                <div>

                  <label className="text-sm font-bold text-gray-900">
                    Check-in
                  </label>

                  <input
                    type="date"
                    value={checkIn}
                    min={
                      availability?.[0]
                        ?.available_from ||
                      undefined
                    }
                    onChange={(e) => {
                      const value =
                        e.target.value;

                      setCheckIn(value);

                      /*
                       * If check-in becomes
                       * equal/after checkout,
                       * clear checkout.
                       */

                      if (
                        checkOut &&
                        new Date(
                          `${value}T00:00:00`
                        ) >=
                          new Date(
                            `${checkOut}T00:00:00`
                          )
                      ) {
                        setCheckOut("");
                      }
                    }}
                    className="mt-2 h-[52px] w-full rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-[#e61e4d]"
                  />

                </div>

                {/* CHECK-OUT */}

                <div>

                  <label className="text-sm font-bold text-gray-900">
                    Check-out
                  </label>

                  <input
                    type="date"
                    value={checkOut}
                    min={
                      checkIn ||
                      undefined
                    }
                    max={
                      availability?.[0]
                        ?.available_to ||
                      undefined
                    }
                    onChange={(e) =>
                      setCheckOut(
                        e.target.value
                      )
                    }
                    className="mt-2 h-[52px] w-full rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-[#e61e4d]"
                  />

                </div>

              </div>

              {/* =================================================
                  DYNAMIC TRIP DETAILS
              ================================================= */}

              <div className="mt-6 rounded-xl border border-[#e2e8f0] bg-white px-4 py-4">

                <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr_auto]">

                  {/* CHECK-IN */}

                  <div>

                    <p className="text-xs font-medium text-[#64748b]">
                      Check-in
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#10213f]">
                      {checkIn
                        ? formatBookingDate(
                            checkIn
                          )
                        : "Select date"}
                    </p>

                    <p className="mt-1 text-xs text-[#64748b]">
                      3:00 PM
                    </p>

                  </div>

                  {/* ARROW */}

                  <div className="hidden sm:block text-center text-xl text-[#52637d]">
                    →
                  </div>

                  {/* CHECK-OUT */}

                  <div>

                    <p className="text-xs font-medium text-[#64748b]">
                      Check-out
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#10213f]">
                      {checkOut
                        ? formatBookingDate(
                            checkOut
                          )
                        : "Select date"}
                    </p>

                    <p className="mt-1 text-xs text-[#64748b]">
                      11:00 AM
                    </p>

                  </div>

                  {/* NIGHTS */}

                  <div className="border-t border-[#e5e7eb] pt-3 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">

                    <div className="flex items-center gap-2">

                      <span className="text-lg text-[#52637d]">
                        ☾
                      </span>

                      <p className="text-sm font-semibold text-[#10213f]">
                        {nights}{" "}
                        {nights === 1
                          ? "night"
                          : "nights"}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================================
                  GUESTS
              ================================================= */}

              <div className="mt-7">

                <label className="text-sm font-bold text-gray-900">
                  Guests
                </label>

                <div className="relative">

                  <button
                    type="button"
                    onClick={() =>
                      setGuestOpen(
                        (prev) =>
                          !prev
                      )
                    }
                    className="mt-2 flex h-[52px] w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-4 text-left"
                  >

                    <span className="text-sm">
                      {guestCount}{" "}
                      {guestCount ===
                      1
                        ? "guest"
                        : "guests"}
                    </span>

                    <span className="text-gray-500">
                      ▼
                    </span>

                  </button>

                  {guestOpen && (
                    <div className="absolute left-0 right-0 z-20 mt-2 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">

                      <div className="flex items-center justify-between">

                        <span className="font-medium">
                          Guests
                        </span>

                        <div className="flex items-center gap-4">

                          <button
                            type="button"
                            onClick={() =>
                              setGuestCount(
                                Math.max(
                                  1,
                                  guestCount -
                                    1
                                )
                              )
                            }
                            className="h-8 w-8 rounded-full border border-gray-300"
                          >
                            −
                          </button>

                          <span>
                            {guestCount}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              setGuestCount(
                                guestCount +
                                  1
                              )
                            }
                            className="h-8 w-8 rounded-full border border-gray-300"
                          >
                            +
                          </button>

                        </div>

                      </div>

                    </div>
                  )}

                </div>

              </div>

            </section>

            {/* =================================================
                SPECIAL REQUESTS
            ================================================= */}

            <SpecialRequests
              value={
                specialRequest
              }
              onChange={
                setSpecialRequest
              }
            />

            {/* =================================================
                SECURE BOOKING
            ================================================= */}

            <SecureBooking />

            {/* =================================================
                PAYMENT METHOD
                LEFT SIDE / FULL WIDTH
            ================================================= */}

            <section className="mt-5 rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm sm:p-7">

              <div className="mb-5">

                <h2 className="text-xl font-bold text-[#10213f]">
                  Payment method
                </h2>

                <p className="mt-1 text-sm text-[#64748b]">
                  Choose your preferred
                  payment method.
                </p>

              </div>

              <div className="w-full min-w-0">

                <PaymentMethod
                  savedPaymentMethods={
                    paymentMethods
                  }
                  selectedPaymentMethod={
                    selectedPaymentMethod
                  }
                  setSelectedPaymentMethod={
                    setSelectedPaymentMethod
                  }
                  loadingPaymentMethods={
                    loadingPaymentMethods
                  }
                  disabled={
                    bookingLoading ||
                    paymentLoading
                  }
                />

              </div>

            </section>

          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <aside className="min-w-0">

            <section className="sticky top-6 rounded-[28px] border border-gray-200 bg-white p-5 shadow-lg sm:p-6">

              {/* =================================================
                  PROPERTY SUMMARY
              ================================================= */}

              <PropertySummary
                property={{
                  ...property,
                  image_url: propertyImage,
                  image: propertyImage,
                  images: propertyImages,
                }}
              />

              <div className="my-6 border-t" />

              {/* =================================================
                  PRICE DETAILS
              ================================================= */}

              <PriceDetails
                pricing={pricing}
                priceDetails={
                  priceDetails
                }
                nights={nights}
                loadingPrice={
                  loadingPrice
                }
                formatCurrency={
                  formatCurrency
                }
              />

              <div className="my-6 border-t" />

              {/* =================================================
                  AVAILABILITY
              ================================================= */}

              <AvailabilityStatus
                checkIn={checkIn}
                checkOut={checkOut}
                isDateAvailable={
                  isDateAvailable
                }
                loadingAvailability={
                  loadingAvailability
                }
              />

              {/* =================================================
                  ERROR
              ================================================= */}

              {error && (
                <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* =================================================
                  PAYMENT PROCESSING
              ================================================= */}

              {paymentLoading && (
                <div className="mt-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-700">
                  Processing your payment...
                </div>
              )}

              {/* =================================================
                  RESERVE
              ================================================= */}

              <div className="mt-6">

                <ReserveButton
                  bookingLoading={
                    bookingLoading ||
                    paymentLoading
                  }
                  loadingPrice={
                    loadingPrice
                  }
                  loadingAvailability={
                    loadingAvailability
                  }
                  isDateAvailable={
                    isDateAvailable
                  }
                  total={
                    priceDetails.total
                  }
                  onClick={
                    handleReserve
                  }
                />

              </div>

            </section>

          </aside>

        </div>

      </main>

    </div>
  );
}

export default Booking;