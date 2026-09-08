"use client";

import {
  Home,
  MapPin,
  Search,
  CalendarDays,
  Users,
  Star,
  Minus,
  Plus,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerHero({ onSearch }) {
  const navigate = useNavigate();

  // =========================================================
  // SEARCH STATES
  // =========================================================

  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  // =========================================================
  // API STATES
  // =========================================================

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // =========================================================
  // HERO SLIDER
  // =========================================================

  const heroImages = [
    {
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90",
      title: "Find a place",
      subtitle: "where you belong",
      location: "Luxury stays",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=90",
      title: "Stay somewhere",
      subtitle: "extraordinary",
      location: "Beautiful homes",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=90",
      title: "Your next",
      subtitle: "escape starts here",
      location: "Premium villas",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2000&q=90",
      title: "Make memories",
      subtitle: "in amazing places",
      location: "Unique stays",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90",
      title: "Live the moment",
      subtitle: "your way",
      location: "Private retreats",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  // =========================================================
  // AUTOMATIC IMAGE CHANGE
  // EVERY 4 SECONDS
  //
  // IMPORTANT:
  // The hero container height NEVER changes.
  // Only activeSlide changes.
  // =========================================================

  useEffect(() => {
    const sliderTimer = setInterval(() => {
      setActiveSlide((current) =>
        current === heroImages.length - 1 ? 0 : current + 1
      );
    }, 4000);

    return () => {
      clearInterval(sliderTimer);
    };
  }, []);

  // =========================================================
  // NEXT SLIDE
  // =========================================================

  const nextSlide = () => {
    setActiveSlide((current) =>
      current === heroImages.length - 1 ? 0 : current + 1
    );
  };

  // =========================================================
  // PREVIOUS SLIDE
  // =========================================================

  const previousSlide = () => {
    setActiveSlide((current) =>
      current === 0 ? heroImages.length - 1 : current - 1
    );
  };

  // =========================================================
  // FETCH PROPERTY API
  // =========================================================

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

        console.log("Hero Properties API:", data);

        const propertyData = Array.isArray(data)
          ? data
          : data?.data ||
            data?.properties ||
            data?.items ||
            [];

        setProperties(propertyData);
      } catch (error) {
        console.error("Hero API Error:", error);

        setApiError("Unable to load property data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // =========================================================
  // GUEST PLUS
  // =========================================================

  const increaseGuests = () => {
    setGuests((current) => current + 1);
  };

  // =========================================================
  // GUEST MINUS
  // =========================================================

  const decreaseGuests = () => {
    setGuests((current) => Math.max(1, current - 1));
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = () => {
    const searchData = {
      location: location.trim(),
      checkIn,
      checkOut,
      guests,
    };

    console.log("Hero Search:", searchData);

    if (onSearch) {
      onSearch(searchData);
    }

    navigate("/properties");

    setTimeout(() => {
      const propertySection =
        document.getElementById("property-listings");

      if (propertySection) {
        propertySection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  // =========================================================
  // LISTINGS COUNT
  // =========================================================

  const listingsCount = properties.length;

  // =========================================================
  // RATING
  // =========================================================

  const propertiesWithRating = properties.filter(
    (property) => Number(property.rating) > 0
  );

  const averageRating =
    propertiesWithRating.length > 0
      ? (
          propertiesWithRating.reduce(
            (total, property) =>
              total + Number(property.rating),
            0
          ) / propertiesWithRating.length
        ).toFixed(1)
      : "4.8";

  // =========================================================
  // CURRENT HERO
  // =========================================================

  const currentHero = heroImages[activeSlide];

  // =========================================================
  // TODAY DATE
  // =========================================================

  const today = new Date().toISOString().split("T")[0];

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <section className="relative w-full overflow-hidden bg-white">

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1440px]
          px-3
          py-5
          sm:px-5
          sm:py-8
          md:px-8
          md:py-12
          lg:px-10
          lg:py-14
          xl:px-12
        "
      >

        {/* ===================================================
            HERO CARD
        =================================================== */}

        <div
          className="
            relative
            mx-auto
            w-full
            overflow-visible
            rounded-[26px]
            bg-white
            shadow-[0_25px_80px_rgba(15,23,42,0.16)]
            sm:rounded-[30px]
          "
        >

          {/* =================================================
              FIXED HERO IMAGE AREA

              IMPORTANT:
              Height is fixed at every breakpoint.
              Images are absolute.
              Therefore section size never changes.
          ================================================= */}

          <div
            className="
              relative
              h-[520px]
              w-full
              overflow-hidden
              rounded-[26px]
              bg-gray-900
              sm:h-[560px]
              sm:rounded-[30px]
              md:h-[610px]
              lg:h-[650px]
              xl:h-[680px]
            "
          >

            {/* =================================================
                IMAGE SLIDES
            ================================================= */}

            {heroImages.map((hero, index) => (
              <div
                key={hero.image}
                className={`
                  absolute
                  inset-0
                  transition-opacity
                  duration-[1200ms]
                  ease-in-out
                  ${
                    index === activeSlide
                      ? "z-10 opacity-100"
                      : "z-0 opacity-0"
                  }
                `}
              >

                <img
                  src={hero.image}
                  alt={`${hero.title} ${hero.subtitle}`}
                  className={`
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-[6000ms]
                    ease-out
                    ${
                      index === activeSlide
                        ? "scale-105"
                        : "scale-100"
                    }
                  `}
                />

              </div>
            ))}

            {/* =================================================
                PREMIUM OVERLAY
            ================================================= */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                z-20
                bg-gradient-to-b
                from-black/20
                via-black/5
                to-black/65
              "
            />

            {/* =================================================
                LEFT SIDE GRADIENT
            ================================================= */}

            <div
              className="
                pointer-events-none
                absolute
                inset-y-0
                left-0
                z-20
                w-full
                bg-gradient-to-r
                from-black/35
                via-black/5
                to-transparent
              "
            />

            {/* =================================================
                HERO CONTENT
            ================================================= */}

            <div
              className="
                absolute
                inset-0
                z-30
                flex
                items-center
                justify-center
                px-5
                pb-28
                pt-16
                sm:px-8
                sm:pb-32
                md:items-start
                md:justify-start
                md:px-12
                md:pb-0
                md:pt-32
                lg:px-16
                lg:pt-36
                xl:px-20
              "
            >

              <div
                key={activeSlide}
                className="
                  max-w-[700px]
                  animate-[heroContent_900ms_ease-out]
                  text-center
                  md:text-left
                "
              >

                {/* SMALL LABEL */}

                <div
                  className="
                    mb-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/25
                    bg-white/10
                    px-4
                    py-2
                    backdrop-blur-md
                  "
                >
                  <span className="h-2 w-2 rounded-full bg-[#FF385C]" />

                  <span
                    className="
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-white
                    "
                  >
                    {currentHero.location}
                  </span>
                </div>

                {/* HEADING */}

                <h1
                  className="
                    max-w-[650px]
                    text-4xl
                    font-bold
                    leading-[1.05]
                    tracking-[-1.5px]
                    text-white
                    drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)]
                    sm:text-5xl
                    md:text-6xl
                    lg:text-7xl
                  "
                >
                  {currentHero.title}

                  <br />

                  <span className="font-light">
                    {currentHero.subtitle}
                  </span>
                </h1>

                {/* DESCRIPTION */}

                <p
                  className="
                    mx-auto
                    mt-5
                    max-w-[580px]
                    text-sm
                    leading-6
                    text-white/85
                    sm:text-base
                    md:mx-0
                    md:text-lg
                    md:leading-7
                  "
                >
                  Discover beautiful stays,
                  unforgettable experiences,
                  and spaces designed for
                  your perfect getaway.
                </p>

                {/* API STATS */}

                <div
                  className="
                    mt-7
                    flex
                    flex-wrap
                    items-center
                    justify-center
                    gap-3
                    md:justify-start
                  "
                >

                  {/* STAYS */}

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-white/20
                      bg-black/15
                      px-4
                      py-2
                      backdrop-blur-md
                    "
                  >
                    <Home
                      size={15}
                      className="text-white"
                    />

                    <span
                      className="
                        text-xs
                        font-medium
                        text-white
                      "
                    >
                      {listingsCount > 0
                        ? `${listingsCount}+ stays`
                        : "Amazing stays"}
                    </span>
                  </div>

                  {/* RATING */}

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-white/20
                      bg-black/15
                      px-4
                      py-2
                      backdrop-blur-md
                    "
                  >
                    <Star
                      size={15}
                      className="fill-white text-white"
                    />

                    <span
                      className="
                        text-xs
                        font-medium
                        text-white
                      "
                    >
                      {averageRating} rated
                    </span>
                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                PREVIOUS BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous image"
              className="
                absolute
                left-4
                top-1/2
                z-40
                flex
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/25
                bg-black/20
                text-white
                backdrop-blur-md
                transition
                duration-300
                hover:scale-105
                hover:bg-white/20
                sm:left-6
              "
            >
              <ChevronLeft size={20} />
            </button>

            {/* =================================================
                NEXT BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next image"
              className="
                absolute
                right-4
                top-1/2
                z-40
                flex
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/25
                bg-black/20
                text-white
                backdrop-blur-md
                transition
                duration-300
                hover:scale-105
                hover:bg-white/20
                sm:right-6
              "
            >
              <ChevronRight size={20} />
            </button>

            {/* =================================================
                SLIDER DOTS
            ================================================= */}

            <div
              className="
                absolute
                bottom-28
                left-1/2
                z-40
                flex
                -translate-x-1/2
                items-center
                gap-2
              "
            >
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                  className={`
                    h-1.5
                    rounded-full
                    transition-all
                    duration-500
                    ${
                      index === activeSlide
                        ? "w-8 bg-white"
                        : "w-1.5 bg-white/55 hover:bg-white/80"
                    }
                  `}
                />
              ))}
            </div>

            {/* =================================================
                AUTO PLAY INDICATOR
            ================================================= */}

            <div
              className="
                absolute
                bottom-5
                right-5
                z-40
                hidden
                items-center
                gap-2
                rounded-full
                border
                border-white/20
                bg-black/20
                px-3
                py-2
                backdrop-blur-md
                sm:flex
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  animate-pulse
                  rounded-full
                  bg-green-300
                "
              />

              <span
                className="
                  text-[10px]
                  font-medium
                  text-white/90
                "
              >
                Auto changing
              </span>
            </div>

          </div>

          {/* =================================================
              PREMIUM SEARCH BAR
          ================================================= */}

          <div
            className="
              relative
              z-50
              mx-auto
              -mt-12
              w-[94%]
              rounded-[22px]
              border
              border-gray-100
              bg-white
              shadow-[0_22px_55px_rgba(15,23,42,0.18)]
              sm:-mt-14
              lg:w-[92%]
              xl:w-[90%]
            "
          >

            <div
              className="
                grid
                grid-cols-1
                overflow-hidden
                rounded-[22px]
                md:grid-cols-5
              "
            >

              {/* =================================================
                  LOCATION
              ================================================= */}

              <div
                className="
                  group
                  border-b
                  border-gray-100
                  px-5
                  py-5
                  transition
                  hover:bg-gray-50/70
                  md:border-b-0
                  md:border-r
                  md:px-6
                  md:py-5
                "
              >
                <label
                  className="
                    block
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                  "
                >
                  Location
                </label>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-gray-50
                      transition
                      group-hover:bg-red-50
                    "
                  >
                    <MapPin
                      size={17}
                      className="
                        text-gray-500
                        group-hover:text-[#FF385C]
                      "
                    />
                  </div>

                  <input
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                    placeholder="Anywhere"
                    className="
                      w-full
                      bg-transparent
                      text-sm
                      font-medium
                      text-gray-800
                      outline-none
                      placeholder:text-gray-400
                    "
                  />
                </div>
              </div>

              {/* =================================================
                  CHECK IN
              ================================================= */}

              <div
                className="
                  group
                  border-b
                  border-gray-100
                  px-5
                  py-5
                  transition
                  hover:bg-gray-50/70
                  md:border-b-0
                  md:border-r
                  md:px-6
                  md:py-5
                "
              >
                <label
                  className="
                    block
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                  "
                >
                  Check in
                </label>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-gray-50
                      transition
                      group-hover:bg-red-50
                    "
                  >
                    <CalendarDays
                      size={17}
                      className="
                        text-gray-500
                        group-hover:text-[#FF385C]
                      "
                    />
                  </div>

                  <input
                    type="date"
                    value={checkIn}
                    min={today}
                    onChange={(e) => {
                      const value = e.target.value;

                      setCheckIn(value);

                      if (
                        checkOut &&
                        value >= checkOut
                      ) {
                        setCheckOut("");
                      }
                    }}
                    className="
                      w-full
                      min-w-0
                      bg-transparent
                      text-sm
                      font-medium
                      text-gray-800
                      outline-none
                    "
                  />
                </div>
              </div>

              {/* =================================================
                  CHECK OUT
              ================================================= */}

              <div
                className="
                  group
                  border-b
                  border-gray-100
                  px-5
                  py-5
                  transition
                  hover:bg-gray-50/70
                  md:border-b-0
                  md:border-r
                  md:px-6
                  md:py-5
                "
              >
                <label
                  className="
                    block
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                  "
                >
                  Check out
                </label>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-gray-50
                      transition
                      group-hover:bg-red-50
                    "
                  >
                    <CalendarDays
                      size={17}
                      className="
                        text-gray-500
                        group-hover:text-[#FF385C]
                      "
                    />
                  </div>

                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || today}
                    onChange={(e) =>
                      setCheckOut(e.target.value)
                    }
                    className="
                      w-full
                      min-w-0
                      bg-transparent
                      text-sm
                      font-medium
                      text-gray-800
                      outline-none
                    "
                  />
                </div>
              </div>

              {/* =================================================
                  GUESTS
              ================================================= */}

              <div
                className="
                  group
                  border-b
                  border-gray-100
                  px-5
                  py-5
                  transition
                  hover:bg-gray-50/70
                  md:border-b-0
                  md:border-r
                  md:px-6
                  md:py-5
                "
              >
                <label
                  className="
                    block
                    text-[11px]
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                  "
                >
                  Guests
                </label>

                <div
                  className="
                    mt-2
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-gray-50
                        transition
                        group-hover:bg-red-50
                      "
                    >
                      <Users
                        size={17}
                        className="
                          text-gray-500
                          group-hover:text-[#FF385C]
                        "
                      />
                    </div>

                    <span
                      className="
                        text-sm
                        font-semibold
                        text-gray-800
                      "
                    >
                      {guests}
                    </span>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-1.5
                    "
                  >
                    <button
                      type="button"
                      onClick={decreaseGuests}
                      disabled={guests <= 1}
                      aria-label="Decrease guests"
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-gray-200
                        bg-white
                        text-gray-600
                        transition
                        hover:border-gray-300
                        hover:bg-gray-50
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >
                      <Minus size={13} />
                    </button>

                    <button
                      type="button"
                      onClick={increaseGuests}
                      aria-label="Increase guests"
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-gray-200
                        bg-white
                        text-gray-600
                        transition
                        hover:border-gray-300
                        hover:bg-gray-50
                      "
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              </div>

              {/* =================================================
                  SEARCH BUTTON
              ================================================= */}

              <button
                type="button"
                onClick={handleSearch}
                disabled={loading}
                className="
                  group
                  flex
                  min-h-[78px]
                  items-center
                  justify-center
                  gap-3
                  bg-[#FF385C]
                  px-6
                  py-5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  duration-300
                  hover:bg-[#e31c5f]
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                  md:min-h-full
                "
              >
                {loading ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <span
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-white/15
                      transition
                      group-hover:bg-white/25
                    "
                  >
                    <Search size={17} />
                  </span>
                )}

                <span>
                  {loading
                    ? "Loading..."
                    : "View Listings"}
                </span>
              </button>

            </div>
          </div>

          {/* =================================================
              API ERROR
          ================================================= */}

          {apiError && (
            <p
              className="
                px-6
                pt-5
                text-center
                text-xs
                text-red-500
              "
            >
              {apiError}
            </p>
          )}

          {/* =================================================
              BOTTOM SPACE
          ================================================= */}

          <div
            className="
              h-8
              sm:h-10
              md:h-14
              lg:h-16
            "
          />

        </div>
      </div>

      {/* =====================================================
          ANIMATION
      ===================================================== */}

      <style>
        {`
          @keyframes heroContent {
            0% {
              opacity: 0;
              transform: translateY(18px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

    </section>
  );
}

export default CustomerHero;