import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  Car,
  CheckCircle2,
  ChevronDown,
  Heart,
  Home,
  Hotel,
  Loader2,
  MapPin,
  Star,
  Users,
  Utensils,
  Wifi,
  Wind,
  XCircle,
  TentTree,
  Palmtree,
  Waves,
  Trees,
  Tractor,
  Crown,
  Droplets,
  Landmark,
  TreesIcon,
} from "lucide-react";

import { getCategories } from "../../api/categoriesApi";
import { getProperties } from "../../api/propertiesApi";

/* =====================================================
   API
===================================================== */

const API_URL = "http://127.0.0.1:8000";

/* =====================================================
   CATEGORY IMAGES
===================================================== */

const categoryImages = {
  all:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1500&q=85",

  houses:
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1500&q=85",

  apartments:
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=85",

  villas:
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1500&q=85",

  hotels:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1500&q=85",

  cabins:
    "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1500&q=85",

  beachfront:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1500&q=85",

  "amazing-pools":
    "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1500&q=85",

  countryside:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1500&q=85",

  farms:
    "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1500&q=85",

  luxury:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=85",

  lakefront:
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1500&q=85",

  city:
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1500&q=85",

  nature:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1500&q=85",

  rooms:
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1500&q=85",
};

/* =====================================================
   CATEGORY TITLES
===================================================== */

const categoryTitles = {
  all: "All Stays",
  houses: "Houses",
  apartments: "Apartments",
  villas: "Villas",
  hotels: "Hotels",
  cabins: "Cabins",
  beachfront: "Beachfront",
  "amazing-pools": "Amazing Pools",
  countryside: "Countryside",
  farms: "Farms",
  luxury: "Luxury",
  lakefront: "Lakefront",
  city: "City",
  nature: "Nature",
  rooms: "Rooms",
};

/* =====================================================
   CATEGORY DESCRIPTIONS
===================================================== */

const categoryDescriptions = {
  all:
    "Explore all available stays and find the perfect place for your trip.",

  houses:
    "Find comfortable houses with privacy, space and everything you need for a relaxing stay.",

  apartments:
    "Discover modern apartments in convenient locations for short or long stays.",

  villas:
    "Enjoy spacious and private villas with premium facilities for memorable getaways.",

  hotels:
    "Stay in comfortable hotels with excellent facilities and convenient locations.",

  cabins:
    "Escape to peaceful cabins surrounded by beautiful landscapes and nature.",

  beachfront:
    "Wake up close to the sea with beautiful beachfront stays and relaxing views.",

  "amazing-pools":
    "Discover stunning stays with beautiful pools perfect for relaxing holidays.",

  countryside:
    "Enjoy peaceful countryside stays surrounded by greenery and beautiful landscapes.",

  farms:
    "Experience relaxing farm stays with nature, fresh air and peaceful surroundings.",

  luxury:
    "Discover premium luxury stays designed for comfort, privacy and unforgettable experiences.",

  lakefront:
    "Relax beside beautiful lakes with peaceful views and refreshing surroundings.",

  city:
    "Stay close to city attractions, restaurants, shopping and entertainment.",

  nature:
    "Reconnect with nature in peaceful stays surrounded by greenery and scenic views.",

  rooms:
    "Find comfortable private rooms for affordable and convenient stays.",
};

/* =====================================================
   PROPERTY FALLBACK IMAGES
===================================================== */

const propertyImages = [
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",

  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=85",

  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85",

  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",

  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85",

  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85",
];

/* =====================================================
   NORMALIZE CATEGORY
===================================================== */

const normalizeCategory = (value) => {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-");
};

/* =====================================================
   CATEGORY ICON
===================================================== */

