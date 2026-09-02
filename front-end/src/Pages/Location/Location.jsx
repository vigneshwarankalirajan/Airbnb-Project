import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Search,
  SlidersHorizontal,
  Heart,
  Star,
  CheckCircle2,
  XCircle,
  Loader2,
  Home,
  Navigation,
  ChevronDown,
  RefreshCw,
} from "lucide-react";

import apiClient from "../../api/apiClient";

/* =========================================================
   API HELPERS
========================================================= */

const getProperties = async () => {
  const response = await apiClient.get("/properties/");
  return response.data;
};

const getPricingByProperty = async (propertyId) => {
  const response = await apiClient.get("/pricing/", {
    params: { property_id: propertyId },
  });
  return response.data;
};

const getPropertyAvailability = async (propertyId) => {
  const response = await apiClient.get("/availability/", {
    params: { property_id: propertyId },
  });
  return response.data;
};

const getPropertyImages = async () => {
  const response = await apiClient.get("/property-images/");
  return response.data;
};

const fallbackPropertyImages = [
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85",
];

/* =========================================================
   GENERIC HELPERS
========================================================= */

const getValue = (object, keys, fallback = "") => {
  if (!object) return fallback;

  for (const key of keys) {
    if (
      object[key] !== undefined &&
      object[key] !== null &&
      object[key] !== ""
    ) {
      return object[key];
    }
  }

  return fallback;
};

const getPropertyId = (property) =>
  getValue(property, ["id", "property_id", "propertyId"], null);

const getPropertyTitle = (property) =>
  getValue(
    property,
    ["title", "name", "property_name", "property_title"],
    "Beautiful Stay"
  );

const getPropertyDescription = (property) =>
  getValue(
    property,
    ["description", "property_description", "details"],
    "Comfortable stay with everything you need."
  );

const getPropertyCity = (property) =>
  getValue(
    property,
    ["city", "location", "place", "area", "address"],
    "Chennai"
  );

const getPropertyRating = (property) =>
  Number(
    getValue(
      property,
      ["rating", "average_rating", "review_rating"],
      4.8
    )
  );

const getPropertyReviews = (property) =>
  Number(
    getValue(
      property,
      ["reviews", "review_count", "reviews_count", "total_reviews"],
      0
    )
  );

/* =========================================================
   IMAGE HELPERS
========================================================= */

