"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {

  ArrowRight,

  ChevronRight,

  MapPin,

  Sparkles,

  Star,

} from "lucide-react";

import { useNavigate } from "react-router-dom";

import CustomerReveal from "./CustomerReveal";

import { destinations } from "../../data/destinations";

import apiClient from "../../api/apiClient";

/* =========================================================

   LOCATIONS

   Existing source of truth

   ========================================================= */

const locations = destinations;

/* =========================================================

   LOCATION VIDEOS

   Existing video flow

   ========================================================= */

const locationVideos = {

  Chennai: "/Location videos/chennai city .mp4",

  Bangalore: "/Location videos/bangalore city.mp4",

  Mumbai: "/Location videos/mumbai city.mp4",

  Delhi: "/Location videos/delhi city.mp4",

  Goa: "/Location videos/goa city.mp4",

  Kerala: "/Location videos/kerala .mp4",

  Bali: "/Location videos/bali.mp4",

  Dubai: "/Location videos/dubai city.mp4",

  Paris: "/Location videos/Paris.mp4",

  London: "/Location videos/London.mp4",

  "New York": "/Location videos/New york.mp4",

};

/* =========================================================

   STAY CATEGORIES

   Automatically changes every 3 seconds

   ========================================================= */

const stayCategories = [

  "Weekend Rentals",

  "Summer Rentals",

  "Vacation Rentals",

];

/* =========================================================

   PROPERTY API

   Existing backend endpoints

   ========================================================= */

const getProperties = async () => {

  const response = await apiClient.get("/properties/");

  return response.data;

};

const getPropertyImages = async () => {

  const response = await apiClient.get("/property-images/");

  return response.data;

};

/* =========================================================

   GENERIC VALUE HELPER

   ========================================================= */

