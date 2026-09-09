"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getPopularProperties } from "../../api/popularPropertyApi";
import { getPricing } from "../../api/pricingApi";

import CustomerPropertyCard from "./CustomerPropertyCard";

const fallbackImages = [
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80",
];

/* =========================================================
   GET PROPERTY ID
========================================================= */

const getPropertyId = (property, index) => {
  return (
    property?.id ??
    property?.property_id ??
    property?.propertyId ??
    index + 1
  );
};

/* =========================================================
   GET PROPERTY TITLE
========================================================= */

const getPropertyTitle = (property) => {
  return (
    property?.title ??
    property?.property_name ??
    property?.name ??
    "Property"
  );
};

/* =========================================================
   GET LOCATION
========================================================= */

const getPropertyLocation = (property) => {
  const address =
    property?.address ??
    property?.location ??
    property?.location_name ??
    "";

  const city = property?.city ?? "";

  if (address && city && address !== city) {
    return `${address}, ${city}`;
  }

  return address || city || "Location unavailable";
};

/* =========================================================
   GET IMAGE
========================================================= */

const getPropertyImage = (property, index) => {
  const image =
    property?.image ??
    property?.image_url ??
    property?.imageUrl ??
    property?.thumbnail ??
    property?.thumbnail_url ??
    property?.images?.[0]?.url ??
    property?.images?.[0]?.image_url ??
    "";

  return image || fallbackImages[index % fallbackImages.length];
};

/* =========================================================
   NORMALIZE PROPERTY
========================================================= */

const normalizeProperty = (property, index, pricingMap) => {
  const propertyId = getPropertyId(property, index);

  const pricing = pricingMap[propertyId];

  return {
    ...property,

    id: propertyId,

    title: getPropertyTitle(property),

    location: getPropertyLocation(property),

    address: property?.address ?? "",

    city: property?.city ?? "",

    image: getPropertyImage(property, index),

    rating:
      property?.rating ??
      property?.average_rating ??
      null,

    price:
      property?.price ??
      property?.price_per_night ??
      property?.pricePerNight ??
      pricing?.price ??
      pricing?.price_per_night ??
      null,

    max_guests:
      property?.max_guests ??
      property?.maximum_guests ??
      property?.guests ??
      property?.capacity ??
      0,

    bedrooms:
      property?.bedrooms ??
      property?.bedroom_count ??
      0,

    bathrooms:
      property?.bathrooms ??
      property?.bathroom_count ??
      property?.baths ??
      0,

    property_type:
      property?.property_type ??
      property?.type ??
      "",
  };
};

/* =========================================================
   GET API ARRAY
========================================================= */

const extractPropertyList = (response) => {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.properties)) {
    return response.properties;
  }

  if (Array.isArray(response?.results)) {
    return response.results;
  }

  if (Array.isArray(response?.items)) {
    return response.items;
  }

  if (Array.isArray(response?.data?.properties)) {
    return response.data.properties;
  }

  if (Array.isArray(response?.data?.items)) {
    return response.data.items;
  }

  return [];
};

/* =========================================================
   COMPONENT
========================================================= */

