"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Heart,
  MapPin,
  Star,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import CustomerReveal from "./CustomerReveal";
import apiClient from "../../api/apiClient";

function CustomerTravelInspiration() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [propertyImages, setPropertyImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeCategory, setActiveCategory] = useState("All");

  /* -------------------------------------------------------
     FETCH PROPERTIES + IMAGES
  ------------------------------------------------------- */

  useEffect(() => {
    const fetchTravelInspiration = async () => {
      try {
        setLoading(true);
        setError("");

        const [propertiesResponse, imagesResponse] =
          await Promise.all([
            apiClient.get("/properties/"),
            apiClient.get("/property-images/"),
          ]);

        console.log(
          "TRAVEL PROPERTIES API:",
          propertiesResponse.data
        );

        console.log(
          "TRAVEL PROPERTY IMAGES API:",
          imagesResponse.data
        );

        /* ---------------- PROPERTIES ---------------- */

        let propertyData = [];

        if (Array.isArray(propertiesResponse.data)) {
          propertyData = propertiesResponse.data;
        } else if (
          Array.isArray(propertiesResponse.data?.data)
        ) {
          propertyData = propertiesResponse.data.data;
        } else if (
          Array.isArray(propertiesResponse.data?.properties)
        ) {
          propertyData = propertiesResponse.data.properties;
        } else if (
          Array.isArray(propertiesResponse.data?.results)
        ) {
          propertyData = propertiesResponse.data.results;
        }

        /* ---------------- IMAGES ---------------- */

        let imageData = [];

        if (Array.isArray(imagesResponse.data)) {
          imageData = imagesResponse.data;
        } else if (
          Array.isArray(imagesResponse.data?.data)
        ) {
          imageData = imagesResponse.data.data;
        } else if (
          Array.isArray(imagesResponse.data?.images)
        ) {
          imageData = imagesResponse.data.images;
        } else if (
          Array.isArray(imagesResponse.data?.results)
        ) {
          imageData = imagesResponse.data.results;
        }

        setProperties(propertyData);
        setPropertyImages(imageData);
      } catch (err) {
        console.error(
          "Travel Inspiration API Error:",
          err?.response?.data || err?.message || err
        );

        setError(
          err?.response?.data?.detail ||
            err?.response?.data?.message ||
            "Unable to load travel inspiration."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTravelInspiration();
  }, []);

  /* -------------------------------------------------------
     GET IMAGE FOR PROPERTY
  ------------------------------------------------------- */

  const getPropertyImage = (property) => {
    const propertyId =
      property?.id ||
      property?.property_id;

    const image = propertyImages.find(
      (item) =>
        Number(item?.property_id) === Number(propertyId)
    );

    return (
      image?.image_url ||
      image?.url ||
      image?.image ||
      image?.image_path ||
      null
    );
  };

  /* -------------------------------------------------------
     NORMALIZE PROPERTY DATA
  ------------------------------------------------------- */

  const normalizedProperties = useMemo(() => {
    return properties.map((property) => {
      const location =
        property?.location ||
        property?.city ||
        property?.destination ||
        property?.address ||
        "Beautiful destination";

      const title =
        property?.title ||
        property?.name ||
        property?.property_name ||
        "Beautiful Stay";

      const rating = Number(
        property?.rating ||
          property?.average_rating ||
          property?.review_rating ||
          0
      );

      const price =
        property?.price ||
        property?.nightly_price ||
        property?.base_price ||
        property?.amount ||
        null;

      return {
        ...property,
        displayTitle: title,
        displayLocation: location,
        displayRating: rating,
        displayPrice: price,
        displayImage: getPropertyImage(property),
      };
    });
  }, [properties, propertyImages]);

  /* -------------------------------------------------------
     DESTINATION CATEGORIES
  ------------------------------------------------------- */

  const categories = useMemo(() => {
    const locations = normalizedProperties
      .map((property) => property.displayLocation)
      .filter(Boolean);

    return [
      "All",
      ...Array.from(new Set(locations)).slice(0, 5),
    ];
  }, [normalizedProperties]);

  /* -------------------------------------------------------
     FILTER
  ------------------------------------------------------- */

  const filteredProperties = useMemo(() => {
    if (activeCategory === "All") {
      return normalizedProperties.slice(0, 6);
    }

    return normalizedProperties
      .filter(
        (property) =>
          property.displayLocation === activeCategory
      )
      .slice(0, 6);
  }, [normalizedProperties, activeCategory]);

  /* -------------------------------------------------------
     PROPERTY CLICK
  ------------------------------------------------------- */

  const handlePropertyClick = (propertyId) => {
    if (!propertyId) return;

    navigate(`/property-details/${propertyId}`);
  };

  return (
    <section className="relative overflow-hidden  py-8 sm:py-10">

      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-[#142144]/5 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#e61e4d]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ------------------------------------------------
            HEADER
        ------------------------------------------------ */}

        <CustomerReveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            <div className="max-w-2xl">

              <div className="mb-3 flex items-center gap-2">
                <span className="h-[2px] w-8 bg-[#e61e4d]" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#e61e4d]">
                  Travel Inspiration
                </span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-[#142144] sm:text-4xl lg:text-5xl">
                Find your next
                <span className="ml-2 text-[#e61e4d]">
                  unforgettable stay
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
                Discover beautiful stays, inspiring destinations,
                and unique places made for your next journey.
              </p>

            </div>

            <button
              type="button"
              onClick={() => navigate("/properties")}
              className="
                group
                flex
                w-fit
                items-center
                gap-2
                rounded-full
                border
                border-gray-200
                bg-white
                px-5
                py-3
                text-sm
                font-semibold
                text-[#142144]
                shadow-sm
                transition-all
                duration-300
                hover:border-[#142144]
                hover:bg-[#142144]
                hover:text-white
                hover:shadow-md
              "
            >
              Explore all stays

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

          </div>
        </CustomerReveal>

        {/* ------------------------------------------------
            CATEGORY FILTER
        ------------------------------------------------ */}

        {!loading && categories.length > 1 && (
          <CustomerReveal delay={0.08}>
            <div className="mt-10 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">

              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`
                    whitespace-nowrap
                    rounded-full
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    transition-all
                    duration-300
                    ${
                      activeCategory === category
                        ? "bg-[#142144] text-white shadow-md"
                        : "border border-gray-200 bg-white text-gray-600 hover:border-[#142144] hover:text-[#142144]"
                    }
                  `}
                >
                  {category}
                </button>
              ))}

            </div>
          </CustomerReveal>
        )}

        {/* ------------------------------------------------
            LOADING
        ------------------------------------------------ */}

        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader2
              size={34}
              className="animate-spin text-[#142144]"
            />
          </div>
        )}

        {/* ------------------------------------------------
            ERROR
        ------------------------------------------------ */}

        {!loading && error && (
          <div className="mx-auto mt-12 max-w-lg rounded-2xl border border-red-100 bg-red-50 px-6 py-5 text-center">
            <p className="text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {/* ------------------------------------------------
            NO PROPERTIES
        ------------------------------------------------ */}

        {!loading &&
          !error &&
          filteredProperties.length === 0 && (
            <div className="mt-12 rounded-3xl bg-gray-50 px-6 py-12 text-center">
              <MapPin
                size={32}
                className="mx-auto text-gray-400"
              />

              <p className="mt-4 text-sm text-gray-500">
                No travel experiences available yet.
              </p>
            </div>
          )}

        {/* ------------------------------------------------
            PROPERTY CARDS
        ------------------------------------------------ */}

        {!loading &&
          !error &&
          filteredProperties.length > 0 && (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {filteredProperties.map((property, index) => {
                const propertyId =
                  property?.id ||
                  property?.property_id;

                return (
                  <CustomerReveal
                    key={propertyId || index}
                    delay={index * 0.07}
                  >
                    <article
                      onClick={() =>
                        handlePropertyClick(propertyId)
                      }
                      className="
                        group
                        cursor-pointer
                        overflow-hidden
                        rounded-3xl
                        border
                        border-gray-100
                        bg-white
                        shadow-[0_8px_30px_rgba(20,33,68,0.07)]
                        transition-all
                        duration-500
                        hover:-translate-y-1
                        hover:shadow-[0_20px_45px_rgba(20,33,68,0.13)]
                      "
                    >

                      {/* IMAGE */}
                      <div className="relative h-[270px] overflow-hidden bg-gray-100">

                        {property.displayImage ? (
                          <img
                            src={property.displayImage}
                            alt={property.displayTitle}
                            className="
                              h-full
                              w-full
                              object-cover
                              transition-transform
                              duration-700
                              group-hover:scale-105
                            "
                            onError={(event) => {
                              event.currentTarget.style.display =
                                "none";
                            }}
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#142144] to-[#263d70]">
                            <MapPin
                              size={38}
                              className="text-white/60"
                            />
                          </div>
                        )}

                        {/* IMAGE OVERLAY */}
                        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent" />

                        {/* WISHLIST ICON */}
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
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
                            bg-white/90
                            text-[#142144]
                            shadow-lg
                            backdrop-blur-sm
                            transition-all
                            duration-300
                            hover:scale-105
                            hover:bg-white
                          "
                          aria-label="Add to wishlist"
                        >
                          <Heart
                            size={18}
                            strokeWidth={1.8}
                          />
                        </button>

                        {/* LOCATION */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
                          <MapPin size={15} />

                          <span className="text-xs font-medium">
                            {property.displayLocation}
                          </span>
                        </div>

                      </div>

                      {/* CONTENT */}
                      <div className="p-5">

                        <div className="flex items-start justify-between gap-4">

                          <h3 className="line-clamp-2 text-base font-semibold leading-6 text-[#142144] transition-colors group-hover:text-[#e61e4d]">
                            {property.displayTitle}
                          </h3>

                          {property.displayRating > 0 && (
                            <div className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#142144]">
                              <Star
                                size={14}
                                fill="currentColor"
                              />

                              {property.displayRating.toFixed(
                                1
                              )}
                            </div>
                          )}

                        </div>

                        {/* PRICE */}
                        {property.displayPrice && (
                          <div className="mt-4 flex items-baseline gap-1">

                            <span className="text-lg font-bold text-[#142144]">
                              ₹
                              {Number(
                                property.displayPrice
                              ).toLocaleString("en-IN")}
                            </span>

                            <span className="text-xs text-gray-400">
                              night
                            </span>

                          </div>
                        )}

                        {/* VIEW DETAILS */}
                        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

                          <span className="text-xs font-medium text-gray-400">
                            Discover this stay
                          </span>

                          <span className="flex items-center gap-1 text-xs font-semibold text-[#e61e4d]">
                            View stay
                            <ArrowRight size={14} />
                          </span>

                        </div>

                      </div>

                    </article>
                  </CustomerReveal>
                );
              })}

            </div>
          )}

        {/* ------------------------------------------------
            BOTTOM CTA
        ------------------------------------------------ */}

        {!loading &&
          !error &&
          filteredProperties.length > 0 && (
            <CustomerReveal delay={0.2}>
              <div className="mt-12 text-center">

                <button
                  type="button"
                  onClick={() => navigate("/properties")}
                  className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-[#142144]
                    px-7
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-[#142144]/20
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#e61e4d]
                    hover:shadow-[#e61e4d]/20
                  "
                >
                  Explore more destinations

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

              </div>
            </CustomerReveal>
          )}

      </div>
    </section>
  );
}

export default CustomerTravelInspiration;