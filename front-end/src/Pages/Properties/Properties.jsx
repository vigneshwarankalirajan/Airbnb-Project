import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MapPin,
  Star,
  Heart,
  CalendarCheck,
  Check,
  Sparkles,
  Loader2,
  Search,
  RefreshCw,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";

import { getProperties } from "../../api/propertiesApi";
import { getPropertyImages } from "../../api/propertyImagesApi";
import CustomerNavbar from "../../components/customer/CustomerNavbar";

const API_URL = "http://127.0.0.1:8000";

const fallbackPropertyImages = [
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
];

function Properties() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All stays");
  const [sortOrder, setSortOrder] = useState("recommended");
  const [availabilityByProperty, setAvailabilityByProperty] = useState({});
  const [imagesByProperty, setImagesByProperty] = useState({});

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

      try {
        const imageResponse = await getPropertyImages();
        const imageList = Array.isArray(imageResponse)
          ? imageResponse
          : imageResponse?.data || imageResponse?.items || [];
        const imageMap = {};

        imageList
          .sort((a, b) => Number(a?.display_order || 0) - Number(b?.display_order || 0))
          .forEach((image) => {
            const propertyId = image?.property_id;
            if (propertyId && image?.image_url && !imageMap[propertyId]) {
              imageMap[propertyId] = image.image_url;
            }
          });

        setImagesByProperty(imageMap);
      } catch (imageError) {
        console.error("Property images API Error:", imageError);
      }

      const availabilityEntries = await Promise.all(
        propertyList.map(async (property) => {
          const propertyId = property?.id || property?._id || property?.property_id;

          if (!propertyId) {
            return [];
          }

          try {
            const availabilityResponse = await fetch(
              `${API_URL}/property-availability/property/${propertyId}`
            );
            const records = availabilityResponse.ok
              ? await availabilityResponse.json()
              : [];

            return [
              propertyId,
              Array.isArray(records) && records.some(
                (record) => record?.is_available !== false
              ),
            ];
          } catch {
            return [propertyId, false];
          }
        })
      );

      setAvailabilityByProperty(
        Object.fromEntries(availabilityEntries.filter((entry) => entry.length))
      );

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
    const propertyId = getPropertyId(property);
    const image =
      imagesByProperty[propertyId] ||
      property?.image ||
      property?.image_url ||
      property?.cover_image ||
      property?.thumbnail ||
      property?.photo ||
      property?.images?.[0];

    return (
      image ||
      fallbackPropertyImages[
        Math.abs(Number(propertyId) || 0) % fallbackPropertyImages.length
      ]
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

  const getAmenities = (property) => {
    const amenities = property?.amenities || property?.features || [];

    if (Array.isArray(amenities)) {
      return amenities
        .map((amenity) => typeof amenity === "string" ? amenity : amenity?.name)
        .filter(Boolean)
        .slice(0, 3);
    }

    return [];
  };

  const propertyTypes = [
    "All stays",
    ...new Set(properties.map((property) => getPropertyType(property))),
  ];

  const visibleProperties = properties
    .filter((property) => {
      const searchValue = `${getPropertyTitle(property)} ${getLocation(property)}`.toLowerCase();
      const matchesSearch = searchValue.includes(searchTerm.toLowerCase());
      const matchesType =
        selectedType === "All stays" || getPropertyType(property) === selectedType;

      return matchesSearch && matchesType;
    })
    .sort((firstProperty, secondProperty) => {
      if (sortOrder === "price-low") {
        return Number(getPrice(firstProperty)) - Number(getPrice(secondProperty));
      }

      if (sortOrder === "price-high") {
        return Number(getPrice(secondProperty)) - Number(getPrice(firstProperty));
      }

      return 0;
    });

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
    <div className="min-h-screen bg-[#fcfcfc]">

      <CustomerNavbar />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e61e4d]">
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

            <div className="flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">

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

        <div className="mb-9 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center">

          <div className="relative min-w-0 flex-1">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by city or property name"
              className="w-full rounded-xl bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#123d78]/20"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto px-1 pb-1 sm:pb-0">
            {propertyTypes.slice(0, 5).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
                  selectedType === type
                    ? "border-[#123d78] bg-[#123d78] text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <label className="relative flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-700">
            <SlidersHorizontal size={17} className="text-gray-500" />
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="appearance-none bg-transparent pr-5 outline-none"
              aria-label="Sort stays"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
            <ChevronDown size={15} className="pointer-events-none absolute right-2 text-gray-400" />
          </label>
        </div>

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

          visibleProperties.length === 0 ? (
            <div className="flex min-h-[280px] items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 text-center">
              <div>
                <Search size={28} className="mx-auto text-gray-400" />
                <h2 className="mt-4 text-lg font-bold text-gray-900">No stays match your search</h2>
                <p className="mt-1 text-sm text-gray-500">Try a different city or stay type.</p>
              </div>
            </div>
          ) : (
          <div className="grid grid-cols-1 gap-x-5 gap-y-11 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {visibleProperties.map((property) => {

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

              const amenities =
                getAmenities(property);

              const isAvailable =
                availabilityByProperty[propertyId];

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

                  <div className="relative aspect-[1.12/1] overflow-hidden rounded-[22px] bg-gray-100 shadow-sm ring-1 ring-black/5">

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

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

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
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur transition hover:scale-105 hover:bg-white"
                    >
                      <Heart
                        size={18}
                        className="text-gray-700"
                      />
                    </button>

                    {/* PROPERTY TYPE */}

                    {propertyType && (
                      <div className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-800 shadow-sm">
                        {propertyType}
                      </div>
                    )}

                  </div>

                  {/* DETAILS */}

                  <div className="pt-4">

                    {/* TITLE + RATING */}

                    <div className="flex items-start justify-between gap-3">

                      <h2 className="line-clamp-1 text-[17px] font-bold tracking-tight text-gray-900">
                        {title}
                      </h2>

                      {rating > 0 ? (
                        <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#fff7e8] px-2 py-1 text-xs">

                          <Star
                            size={14}
                            fill="currentColor"
                            className="text-[#c77b18]"
                          />

                          <span className="font-medium text-gray-900">
                            {Number(rating).toFixed(1)}
                          </span>

                        </div>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-500">
                          New
                        </span>
                      )}

                    </div>

                    {/* LOCATION */}

                    <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">

                      <MapPin size={14} />

                      <span className="line-clamp-1">
                        {location}
                      </span>

                    </div>

                    <div className="mt-4 flex min-h-6 flex-wrap items-center gap-2">
                      {amenities.length > 0 ? amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="flex items-center gap-1 rounded-full bg-[#f3f6f4] px-2.5 py-1 text-[11px] font-medium text-gray-600"
                        >
                          <Check size={12} className="text-[#2f7d65]" />
                          {amenity}
                        </span>
                      )) : (
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Sparkles size={13} />
                          Comfortable essentials
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold">
                      <CalendarCheck
                        size={15}
                        className={isAvailable ? "text-[#2f7d65]" : "text-gray-400"}
                      />
                      <span className={isAvailable ? "text-[#2f7d65]" : "text-gray-500"}>
                        {isAvailable === undefined
                          ? "Checking availability"
                          : isAvailable
                            ? "Available to reserve"
                            : "Dates unavailable"}
                      </span>
                    </div>

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
          )

        )}

      </main>

    </div>
  );
}

export default Properties;