const normalizeImageUrl = (url) => {
  if (!url || typeof url !== "string") return "";

  const value = url.trim();

  if (!value || value.toLowerCase() === "string") {
    return "";
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (value.startsWith("//")) {
    return `http:${value}`;
  }

  if (value.startsWith("/")) {
    const baseUrl = String(apiClient.defaults.baseURL || "").replace(
      /\/$/,
      ""
    );
    return `${baseUrl}${value}`;
  }

  return value;
};

const getPropertyImage = (property, imageData) => {
  /* First priority: separate /property-images/{id} API */
  const imageList = Array.isArray(imageData)
    ? imageData
    : Array.isArray(imageData?.data)
      ? imageData.data
      : Array.isArray(imageData?.items)
        ? imageData.items
        : Array.isArray(imageData?.images)
          ? imageData.images
          : imageData
            ? [imageData]
            : [];

  const sortedImages = [...imageList].sort(
    (a, b) =>
      Number(a?.display_order ?? 0) -
      Number(b?.display_order ?? 0)
  );

  const apiImage = sortedImages
    .map((item) =>
      normalizeImageUrl(
        typeof item === "string"
          ? item
          : item?.image_url ||
            item?.url ||
            item?.imageUrl ||
            item?.photo
      )
    )
    .find(Boolean);

  if (apiImage) return apiImage;

  /* Fallback: image fields inside /properties/ */
  const propertyImage = normalizeImageUrl(
    getValue(
      property,
      [
        "image",
        "image_url",
        "imageUrl",
        "property_image",
        "property_image_url",
        "cover_image",
        "thumbnail",
        "photo",
      ],
      ""
    )
  );

  if (propertyImage) return propertyImage;

  if (Array.isArray(property?.images)) {
    const nestedImage = property.images
      .map((item) =>
        normalizeImageUrl(
          typeof item === "string"
            ? item
            : item?.image_url ||
              item?.url ||
              item?.imageUrl
        )
      )
      .find(Boolean);

    if (nestedImage) return nestedImage;
  }

  const fallbackIndex = Number(getPropertyId(property) || 0) % fallbackPropertyImages.length;
  return fallbackPropertyImages[fallbackIndex];
};

/* =========================================================
   PRICE HELPERS
========================================================= */

const getPriceObject = (pricing) => {
  if (!pricing) return null;

  if (Array.isArray(pricing)) {
    return pricing[0] || null;
  }

  if (Array.isArray(pricing?.data)) {
    return pricing.data[0] || null;
  }

  if (Array.isArray(pricing?.items)) {
    return pricing.items[0] || null;
  }

  if (Array.isArray(pricing?.results)) {
    return pricing.results[0] || null;
  }

  return pricing;
};

const getPriceValue = (pricing) => {
  const priceObject = getPriceObject(pricing);

  if (!priceObject) return 0;

  return Number(
    getValue(
      priceObject,
      [
        "price",
        "amount",
        "nightly_price",
        "price_per_night",
        "base_price",
        "daily_price",
        "total_price",
      ],
      0
    )
  );
};

const getCurrency = (pricing) => {
  const priceObject = getPriceObject(pricing);

  return getValue(
    priceObject,
    ["currency", "currency_code"],
    "INR"
  );
};

/* =========================================================
   AVAILABILITY HELPERS

   Backend response:
   {
     "property_id": 6,
     "available_date": "2026-09-02",
     "status": "available"
   }

   Therefore status === "available" is treated as available.
========================================================= */

const getAvailabilityRecords = (availability) => {
  if (!availability) return [];

  if (Array.isArray(availability)) {
    return availability;
  }

  if (Array.isArray(availability?.data)) {
    return availability.data;
  }

  if (Array.isArray(availability?.items)) {
    return availability.items;
  }

  if (Array.isArray(availability?.results)) {
    return availability.results;
  }

  return [availability];
};

const getAvailabilityValue = (availability) => {
  const records = getAvailabilityRecords(availability);

  if (!records.length) return false;

  return records.some((item) => {
    if (typeof item === "boolean") {
      return item;
    }

    const directValue =
      item?.available ??
      item?.is_available ??
      item?.isAvailable;

    if (typeof directValue === "boolean") {
      return directValue;
    }

    if (typeof directValue === "string") {
      return ["true", "available", "yes", "1"].includes(
        directValue.toLowerCase()
      );
    }

    return (
      String(item?.status || "").toLowerCase() === "available"
    );
  });
};

/* =========================================================
   MAP POSITIONS
========================================================= */

const mapPositions = [
  { top: "18%", left: "18%" },
  { top: "30%", left: "42%" },
  { top: "20%", left: "68%" },
  { top: "43%", left: "27%" },
  { top: "52%", left: "53%" },
  { top: "40%", left: "78%" },
  { top: "69%", left: "20%" },
  { top: "75%", left: "62%" },
  { top: "65%", left: "83%" },
  { top: "33%", left: "60%" },
];

/* =========================================================
   COMPONENT
========================================================= */

const Location = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [propertyDetails, setPropertyDetails] = useState({});

  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [sortBy, setSortBy] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadProperties();
  }, []);

  /* =======================================================
     LOAD PROPERTIES
  ======================================================= */

  const loadProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProperties();

      let propertyList = [];

      if (Array.isArray(response)) {
        propertyList = response;
      } else if (Array.isArray(response?.data)) {
        propertyList = response.data;
      } else if (Array.isArray(response?.properties)) {
        propertyList = response.properties;
      } else if (Array.isArray(response?.results)) {
        propertyList = response.results;
      } else if (Array.isArray(response?.data?.properties)) {
        propertyList = response.data.properties;
      } else if (Array.isArray(response?.data?.items)) {
        propertyList = response.data.items;
      } else if (Array.isArray(response?.items)) {
        propertyList = response.items;
      }

      setProperties(propertyList);

      if (propertyList.length > 0) {
        setSelectedProperty(propertyList[0]);
        await loadPropertyDetails(propertyList);
      } else {
        setPropertyDetails({});
      }
    } catch (err) {
      console.error(
        "Unable to load properties:",
        err?.response?.data || err?.message || err
      );

      setError(
        err?.response?.data?.detail ||
          err?.response?.data?.message ||
          "Unable to load properties."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     LOAD PRICING + AVAILABILITY + IMAGE
  ======================================================= */

  const loadPropertyDetails = async (propertyList) => {
    if (!propertyList?.length) return;

    setDetailsLoading(true);

    const details = {};
    let allImages = [];

    try {
      allImages = await getPropertyImages();
    } catch (error) {
      console.error("Unable to load property images:", error);
    }

    await Promise.all(
      propertyList.map(async (property) => {
        const propertyId = getPropertyId(property);

        if (!propertyId) return;

        const [
          pricingResult,
          availabilityResult,
        ] = await Promise.allSettled([
          getPricingByProperty(propertyId),
          getPropertyAvailability(propertyId),
        ]);

        const propertyImages = Array.isArray(allImages)
          ? allImages.filter(
              (image) => Number(image?.property_id) === Number(propertyId)
            )
          : [];

        details[propertyId] = {
          pricing:
            pricingResult.status === "fulfilled"
              ? pricingResult.value
              : null,

          availability:
            availabilityResult.status === "fulfilled"
              ? availabilityResult.value
              : null,

          images: propertyImages,
        };

        console.log(
          `Property ${propertyId} details:`,
          details[propertyId]
        );
      })
    );

    setPropertyDetails(details);
    setDetailsLoading(false);
  };

  /* =======================================================
     FILTER + SORT
  ======================================================= */

  const filteredProperties = useMemo(() => {
    let list = [...properties];

    if (search.trim()) {
      const query = search.trim().toLowerCase();

      list = list.filter((property) => {
        const title = getPropertyTitle(property).toLowerCase();
        const city = getPropertyCity(property).toLowerCase();
        const description =
          getPropertyDescription(property).toLowerCase();

        return (
          title.includes(query) ||
          city.includes(query) ||
          description.includes(query)
        );
      });
    }

    if (sortBy === "price-low") {
      list.sort((a, b) => {
        const aPrice = getPriceValue(
          propertyDetails[getPropertyId(a)]?.pricing
        );
        const bPrice = getPriceValue(
          propertyDetails[getPropertyId(b)]?.pricing
        );

        return aPrice - bPrice;
      });
    }

    if (sortBy === "price-high") {
      list.sort((a, b) => {
        const aPrice = getPriceValue(
          propertyDetails[getPropertyId(a)]?.pricing
        );
        const bPrice = getPriceValue(
          propertyDetails[getPropertyId(b)]?.pricing
        );

        return bPrice - aPrice;
      });
    }

    if (sortBy === "rating") {
      list.sort(
        (a, b) =>
          getPropertyRating(b) - getPropertyRating(a)
      );
    }

    return list;
  }, [properties, propertyDetails, search, sortBy]);

  /* =======================================================
     SELECT PROPERTY
  ======================================================= */

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);

    const propertyId = getPropertyId(property);

    const element = document.getElementById(
      `property-${propertyId}`
    );

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  /* =======================================================
     BOOKING
  ======================================================= */

  const handleBooking = (property) => {
    const propertyId = getPropertyId(property);

    if (!propertyId) return;

    const details = propertyDetails[propertyId];

    navigate(`/booking/${propertyId}`, {
      state: {
        property,
        pricing: details?.pricing || null,
        availability: details?.availability || null,
      },
    });
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2
              size={40}
              className="animate-spin text-[#123d78]"
            />
            <p className="mt-4 text-sm font-medium text-gray-500">
              Loading available stays...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-5 py-12">
        <div className="mx-auto max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <XCircle size={32} className="text-red-500" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            Unable to load properties
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {error}
          </p>

          <button
            type="button"
            onClick={loadProperties}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#123d78] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0e315f]"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN
  ======================================================= */

  return (
    <div className="min-h-screen bg-white">
      {/* PAGE HEADER */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <MapPin
                  size={23}
                  strokeWidth={2}
                  className="text-[#123d78]"
                />
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  Explore stays on map
                </h1>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                Find available stays, view prices and book your
                preferred property.
              </p>
            </div>

            {/* SEARCH */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search location or stay..."
                className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#123d78] focus:bg-white focus:ring-4 focus:ring-[#123d78]/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FILTER / SORT */}
      <section className="mx-auto w-full max-w-7xl px-5 py-5 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-gray-900">
              {filteredProperties.length}{" "}
              {filteredProperties.length === 1 ? "stay" : "stays"}
            </p>

            <p className="mt-0.5 text-xs text-gray-500">
              Available properties
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:shadow-sm"
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="h-11 appearance-none rounded-xl border border-gray-200 bg-white pl-4 pr-10 text-sm font-medium text-gray-700 outline-none focus:border-[#123d78]"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
              >
                All stays
              </button>

              <button
                type="button"
                className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
              >
                Available now
              </button>

              <button
                type="button"
                className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
              >
                Highly rated
              </button>
            </div>
          </div>
        )}
      </section>

      {/* MAP + PROPERTY LIST */}
      <section className="mx-auto w-full max-w-7xl px-5 pb-12 lg:px-8">
        <div className="grid min-h-[650px] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:grid-cols-[1fr_1fr]">
          {/* MAP */}
          <div className="relative min-h-[450px] overflow-hidden bg-[#edf2f5] lg:min-h-[650px]">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:55px_55px]" />

              <div className="absolute -left-[20%] top-[38%] h-2 w-[140%] rotate-[-9deg] rounded-full bg-white/90" />
              <div className="absolute -left-[20%] top-[65%] h-2 w-[140%] rotate-[8deg] rounded-full bg-white/90" />
              <div className="absolute left-[27%] -top-[20%] h-[140%] w-2 rotate-[28deg] rounded-full bg-white/90" />
              <div className="absolute left-[63%] -top-[20%] h-[140%] w-2 rotate-[-35deg] rounded-full bg-white/90" />

              <div className="absolute -right-[15%] top-[8%] h-[42%] w-[42%] rounded-full bg-[#dcecf3]" />
              <div className="absolute -left-[10%] bottom-[2%] h-[28%] w-[38%] rounded-full bg-[#e1eef1]" />

              <div className="absolute left-[15%] top-[18%] h-40 w-40 rounded-full bg-white/50 blur-3xl" />
              <div className="absolute right-[25%] bottom-[18%] h-48 w-48 rounded-full bg-white/50 blur-3xl" />
            </div>

            <div className="absolute left-5 top-5 z-30 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-[#123d78]" />

                <div>
                  <p className="text-xs font-bold text-gray-900">
                    Property Map
                  </p>

                  <p className="text-[11px] text-gray-500">
                    {filteredProperties.length} stays
                  </p>
                </div>
              </div>
            </div>

            {/* MAP MARKERS */}
            {filteredProperties.slice(0, 30).map((property, index) => {
              const propertyId = getPropertyId(property);
              const pricing =
                propertyDetails[propertyId]?.pricing;
              const price = getPriceValue(pricing);

              const isSelected =
                getPropertyId(selectedProperty) === propertyId;

              const position =
                mapPositions[index % mapPositions.length];

              return (
                <button
                  key={propertyId || `marker-${index}`}
                  type="button"
                  onClick={() => handlePropertySelect(property)}
                  style={{
                    top: position.top,
                    left: position.left,
                  }}
                  className={`absolute z-20 -translate-x-1/2 transition-all duration-200 ${
                    isSelected ? "scale-110" : "hover:scale-105"
                  }`}
                >
                  <div
                    className={`rounded-full px-3 py-2 text-xs font-bold shadow-lg ${
                      isSelected
                        ? "bg-[#123d78] text-white"
                        : "border border-gray-200 bg-white text-gray-900"
                    }`}
                  >
                    {price > 0
                      ? `₹${price.toLocaleString("en-IN")}`
                      : "View"}
                  </div>

                  <div
                    className={`mx-auto h-2.5 w-2.5 rotate-45 ${
                      isSelected
                        ? "bg-[#123d78]"
                        : "border-b border-r border-gray-200 bg-white"
                    }`}
                  />
                </button>
              );
            })}

            <button
              type="button"
              title="Current location"
              className="absolute bottom-5 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-lg transition hover:scale-105 hover:shadow-xl"
            >
              <Navigation size={18} className="text-[#123d78]" />
            </button>
          </div>

          {/* PROPERTY LIST */}
          <div className="flex min-h-[650px] flex-col bg-white">
            <div className="border-b border-gray-100 px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Available stays
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Select a property to view it on the map.
                  </p>
                </div>

                {detailsLoading && (
                  <Loader2
                    size={18}
                    className="animate-spin text-[#123d78]"
                  />
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredProperties.length === 0 ? (
                <div className="flex min-h-[450px] flex-col items-center justify-center px-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <Home size={28} className="text-gray-400" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-gray-900">
                    No stays found
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                    Try searching for another location or property.
                  </p>
                </div>
              ) : (
                filteredProperties.map((property, index) => {
                  const propertyId = getPropertyId(property);
                  const details = propertyDetails[propertyId];

                  const pricing = details?.pricing;
                  const availability = details?.availability;
                  const imageData = details?.images;

                  const price = getPriceValue(pricing);
                  const currency = getCurrency(pricing);
                  const available =
                    getAvailabilityValue(availability);

                  const image = getPropertyImage(
                    property,
                    imageData
                  );

                  const rating = getPropertyRating(property);
                  const reviews = getPropertyReviews(property);

                  const isSelected =
                    getPropertyId(selectedProperty) === propertyId;

                  return (
                    <article
                      key={propertyId || `property-${index}`}
                      id={`property-${propertyId}`}
                      onClick={() => handlePropertySelect(property)}
                      className={`cursor-pointer border-b border-gray-100 p-4 transition ${
                        isSelected
                          ? "bg-gray-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex gap-4">
                        {/* IMAGE */}
                        <div className="relative h-32 w-36 flex-shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                          {image ? (
                            <img
                              src={image}
                              alt={getPropertyTitle(property)}
                              className="h-full w-full object-cover transition duration-500 hover:scale-105"
                              onError={(event) => {
                                event.currentTarget.style.display =
                                  "none";
                                const fallback =
                                  event.currentTarget.parentElement?.querySelector(
                                    ".image-fallback"
                                  );
                                if (fallback) {
                                  fallback.classList.remove(
                                    "hidden"
                                  );
                                }
                              }}
                            />
                          ) : null}

                          <div
                            className={`image-fallback ${
                              image ? "hidden" : ""
                            } flex h-full w-full items-center justify-center`}
                          >
                            <Home
                              size={30}
                              className="text-gray-300"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={(event) =>
                              event.stopPropagation()
                            }
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:scale-105"
                          >
                            <Heart
                              size={16}
                              className="text-gray-700"
                            />
                          </button>
                        </div>

                        {/* CONTENT */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="truncate text-base font-bold text-gray-900">
                                {getPropertyTitle(property)}
                              </h3>

                              <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                <MapPin size={13} />

                                <span className="truncate">
                                  {getPropertyCity(property)}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-shrink-0 items-center gap-1">
                              <Star
                                size={14}
                                className="fill-current text-gray-900"
                              />

                              <span className="text-sm font-semibold text-gray-900">
                                {rating.toFixed(1)}
                              </span>
                            </div>
                          </div>

                          <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
                            {getPropertyDescription(property)}
                          </p>

                          <div className="mt-3 flex items-end justify-between gap-3">
                            <div>
                              {price > 0 ? (
                                <div className="flex items-baseline gap-1">
                                  <span className="text-lg font-bold text-gray-900">
                                    {currency === "INR"
                                      ? "₹"
                                      : currency}
                                    {price.toLocaleString("en-IN")}
                                  </span>

                                  <span className="text-xs text-gray-500">
                                    / night
                                  </span>
                                </div>
                              ) : (
                                <span className="text-xs font-medium text-gray-400">
                                  Price unavailable
                                </span>
                              )}
                            </div>

                            {available ? (
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
                                <CheckCircle2 size={15} />
                                <span>Available</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-red-500">
                                <XCircle size={15} />
                                <span>Unavailable</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* BOTTOM */}
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                          <MapPin size={13} />

                          <span>
                            {reviews > 0
                              ? `${reviews} reviews`
                              : "Property location"}
                          </span>
                        </div>

                        <button
                          type="button"
                          disabled={!available}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleBooking(property);
                          }}
                          className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                            available
                              ? "bg-[#123d78] text-white hover:bg-[#0e315f] hover:shadow-md"
                              : "cursor-not-allowed bg-gray-100 text-gray-400"
                          }`}
                        >
                          {available ? "Book Now" : "Unavailable"}
                        </button>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Location;