const getCategoryIcon = (slug) => {
  const value = normalizeCategory(slug);

  if (value === "houses") return Home;
  if (value === "apartments") return Building2;
  if (value === "villas") return Home;
  if (value === "hotels") return Hotel;
  if (value === "cabins") return TentTree;
  if (value === "beachfront") return Palmtree;
  if (value === "amazing-pools") return Waves;
  if (value === "countryside") return Trees;
  if (value === "farms") return Tractor;
  if (value === "luxury") return Crown;
  if (value === "lakefront") return Droplets;
  if (value === "city") return Landmark;
  if (value === "nature") return TreesIcon;

  return Building2;
};

/* =====================================================
   GET PROPERTY IMAGE
===================================================== */

const getPropertyImage = (
  property,
  index
) => {
  return (
    property?.image_url ||
    property?.image ||
    property?.thumbnail ||
    property?.cover_image ||
    property?.photo ||
    propertyImages[
      index % propertyImages.length
    ]
  );
};

/* =====================================================
   GET PROPERTY CATEGORY
===================================================== */

const getPropertyCategory = (
  property,
  categoryList
) => {
  if (
    property?.category_id !==
      undefined &&
    property?.category_id !== null
  ) {
    const matchedCategory =
      categoryList.find(
        (category) =>
          String(
            category?.id ??
              category?.category_id
          ) ===
          String(
            property.category_id
          )
      );

    if (matchedCategory) {
      return normalizeCategory(
        matchedCategory?.name ||
          matchedCategory?.title ||
          matchedCategory?.category_name
      );
    }
  }

  return normalizeCategory(
    property?.property_type ||
      property?.category ||
      property?.category_name ||
      property?.type
  );
};

/* =====================================================
   MAIN COMPONENT
===================================================== */

