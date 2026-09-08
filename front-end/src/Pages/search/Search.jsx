import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPropertyImages } from "../../api/propertyImagesApi";

import {
  Search as SearchIcon,
  MapPin,
  CalendarDays,
  Users,
  Heart,
  Star,
  SlidersHorizontal,
  X,
  ChevronDown,
  Loader2,
  AlertCircle,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85";

const locations = [
  "Chennai",
  "Coimbatore",
  "Bangalore",
  "Goa",
  "Ooty",
  "Pondicherry",
  "Hyderabad",
  "Mumbai",
];

function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // =========================================================
  // STATE
  // =========================================================

  const [properties, setProperties] = useState([]);
  const [imagesByProperty, setImagesByProperty] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [location, setLocation] = useState(
    searchParams.get("location") || ""
  );

  const [checkIn, setCheckIn] = useState(
    searchParams.get("check_in") || ""
  );

  const [checkOut, setCheckOut] = useState(
    searchParams.get("check_out") || ""
  );

  const [guests, setGuests] = useState(
    Number(searchParams.get("guests")) || 2
  );

  const [showLocation, setShowLocation] = useState(false);
  const [showDates, setShowDates] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [favorites, setFavorites] = useState([]);

  const [propertyType, setPropertyType] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("recommended");

  // =========================================================
  // FETCH PROPERTIES
  // =========================================================

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/properties/`);

      if (!response.ok) {
        throw new Error(`Failed to load properties (${response.status})`);
      }

      const data = await response.json();

      let propertyList = [];

      if (Array.isArray(data)) {
        propertyList = data;
      } else if (Array.isArray(data?.items)) {
        propertyList = data.items;
      } else if (Array.isArray(data?.data)) {
        propertyList = data.data;
      }

      setProperties(propertyList);

      try {
        const imageResponse = await getPropertyImages();
        const imageList = Array.isArray(imageResponse)
          ? imageResponse
          : imageResponse?.data || imageResponse?.items || [];
        const imageMap = {};

        imageList
          .sort(
            (a, b) =>
              Number(a?.display_order || 0) -
              Number(b?.display_order || 0)
          )
          .forEach((image) => {
            const propertyId = image?.property_id;

            if (
              propertyId &&
              image?.image_url &&
              !imageMap[propertyId]
            ) {
              imageMap[propertyId] = image.image_url;
            }
          });

        setImagesByProperty(imageMap);
      } catch (imageError) {
        console.error("Property images API error:", imageError);
      }
    } catch (err) {
      console.error("Property API error:", err);

      setError(
        "Unable to load properties. Please check whether the FastAPI server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // NORMALIZE PROPERTY
  // =========================================================

  const normalizeProperty = (property) => {
    return {
      id: property?.id,

      title:
        property?.title ||
        property?.name ||
        "Beautiful stay",

      city:
        property?.city ||
        property?.location ||
        "",

      address:
        property?.address ||
        "",

      propertyType:
        property?.property_type ||
        property?.propertyType ||
        "Property",

      image:
        imagesByProperty[property?.id] ||
        property?.image ||
        property?.image_url ||
        property?.cover_image ||
        property?.thumbnail ||
        FALLBACK_IMAGE,

      bedrooms: Number(property?.bedrooms) || 0,

      bathrooms: Number(property?.bathrooms) || 0,

      maxGuests:
        Number(property?.max_guests) ||
        Number(property?.guests) ||
        0,

      price:
        Number(property?.price) ||
        Number(property?.nightly_price) ||
        Number(property?.base_price) ||
        0,

      rating: Number(property?.rating) || 0,

      reviews:
        Number(property?.reviews_count) ||
        Number(property?.review_count) ||
        0,
    };
  };

  const normalizedProperties = useMemo(() => {
    return properties.map(normalizeProperty);
  }, [properties, imagesByProperty]);

  // =========================================================
  // PROPERTY TYPES
  // =========================================================

  const propertyTypes = useMemo(() => {
    const types = normalizedProperties
      .map((property) => property.propertyType)
      .filter(Boolean);

    return ["All", ...new Set(types)];
  }, [normalizedProperties]);

  // =========================================================
  // FILTER PROPERTIES
  // =========================================================

  const filteredProperties = useMemo(() => {
    let result = [...normalizedProperties];

    if (location.trim()) {
      const searchLocation = location.trim().toLowerCase();

      result = result.filter((property) => {
        const city = property.city.toLowerCase();
        const address = property.address.toLowerCase();

        return (
          city.includes(searchLocation) ||
          address.includes(searchLocation)
        );
      });
    }

    if (guests > 0) {
      result = result.filter((property) => {
        if (!property.maxGuests) {
          return true;
        }

        return property.maxGuests >= guests;
      });
    }

    if (propertyType !== "All") {
      result = result.filter(
        (property) =>
          property.propertyType === propertyType
      );
    }

    if (maxPrice) {
      result = result.filter(
        (property) =>
          property.price <= Number(maxPrice)
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [
    normalizedProperties,
    location,
    guests,
    propertyType,
    maxPrice,
    sortBy,
  ]);

  // =========================================================
  // LOCATION
  // =========================================================

  const handleLocationSelect = (place) => {
    setLocation(place);
    setShowLocation(false);
  };

  // =========================================================
  // GUEST
  // =========================================================

  const increaseGuests = () => {
    setGuests((previous) => previous + 1);
  };

  const decreaseGuests = () => {
    setGuests((previous) =>
      Math.max(1, previous - 1)
    );
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location) {
      params.set("location", location);
    }

    if (checkIn) {
      params.set("check_in", checkIn);
    }

    if (checkOut) {
      params.set("check_out", checkOut);
    }

    if (guests) {
      params.set("guests", String(guests));
    }

    navigate(`/search?${params.toString()}`);

    setShowLocation(false);
    setShowDates(false);
    setShowGuests(false);
  };

  // =========================================================
  // PROPERTY CLICK
  // =========================================================

  const handlePropertyClick = (propertyId) => {
    if (!propertyId) {
      return;
    }

    navigate(`/property-details/${propertyId}`);
  };

  // =========================================================
  // FAVORITE
  // =========================================================

  const handleFavorite = (event, propertyId) => {
    event.stopPropagation();

    setFavorites((previous) => {
      if (previous.includes(propertyId)) {
        return previous.filter(
          (id) => id !== propertyId
        );
      }

      return [...previous, propertyId];
    });
  };

  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const clearFilters = () => {
    setLocation("");
    setCheckIn("");
    setCheckOut("");
    setGuests(2);
    setPropertyType("All");
    setMaxPrice("");
    setSortBy("recommended");
  };

  // =========================================================
  // CLOSE PANELS
  // =========================================================

  const closePanels = () => {
    setShowLocation(false);
    setShowDates(false);
    setShowGuests(false);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      className="min-h-screen bg-[#fafafa] text-gray-900"
      onClick={closePanels}
    >
      {/* =====================================================
          PREMIUM HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/90 backdrop-blur-2xl">

        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-4">

            {/* LOGO */}

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                navigate("/");
              }}
              className="hidden shrink-0 sm:block"
            >
              <div className="text-xl font-black tracking-tight">
                <span className="text-[#FF385C]">
                  AIR
                </span>
                <span className="text-gray-900">
                  BNB
                </span>
              </div>

              <div className="mt-0.5 text-[9px] font-semibold tracking-[0.22em] text-gray-400">
                PREMIUM STAYS
              </div>
            </button>

            {/* =================================================
                PREMIUM SEARCH CONTAINER
            ================================================= */}

            <div
              className="
                relative
                flex
                min-w-0
                flex-1
                items-center
                rounded-[28px]
                border
                border-gray-200/80
                bg-white
                p-1.5
                shadow-[0_8px_35px_rgba(0,0,0,0.08)]
                transition-all
                duration-300
                hover:shadow-[0_12px_45px_rgba(0,0,0,0.12)]
              "
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* WHERE */}

              <button
                type="button"
                onClick={() => {
                  setShowLocation(!showLocation);
                  setShowDates(false);
                  setShowGuests(false);
                }}
                className={`
                  hidden
                  min-w-0
                  flex-1
                  rounded-[22px]
                  px-5
                  py-3
                  text-left
                  transition-all
                  md:block
                  ${
                    showLocation
                      ? "bg-gray-50 shadow-inner"
                      : "hover:bg-gray-50"
                  }
                `}
              >
                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff0f2]">
                    <MapPin
                      size={16}
                      className="text-[#FF385C]"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
                      Where
                    </p>

                    <p className="mt-0.5 truncate text-sm font-semibold text-gray-900">
                      {location || "Anywhere"}
                    </p>
                  </div>

                </div>
              </button>

              <div className="hidden h-10 w-px bg-gray-200 md:block" />

              {/* WHEN */}

              <button
                type="button"
                onClick={() => {
                  setShowDates(!showDates);
                  setShowLocation(false);
                  setShowGuests(false);
                }}
                className={`
                  hidden
                  min-w-0
                  flex-1
                  rounded-[22px]
                  px-5
                  py-3
                  text-left
                  transition-all
                  md:block
                  ${
                    showDates
                      ? "bg-gray-50 shadow-inner"
                      : "hover:bg-gray-50"
                  }
                `}
              >
                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff0f2]">
                    <CalendarDays
                      size={16}
                      className="text-[#FF385C]"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
                      When
                    </p>

                    <p className="mt-0.5 truncate text-sm font-semibold text-gray-900">
                      {checkIn && checkOut
                        ? `${checkIn} - ${checkOut}`
                        : "Add dates"}
                    </p>
                  </div>

                </div>
              </button>

              <div className="hidden h-10 w-px bg-gray-200 md:block" />

              {/* WHO */}

              <button
                type="button"
                onClick={() => {
                  setShowGuests(!showGuests);
                  setShowLocation(false);
                  setShowDates(false);
                }}
                className={`
                  hidden
                  min-w-0
                  flex-1
                  rounded-[22px]
                  px-5
                  py-3
                  text-left
                  transition-all
                  md:block
                  ${
                    showGuests
                      ? "bg-gray-50 shadow-inner"
                      : "hover:bg-gray-50"
                  }
                `}
              >
                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff0f2]">
                    <Users
                      size={16}
                      className="text-[#FF385C]"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
                      Who
                    </p>

                    <p className="mt-0.5 truncate text-sm font-semibold text-gray-900">
                      {guests} guest
                      {guests !== 1 ? "s" : ""}
                    </p>
                  </div>

                </div>
              </button>

              {/* MOBILE SEARCH */}

              <button
                type="button"
                onClick={() => {
                  setShowLocation(!showLocation);
                  setShowDates(false);
                  setShowGuests(false);
                }}
                className="flex min-w-0 flex-1 items-center gap-3 rounded-[22px] px-3 py-2 md:hidden"
              >

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff0f2]">
                  <SearchIcon
                    size={18}
                    className="text-[#FF385C]"
                  />
                </div>

                <div className="min-w-0 text-left">

                  <p className="truncate text-sm font-bold text-gray-900">
                    {location || "Where to?"}
                  </p>

                  <p className="truncate text-[11px] text-gray-500">
                    {checkIn && checkOut
                      ? `${checkIn} - ${checkOut}`
                      : "Anywhere · Add dates"}
                    {" · "}
                    {guests} guests
                  </p>

                </div>

              </button>

              {/* SEARCH BUTTON */}

              <button
                type="button"
                onClick={handleSearch}
                className="
                  group
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-[#FF385C]
                  via-[#E91E63]
                  to-[#D4145A]
                  text-white
                  shadow-[0_8px_20px_rgba(255,56,92,0.30)]
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:shadow-[0_10px_28px_rgba(255,56,92,0.40)]
                  active:scale-95
                "
              >
                <SearchIcon
                  size={19}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </button>

              {/* =================================================
                  LOCATION PANEL
              ================================================= */}

              {showLocation && (
                <div
                  className="
                    absolute
                    left-0
                    top-[76px]
                    z-50
                    w-full
                    max-w-[470px]
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-gray-100
                    bg-white
                    p-5
                    shadow-[0_25px_70px_rgba(0,0,0,0.16)]
                    animate-[fadeIn_0.2s_ease-out]
                  "
                >

                  <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0f2]">
                      <MapPin
                        size={20}
                        className="text-[#FF385C]"
                      />
                    </div>

                    <div>
                      <p className="text-base font-bold text-gray-900">
                        Search destinations
                      </p>

                      <p className="mt-0.5 text-xs text-gray-500">
                        Explore beautiful places to stay
                      </p>
                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    {locations.map((place) => (
                      <button
                        type="button"
                        key={place}
                        onClick={() =>
                          handleLocationSelect(place)
                        }
                        className="
                          group
                          flex
                          items-center
                          gap-3
                          rounded-2xl
                          border
                          border-gray-100
                          bg-gray-50/70
                          p-3
                          text-left
                          transition-all
                          duration-200
                          hover:-translate-y-0.5
                          hover:border-[#ffc4cf]
                          hover:bg-[#fff7f8]
                          hover:shadow-md
                        "
                      >

                        <span
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-white
                            shadow-sm
                            transition
                            group-hover:bg-[#fff0f2]
                          "
                        >
                          <MapPin
                            size={16}
                            className="text-gray-600 group-hover:text-[#FF385C]"
                          />
                        </span>

                        <span className="text-sm font-semibold text-gray-800">
                          {place}
                        </span>

                      </button>
                    ))}

                  </div>

                </div>
              )}

              {/* =================================================
                  DATE PANEL
              ================================================= */}

              {showDates && (
                <div
                  className="
                    absolute
                    left-1/2
                    top-[76px]
                    z-50
                    w-[min(480px,calc(100vw-32px))]
                    -translate-x-1/2
                    rounded-[28px]
                    border
                    border-gray-100
                    bg-white
                    p-6
                    shadow-[0_25px_70px_rgba(0,0,0,0.16)]
                  "
                >

                  <div className="mb-6 flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0f2]">
                      <CalendarDays
                        size={20}
                        className="text-[#FF385C]"
                      />
                    </div>

                    <div>
                      <p className="text-base font-bold text-gray-900">
                        Select your dates
                      </p>

                      <p className="mt-0.5 text-xs text-gray-500">
                        Choose when you want to stay
                      </p>
                    </div>

                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">

                    <div>
                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Check-in
                      </label>

                      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-1 transition focus-within:border-[#FF385C] focus-within:bg-white">

                        <input
                          type="date"
                          value={checkIn}
                          onChange={(event) =>
                            setCheckIn(event.target.value)
                          }
                          className="
                            w-full
                            rounded-xl
                            bg-transparent
                            px-3
                            py-3
                            text-sm
                            font-medium
                            outline-none
                          "
                        />

                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        Check-out
                      </label>

                      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-1 transition focus-within:border-[#FF385C] focus-within:bg-white">

                        <input
                          type="date"
                          value={checkOut}
                          min={checkIn || undefined}
                          onChange={(event) =>
                            setCheckOut(event.target.value)
                          }
                          className="
                            w-full
                            rounded-xl
                            bg-transparent
                            px-3
                            py-3
                            text-sm
                            font-medium
                            outline-none
                          "
                        />

                      </div>
                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() => setShowDates(false)}
                    className="
                      mt-6
                      w-full
                      rounded-2xl
                      bg-gray-900
                      py-3.5
                      text-sm
                      font-bold
                      text-white
                      shadow-lg
                      transition
                      hover:bg-gray-800
                      active:scale-[0.99]
                    "
                  >
                    Done
                  </button>

                </div>
              )}

              {/* =================================================
                  GUEST PANEL
              ================================================= */}

              {showGuests && (
                <div
                  className="
                    absolute
                    right-0
                    top-[76px]
                    z-50
                    w-[min(390px,calc(100vw-32px))]
                    rounded-[28px]
                    border
                    border-gray-100
                    bg-white
                    p-6
                    shadow-[0_25px_70px_rgba(0,0,0,0.16)]
                  "
                >

                  <div className="mb-6 flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff0f2]">
                      <Users
                        size={20}
                        className="text-[#FF385C]"
                      />
                    </div>

                    <div>
                      <p className="text-base font-bold text-gray-900">
                        Who's coming?
                      </p>

                      <p className="mt-0.5 text-xs text-gray-500">
                        Add the number of guests
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50 p-4">

                    <div>
                      <p className="font-bold text-gray-900">
                        Guests
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Adults and children
                      </p>
                    </div>

                    <div className="flex items-center gap-4">

                      <button
                        type="button"
                        onClick={decreaseGuests}
                        disabled={guests <= 1}
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-gray-300
                          bg-white
                          text-lg
                          font-medium
                          shadow-sm
                          transition
                          hover:border-gray-900
                          disabled:cursor-not-allowed
                          disabled:opacity-30
                        "
                      >
                        −
                      </button>

                      <span className="w-6 text-center text-base font-bold">
                        {guests}
                      </span>

                      <button
                        type="button"
                        onClick={increaseGuests}
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-gray-300
                          bg-white
                          text-lg
                          font-medium
                          shadow-sm
                          transition
                          hover:border-gray-900
                        "
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() => setShowGuests(false)}
                    className="
                      mt-5
                      w-full
                      rounded-2xl
                      bg-gray-900
                      py-3.5
                      text-sm
                      font-bold
                      text-white
                      transition
                      hover:bg-gray-800
                    "
                  >
                    Done
                  </button>

                </div>
              )}

            </div>

            {/* FILTER BUTTON */}

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setShowFilters(!showFilters);
                closePanels();
              }}
              className={`
                flex
                h-14
                shrink-0
                items-center
                gap-2
                rounded-full
                border
                px-5
                text-sm
                font-bold
                transition-all
                ${
                  showFilters
                    ? "border-gray-900 bg-gray-900 text-white shadow-lg"
                    : "border-gray-200 bg-white text-gray-800 shadow-sm hover:border-gray-300 hover:shadow-md"
                }
              `}
            >
              <SlidersHorizontal size={17} />

              <span className="hidden sm:block">
                Filters
              </span>
            </button>

          </div>

        </div>

        {/* =====================================================
            PREMIUM FILTER PANEL
        ===================================================== */}

        {showFilters && (
          <div
            className="border-t border-gray-100 bg-white/95 backdrop-blur-xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

              <div className="mb-5 flex items-center justify-between">

                <div>
                  <p className="text-lg font-bold text-gray-900">
                    Refine your search
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Find the stay that fits you best
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-bold text-[#FF385C] hover:underline"
                >
                  Clear all
                </button>

              </div>

              <div className="grid gap-4 md:grid-cols-4">

                {/* PROPERTY TYPE */}

                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">

                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Property type
                  </label>

                  <div className="relative">

                    <select
                      value={propertyType}
                      onChange={(event) =>
                        setPropertyType(event.target.value)
                      }
                      className="
                        w-full
                        appearance-none
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        px-4
                        py-3
                        text-sm
                        font-medium
                        outline-none
                        transition
                        focus:border-[#FF385C]
                      "
                    >
                      {propertyTypes.map((type) => (
                        <option
                          key={type}
                          value={type}
                        >
                          {type}
                        </option>
                      ))}
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                    />

                  </div>

                </div>

                {/* MAX PRICE */}

                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">

                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Maximum price / night
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">
                      ₹
                    </span>

                    <input
                      type="number"
                      min="0"
                      value={maxPrice}
                      onChange={(event) =>
                        setMaxPrice(event.target.value)
                      }
                      placeholder="Any price"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        py-3
                        pl-9
                        pr-4
                        text-sm
                        font-medium
                        outline-none
                        transition
                        focus:border-[#FF385C]
                      "
                    />

                  </div>

                </div>

                {/* SORT */}

                <div className="rounded-2xl border border-gray-100 bg-gray-50/70 p-4">

                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    Sort by
                  </label>

                  <div className="relative">

                    <select
                      value={sortBy}
                      onChange={(event) =>
                        setSortBy(event.target.value)
                      }
                      className="
                        w-full
                        appearance-none
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        px-4
                        py-3
                        text-sm
                        font-medium
                        outline-none
                        transition
                        focus:border-[#FF385C]
                      "
                    >
                      <option value="recommended">
                        Recommended
                      </option>

                      <option value="price-low">
                        Price: Low to High
                      </option>

                      <option value="price-high">
                        Price: High to Low
                      </option>

                      <option value="rating">
                        Highest Rated
                      </option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                    />

                  </div>

                </div>

                {/* CLEAR */}

                <div className="flex items-center rounded-2xl border border-gray-100 bg-gray-50/70 p-4">

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      px-4
                      py-3
                      text-sm
                      font-bold
                      text-gray-800
                      shadow-sm
                      transition
                      hover:border-gray-900
                    "
                  >
                    <X size={15} />
                    Reset filters
                  </button>

                </div>

              </div>

            </div>

          </div>
        )}

      </header>

      {/* =======================================================
          CONTENT
      ======================================================= */}

      <main className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">

        {/* TITLE */}

        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <div className="mb-2 flex items-center gap-2">

              

              

            </div>

            <h1 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
              {location
                ? `Stays in ${location}`
                : "Find your perfect stay"}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {loading
                ? "Finding beautiful stays..."
                : `${filteredProperties.length} ${
                    filteredProperties.length === 1
                      ? "stay"
                      : "stays"
                  } available`}
            </p>

          </div>

          {/* ACTIVE SEARCH */}

          {(location || checkIn || checkOut) && (
            <div className="flex flex-wrap gap-2">

              {location && (
                <span className="flex items-center gap-1.5 rounded-full border border-[#ffd5dc] bg-[#fff5f6] px-4 py-2 text-xs font-semibold text-[#d91b45]">
                  <MapPin size={12} />
                  {location}
                </span>
              )}

              {checkIn && (
                <span className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm">
                  <CalendarDays size={12} />
                  {checkIn}
                </span>
              )}

              {checkOut && (
                <span className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm">
                  <CalendarDays size={12} />
                  {checkOut}
                </span>
              )}

            </div>
          )}

        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-8 flex items-start gap-4 rounded-3xl border border-red-100 bg-white p-5 shadow-sm">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-50">
              <AlertCircle
                size={20}
                className="text-red-600"
              />
            </div>

            <div>

              <p className="font-bold text-gray-900">
                Unable to load properties
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {error}
              </p>

              <button
                type="button"
                onClick={fetchProperties}
                className="mt-3 rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-gray-800"
              >
                Try again
              </button>

            </div>

          </div>
        )}

        {/* LOADING */}

        {loading && (
          <div className="flex min-h-[430px] flex-col items-center justify-center rounded-[32px] border border-gray-100 bg-white shadow-sm">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff0f2]">
              <Loader2
                size={30}
                className="animate-spin text-[#FF385C]"
              />
            </div>

            <p className="mt-5 text-sm font-bold text-gray-700">
              Loading available stays...
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Finding the best places for you
            </p>

          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          filteredProperties.length === 0 && (
            <div className="flex min-h-[430px] flex-col items-center justify-center rounded-[32px] border border-gray-100 bg-white px-6 text-center shadow-sm">

              <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-[#fff0f2]">
                <MapPin
                  size={30}
                  className="text-[#FF385C]"
                />
              </div>

              <h2 className="mt-6 text-2xl font-black text-gray-900">
                No stays found
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                We couldn't find properties matching your
                current search. Try another destination or
                clear the filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-2xl bg-gray-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-800"
              >
                Clear search
              </button>

            </div>
          )}

        {/* =====================================================
            PROPERTY GRID
        ===================================================== */}

        {!loading &&
          filteredProperties.length > 0 && (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {filteredProperties.map((property) => {

                const isFavorite =
                  favorites.includes(property.id);

                return (
                  <article
                    key={property.id}
                    onClick={() =>
                      handlePropertyClick(property.id)
                    }
                    className="group cursor-pointer"
                  >

                    {/* IMAGE */}

                    <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-gray-100 shadow-sm">

                      <img
                        src={property.image}
                        alt={property.title}
                        onError={(event) => {
                          event.currentTarget.src =
                            FALLBACK_IMAGE;
                        }}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                      {/* PREMIUM OVERLAY */}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                      {/* FAVORITE */}

                      <button
                        type="button"
                        onClick={(event) =>
                          handleFavorite(
                            event,
                            property.id
                          )
                        }
                        className="
                          absolute
                          right-3
                          top-3
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/70
                          bg-white/90
                          shadow-lg
                          backdrop-blur-md
                          transition
                          duration-300
                          hover:scale-110
                        "
                      >
                        <Heart
                          size={19}
                          fill={
                            isFavorite
                              ? "#FF385C"
                              : "none"
                          }
                          className={
                            isFavorite
                              ? "text-[#FF385C]"
                              : "text-gray-700"
                          }
                        />
                      </button>

                      {/* PROPERTY TYPE */}

                      <div className="absolute bottom-3 left-3 rounded-full border border-white/60 bg-white/90 px-3.5 py-1.5 text-[11px] font-bold text-gray-800 shadow-md backdrop-blur-md">
                        {property.propertyType}
                      </div>

                    </div>

                    {/* DETAILS */}

                    <div className="mt-4">

                      <div className="flex items-start justify-between gap-3">

                        <h2 className="line-clamp-1 text-[15px] font-bold text-gray-950">
                          {property.title}
                        </h2>

                        <div className="flex shrink-0 items-center gap-1 rounded-full bg-gray-50 px-2 py-1 text-xs font-bold text-gray-800">

                          <Star
                            size={12}
                            fill={
                              property.rating
                                ? "currentColor"
                                : "none"
                            }
                          />

                          <span>
                            {property.rating
                              ? property.rating.toFixed(1)
                              : "New"}
                          </span>

                        </div>

                      </div>

                      {/* LOCATION */}

                      <div className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-500">

                        <MapPin size={13} />

                        <span className="line-clamp-1">
                          {property.address
                            ? `${property.address}, ${property.city}`
                            : property.city ||
                              "Beautiful location"}
                        </span>

                      </div>

                      {/* PROPERTY INFO */}

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">

                        {property.maxGuests > 0 && (
                          <>
                            <span>
                              {property.maxGuests} guests
                            </span>

                            <span>·</span>
                          </>
                        )}

                        {property.bedrooms > 0 && (
                          <>
                            <span>
                              {property.bedrooms}{" "}
                              {property.bedrooms === 1
                                ? "bedroom"
                                : "bedrooms"}
                            </span>

                            <span>·</span>
                          </>
                        )}

                        {property.bathrooms > 0 && (
                          <span>
                            {property.bathrooms}{" "}
                            {property.bathrooms === 1
                              ? "bath"
                              : "baths"}
                          </span>
                        )}

                      </div>

                      {/* PRICE */}

                      <div className="mt-3">

                        {property.price > 0 ? (
                          <p className="text-sm text-gray-900">

                            <span className="text-base font-black">
                              ₹
                              {property.price.toLocaleString(
                                "en-IN"
                              )}
                            </span>

                            <span className="text-gray-500">
                              {" "}
                              night
                            </span>

                          </p>
                        ) : (
                          <p className="text-sm font-semibold text-gray-600">
                            Price available on booking
                          </p>
                        )}

                      </div>

                    </div>

                  </article>
                );
              })}

            </div>
          )}

      </main>

      {/* =====================================================
          SMALL PREMIUM ANIMATION
      ===================================================== */}

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-6px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

    </div>
  );
}

export default Search;