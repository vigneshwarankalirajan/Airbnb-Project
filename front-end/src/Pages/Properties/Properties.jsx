import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MapPin,
  Star,
  Heart,
  BedDouble,
  Bath,
  Users,
  Loader2,
  Search,
  RefreshCw,
} from "lucide-react";

import { getProperties } from "../../api/propertiesApi";

function Properties() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // LOAD PROPERTIES
  // GET /api/properties
  // =========================================================

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProperties();

      console.log("Properties API Response:", response);

      /*
        Handle different possible API response formats:

        1. [
             {...},
             {...}
           ]

        2. {
             data: [...]
           }

        3. {
             items: [...]
           }

        4. {
             properties: [...]
           }
      */

      let propertyList = [];

      if (Array.isArray(response)) {
        propertyList = response;
      } else if (Array.isArray(response?.data)) {
        propertyList = response.data;
      } else if (Array.isArray(response?.items)) {
        propertyList = response.items;
      } else if (Array.isArray(response?.properties)) {
        propertyList = response.properties;
      } else if (Array.isArray(response?.data?.items)) {
        propertyList = response.data.items;
      } else if (Array.isArray(response?.data?.properties)) {
        propertyList = response.data.properties;
      }

      setProperties(propertyList);

    } catch (error) {
      console.error(
        "Properties API Error:",
        error?.response?.data || error?.message || error
      );

      setError(
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Unable to load properties."
      );

      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // PROPERTY HELPERS
  // =========================================================

  const getPropertyId = (property) => {
    return (
      property?.id ||
      property?._id ||
      property?.property_id
    );
  };

  const getPropertyTitle = (property) => {
    return (
      property?.title ||
      property?.name ||
      property?.property_name ||
      "Beautiful Stay"
    );
  };

  const getPropertyImage = (property) => {
    const image =
      property?.image ||
      property?.image_url ||
      property?.cover_image ||
      property?.thumbnail ||
      property?.photo ||
      property?.images?.[0];

    return (
      image ||
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80"
    );
  };

  const getLocation = (property) => {
    const city =
      property?.city ||
      property?.location ||
      property?.destination;

    const state = property?.state;

    if (city && state) {
      return `${city}, ${state}`;
    }

    return city || state || "Location unavailable";
  };

  const getPrice = (property) => {
    return (
      property?.price_per_night ||
      property?.nightly_price ||
      property?.price ||
      property?.amount ||
      0
    );
  };

  const getRating = (property) => {
    return (
      property?.rating ||
      property?.average_rating ||
      property?.review_rating ||
      0
    );
  };

  const getReviewCount = (property) => {
    return (
      property?.review_count ||
      property?.reviews_count ||
      property?.total_reviews ||
      0
    );
  };

  const getPropertyType = (property) => {
    return (
      property?.property_type ||
      property?.type ||
      property?.category ||
      "Stay"
    );
  };

  const getBedrooms = (property) => {
    return (
      property?.bedrooms ||
      property?.number_of_bedrooms ||
      null
    );
  };

  const getBathrooms = (property) => {
    return (
      property?.bathrooms ||
      property?.number_of_bathrooms ||
      null
    );
  };

  const getGuests = (property) => {
    return (
      property?.guest_count ||
      property?.max_guests ||
      property?.guests ||
      null
    );
  };

  // =========================================================
  // PROPERTY CLICK
  // =========================================================

  const handlePropertyClick = (property) => {
    const id = getPropertyId(property);

    if (!id) {
      console.warn(
        "Property ID not found:",
        property
      );

      return;
    }

    navigate(`/property-details/${id}`);
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa]">

        <div className="flex min-h-[70vh] items-center justify-center">

          <div className="flex flex-col items-center">

            <Loader2
              size={36}
              className="animate-spin text-[#123d78]"
            />

            <p className="mt-4 text-sm font-medium text-gray-600">
              Loading properties...
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Finding the best stays for you
            </p>

          </div>

        </div>

      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div className="min-h-screen bg-[#fafafa]">

        <div className="flex min-h-[70vh] items-center justify-center px-5">

          <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">

              <Search
                size={25}
                className="text-red-500"
              />

            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Unable to load properties
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              We couldn't fetch the available stays right now.
              Please check your connection or try again.
            </p>

            <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={loadProperties}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#123d78] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0e315f]"
            >
              <RefreshCw size={17} />
              Try Again
            </button>

          </div>

        </div>

      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-[#fafafa]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#123d78]">
                Explore Stays
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Find your perfect stay
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                Discover comfortable homes, villas, apartments and
                unique places for your next trip.
              </p>

            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">

              <MapPin size={17} />

              <span>
                {properties.length}{" "}
                {properties.length === 1
                  ? "property"
                  : "properties"}{" "}
                available
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          PROPERTY CONTENT
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

        {properties.length === 0 ? (

          // ===================================================
          // EMPTY STATE
          // ===================================================

          <div className="flex min-h-[400px] items-center justify-center">

            <div className="max-w-md text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">

                <Search
                  size={28}
                  className="text-gray-400"
                />

              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                No properties available
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                There are no properties available at the moment.
                Please check again later.
              </p>

              <button
                type="button"
                onClick={loadProperties}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <RefreshCw size={16} />
                Refresh
              </button>

            </div>

          </div>

        ) : (

          // ===================================================
          // PROPERTY GRID
          // ===================================================

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {properties.map((property) => {

              const propertyId =
                getPropertyId(property);

              const title =
                getPropertyTitle(property);

              const image =
                getPropertyImage(property);

              const location =
                getLocation(property);

              const price =
                getPrice(property);

              const rating =
                getRating(property);

              const reviewCount =
                getReviewCount(property);

              const propertyType =
                getPropertyType(property);

              const bedrooms =
                getBedrooms(property);

              const bathrooms =
                getBathrooms(property);

              const guests =
                getGuests(property);

              return (
                <article
                  key={
                    propertyId ||
                    `${title}-${location}`
                  }
                  className="group cursor-pointer"
                  onClick={() =>
                    handlePropertyClick(property)
                  }
                >

                  {/* IMAGE */}

                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">

                    <img
                      src={image}
                      alt={title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.src =
                          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80";
                      }}
                    />

                    {/* OVERLAY */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

                    {/* HEART */}

                    <button
                      type="button"
                      aria-label="Add to wishlist"
                      onClick={(event) => {
                        event.stopPropagation();

                        console.log(
                          "Wishlist property:",
                          propertyId
                        );
                      }}
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur transition hover:scale-105 hover:bg-white"
                    >
                      <Heart
                        size={18}
                        className="text-gray-700"
                      />
                    </button>

                    {/* PROPERTY TYPE */}

                    {propertyType && (
                      <div className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-sm">
                        {propertyType}
                      </div>
                    )}

                  </div>

                  {/* DETAILS */}

                  <div className="pt-3">

                    {/* TITLE + RATING */}

                    <div className="flex items-start justify-between gap-3">

                      <h2 className="line-clamp-1 text-[15px] font-semibold text-gray-900">
                        {title}
                      </h2>

                      {rating > 0 && (
                        <div className="flex shrink-0 items-center gap-1 text-sm">

                          <Star
                            size={14}
                            fill="currentColor"
                            className="text-gray-900"
                          />

                          <span className="font-medium text-gray-900">
                            {Number(rating).toFixed(1)}
                          </span>

                        </div>
                      )}

                    </div>

                    {/* LOCATION */}

                    <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">

                      <MapPin size={14} />

                      <span className="line-clamp-1">
                        {location}
                      </span>

                    </div>

                    {/* PROPERTY INFO */}

                    {(guests ||
                      bedrooms ||
                      bathrooms) && (

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">

                        {guests && (
                          <span className="flex items-center gap-1">
                            <Users size={13} />
                            {guests} guests
                          </span>
                        )}

                        {bedrooms && (
                          <span className="flex items-center gap-1">
                            <BedDouble size={13} />
                            {bedrooms}{" "}
                            {bedrooms === 1
                              ? "bedroom"
                              : "bedrooms"}
                          </span>
                        )}

                        {bathrooms && (
                          <span className="flex items-center gap-1">
                            <Bath size={13} />
                            {bathrooms}{" "}
                            {bathrooms === 1
                              ? "bath"
                              : "baths"}
                          </span>
                        )}

                      </div>
                    )}

                    {/* PRICE */}

                    <div className="mt-3">

                      {price > 0 ? (

                        <p className="text-sm text-gray-900">

                          <span className="text-base font-bold">
                            ₹{Number(price).toLocaleString("en-IN")}
                          </span>

                          <span className="text-gray-500">
                            {" "}
                            night
                          </span>

                        </p>

                      ) : (

                        <p className="text-sm font-medium text-gray-500">
                          Price unavailable
                        </p>

                      )}

                    </div>

                    {/* REVIEWS */}

                    {reviewCount > 0 && (
                      <p className="mt-1 text-xs text-gray-400">
                        {reviewCount}{" "}
                        {reviewCount === 1
                          ? "review"
                          : "reviews"}
                      </p>
                    )}

                  </div>

                </article>
              );
            })}

          </div>

        )}

      </main>

    </div>
  );
}

export default Properties;