function CategoryProperties() {
  const navigate = useNavigate();

  const [searchParams] =
    useSearchParams();

  /* URL:
     ?category=villas
  */

  const categorySlug =
    normalizeCategory(
      searchParams.get("category") ||
        "all"
    );

  /* STATE */

  const [categories, setCategories] =
    useState([]);

  const [properties, setProperties] =
    useState([]);

  const [pricing, setPricing] =
    useState({});

  const [availability, setAvailability] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [sortBy, setSortBy] =
    useState("recommended");

  /* ===================================================
     LOAD DATA
  =================================================== */

  useEffect(() => {
    loadData();
  }, [categorySlug]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      /* ===============================
         CATEGORIES API
      =============================== */

      const categoryResponse =
        await getCategories();

      let categoryList = [];

      if (
        Array.isArray(categoryResponse)
      ) {
        categoryList =
          categoryResponse;
      } else if (
        Array.isArray(
          categoryResponse?.data
        )
      ) {
        categoryList =
          categoryResponse.data;
      } else if (
        Array.isArray(
          categoryResponse?.items
        )
      ) {
        categoryList =
          categoryResponse.items;
      }

      setCategories(categoryList);

      /* ===============================
         PROPERTIES API
      =============================== */

      const propertyResponse =
        await getProperties();

      let propertyList = [];

      if (
        Array.isArray(propertyResponse)
      ) {
        propertyList =
          propertyResponse;
      } else if (
        Array.isArray(
          propertyResponse?.data
        )
      ) {
        propertyList =
          propertyResponse.data;
      } else if (
        Array.isArray(
          propertyResponse?.items
        )
      ) {
        propertyList =
          propertyResponse.items;
      }

      /* ===============================
         PRICING API
      =============================== */

      try {
        const pricingResponse =
          await fetch(
            `${API_URL}/pricing/`
          );

        if (pricingResponse.ok) {
          const pricingData =
            await pricingResponse.json();

          const pricingList =
            Array.isArray(pricingData)
              ? pricingData
              : Array.isArray(
                    pricingData?.data
                  )
              ? pricingData.data
              : Array.isArray(
                  pricingData?.items
                )
              ? pricingData.items
              : pricingData
              ? [pricingData]
              : [];

          const pricingMap = {};

          pricingList.forEach(
            (item) => {
              if (
                item?.property_id !==
                undefined &&
                item?.property_id !== null
              ) {
                pricingMap[
                  String(item.property_id)
                ] = item;
              }
            }
          );

          setPricing(
            pricingMap
          );
        }
      } catch (pricingError) {
        console.error(
          "Pricing API Error:",
          pricingError
        );
      }

      /* ===============================
         AVAILABILITY API
      =============================== */

      try {
        const availabilityResponse =
          await fetch(
            `${API_URL}/availability/`
          );

        if (
          availabilityResponse.ok
        ) {
          const availabilityData =
            await availabilityResponse.json();

          let availabilityList = [];

          if (
            Array.isArray(
              availabilityData
            )
          ) {
            availabilityList =
              availabilityData;
          } else if (
            Array.isArray(
              availabilityData?.data
            )
          ) {
            availabilityList =
              availabilityData.data;
          } else if (
            Array.isArray(
              availabilityData?.items
            )
          ) {
            availabilityList =
              availabilityData.items;
          } else if (
            availabilityData
          ) {
            availabilityList = [
              availabilityData,
            ];
          }

          const availabilityMap =
            {};

          availabilityList.forEach(
            (item) => {
              if (
                item?.property_id !==
                  undefined &&
                item?.property_id !==
                  null
              ) {
                availabilityMap[
                  String(item.property_id)
                ] = item;
              }
            }
          );

          setAvailability(
            availabilityMap
          );
        }
      } catch (
        availabilityError
      ) {
        console.error(
          "Availability API Error:",
          availabilityError
        );
      }

      /* ===============================
         FILTER PROPERTIES
      =============================== */

      if (
        categorySlug === "all"
      ) {
        setProperties(
          propertyList
        );

        return;
      }

      const filtered =
        propertyList.filter(
          (property) => {
            const propertyCategory =
              getPropertyCategory(
                property,
                categoryList
              );

            return (
              propertyCategory ===
              categorySlug
            );
          }
        );

      setProperties(filtered);
    } catch (err) {
      console.error(
        "Category Properties Error:",
        err?.response?.data ||
          err?.message
      );

      setError(
        err?.response?.data
          ?.detail ||
          "Unable to load properties."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ===================================================
     CATEGORY NAME
  =================================================== */

  const categoryName =
    categoryTitles[
      categorySlug
    ] ||
    categorySlug
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");

  /* ===================================================
     HERO
  =================================================== */

  const heroImage =
    categoryImages[
      categorySlug
    ] || categoryImages.all;

  const description =
    categoryDescriptions[
      categorySlug
    ] ||
    `Discover beautiful ${categoryName.toLowerCase()} stays for your next trip.`;

  const CategoryIcon =
    getCategoryIcon(categorySlug);

  /* ===================================================
     SORT
  =================================================== */

  const sortedProperties =
    useMemo(() => {
      const list = [
        ...properties,
      ];

      if (
        sortBy === "price-low"
      ) {
        return list.sort(
          (a, b) => {
            const priceA = Number(
              pricing[
                String(a?.id)
              ]?.base_price ??
                a?.price_per_night ??
                a?.nightly_price ??
                a?.price ??
                0
            );

            const priceB = Number(
              pricing[
                String(b?.id)
              ]?.base_price ??
                b?.price_per_night ??
                b?.nightly_price ??
                b?.price ??
                0
            );

            return priceA - priceB;
          }
        );
      }

      if (
        sortBy === "price-high"
      ) {
        return list.sort(
          (a, b) => {
            const priceA = Number(
              pricing[
                String(a?.id)
              ]?.base_price ??
                a?.price_per_night ??
                a?.nightly_price ??
                a?.price ??
                0
            );

            const priceB = Number(
              pricing[
                String(b?.id)
              ]?.base_price ??
                b?.price_per_night ??
                b?.nightly_price ??
                b?.price ??
                0
            );

            return priceB - priceA;
          }
        );
      }

      return list;
    }, [
      properties,
      pricing,
      sortBy,
    ]);

  /* ===================================================
     BOOK NOW
  =================================================== */

  const handleBookNow = (
    property
  ) => {
    if (!property?.id) {
      return;
    }

    const propertyAvailability =
      availability[
        String(property.id)
      ];

    const propertyPricing =
      pricing[
        String(property.id)
      ];

    /*
    | If availability exists and is false,
    | stop booking.
    */

    if (
      propertyAvailability &&
      propertyAvailability.is_available ===
        false
    ) {
      return;
    }

    /*
    | Keep your existing booking
    | navigation style.
    |
    | Data is passed through state
    | for the booking page.
    */

    navigate(
      `/booking/${property.id}`,
      {
        state: {
          property,
          pricing:
            propertyPricing ||
            null,
          availability:
            propertyAvailability ||
            null,
        },
      }
    );
  };

  /* ===================================================
     LOADING
  =================================================== */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
        <div className="text-center">
          <Loader2
            size={40}
            className="mx-auto animate-spin text-[#123d78]"
          />

          <p className="mt-4 text-sm font-medium text-gray-500">
            Loading {categoryName} stays...
          </p>
        </div>
      </div>
    );
  }

  /* ===================================================
     ERROR
  =================================================== */

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-5">
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <Building2
            size={40}
            className="mx-auto text-red-500"
          />

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            Unable to load properties
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {error}
          </p>

          <button
            onClick={loadData}
            className="
              mt-6
              rounded-xl
              bg-[#123d78]
              px-6
              py-3
              text-sm
              font-bold
              text-white
            "
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  /* ===================================================
     MAIN
  =================================================== */

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#10213f]">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="mx-auto max-w-7xl px-5 pt-6 lg:px-8">

        {/* BREADCRUMB */}

        <div className="flex items-center gap-2 text-sm">

          <button
            onClick={() =>
              navigate("/")
            }
            className="
              text-gray-500
              transition
              hover:text-[#123d78]
            "
          >
            Home
          </button>

          <ChevronDown
            size={15}
            className="-rotate-90 text-gray-400"
          />

          <span className="font-bold text-[#123d78]">
            {categoryName}
          </span>

        </div>

        {/* HERO */}

        <div className="mt-7 grid items-center gap-8 lg:grid-cols-[1fr_1.05fr]">

          {/* LEFT */}

          <div>

            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#eaf0fb]">

                <CategoryIcon
                  size={42}
                  strokeWidth={1.8}
                  className="text-[#123d78]"
                />

              </div>

              <div>

                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  {categoryName}
                </h1>

                <p className="mt-2 text-lg font-medium text-gray-600">
                  {categoryName} properties
                </p>

              </div>

            </div>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-600">
              {description}
            </p>

            {/* FEATURES */}

            <div className="mt-7 flex flex-wrap gap-3">

              <Feature
                icon={
                  <Users size={20} />
                }
                text="2+ Guests"
              />

              <Feature
                icon={
                  <BedDouble size={20} />
                }
                text="1+ Rooms"
              />

              <Feature
                icon={
                  <Utensils size={19} />
                }
                text="Kitchen"
              />

              <Feature
                icon={
                  <Wifi size={20} />
                }
                text="Wi-Fi"
              />

            </div>

          </div>

          {/* HERO IMAGE */}

          <div className="overflow-hidden rounded-3xl">

            <img
              src={heroImage}
              alt={categoryName}
              className="
                h-[270px]
                w-full
                object-cover
                sm:h-[330px]
              "
            />

          </div>

        </div>

      </section>

      {/* =================================================
          CATEGORY NAVIGATION
      ================================================= */}

    
{/* =================================================
    CATEGORY NAVIGATION
================================================= */}

<section className="mx-auto mt-6 w-full max-w-7xl px-5 lg:px-8">
  <div className="mb-5">
    <h2 className="text-2xl font-bold text-gray-900">
      Explore Categories
    </h2>

    
  </div>

  {/* 5 COLUMNS × 3 ROWS */}
  <div className="grid w-full grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
    {Object.keys(categoryTitles).map((slug) => {
      const Icon = getCategoryIcon(slug);

      const isActive =
        normalizeCategory(categorySlug) ===
        normalizeCategory(slug);

      return (
        <button
  key={slug}
  type="button"
  onClick={() =>
    navigate(
      `/category-properties?category=${slug.toLowerCase()}`
    )
  }
  className={`group flex w-full min-w-0 flex-col items-center justify-center rounded-2xl px-3 py-4 text-center transition-all duration-300 ${
    isActive
      ? "bg-gray-100 text-gray-900 shadow-sm"
      : "text-gray-700 hover:-translate-y-1 hover:bg-white hover:shadow-md"
  }`}
>
         <div
  className={`mb-2 flex items-center justify-center transition-all duration-300 ${
    isActive
      ? "text-gray-900"
      : "text-gray-700 group-hover:scale-110 group-hover:text-[#123d78]"
  }`}
>
  <Icon
    size={30}
    strokeWidth={1.7}
  />
</div>
          <span
  className={`w-full truncate text-sm transition-colors duration-300 ${
    isActive
      ? "font-semibold text-gray-900"
      : "font-medium text-gray-800 group-hover:font-semibold group-hover:text-[#123d78]"
  }`}
>
  {categoryTitles[slug]}
</span>

        <span className="mt-1 text-xs text-gray-400 transition-colors duration-300 group-hover:text-gray-500">
  Available homes
</span>

          {/* ACTIVE LINE */}
          {isActive && (
            <span className="mt-2 h-0.5 w-8 rounded-full bg-gray-900" />
          )}
        </button>
      );
    })}
  </div>
</section>

{/* DIVIDER */}
<div className="mx-auto mt-8 w-full max-w-7xl border-t border-gray-200" />

      {/* DIVIDER */}

      <div className="mt-8 border-t border-gray-200" />

      {/* =================================================
          PROPERTY SECTION
      ================================================= */}

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">

        {/* HEADING */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex flex-wrap items-center gap-3">

            <h2 className="text-2xl font-bold">
              Available{" "}
              {categoryName} Stays
            </h2>

            <span className="rounded-full bg-[#eef3fb] px-3 py-1 text-sm font-bold text-[#123d78]">
              {sortedProperties.length} stays
            </span>

          </div>

          {/* SORT */}

          <div className="flex items-center gap-3">

            <span className="text-sm font-medium text-gray-600">
              Sort by:
            </span>

            <div className="relative">

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value
                  )
                }
                className="
                  appearance-none
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  py-3
                  pl-4
                  pr-10
                  text-sm
                  font-semibold
                  shadow-sm
                  outline-none
                  focus:border-[#123d78]
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

              </select>

              <ChevronDown
                size={16}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                "
              />

            </div>

          </div>

        </div>

        {/* =================================================
            NO PROPERTIES
        ================================================= */}

        {sortedProperties.length ===
        0 ? (

          <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-12 text-center">

            <CategoryIcon
              size={48}
              className="mx-auto text-gray-300"
            />

            <h3 className="mt-5 text-xl font-bold text-gray-900">
              No {categoryName} stays found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              There are currently no properties available in this category.
            </p>

            <button
              onClick={() =>
                navigate(
                  "/category-properties?category=all"
                )
              }
              className="
                mt-6
                rounded-xl
                bg-[#123d78]
                px-6
                py-3
                text-sm
                font-bold
                text-white
              "
            >
              View All Stays
            </button>

          </div>

        ) : (

          /* =================================================
             PROPERTY GRID
          ================================================= */

          <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

            {sortedProperties.map(
              (
                property,
                index
              ) => (

                <PropertyCard
                  key={
                    property?.id ||
                    index
                  }
                  property={
                    property
                  }
                  index={
                    index
                  }
                  pricing={
                    pricing[
                      String(
                        property?.id
                      )
                    ]
                  }
                  availability={
                    availability[
                      String(
                        property?.id
                      )
                    ]
                  }
                  onView={() =>
                    navigate(
                      `/property-details/${property.id}`
                    )
                  }
                  onBookNow={
                    handleBookNow
                  }
                />

              )
            )}

          </div>

        )}

      </main>

    </div>
  );
}

/* =====================================================
   FEATURE
===================================================== */

function Feature({
  icon,
  text,
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm">

      <span className="text-[#123d78]">
        {icon}
      </span>

      <span className="text-sm font-semibold text-gray-800">
        {text}
      </span>

    </div>
  );
}

/* =====================================================
   PROPERTY CARD
===================================================== */

function PropertyCard({
  property,
  index,
  pricing,
  availability,
  onView,
  onBookNow,
}) {
  const [liked, setLiked] =
    useState(false);

  const image =
    getPropertyImage(
      property,
      index
    );

  const title =
    property?.title ||
    property?.name ||
    "Beautiful Stay";

  const city =
    property?.city ||
    property?.address ||
    property?.location ||
    "Great location";

  const state =
    property?.state ||
    "";

  const guests =
    property?.max_guests ||
    property?.guest_count ||
    property?.guests ||
    2;

  const bedrooms =
    property?.bedrooms ||
    property?.bedroom_count ||
    1;

  const bathrooms =
    property?.bathrooms ||
    property?.bathroom_count ||
    1;

  const propertyType =
    property?.property_type ||
    property?.category_name ||
    property?.type ||
    "Entire Property";

  /* ===================================================
     PRICE FROM PRICING API
  =================================================== */

  const price =
    pricing?.base_price ??
    property?.price_per_night ??
    property?.nightly_price ??
    property?.price ??
    null;

  const currency =
    pricing?.currency ||
    "INR";

  /* ===================================================
     AVAILABILITY
  =================================================== */

  const isAvailable =
    availability
      ? availability.is_available !==
        false
      : true;

  const availableFrom =
    availability?.available_from;

  const availableTo =
    availability?.available_to;

  const rating =
    property?.rating ||
    property?.average_rating ||
    4.8;

  const reviews =
    property?.review_count ||
    property?.reviews_count ||
    56;

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        transition
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >

      {/* =================================================
          IMAGE
      ================================================= */}

      <div className="relative h-[230px] overflow-hidden">

        <img
          src={image}
          alt={title}
          className="
            h-full
            w-full
            object-cover
            transition
            duration-700
            group-hover:scale-105
          "
        />

        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />

        {/* HEART */}

        <button
          type="button"
          onClick={() =>
            setLiked(!liked)
          }
          className="
            absolute
            right-3
            top-3
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-white/95
            shadow-md
            transition
            hover:scale-105
          "
        >

          <Heart
            size={20}
            className={
              liked
                ? "fill-red-500 text-red-500"
                : "text-[#123d78]"
            }
          />

        </button>

        {/* AVAILABILITY BADGE */}

        <div className="absolute left-3 top-3">

          {isAvailable ? (

            <span className="
              flex
              items-center
              gap-1.5
              rounded-xl
              bg-green-500
              px-3
              py-2
              text-xs
              font-bold
              text-white
              shadow-md
            ">

              <CheckCircle2
                size={14}
              />

              Available

            </span>

          ) : (

            <span className="
              flex
              items-center
              gap-1.5
              rounded-xl
              bg-red-500
              px-3
              py-2
              text-xs
              font-bold
              text-white
              shadow-md
            ">

              <XCircle
                size={14}
              />

              Unavailable

            </span>

          )}

        </div>

      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="p-4">

        {/* TYPE */}

        <span className="inline-flex rounded-lg bg-[#eef3fb] px-2.5 py-1 text-xs font-bold text-[#123d78]">
          {propertyType}
        </span>

        {/* TITLE */}

        <h3 className="mt-3 min-h-[48px] line-clamp-2 text-lg font-bold leading-6 text-[#10213f]">
          {title}
        </h3>

        {/* LOCATION */}

        <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-600">

          <MapPin
            size={15}
            className="shrink-0"
          />

          <span className="truncate">

            {city}

            {state
              ? `, ${state}`
              : ""}

          </span>

        </div>

        {/* DETAILS */}

        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-b border-gray-100 pb-4">

          <SmallInfo
            icon={
              <Users size={15} />
            }
            text={`${guests} Guests`}
          />

          <SmallInfo
            icon={
              <BedDouble size={15} />
            }
            text={`${bedrooms} Bedrooms`}
          />

          <SmallInfo
            icon={
              <Bath size={15} />
            }
            text={`${bathrooms} Bathrooms`}
          />

        </div>

        {/* AMENITIES */}

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">

          <Amenity
            icon={
              <Wifi size={14} />
            }
            text="Wi-Fi"
          />

          <Amenity
            icon={
              <Utensils size={14} />
            }
            text="Kitchen"
          />

          <Amenity
            icon={
              <Wind size={14} />
            }
            text="AC"
          />

          <Amenity
            icon={
              <Car size={14} />
            }
            text="Parking"
          />

        </div>

        {/* =================================================
            AVAILABILITY INFO
        ================================================= */}

        <div className="mt-4">

          {isAvailable ? (

            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-green-600">

              <CheckCircle2
                size={15}
              />

              <span>
                Available
              </span>

              {availableFrom &&
                availableTo && (
                  <span className="font-normal text-gray-400">
                    {availableFrom} -{" "}
                    {availableTo}
                  </span>
                )}

            </div>

          ) : (

            <div className="flex items-center gap-2 text-xs font-semibold text-red-500">

              <XCircle
                size={15}
              />

              <span>
                Currently unavailable
              </span>

            </div>

          )}

        </div>

        {/* =================================================
            RATING + PRICE
        ================================================= */}

        <div className="mt-5 flex items-end justify-between gap-3">

          <div className="flex items-center gap-1">

            <Star
              size={16}
              className="fill-orange-500 text-orange-500"
            />

            <span className="text-sm font-bold">
              {Number(
                rating
              ).toFixed(1)}
            </span>

            <span className="text-xs text-gray-400">
              ({reviews} reviews)
            </span>

          </div>

          <div className="text-right">

            {price ? (

              <>

                <span className="text-xl font-bold text-[#10213f]">

                  {currency ===
                  "INR"
                    ? "₹"
                    : currency}

                  {Number(
                    price
                  ).toLocaleString(
                    "en-IN"
                  )}

                </span>

                <span className="ml-1 text-xs text-gray-500">
                  / night
                </span>

              </>

            ) : (

              <span className="text-sm font-semibold text-[#123d78]">
                Check price
              </span>

            )}

          </div>

        </div>

        {/* =================================================
            BOOK NOW
        ================================================= */}

        <button
          type="button"
          disabled={!isAvailable}
          onClick={(event) => {
            event.stopPropagation();

            if (
              !isAvailable
            ) {
              return;
            }

            onBookNow(
              property
            );
          }}
          className="
            mt-5
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#123d78]
            px-4
            py-3
            text-sm
            font-bold
            text-white
            transition
            hover:bg-[#0d315f]
            disabled:cursor-not-allowed
            disabled:bg-gray-300
          "
        >

          {isAvailable
            ? "Book Now"
            : "Unavailable"}

          <ArrowRight
            size={17}
          />

        </button>

      </div>

    </article>
  );
}

/* =====================================================
   SMALL INFO
===================================================== */

function SmallInfo({
  icon,
  text,
}) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-600">

      <span className="text-gray-500">
        {icon}
      </span>

      <span>
        {text}
      </span>

    </div>
  );
}

/* =====================================================
   AMENITY
===================================================== */

function Amenity({
  icon,
  text,
}) {
  return (
    <div className="flex items-center gap-1 text-xs text-gray-600">

      <span className="text-gray-500">
        {icon}
      </span>

      <span>
        {text}
      </span>

    </div>
  );
}

export default CategoryProperties;