function CustomerPopularProperties() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================================================
     LOAD POPULAR PROPERTIES
  ======================================================= */

  useEffect(() => {
    let isMounted = true;

    const loadProperties = async () => {
      try {
        setLoading(true);
        setError("");

        /* -----------------------------------------------
           GET POPULAR PROPERTIES
        ------------------------------------------------ */

        const propertyResponse = await getPopularProperties();

        /* -----------------------------------------------
           GET PRICING
        ------------------------------------------------ */

        let pricingMap = {};

        try {
          const pricingResponse = await getPricing();

          const pricingList = Array.isArray(pricingResponse)
            ? pricingResponse
            : Array.isArray(pricingResponse?.data)
              ? pricingResponse.data
              : Array.isArray(pricingResponse?.items)
                ? pricingResponse.items
                : Array.isArray(pricingResponse?.results)
                  ? pricingResponse.results
                  : [];

          pricingList.forEach((pricing) => {
            const propertyId =
              pricing?.property_id ??
              pricing?.propertyId ??
              pricing?.property?.id;

            if (propertyId !== undefined && propertyId !== null) {
              pricingMap[propertyId] = pricing;
            }
          });
        } catch (pricingError) {
          /*
            Pricing API failure should NOT break
            Popular Properties.
          */
          console.error(
            "Pricing API Error:",
            pricingError
          );
        }

        /* -----------------------------------------------
           EXTRACT PROPERTIES
        ------------------------------------------------ */

        const propertyList =
          extractPropertyList(propertyResponse);

        /* -----------------------------------------------
           NORMALIZE
        ------------------------------------------------ */

        const formattedProperties = propertyList
          .map((property, index) =>
            normalizeProperty(
              property,
              index,
              pricingMap
            )
          )
          .slice(0, 6);

        if (!isMounted) {
          return;
        }

        setProperties(formattedProperties);
      } catch (err) {
        console.error(
          "Popular Properties API Error:",
          err
        );

        if (!isMounted) {
          return;
        }

        setError(
          err?.response?.data?.detail ??
          err?.response?.data?.message ??
          err?.message ??
          "Unable to load popular properties."
        );

        setProperties([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProperties();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =======================================================
     VIEW ALL
  ======================================================= */

  const handleViewAll = () => {
    navigate("/properties");
  };

  /* =======================================================
     LOADING UI
  ======================================================= */

  if (loading) {
    return (
      <section className="py-12 sm:py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#123d78]">
              Discover
            </p>

            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Popular Properties
            </h2>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Discover stays guests love
            </p>
          </div>
        </div>

        <div className="flex min-h-[280px] w-full items-center justify-center rounded-2xl border border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3 text-gray-500">
            <Loader2
              size={22}
              className="animate-spin text-[#123d78]"
            />

            <span className="text-sm">
              Loading popular properties...
            </span>
          </div>
        </div>
      </section>
    );
  }

  /* =======================================================
     ERROR UI
  ======================================================= */

  if (error) {
    return (
      <section className="py-12 sm:py-16">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#123d78]">
            Discover
          </p>

          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Popular Properties
          </h2>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Discover stays guests love
          </p>
        </div>

        <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-10 text-center">
          <p className="text-sm font-medium text-red-600">
            {error}
          </p>
        </div>
      </section>
    );
  }

  /* =======================================================
     EMPTY UI
  ======================================================= */

  if (!properties.length) {
    return (
      <section className="py-12 sm:py-16">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#123d78]">
            Discover
          </p>

          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Popular Properties
          </h2>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Discover stays guests love
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-10 text-center">
          <p className="text-sm text-gray-500">
            No properties available.
          </p>
        </div>
      </section>
    );
  }

  /* =======================================================
     MAIN UI
  ======================================================= */

  return (
    <section className="py-12 sm:py-16">
      {/* HEADER */}

      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#123d78]">
            Discover
          </p>

          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Popular Properties
          </h2>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Discover stays guests love
          </p>
        </div>

        {/* DESKTOP VIEW ALL */}

        <button
          type="button"
          onClick={handleViewAll}
          className="
            hidden
            items-center
            gap-1
            text-sm
            font-semibold
            text-gray-800
            transition
            hover:text-[#123d78]
            sm:flex
          "
        >
          View all
          <ArrowRight size={16} />
        </button>
      </div>

      {/* PROPERTY GRID */}

      <div
        className="
          grid
          grid-cols-1
          gap-x-6
          gap-y-10
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {properties.map((property, index) => (
          <CustomerPropertyCard
            key={
              property?.id ??
              property?.property_id ??
              index
            }
            property={property}
          />
        ))}
      </div>

      {/* MOBILE VIEW ALL */}

      <div className="mt-10 flex justify-center sm:hidden">
        <button
          type="button"
          onClick={handleViewAll}
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-gray-200
            px-5
            py-2.5
            text-sm
            font-semibold
            text-gray-800
            transition
            hover:border-[#123d78]
            hover:text-[#123d78]
          "
        >
          View all properties
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}

export default CustomerPopularProperties;