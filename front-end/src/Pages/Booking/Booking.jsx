import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CalendarDays,
  Users,
  ShieldCheck,
  ChevronDown,
  Loader2,
  AlertCircle,
} from "lucide-react";

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

function Booking() {

  const navigate = useNavigate();

  const { id } = useParams();

  const location = useLocation();


  /* ==========================================
     PROPERTY
  ========================================== */

  const property =
    location.state?.property || {};


  const propertyId =
    Number(id) ||
    Number(property?.id);

  /* ==========================================
     STATE
  ========================================== */

  const [checkIn, setCheckIn] =
    useState(
      location.state?.checkIn || ""
    );


  const [checkOut, setCheckOut] =
    useState(
      location.state?.checkOut || ""
    );


  const [guestCount, setGuestCount] =
    useState(
      Number(
        location.state?.guestCount || 2
      )
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
    useState(true);


  const [bookingLoading, setBookingLoading] =
    useState(false);


  const [error, setError] =
    useState("");


  const [guestOpen, setGuestOpen] =
    useState(false);

  useEffect(() => {
    setCheckIn(location.state?.checkIn || "");
    setCheckOut(location.state?.checkOut || "");
    setGuestCount(Number(location.state?.guestCount || 2));
    setSpecialRequest("");
    setPricing(null);
    setAvailability(null);
    setError("");
    setGuestOpen(false);
  }, [propertyId, location.key]);


  /* ==========================================
     LOAD PRICING
  ========================================== */

  useEffect(() => {

    if (!propertyId) {
      setLoadingPrice(false);
      return;
    }

    loadPricing();

  }, [propertyId]);


  const loadPricing = async () => {

    try {

      setLoadingPrice(true);
      setError("");

      const response =
        await getPricingByProperty(
          propertyId
        );


      console.log(
        "PRICING API:",
        response.data
      );


      let data =
        response.data;


      /*
       API may return:

       {
         property_id: 6,
         base_price: "5000.00",
         cleaning_fee: "500.00",
         service_fee: "300.00",
         tax_percentage: "5.00"
       }

       OR

       [
         {...}
       ]
      */

      if (Array.isArray(data)) {

        data =
          data.find(
            (item) =>
              Number(
                item.property_id
              ) === propertyId
          ) ||
          data[0] ||
          null;

      }


      setPricing(data);

    } catch (err) {

      console.error(
        "Pricing API Error:",
        err
      );

      setError(
        err?.response?.data?.detail ||
        "Unable to load pricing."
      );

    } finally {

      setLoadingPrice(false);

    }

  };


  /* ==========================================
     LOAD AVAILABILITY
  ========================================== */

  useEffect(() => {

    if (!propertyId) {
      setLoadingAvailability(false);
      return;
    }

    loadAvailability();

  }, [propertyId]);


  const loadAvailability = async () => {

    try {

      setLoadingAvailability(true);

      const response =
        await getPropertyAvailability(
          propertyId
        );


      console.log(
        "AVAILABILITY API:",
        response.data
      );


      let data =
        response.data;


      if (Array.isArray(data)) {

        data =
          data.find(
            (item) =>
              Number(
                item.property_id
              ) === propertyId
          ) ||
          data[0] ||
          null;

      }


      setAvailability(data);

    } catch (err) {

      console.error(
        "Availability API Error:",
        err
      );

      setAvailability(null);

    } finally {

      setLoadingAvailability(false);

    }

  };


  /* ==========================================
     NUMBER OF NIGHTS
  ========================================== */

  const nights = useMemo(() => {

    if (!checkIn || !checkOut) {
      return 0;
    }


    const start =
      new Date(checkIn);


    const end =
      new Date(checkOut);


    const difference =
      end.getTime() -
      start.getTime();


    const result =
      Math.ceil(
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


  /* ==========================================
     PRICE CALCULATION
  ========================================== */

  const priceDetails = useMemo(() => {

    if (!pricing) {

      return {
        basePrice: 0,
        cleaningFee: 0,
        serviceFee: 0,
        tax: 0,
        total: 0,
      };
    }


    if (!nights) {
      return {
        basePrice: Number(pricing.base_price || 0),
        cleaningFee: 0,
        serviceFee: 0,
        guestFee: 0,
        tax: 0,
        total: 0,
      };
    }


    const basePrice =
      Number(
        pricing.base_price || 0
      );


    const cleaningFee =
      Number(
        pricing.cleaning_fee || 0
      );


    const serviceFee =
      Number(
        pricing.service_fee || 0
      );

    const extraGuestFee = Number(
      pricing.extra_guest_fee ||
        pricing.additional_guest_fee ||
        pricing.guest_fee ||
        Number(pricing.base_price || 0) * 0.1
    );


    const taxPercentage =
      Number(
        pricing.tax_percentage || 0
      );


    const stayAmount =
      basePrice * nights;


    const guestFee =
      extraGuestFee *
      Math.max(guestCount - 1, 0) *
      nights;

    const tax =
      (
        (
          stayAmount +
          cleaningFee +
          serviceFee +
          guestFee
        ) *
        taxPercentage
      ) / 100;


    const total =
      stayAmount +
      cleaningFee +
      serviceFee +
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


  /* ==========================================
     CHECK AVAILABILITY
  ========================================== */

  const isDateAvailable = useMemo(() => {

    if (!availability) {
      return false;
    }


    if (
      availability.is_available === false
    ) {
      return false;
    }


    const availableFrom =
      availability.available_from
        ? new Date(
            availability.available_from
          )
        : null;


    const availableTo =
      availability.available_to
        ? new Date(
            availability.available_to
          )
        : null;


    const selectedCheckIn =
      new Date(checkIn);


    const selectedCheckOut =
      new Date(checkOut);


    if (
      availableFrom &&
      selectedCheckIn < availableFrom
    ) {
      return false;
    }


    if (
      availableTo &&
      selectedCheckOut > availableTo
    ) {
      return false;
    }


    return (
      selectedCheckIn <
      selectedCheckOut
    );

  }, [
    availability,
    checkIn,
    checkOut,
  ]);


  /* ==========================================
     RESERVE / CREATE BOOKING
  ========================================== */

  const handleReserve = async () => {

    try {

      setError("");


      if (!propertyId) {

        setError(
          "Property ID is missing."
        );

        return;
      }


      if (!nights) {

        setError(
          "Please select valid check-in and check-out dates."
        );

        return;
      }


      if (!isDateAvailable) {

        setError(
          "Selected dates are not available."
        );

        return;
      }


      if (
        !priceDetails.total ||
        priceDetails.total <= 0
      ) {

        setError(
          "Pricing is not available for this property."
        );

        return;
      }


      /*
       IMPORTANT

       Replace this with your actual
       logged-in guest ID if stored differently.
      */

      const guestId =
        Number(
          localStorage.getItem(
            "guest_id"
          )
        ) || 1;


      /*
       Host ID comes from property API.
      */

      const hostId =
        Number(
          property?.host_id
        ) || 5;


      const bookingPayload = {

        guest_id: guestId,

        host_id: hostId,

        property_id: propertyId,

        check_in: checkIn,

        check_out: checkOut,

        guest_count: guestCount,

        booking_status: "confirmed",

        total_amount:
          priceDetails.total.toFixed(2),

        currency:
          pricing?.currency || "INR",

        booking_method: "online",

        special_request:
          specialRequest || null,

      };


      console.log(
        "CREATE BOOKING PAYLOAD:",
        bookingPayload
      );


      setBookingLoading(true);


      const response =
        await createBooking(
          bookingPayload
        );


      console.log(
        "BOOKING RESPONSE:",
        response.data
      );


      const createdBooking =
        response.data;


      /*
       Go to confirmation page
      */

      navigate(
        `/booking-confirmation/${createdBooking.id}`,
        {
          state: {

            booking:
              createdBooking,

            property:
              property,

            checkIn,

            checkOut,

            guestCount,

            totalAmount:
              priceDetails.total,

          },
        }
      );

    } catch (err) {

      console.error(
        "BOOKING ERROR:",
        err
      );


      setError(
        err?.response?.data?.detail ||
        "Unable to create booking."
      );

    } finally {

      setBookingLoading(false);

    }

  };


  /* ==========================================
     FORMAT CURRENCY
  ========================================== */

  const formatCurrency = (value) => {

    return Number(
      value || 0
    ).toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 2,
      }
    );

  };


  /* ==========================================
     IMAGE
  ========================================== */

  const propertyImage =
    property?.image ||
    property?.image_url ||
    property?.images?.[0]?.image_url ||
    "";


  /* ==========================================
     UI
  ========================================== */

  return (

    <div className="min-h-screen bg-[#f7f7f7]">

      <main className="mx-auto max-w-[1200px] px-5 py-8">

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">

          {/* ====================================
              LEFT
          ==================================== */}

          <div>

            {/* YOUR TRIP */}

            <section className="rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm">

              <h1 className="text-2xl font-bold text-[#10213f]">
                Your trip
              </h1>


              <div className="mt-8 grid gap-5 sm:grid-cols-2">

                {/* CHECK IN */}

                <div>

                  <label className="text-sm font-bold text-gray-900">
                    Check-in
                  </label>


                  <div className="relative mt-2">

                    <CalendarDays
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />


                    <input
                      type="date"
                      value={checkIn}
                      min={
                        availability?.available_from ||
                        undefined
                      }
                      onChange={(e) =>
                        setCheckIn(
                          e.target.value
                        )
                      }
                      className="h-[52px] w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4 text-sm outline-none focus:border-[#e61e4d]"
                    />

                  </div>


                  <p className="mt-1 text-xs text-gray-400">
                    {checkIn}
                  </p>

                </div>


                {/* CHECK OUT */}

                <div>

                  <label className="text-sm font-bold text-gray-900">
                    Check-out
                  </label>


                  <div className="relative mt-2">

                    <CalendarDays
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />


                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn}
                      max={
                        availability?.available_to ||
                        undefined
                      }
                      onChange={(e) =>
                        setCheckOut(
                          e.target.value
                        )
                      }
                      className="h-[52px] w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4 text-sm outline-none focus:border-[#e61e4d]"
                    />

                  </div>


                  <p className="mt-1 text-xs text-gray-400">
                    {checkOut}
                  </p>

                </div>

              </div>


              {/* GUESTS */}

              <div className="mt-7">

                <label className="text-sm font-bold text-gray-900">
                  Guests
                </label>


                <div className="relative">

                  <button
                    type="button"
                    onClick={() =>
                      setGuestOpen(
                        !guestOpen
                      )
                    }
                    className="mt-2 flex h-[52px] w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-4"
                  >

                    <span className="flex items-center gap-3">

                      <Users
                        size={20}
                        className="text-gray-500"
                      />

                      <span className="text-sm">
                        {guestCount}{" "}
                        {guestCount === 1
                          ? "guest"
                          : "guests"}
                      </span>

                    </span>


                    <ChevronDown
                      size={18}
                      className="text-gray-500"
                    />

                  </button>


                  {guestOpen && (

                    <div className="absolute left-0 right-0 z-20 mt-2 rounded-xl border bg-white p-4 shadow-xl">

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
                                  guestCount - 1
                                )
                              )
                            }
                            className="h-8 w-8 rounded-full border"
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
                                guestCount + 1
                              )
                            }
                            className="h-8 w-8 rounded-full border"
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


            {/* SPECIAL REQUEST */}

            <section className="mt-6 rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm">

              <h2 className="text-xl font-bold text-[#10213f]">
                Special requests
              </h2>


              <p className="mt-2 text-sm text-gray-500">
                Let the host know if you have any special requirements.
              </p>


              <textarea
                value={specialRequest}
                onChange={(e) =>
                  setSpecialRequest(
                    e.target.value
                  )
                }
                placeholder="Optional"
                rows={4}
                className="mt-5 w-full resize-none rounded-xl border border-gray-300 p-4 text-sm outline-none focus:border-[#e61e4d]"
              />

            </section>


            {/* SECURE BOOKING */}

            <section className="mt-6 rounded-[28px] border border-gray-200 bg-white p-7 shadow-sm">

              <div className="flex gap-4">

                <ShieldCheck
                  size={27}
                  className="text-[#123d78]"
                />

                <div>

                  <h3 className="font-bold text-gray-900">
                    Secure booking
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Your booking information is securely processed through the Airbnb-style booking flow.
                  </p>

                </div>

              </div>

            </section>

          </div>


          {/* ====================================
              RIGHT PRICE CARD
          ==================================== */}

          <aside>

            <section className="sticky top-6 rounded-[28px] border border-gray-200 bg-white p-6 shadow-lg">

              {/* PROPERTY */}

              <div className="flex gap-4">

                {propertyImage ? (

                  <img
                    src={propertyImage}
                    alt={
                      property?.title ||
                      "Property"
                    }
                    className="h-24 w-24 rounded-2xl object-cover"
                  />

                ) : (

                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gray-100">

                    <HomeIcon />

                  </div>

                )}


                <div>

                  <h2 className="font-bold text-gray-900">
                    {property?.title ||
                      property?.name ||
                      "Premium Apartment"}
                  </h2>


                  <p className="mt-2 text-sm text-gray-500">
                    {property?.city ||
                      "Chennai"}
                  </p>

                </div>

              </div>


              <div className="my-6 border-t" />


              {/* PRICE DETAILS */}

              <h3 className="text-lg font-bold text-[#10213f]">
                Price details
              </h3>


              {loadingPrice ? (

                <div className="flex items-center gap-2 py-8 text-sm text-gray-500">

                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Loading price...

                </div>

              ) : (

                <div className="mt-5 space-y-4">

                  {/* NIGHT PRICE */}

                  <div className="flex justify-between text-sm">

                    <span className="text-gray-600">

                      {pricing?.currency ||
                        "INR"}{" "}

                      {formatCurrency(
                        priceDetails.basePrice
                      )}{" "}

                      × {nights}{" "}
                      {nights === 1
                        ? "night"
                        : "nights"}

                    </span>


                    <span className="font-medium">

                      ₹
                      {formatCurrency(
                        priceDetails.basePrice *
                        nights
                      )}

                    </span>

                  </div>


                  {/* CLEANING */}

                  <div className="flex justify-between text-sm">

                    <span className="text-gray-600">
                      Cleaning fee
                    </span>


                    <span>
                      ₹
                      {formatCurrency(
                        priceDetails.cleaningFee
                      )}
                    </span>

                  </div>


                  {/* SERVICE */}

                  <div className="flex justify-between text-sm">

                    <span className="text-gray-600">
                      Service fee
                    </span>


                    <span>
                      ₹
                      {formatCurrency(
                        priceDetails.serviceFee
                      )}
                    </span>

                  </div>

                  {priceDetails.guestFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Extra guest fee
                      </span>
                      <span>
                        ₹{formatCurrency(priceDetails.guestFee)}
                      </span>
                    </div>
                  )}


                  {/* TAX */}

                  {priceDetails.tax > 0 && (

                    <div className="flex justify-between text-sm">

                      <span className="text-gray-600">
                        Tax
                      </span>


                      <span>
                        ₹
                        {formatCurrency(
                          priceDetails.tax
                        )}
                      </span>

                    </div>

                  )}

                </div>

              )}


              <div className="my-6 border-t" />


              {/* TOTAL */}

              <div className="flex items-center justify-between">

                <span className="font-bold">
                  Total
                </span>


                <span className="text-xl font-bold">

                  ₹
                  {formatCurrency(
                    priceDetails.total
                  )}

                </span>

              </div>


              {/* AVAILABILITY */}

              {!loadingAvailability && (

                <div
                  className={`mt-4 flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
                    isDateAvailable
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >

                  {!checkIn || !checkOut ? (
                    <>
                      <CalendarDays size={16} />
                      Select dates to check availability
                    </>
                  ) : isDateAvailable ? (
                    <>
                      <span className="h-2 w-2 rounded-full bg-green-500" />

                      Available for selected dates
                    </>
                  ) : (
                    <>
                      <AlertCircle size={16} />

                      Selected dates unavailable
                    </>
                  )}

                </div>

              )}


              {/* ERROR */}

              {error && (

                <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">

                  {error}

                </div>

              )}


              {/* RESERVE */}

              <button
                type="button"
                disabled={
                  bookingLoading ||
                  loadingPrice ||
                  loadingAvailability ||
                  !isDateAvailable ||
                  !priceDetails.total
                }
                onClick={
                  handleReserve
                }
                className={`mt-6 flex h-14 w-full items-center justify-center rounded-xl text-base font-bold text-white transition ${
                  bookingLoading ||
                  loadingPrice ||
                  loadingAvailability ||
                  !isDateAvailable ||
                  !priceDetails.total
                    ? "cursor-not-allowed bg-gray-300"
                    : "bg-[#e61e4d] hover:bg-[#d91545]"
                }`}
              >

                {bookingLoading ? (

                  <>
                    <Loader2
                      size={20}
                      className="mr-2 animate-spin"
                    />

                    Reserving...

                  </>

                ) : (

                  "Reserve"

                )}

              </button>


              <p className="mt-4 text-center text-xs text-gray-500">
                You won't be charged yet
              </p>

            </section>

          </aside>

        </div>

      </main>

    </div>

  );
}


/* ==========================================
   HOME ICON
========================================== */

function HomeIcon() {

  return (

    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="text-gray-400"
    >

      <path
        d="M3 10.5L12 3l9 7.5"
      />

      <path
        d="M5 9.5V21h14V9.5"
      />

    </svg>

  );

}


export default Booking;