import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  Heart,
  MapPin,
  Search,
  Star,
  Users,
  SlidersHorizontal,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000";

const fallbackImages = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=90",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=90",
];

function DestinationProperties() {
  const navigate = useNavigate();
  const { destination } = useParams();

  const cityName = decodeURIComponent(destination || "");

  const [properties, setProperties] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("recommended");

  // =========================================================
  // FETCH PROPERTIES
  // =========================================================

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/properties`
        );

        if (!response.ok) {
          throw new Error(
            `Properties API failed with status ${response.status}`
          );
        }

        const data = await response.json();

        let propertyList = [];

        if (Array.isArray(data)) {
          propertyList = data;
        } else if (Array.isArray(data?.items)) {
          propertyList = data.items;
        } else if (Array.isArray(data?.properties)) {
          propertyList = data.properties;
        } else if (Array.isArray(data?.data)) {
          propertyList = data.data;
        }

        const selectedCity = cityName
          .trim()
          .toLowerCase();

        const filtered = propertyList.filter((property) => {
          const propertyCity = String(
            property?.city ||
              property?.location?.city ||
              ""
          )
            .trim()
            .toLowerCase();

          return propertyCity === selectedCity;
        });

        setProperties(filtered);
      } catch (err) {
        console.error(err);

        setError(
          err.message ||
            "Unable to load properties."
        );
      } finally {
        setLoading(false);
      }
    };

    if (cityName) {
      fetchProperties();
    }
  }, [cityName]);

  // =========================================================
  // IMAGE
  // =========================================================

  const getPropertyImage = (property, index) => {
    if (property?.image) {
      return property.image;
    }

    if (property?.image_url) {
      return property.image_url;
    }

    if (property?.imageUrl) {
      return property.imageUrl;
    }

    if (
      Array.isArray(property?.images) &&
      property.images.length > 0
    ) {
      const first = property.images[0];

      if (typeof first === "string") {
        return first;
      }

      return (
        first?.url ||
        first?.image_url ||
        first?.imageUrl ||
        fallbackImages[index % fallbackImages.length]
      );
    }

    return fallbackImages[
      index % fallbackImages.length
    ];
  };

  // =========================================================
  // SORT
  // =========================================================

  const sortedProperties = useMemo(() => {
    const list = [...properties];

    if (sortBy === "price-low") {
      return list.sort(
        (a, b) =>
          Number(
            a.price ??
              a.price_per_night ??
              0
          ) -
          Number(
            b.price ??
              b.price_per_night ??
              0
          )
      );
    }

    if (sortBy === "price-high") {
      return list.sort(
        (a, b) =>
          Number(
            b.price ??
              b.price_per_night ??
              0
          ) -
          Number(
            a.price ??
              a.price_per_night ??
              0
          )
      );
    }

    return list;
  }, [properties, sortBy]);

  // =========================================================
  // PROPERTY DETAILS
  // =========================================================

  const handlePropertyClick = (propertyId) => {
    if (!propertyId) return;

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
  // BOOK
  // =========================================================

  const handleBookNow = (event, propertyId) => {
    event.stopPropagation();

    navigate(`/booking/${propertyId}`);
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc]">

        <div className="border-b bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />

            <div className="mt-4 h-10 w-96 max-w-full animate-pulse rounded-xl bg-gray-200" />

            <div className="mt-3 h-4 w-72 animate-pulse rounded bg-gray-200" />
          </div>
        </div>

        <main className="mx-auto max-w-7xl px-4 py-10">

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(
              (item) => (
                <div key={item}>
                  <div className="aspect-[4/3] animate-pulse rounded-[28px] bg-gray-200" />

                  <div className="mt-4 h-5 w-3/4 animate-pulse rounded bg-gray-200" />

                  <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-gray-200" />

                  <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                </div>
              )
            )}
          </div>

        </main>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] px-4">

        <div className="w-full max-w-md rounded-[30px] border bg-white p-8 text-center shadow-xl">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <MapPin
              size={28}
              className="text-red-500"
            />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Something went wrong
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="
              mt-7
              rounded-full
              bg-[#123d78]
              px-6
              py-3
              text-sm
              font-bold
              text-white
              hover:bg-[#0d2f60]
            "
          >
            Try Again
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          <button
            onClick={() => navigate(-1)}
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-gray-200
              bg-white
              px-4
              py-2
              text-sm
              font-semibold
              text-gray-700
              shadow-sm
              hover:bg-gray-50
            "
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <div className="hidden text-sm text-gray-400 sm:block">
            Stayora
            <span className="mx-2">/</span>
            <span className="font-semibold text-gray-900">
              {cityName}
            </span>
          </div>

          <button
            onClick={() => navigate("/search")}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-gray-200
              bg-white
              shadow-sm
            "
          >
            <Search size={18} />
          </button>

        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 lg:px-8">

          <div className="max-w-3xl">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e61e4d]">
              EXPLORE {cityName}
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Find your perfect stay in {cityName}
            </h1>

            <p className="mt-4 text-base leading-7 text-gray-500">
              Discover beautiful homes, apartments,
              villas and premium stays for your next
              trip.
            </p>

          </div>

          {/* STATS */}

          <div className="mt-8 flex flex-wrap gap-3">

            <div className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
              {properties.length} stays
            </div>

            <div className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
              Verified properties
            </div>

            <div className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
              Secure booking
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          PROPERTY LIST
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {properties.length === 0 ? (
          <div className="rounded-[30px] border bg-white px-6 py-20 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <MapPin
                size={28}
                className="text-gray-400"
              />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              No stays found in {cityName}
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Try exploring another destination.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-7 rounded-full bg-[#123d78] px-6 py-3 text-sm font-bold text-white"
            >
              Explore destinations
            </button>

          </div>
        ) : (
          <>
            {/* HEADER */}

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e61e4d]">
                  AVAILABLE NOW
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  Stays in {cityName}
                </h2>
              </div>

              <div className="flex items-center gap-3">

                <div className="hidden text-sm text-gray-500 sm:block">
                  {properties.length} properties
                </div>

                <div className="flex items-center gap-2 rounded-full border bg-white px-3 py-2 shadow-sm">

                  <SlidersHorizontal size={15} />

                  <select
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(event.target.value)
                    }
                    className="bg-transparent text-sm font-semibold outline-none"
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
                  </select>

                </div>

              </div>
            </div>

            {/* GRID */}

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {sortedProperties.map(
                (property, index) => {

                  const image =
                    getPropertyImage(
                      property,
                      index
                    );

                  const propertyId =
                    property.id;

                  const isFavorite =
                    favorites.includes(
                      propertyId
                    );

                  const price =
                    property.price ??
                    property.price_per_night ??
                    property.nightly_price ??
                    2500;

                  const rating =
                    property.rating ??
                    property.average_rating ??
                    "New";

                  return (
                    <article
                      key={propertyId}
                      onClick={() =>
                        handlePropertyClick(
                          propertyId
                        )
                      }
                      className="group cursor-pointer"
                    >

                      {/* IMAGE */}

                      <div className="
                        relative
                        aspect-[4/3]
                        overflow-hidden
                        rounded-[28px]
                        bg-gray-100
                        shadow-sm
                        transition-all
                        duration-500
                        group-hover:shadow-xl
                      ">

                        <img
                          src={image}
                          alt={
                            property.title ||
                            property.name ||
                            "Property"
                          }
                          className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-105
                          "
                          onError={(event) => {
                            event.currentTarget.src =
                              fallbackImages[
                                index %
                                  fallbackImages.length
                              ];
                          }}
                        />

                        <div className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/40
                          via-transparent
                          to-transparent
                        " />

                        {/* FAVORITE */}

                        <button
                          type="button"
                          onClick={(event) =>
                            handleFavorite(
                              event,
                              propertyId
                            )
                          }
                          className="
                            absolute
                            right-4
                            top-4
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            bg-white/95
                            shadow-lg
                            transition
                            hover:scale-110
                          "
                        >
                          <Heart
                            size={19}
                            className={
                              isFavorite
                                ? "fill-[#e61e4d] text-[#e61e4d]"
                                : "text-gray-700"
                            }
                          />
                        </button>

                        {/* TYPE */}

                        {(property.property_type ||
                          property.type) && (
                          <span className="
                            absolute
                            bottom-4
                            left-4
                            rounded-full
                            bg-white/95
                            px-3
                            py-1.5
                            text-xs
                            font-bold
                            text-gray-800
                          ">
                            {property.property_type ||
                              property.type}
                          </span>
                        )}

                      </div>

                      {/* DETAILS */}

                      <div className="mt-4">

                        <div className="flex items-start justify-between gap-3">

                          <h3 className="
                            line-clamp-2
                            text-base
                            font-bold
                            leading-6
                            text-gray-900
                          ">
                            {property.title ||
                              property.name ||
                              "Beautiful stay"}
                          </h3>

                          <div className="flex shrink-0 items-center gap-1 text-sm font-semibold">
                            <Star
                              size={14}
                              fill={
                                rating === "New"
                                  ? "none"
                                  : "currentColor"
                              }
                            />

                            {rating}
                          </div>

                        </div>

                        {/* LOCATION */}

                        <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">

                          <MapPin size={14} />

                          <span className="line-clamp-1">
                            {property.address
                              ? `${property.address}, `
                              : ""}
                            {property.city ||
                              cityName}
                          </span>

                        </div>

                        {/* PROPERTY INFO */}

                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">

                          <span className="flex items-center gap-1">
                            <Users size={13} />
                            {property.max_guests ??
                              property.guests ??
                              0}
                            guests
                          </span>

                          <span>·</span>

                          <span className="flex items-center gap-1">
                            <BedDouble size={13} />
                            {property.bedrooms ??
                              0}
                            bedrooms
                          </span>

                          <span>·</span>

                          <span className="flex items-center gap-1">
                            <Bath size={13} />
                            {property.bathrooms ??
                              0}
                            baths
                          </span>

                        </div>

                        {/* PRICE */}

                        <div className="mt-4 flex items-center justify-between">

                          <div>
                            <span className="text-base font-bold text-gray-900">
                              ₹
                              {Number(
                                price
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </span>

                            <span className="text-sm text-gray-500">
                              {" "}
                              / night
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={(event) =>
                              handleBookNow(
                                event,
                                propertyId
                              )
                            }
                            className="
                              rounded-full
                              bg-[#123d78]
                              px-5
                              py-2.5
                              text-xs
                              font-bold
                              text-white
                              transition
                              hover:bg-[#0d2f60]
                              hover:shadow-lg
                            "
                          >
                            Book Now
                          </button>

                        </div>

                      </div>

                    </article>
                  );
                }
              )}

            </div>
          </>
        )}

      </main>
    </div>
  );
}

export default DestinationProperties;