const getValue = (

  object,

  keys,

  fallback = ""

) => {

  if (!object) {

    return fallback;

  }

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

/* =========================================================

   PROPERTY ID

   Supports different backend field names

   ========================================================= */

const getPropertyId = (property) => {

  return getValue(

    property,

    ["id", "property_id", "propertyId"],

    null

  );

};

/* =========================================================

   PROPERTY TITLE

   ========================================================= */

const getPropertyTitle = (property) => {

  return getValue(

    property,

    [

      "title",

      "name",

      "property_name",

      "property_title",

    ],

    "Beautiful Stay"

  );

};

/* =========================================================

   PROPERTY DESCRIPTION

   ========================================================= */

const getPropertyDescription = (property) => {

  return getValue(

    property,

    [

      "description",

      "property_description",

      "details",

    ],

    "Comfortable stay with everything you need."

  );

};

/* =========================================================

   PROPERTY CITY / LOCATION

   ========================================================= */

const getPropertyCity = (property) => {

  return getValue(

    property,

    [

      "city",

      "location",

      "place",

      "area",

      "address",

    ],

    ""

  );

};

/* =========================================================

   PROPERTY RATING

   ========================================================= */

const getPropertyRating = (property) => {

  return Number(

    getValue(

      property,

      [

        "rating",

        "average_rating",

        "review_rating",

      ],

      0

    )

  );

};

/* =========================================================

   PROPERTY REVIEWS

   ========================================================= */

const getPropertyReviews = (property) => {

  return Number(

    getValue(

      property,

      [

        "reviews",

        "review_count",

        "reviews_count",

        "total_reviews",

      ],

      0

    )

  );

};

/* =========================================================

   IMAGE URL NORMALIZER

   ========================================================= */

const normalizeImageUrl = (url) => {

  if (!url || typeof url !== "string") {

    return "";

  }

  const value = url.trim();

  if (

    !value ||

    value.toLowerCase() === "string"

  ) {

    return "";

  }

  /* Absolute URL */

  if (

    value.startsWith("http://") ||

    value.startsWith("https://")

  ) {

    return value;

  }

  /* Protocol-relative URL */

  if (value.startsWith("//")) {

    return `http:${value}`;

  }

  /* Backend relative URL */

  if (value.startsWith("/")) {

    const baseUrl = String(

      apiClient.defaults.baseURL || ""

    ).replace(/\/$/, "");

    return `${baseUrl}${value}`;

  }

  return value;

};

/* =========================================================

   EXTRACT IMAGE FROM PROPERTY IMAGE API

   ========================================================= */

const getPropertyImage = (

  property,

  imageData

) => {

  const propertyId = getPropertyId(property);

  if (!propertyId) {

    return "";

  }

  let imageList = [];

  if (Array.isArray(imageData)) {

    imageList = imageData;

  } else if (Array.isArray(imageData?.data)) {

    imageList = imageData.data;

  } else if (Array.isArray(imageData?.items)) {

    imageList = imageData.items;

  } else if (Array.isArray(imageData?.images)) {

    imageList = imageData.images;

  } else if (Array.isArray(imageData?.results)) {

    imageList = imageData.results;

  }

  /* -------------------------------------------------------

     First priority:

     /property-images/ API

     ------------------------------------------------------- */

  const matchingImages = imageList

    .filter(

      (image) =>

        Number(image?.property_id) ===

        Number(propertyId)

    )

    .sort(

      (a, b) =>

        Number(a?.display_order ?? 0) -

        Number(b?.display_order ?? 0)

    );

  const apiImage = matchingImages

    .map((image) =>

      normalizeImageUrl(

        typeof image === "string"

          ? image

          : image?.image_url ??

              image?.url ??

              image?.imageUrl ??

              image?.photo

      )

    )

    .find(Boolean);

  if (apiImage) {

    return apiImage;

  }

  /* -------------------------------------------------------

     Second priority:

     Image fields inside /properties/

     ------------------------------------------------------- */

  const directPropertyImage =

    normalizeImageUrl(

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

  if (directPropertyImage) {

    return directPropertyImage;

  }

  /* -------------------------------------------------------

     Third priority:

     Nested property.images

     ------------------------------------------------------- */

  if (Array.isArray(property?.images)) {

    const nestedImage = property.images

      .map((image) =>

        normalizeImageUrl(

          typeof image === "string"

            ? image

            : image?.image_url ??

                image?.url ??

                image?.imageUrl

        )

      )

      .find(Boolean);

    if (nestedImage) {

      return nestedImage;

    }

  }

  return "";

};
function CustomerExploreLocations() {
  const navigate = useNavigate();

  const locationSelectorRef = useRef(null);
  const locationButtonRefs = useRef([]);

  /* -------------------------------------------------------
     EXISTING LOCATION STATE

     ------------------------------------------------------- */

  const [selectedIndex, setSelectedIndex] =

    useState(0);

  /* -------------------------------------------------------

     EXISTING IMAGE / VIDEO ERROR STATE

     ------------------------------------------------------- */

  const [imageErrors, setImageErrors] =

    useState({});

  const [videoErrors, setVideoErrors] =

    useState({});

  /* -------------------------------------------------------

     PROPERTY API STATE

     ------------------------------------------------------- */

  const [properties, setProperties] =

    useState([]);

  const [propertyImages, setPropertyImages] =

    useState([]);

  const [propertiesLoading, setPropertiesLoading] =

    useState(true);

  const [propertyApiError, setPropertyApiError] =

    useState("");

  /* -------------------------------------------------------

     AUTO CATEGORY STATE

     ------------------------------------------------------- */

  const [categoryIndex, setCategoryIndex] =

    useState(0);

  /* -------------------------------------------------------

     SELECTED LOCATION

     ------------------------------------------------------- */

  const selectedLocation =

    locations[selectedIndex];
/* =======================================================

     LOAD PROPERTY API

     ======================================================= */

  useEffect(() => {

    let isMounted = true;

    const loadPropertyData = async () => {

      try {

        setPropertiesLoading(true);

        setPropertyApiError("");

        const [

          propertiesResponse,

          imagesResponse,

        ] = await Promise.all([

          getProperties(),

          getPropertyImages(),

        ]);

        /* -------------------------------------------------

           PROPERTIES RESPONSE

           ------------------------------------------------- */

        let propertyList = [];

        if (Array.isArray(propertiesResponse)) {

          propertyList = propertiesResponse;

        } else if (

          Array.isArray(propertiesResponse?.data)

        ) {

          propertyList =

            propertiesResponse.data;

        } else if (

          Array.isArray(

            propertiesResponse?.properties

          )

        ) {

          propertyList =

            propertiesResponse.properties;

        } else if (

          Array.isArray(

            propertiesResponse?.results

          )

        ) {

          propertyList =

            propertiesResponse.results;

        } else if (

          Array.isArray(

            propertiesResponse?.data?.properties

          )

        ) {

          propertyList =

            propertiesResponse.data.properties;

        } else if (

          Array.isArray(

            propertiesResponse?.data?.items

          )

        ) {

          propertyList =

            propertiesResponse.data.items;

        } else if (

          Array.isArray(propertiesResponse?.items)

        ) {

          propertyList =

            propertiesResponse.items;

        }

        /* -------------------------------------------------

           IMAGE RESPONSE

           ------------------------------------------------- */

        let imageList = [];

        if (Array.isArray(imagesResponse)) {

          imageList = imagesResponse;

        } else if (

          Array.isArray(imagesResponse?.data)

        ) {

          imageList = imagesResponse.data;

        } else if (

          Array.isArray(imagesResponse?.items)

        ) {

          imageList = imagesResponse.items;

        } else if (

          Array.isArray(imagesResponse?.images)

        ) {

          imageList = imagesResponse.images;

        } else if (

          Array.isArray(imagesResponse?.results)

        ) {

          imageList = imagesResponse.results;

        }

        if (isMounted) {

          setProperties(propertyList);

          setPropertyImages(imageList);

        }

      } catch (error) {

        console.error(

          "Unable to load property data:",

          error?.response?.data ||

            error?.message ||

            error

        );

        if (isMounted) {

          setPropertyApiError(

            error?.response?.data?.detail ||

              error?.response?.data?.message ||

              "Unable to load properties."

          );

        }

      } finally {

        if (isMounted) {

          setPropertiesLoading(false);

        }

      }

    };

    loadPropertyData();

    return () => {

      isMounted = false;

    };

  }, []);

  /* =======================================================
     LOCATION + STAY COLLECTION AUTO ROTATION

     One location stays visible for exactly 8 seconds.
     During the same 8 seconds, Stay Collection changes
     one-by-one through Weekend, Summer and Vacation.

     0.00s -> Weekend Rentals
     2.67s -> Summer Rentals
     5.33s -> Vacation Rentals
     8.00s -> Next location + Stay Collection resets
     ======================================================= */

  useEffect(() => {
    const LOCATION_DURATION = 8000;
    const CATEGORY_DURATION =
      LOCATION_DURATION / stayCategories.length;

    setCategoryIndex(0);

    const categoryTimer = setInterval(() => {
      setCategoryIndex((previous) =>
        (previous + 1) % stayCategories.length
      );
    }, CATEGORY_DURATION);

    const locationTimer = setInterval(() => {
      setSelectedIndex((previous) => {
        if (previous >= locations.length - 1) {
          return 0;
        }
        return previous + 1;
      });

      setCategoryIndex(0);
    }, LOCATION_DURATION);

    return () => {
      clearInterval(categoryTimer);
      clearInterval(locationTimer);
    };
  }, []);

  /* =======================================================
     AUTO SCROLL ACTIVE LOCATION
     Keeps the current location visible in the selector.
     ======================================================= */

  useEffect(() => {
    const container = locationSelectorRef.current;
    const activeButton = locationButtonRefs.current[selectedIndex];

    if (!container || !activeButton) {
      return;
    }

    container.scrollTo({
      left:
        activeButton.offsetLeft -
        container.clientWidth / 2 +
        activeButton.offsetWidth / 2,
      behavior: "smooth",
    });
  }, [selectedIndex]);

/* =======================================================

     NAVIGATION

     Existing navigation flow

     ======================================================= */

  const handleLocationClick = (

    locationName

  ) => {

    navigate(

      `/destination/${encodeURIComponent(

        locationName

      )}`

    );

  };

  /* =======================================================

     IMAGE ERROR

     ======================================================= */

  const handleImageError = (propertyId) => {

    setImageErrors((previous) => ({

      ...previous,

      [propertyId]: true,

    }));

  };

  /* =======================================================

     VIDEO ERROR

     ======================================================= */

  const handleVideoError = (

    locationName

  ) => {

    setVideoErrors((previous) => ({

      ...previous,

      [locationName]: true,

    }));

  };

  /* =======================================================

     CURRENT VIDEO

     ======================================================= */

  const currentVideo =

    locationVideos[selectedLocation.name];

  const videoHasError =

    videoErrors[selectedLocation.name];

  /* =======================================================

     FILTER PROPERTIES BY SELECTED LOCATION

     ======================================================= */

  const locationProperties = useMemo(() => {

    if (

      !selectedLocation ||

      !properties.length

    ) {

      return [];

    }

    const selectedName =

      String(

        selectedLocation.name || ""

      ).toLowerCase();

    const selectedAliases =

      selectedLocation.aliases?.map(

        (alias) =>

          String(alias).toLowerCase()

      ) || [];

    const matchesLocation = (

      property

    ) => {

      const propertyCity =

        String(

          getPropertyCity(property) || ""

        ).toLowerCase();

      if (!propertyCity) {

        return false;

      }

      /* Exact / partial city match */

      if (

        propertyCity.includes(

          selectedName

        ) ||

        selectedName.includes(

          propertyCity

        )

      ) {

        return true;

      }

      /* Alias match */

      return selectedAliases.some(

        (alias) =>

          propertyCity.includes(alias) ||

          alias.includes(propertyCity)

      );

    };

    return properties

      .filter(matchesLocation)

      .map((property) => {

        const propertyId =

          getPropertyId(property);

        return {

          ...property,

          displayImage:

            getPropertyImage(

              property,

              propertyImages

            ),

          propertyId,

        };

      })

      .filter(

        (property) =>

          property.displayImage

      )

      .slice(0, 4);

  }, [

    properties,

    propertyImages,

    selectedLocation,

  ]);

  /* =======================================================

     FALLBACK:

     If city filtering doesn't find anything,

     show first API properties with images.

     This does NOT affect the existing destination flow.

     ======================================================= */

  const visibleProperties =

    locationProperties.length > 0

      ? locationProperties

      : [];

  /* =======================================================

     RENDER

     ======================================================= */

  return (

    <section className="relative overflow-hidden  py-10 sm:py-12 lg:py-14">

      {/* =====================================================

          BACKGROUND DECORATION

      ====================================================== */}

      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#FF6600]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#142144]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CustomerReveal>
          <div className="mb-10 flex flex-col gap-5 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-[#142144] sm:text-4xl lg:text-5xl">
                Explore beautiful
                <span className="ml-2 text-[#FF6600]">locations</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Discover beautiful destinations and comfortable stays around the world.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-[#FF6600]" />
              <span className="text-sm font-semibold tracking-wide text-slate-500">
                {selectedIndex + 1} / {locations.length}
              </span>
            </div>
          </div>
        </CustomerReveal>

        {/* =====================================================

            LOCATION SELECTOR

        ====================================================== */}

        <CustomerReveal>

          <div
              ref={locationSelectorRef}
              className="mb-10 overflow-x-auto pb-3 scrollbar-hide"
            >

            <div className="flex min-w-max gap-3">

              {locations.map(

                (location, index) => {

                  const isActive =

                    index ===

                    selectedIndex;

                  return (

                    <button
                      ref={(element) => {
                        locationButtonRefs.current[index] = element;
                      }}

                      key={

                        location.name

                      }

                      type="button"

                      onClick={() =>

                        setSelectedIndex(

                          index

                        )

                      }

                      className={`group relative overflow-hidden rounded-2xl border px-5 py-3 text-left transition-all duration-300 ${

                        isActive

                          ? "border-[#142144] bg-[#142144] text-white shadow-lg shadow-[#142144]/20"

                          : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-[#FF6600] hover:shadow-md"

                      }`}

                    >

                      <div className="flex items-center gap-3">

                        <MapPin

                          className={`h-4 w-4 ${

                            isActive

                              ? "text-[#e2bd72]"

                              : "text-[#b58b3d]"

                          }`}

                        />

                        <div>

                          <p className="whitespace-nowrap text-sm font-bold">

                            {

                              location.name

                            }

                          </p>

                          <p

                            className={`text-xs ${

                              isActive

                                ? "text-white/60"

                                : "text-slate-400"

                            }`}

                          >

                            {

                              location.country

                            }

                          </p>

                        </div>

                      </div>

                    </button>

                  );

                }

              )}

            </div>

          </div>

        </CustomerReveal>

        {/* =====================================================

            MAIN CARD

        ====================================================== */}

        <CustomerReveal>

          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.10)]">

            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">

              {/* =================================================

                  LEFT VIDEO

              ================================================== */}

              <div className="relative min-h-[380px] overflow-hidden bg-[#142144] sm:min-h-[480px] lg:min-h-[620px]">

                {/* VIDEO */}

                {!videoHasError &&

                currentVideo ? (

                  <video

                    key={

                      selectedLocation.name

                    }

                    src={currentVideo}

                    autoPlay

                    muted

                    loop

                    playsInline

                    preload="metadata"

                    onError={() =>

                      handleVideoError(

                        selectedLocation.name

                      )

                    }

                    className="absolute inset-0 h-full w-full object-cover"

                  />

                ) : (

                  /* FALLBACK IMAGE */

                  <img

                    src={

                      selectedLocation.image

                    }

                    alt={

                      selectedLocation.name

                    }

                    className="absolute inset-0 h-full w-full object-cover"

                  />

                )}

                {/* DARK OVERLAY */}

                <div className="absolute inset-0 bg-gradient-to-t from-[#142144]/90 via-[#142144]/20 to-transparent" />

                {/* LOCATION BADGE */}

                <div className="absolute left-5 top-5 sm:left-7 sm:top-7">

                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">

                    <MapPin className="h-4 w-4 text-[#FF6600]" />

                    {

                      selectedLocation.country

                    }

                  </div>

                </div>

                {/* VIDEO INDICATOR */}

                {!videoHasError &&

                  currentVideo && (

                    <div className="absolute right-5 top-5 sm:right-7 sm:top-7">

                      <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-xs font-medium text-white backdrop-blur-md">

                        <span className="h-2 w-2 animate-pulse rounded-full bg-[#FF6600]" />

                        Live view

                      </div>

                    </div>

                  )}

                {/* BOTTOM VIDEO CONTENT */}

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">

                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#FF6600]">

                    Discover

                  </p>

                  <h3 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">

                    {

                      selectedLocation.name

                    }

                  </h3>

                  <div className="mt-5 flex flex-wrap gap-2">

                    {selectedLocation.areas?.map(

                      (area) => (

                        <span

                          key={area}

                          className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm"

                        >

                          {area}

                        </span>

                      )

                    )}

                  </div>

                </div>

              </div>

              {/* =================================================

                  RIGHT PROPERTY CONTENT

              ================================================== */}

              <div className="flex flex-col p-6 sm:p-8 lg:p-10">

                {/* =================================================

                    CATEGORY HEADER

                ================================================== */}

                <div className="mb-7">

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#FF6600]">

                        Stay collection

                      </p>

                      <h3

                        key={

                          stayCategories[

                            categoryIndex

                          ]

                        }

                        className="text-2xl font-bold text-[#142144] transition-all duration-500 sm:text-3xl"

                      >

                        {

                          stayCategories[

                            categoryIndex

                          ]

                        }

                      </h3>

                      <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">

                        Beautiful properties

                        and comfortable

                        stays in{" "}

                        <span className="font-semibold text-slate-700">

                          {

                            selectedLocation.name

                          }

                        </span>

                        .

                      </p>

                    </div>

                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff0e6] sm:flex">

                      <MapPin className="h-5 w-5 text-[#FF6600]" />

                    </div>

                  </div>

                  {/* CATEGORY PROGRESS */}

                  <div className="mt-5 flex gap-1.5">

                    {stayCategories.map(

                      (

                        category,

                        index

                      ) => (

                        <div

                          key={

                            category

                          }

                          className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${

                            index ===

                            categoryIndex

                              ? "bg-[#FF6600]"

                              : "bg-slate-200"

                          }`}

                        />

                      )

                    )}

                  </div>

                </div>

                {/* =================================================

                    PROPERTY API LOADING

                ================================================== */}

                {propertiesLoading ? (

                  <div className="grid flex-1 gap-4 sm:grid-cols-2">

                    {[1, 2, 3, 4].map(

                      (item) => (

                        <div

                          key={item}

                          className="aspect-[1.18/1] animate-pulse rounded-2xl bg-slate-200"

                        />

                      )

                    )}

                  </div>

                ) : propertyApiError ? (

                  /* =================================================

                      API ERROR

                  ================================================== */

                  <div className="flex min-h-[300px] flex-1 items-center justify-center rounded-2xl border border-red-100 bg-red-50 px-6 text-center">

                    <div>

                      <p className="text-sm font-semibold text-red-700">

                        Unable to load stays

                      </p>

                      <p className="mt-2 text-xs leading-5 text-red-500">

                        {propertyApiError}

                      </p>

                    </div>

                  </div>

                ) : visibleProperties.length >

                  0 ? (

                  /* =================================================

                      PROPERTY GRID

                  ================================================== */

                  <div className="grid flex-1 gap-4 sm:grid-cols-2">

                    {visibleProperties.map(

                      (

                        property,

                        index

                      ) => {

                        const propertyId =

                          property.propertyId;

                        const title =

                          getPropertyTitle(

                            property

                          );

                        const city =

                          getPropertyCity(

                            property

                          );

                        const description =

                          getPropertyDescription(

                            property

                          );

                        const rating =

                          getPropertyRating(

                            property

                          );

                        const reviews =

                          getPropertyReviews(

                            property

                          );

                        const hasImageError =

                          imageErrors[

                            propertyId

                          ];

                        return (

                          <div

                            key={

                              propertyId ??

                              `${title}-${index}`

                            }

                            className="group relative overflow-hidden rounded-2xl bg-slate-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"

                          >

                            {/* IMAGE */}

                            <div className="relative aspect-[1.18/1] overflow-hidden">

                              {!hasImageError ? (

                                <img

                                  src={

                                    property.displayImage

                                  }

                                  alt={title}

                                  loading={

                                    index <

                                    2

                                      ? "eager"

                                      : "lazy"

                                  }

                                  onError={() =>

                                    handleImageError(

                                      propertyId

                                    )

                                  }

                                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"

                                />

                              ) : (

                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#142144] to-[#26365d]">

                                  <div className="text-center text-white">

                                    <Sparkles className="mx-auto mb-2 h-7 w-7 text-[#FF6600]" />

                                    <p className="px-4 text-sm font-semibold">

                                      {title}

                                    </p>

                                  </div>

                                </div>

                              )}

                              {/* IMAGE GRADIENT */}

                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                              {/* NUMBER */}

                              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-xs font-bold text-white backdrop-blur-md">

                                {String(

                                  index + 1

                                ).padStart(

                                  2,

                                  "0"

                                )}

                              </div>

                              {/* PROPERTY CONTENT */}

                              <div className="absolute bottom-0 left-0 right-0 p-4">

                                <div className="flex items-end justify-between gap-3">

                                  <div className="min-w-0">

                                    <p className="line-clamp-1 text-base font-bold text-white">

                                      {title}

                                    </p>

                                    <p className="mt-1 flex items-center gap-1 text-xs text-white/75">

                                      <MapPin className="h-3.5 w-3.5 shrink-0" />

                                      <span className="line-clamp-1">

                                        {city ||

                                          selectedLocation.name}

                                      </span>

                                    </p>

                                  </div>

                                  {rating >

                                    0 && (

                                    <div className="flex shrink-0 items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-xs font-semibold text-white backdrop-blur-md">

                                      <Star className="h-3 w-3 fill-[#FF6600] text-[#FF6600]" />

                                      {rating.toFixed(

                                        1

                                      )}

                                    </div>

                                  )}

                                </div>

                              </div>

                            </div>

                            {/* PROPERTY INFO */}

                            <div className="bg-white p-4">

                              <p className="line-clamp-2 text-xs leading-5 text-slate-500">

                                {description}

                              </p>

                              {reviews >

                                0 && (

                                <p className="mt-2 text-[11px] font-medium text-slate-400">

                                  {reviews}{" "}

                                  reviews

                                </p>

                              )}

                            </div>

                          </div>

                        );

                      }

                    )}

                  </div>

                ) : (

                  /* =================================================

                      NO PROPERTIES

                  ================================================== */

                  <div className="flex min-h-[330px] flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center">

                    <div className="max-w-sm">

                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff0e6]">

                        <Sparkles className="h-6 w-6 text-[#FF6600]" />

                      </div>

                      <p className="text-sm font-bold text-slate-700">

                        Stays coming soon

                      </p>

                      <p className="mt-2 text-xs leading-5 text-slate-500">

                        We couldn't find

                        properties for{" "}

                        <span className="font-semibold">

                          {

                            selectedLocation.name

                          }

                        </span>

                        {" "}yet.

                      </p>

                    </div>

                  </div>

                )}

                {/* =================================================

                    BOTTOM STAY CTA

                    Existing navigation flow preserved

                ================================================== */}

                <div className="mt-7 border-t border-slate-100 pt-6">

                  <button

                    type="button"

                    onClick={() =>

                      handleLocationClick(

                        selectedLocation.name

                      )

                    }

                    className="group flex w-full items-center justify-between rounded-2xl bg-[#142144] px-5 py-4 text-white transition-all duration-300 hover:bg-[#0e1833] sm:px-6"

                  >

                    <div className="text-left">

                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF6600]">

                        Stay

                      </p>

                      <p className="mt-1 text-sm font-bold">

                        Find your stay in{" "}

                        {

                          selectedLocation.name

                        }

                      </p>

                      <p className="mt-1 text-xs text-white/60">

                        Explore available

                        properties and

                        continue to the

                        existing page

                      </p>

                    </div>

                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FF6600] text-[#142144] transition-transform duration-300 group-hover:translate-x-1">

                      <ArrowRight className="h-5 w-5" />

                    </span>

                  </button>

                </div>

              </div>

            </div>

          </div>

        </CustomerReveal>

        {/* =====================================================

            BOTTOM NAVIGATION

            Existing flow unchanged

        ====================================================== */}

        <CustomerReveal>

          <div className="mt-7 flex items-center justify-between">

            {/* PREVIOUS */}

            <button

              type="button"

              disabled={

                selectedIndex === 0

              }

              onClick={() =>

                setSelectedIndex(

                  (previous) =>

                    Math.max(

                      previous - 1,

                      0

                    )

                )

              }

              className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${

                selectedIndex === 0

                  ? "cursor-not-allowed border-slate-200 text-slate-300"

                  : "border-slate-300 bg-white text-[#16263d] hover:border-[#b58b3d] hover:text-[#b58b3d]"

              }`}

            >

              Previous

            </button>

            {/* DOTS */}

            <div className="hidden items-center gap-1.5 sm:flex">

              {locations.map(

                (

                  location,

                  index

                ) => (

                  <button

                    key={

                      location.name

                    }

                    type="button"

                    aria-label={`Select ${location.name}`}

                    onClick={() =>

                      setSelectedIndex(

                        index

                      )

                    }

                    className={`h-1.5 rounded-full transition-all duration-300 ${

                      index ===

                      selectedIndex

                        ? "w-8 bg-[#16263d]"

                        : "w-1.5 bg-slate-300 hover:bg-[#b58b3d]"

                    }`}

                  />

                )

              )}

            </div>

            {/* NEXT */}

            <button

              type="button"

              disabled={

                selectedIndex ===

                locations.length - 1

              }

              onClick={() =>

                setSelectedIndex(

                  (previous) =>

                    Math.min(

                      previous + 1,

                      locations.length - 1

                    )

                )

              }

              className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${

                selectedIndex ===

                locations.length - 1

                  ? "cursor-not-allowed border-slate-200 text-slate-300"

                  : "border-slate-300 bg-white text-[#16263d] hover:border-[#b58b3d] hover:text-[#b58b3d]"

              }`}

            >

              Next

            </button>

          </div>

        </CustomerReveal>

      </div>

    </section>

  );

}

export default CustomerExploreLocations;