"use client";

import {
  MapPin,
  Search,
  CalendarDays,
  Users,
  Home,
  Star,
  UserRound,
  BadgeDollarSign,
  Minus,
  Plus,
  Loader2,
} from "lucide-react";

import { useEffect, useState } from "react";

function CustomerHero({ onSearch }) {
  // ==========================================
  // SEARCH STATES
  // ==========================================

  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  // ==========================================
  // API STATES
  // ==========================================

  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(false);

  const [apiError, setApiError] = useState("");


  // ==========================================
  // FETCH PROPERTY API
  // ==========================================

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setApiError("");

        const response = await fetch(
          "http://127.0.0.1:8000/properties"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }

        const data = await response.json();

        console.log(
          "Hero Properties API:",
          data
        );

        const propertyData = Array.isArray(data)
          ? data
          : data?.data ||
            data?.properties ||
            data?.items ||
            [];

        setProperties(propertyData);

      } catch (error) {
        console.error(
          "Hero API Error:",
          error
        );

        setApiError(
          "Unable to load property data."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);


  // ==========================================
  // GUEST PLUS
  // ==========================================

  const increaseGuests = () => {
    setGuests((current) => current + 1);
  };


  // ==========================================
  // GUEST MINUS
  // ==========================================

  const decreaseGuests = () => {
    setGuests((current) =>
      Math.max(1, current - 1)
    );
  };


  // ==========================================
  // VIEW LISTINGS
  // ==========================================

  const handleSearch = () => {
    const searchData = {
      location: location.trim(),
      checkIn,
      checkOut,
      guests,
    };

    console.log(
      "Hero Search:",
      searchData
    );


    // Send search data to CustomerHome
    if (onSearch) {
      onSearch(searchData);
    }


    // Scroll to property section
    setTimeout(() => {
      const propertySection =
        document.getElementById(
          "property-listings"
        );

      if (propertySection) {
        propertySection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };


  // ==========================================
  // LISTINGS COUNT
  // ==========================================

  const listingsCount =
    properties.length;


  // ==========================================
  // RATING CALCULATION
  // ==========================================

  const propertiesWithRating =
    properties.filter(
      (property) =>
        Number(property.rating) > 0
    );

  const averageRating =
    propertiesWithRating.length > 0
      ? (
          propertiesWithRating.reduce(
            (total, property) =>
              total +
              Number(property.rating),
            0
          ) /
          propertiesWithRating.length
        ).toFixed(1)
      : "4.8";


  // ==========================================
  // GUEST DISPLAY
  // ==========================================

  const guestDisplay =
    guests >= 1000000
      ? `${(guests / 1000000).toFixed(1)}M+`
      : guests >= 1000
      ? `${(guests / 1000).toFixed(1)}K+`
      : guests;


  // ==========================================
  // BEST PRICE
  // ==========================================

  const prices = properties
    .map((property) =>
      Number(
        property.price_per_night ||
        property.price ||
        property.nightly_price ||
        0
      )
    )
    .filter((price) => price > 0);

  const lowestPrice =
    prices.length > 0
      ? Math.min(...prices)
      : null;


  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#eaf8fc]
      "
    >

      {/* ======================================
          DECORATIVE BACKGROUND
      ====================================== */}

      <div
        className="
          absolute
          left-0
          top-0
          h-48
          w-48
          rounded-br-[100px]
          bg-[#d7f2f8]
        "
      />

      <div
        className="
          absolute
          right-0
          top-20
          h-72
          w-32
          rounded-l-[80px]
          bg-[#dff5fa]
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-0
          h-36
          w-36
          rounded-tr-[80px]
          bg-[#d5f0f7]
        "
      />


      {/* ======================================
          MAIN CONTAINER
      ====================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-7xl
          px-4
          py-10
          sm:px-6
          md:py-14
          lg:px-8
          lg:py-20
        "
      >

        {/* ====================================
            HERO CARD
        ==================================== */}

        <div
          className="
            relative
            mx-auto
            max-w-6xl
            overflow-visible
            rounded-2xl
            bg-white
            shadow-xl
          "
        >

          {/* ==================================
              HERO IMAGE
          ================================== */}

          <div
            className="
              relative
              h-[280px]
              w-full
              overflow-hidden
              rounded-t-2xl
              bg-cover
              bg-center
              sm:h-[350px]
              md:h-[430px]
              lg:h-[500px]
            "
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90')",
            }}
          >

            <div
              className="
                absolute
                inset-0
                bg-black/10
              "
            />

          </div>


          {/* ==================================
              SEARCH BAR
          ================================== */}

          <div
            className="
              relative
              z-20
              mx-auto
              -mt-8
              w-[92%]
              rounded-xl
              bg-white
              shadow-xl
              lg:w-[90%]
            "
          >

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-5
              "
            >

              {/* =================================
                  LOCATION
              ================================= */}

              <div
                className="
                  border-b
                  px-5
                  py-4
                  md:border-b-0
                  md:border-r
                "
              >

                <label
                  className="
                    block
                    text-[10px]
                    font-semibold
                    text-gray-500
                  "
                >
                  Location
                </label>

                <div
                  className="
                    mt-1
                    flex
                    items-center
                    gap-2
                  "
                >

                  <MapPin
                    size={16}
                    className="text-gray-400"
                  />

                  <input
                    value={location}
                    onChange={(e) =>
                      setLocation(
                        e.target.value
                      )
                    }
                    placeholder="Anywhere"
                    className="
                      w-full
                      bg-transparent
                      text-sm
                      outline-none
                      placeholder:text-gray-400
                    "
                  />

                </div>

              </div>


              {/* =================================
                  CHECK IN
              ================================= */}

              <div
                className="
                  border-b
                  px-5
                  py-4
                  md:border-b-0
                  md:border-r
                "
              >

                <label
                  className="
                    block
                    text-[10px]
                    font-semibold
                    text-gray-500
                  "
                >
                  Check in
                </label>

                <div
                  className="
                    mt-1
                    flex
                    items-center
                    gap-2
                  "
                >

                  <CalendarDays
                    size={16}
                    className="text-gray-400"
                  />

                  <input
                    type="date"
                    value={checkIn}
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(e) => {

                      const value =
                        e.target.value;

                      setCheckIn(value);

                      // Reset checkout if
                      // checkout is before checkin

                      if (
                        checkOut &&
                        value >= checkOut
                      ) {
                        setCheckOut("");
                      }
                    }}
                    className="
                      w-full
                      bg-transparent
                      text-sm
                      outline-none
                    "
                  />

                </div>

              </div>


              {/* =================================
                  CHECK OUT
              ================================= */}

              <div
                className="
                  border-b
                  px-5
                  py-4
                  md:border-b-0
                  md:border-r
                "
              >

                <label
                  className="
                    block
                    text-[10px]
                    font-semibold
                    text-gray-500
                  "
                >
                  Check out
                </label>

                <div
                  className="
                    mt-1
                    flex
                    items-center
                    gap-2
                  "
                >

                  <CalendarDays
                    size={16}
                    className="text-gray-400"
                  />

                  <input
                    type="date"
                    value={checkOut}
                    min={
                      checkIn ||
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(e) =>
                      setCheckOut(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      bg-transparent
                      text-sm
                      outline-none
                    "
                  />

                </div>

              </div>


              {/* =================================
                  GUESTS
              ================================= */}

              <div
                className="
                  relative
                  border-b
                  px-5
                  py-4
                  md:border-b-0
                  md:border-r
                "
              >

                <label
                  className="
                    block
                    text-[10px]
                    font-semibold
                    text-gray-500
                  "
                >
                  Guests
                </label>

                <div
                  className="
                    mt-1
                    flex
                    items-center
                    justify-between
                    gap-2
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <Users
                      size={16}
                      className="text-gray-400"
                    />

                    <span
                      className="
                        text-sm
                        font-medium
                        text-gray-700
                      "
                    >
                      {guests}
                    </span>

                  </div>


                  {/* PLUS / MINUS */}

                  <div
                    className="
                      flex
                      items-center
                      gap-1
                    "
                  >

                    <button
                      type="button"
                      onClick={decreaseGuests}
                      disabled={guests <= 1}
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-gray-300
                        transition
                        hover:bg-gray-100
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >
                      <Minus size={13} />
                    </button>


                    <button
                      type="button"
                      onClick={increaseGuests}
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-gray-300
                        transition
                        hover:bg-gray-100
                      "
                    >
                      <Plus size={13} />
                    </button>

                  </div>

                </div>

              </div>


              {/* =================================
                  VIEW LISTINGS
              ================================= */}

              <button
                type="button"
                onClick={handleSearch}
                disabled={loading}
                className="
                  flex
                  min-h-[70px]
                  items-center
                  justify-center
                  gap-2
                  rounded-r-xl
                  bg-[#123d78]
                  px-6
                  py-4
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#0d315f]
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              >

                {loading ? (
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                ) : (
                  <Search size={17} />
                )}

                {loading
                  ? "Loading..."
                  : "View Listings"}

              </button>

            </div>

          </div>


          {/* ==================================
              API ERROR
          ================================== */}

          {apiError && (
            <p
              className="
                px-6
                pt-4
                text-center
                text-xs
                text-red-500
              "
            >
              {apiError}
            </p>
          )}


          {/* ==================================
              STATS
          ================================== */}

          <div
            className="
              grid
              grid-cols-2
              gap-6
              px-6
              py-8
              sm:grid-cols-4
              sm:px-10
              lg:px-14
            "
          >

            {/* ================================
                LISTINGS
            ================================= */}

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  rounded-lg
                  bg-blue-50
                  p-3
                "
              >

                <Home
                  size={20}
                  className="text-[#123d78]"
                />

              </div>

              <div>

                <p
                  className="
                    text-sm
                    font-bold
                    text-gray-700
                  "
                >
                  {listingsCount > 0
                    ? `${listingsCount.toLocaleString()}+`
                    : "0"}
                </p>

                <p
                  className="
                    text-[10px]
                    text-gray-500
                  "
                >
                  Listings
                </p>

              </div>

            </div>


            {/* ================================
                RATING
            ================================= */}

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  rounded-lg
                  bg-blue-50
                  p-3
                "
              >

                <Star
                  size={20}
                  className="text-[#123d78]"
                />

              </div>

              <div>

                <p
                  className="
                    text-sm
                    font-bold
                    text-gray-700
                  "
                >
                  {averageRating}/5
                </p>

                <p
                  className="
                    text-[10px]
                    text-gray-500
                  "
                >
                  Guest Rating
                </p>

              </div>

            </div>


            {/* ================================
                GUESTS
            ================================= */}

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  rounded-lg
                  bg-blue-50
                  p-3
                "
              >

                <UserRound
                  size={20}
                  className="text-[#123d78]"
                />

              </div>

              <div>

                <p
                  className="
                    text-sm
                    font-bold
                    text-gray-700
                  "
                >
                  {guestDisplay}
                </p>

                <p
                  className="
                    text-[10px]
                    text-gray-500
                  "
                >
                  Guests
                </p>

              </div>

            </div>


            {/* ================================
                BEST PRICE
            ================================= */}

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <div
                className="
                  rounded-lg
                  bg-blue-50
                  p-3
                "
              >

                <BadgeDollarSign
                  size={20}
                  className="text-[#123d78]"
                />

              </div>

              <div>

                <p
                  className="
                    text-sm
                    font-bold
                    text-gray-700
                  "
                >
                  {lowestPrice
                    ? `₹${lowestPrice}`
                    : "Best Price"}
                </p>

                <p
                  className="
                    text-[10px]
                    text-gray-500
                  "
                >
                  Guaranteed
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CustomerHero;