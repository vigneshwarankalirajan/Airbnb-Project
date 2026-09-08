"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import CustomerPropertyCard from "./CustomerPropertyCard";
import { getPopularProperties } from "../../api/popularPropertyApi";
import { getPricing } from "../../api/pricingApi";
import CustomerPopularityInformation from "./popularity/CustomerPopularityInformation";

/* =====================================================
   ANIMATIONS
===================================================== */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* =====================================================
   PROPERTY ID
===================================================== */

const getPropertyId = (property, index) => {
  return (
    property?.id ??
    property?.property_id ??
    property?.propertyId ??
    index + 1
  );
};

/* =====================================================
   PROPERTY TITLE
===================================================== */

const getPropertyTitle = (property) => {
  return (
    property?.title ??
    property?.property_name ??
    property?.name ??
    "Property"
  );
};

/* =====================================================
   PROPERTY LOCATION
===================================================== */

const getPropertyLocation = (property) => {
  return (
    property?.location ??
    property?.city ??
    property?.location_name ??
    "Location unavailable"
  );
};

/* =====================================================
   PROPERTY IMAGE
===================================================== */

const getPropertyImage = (property) => {
  return (
    property?.image ??
    property?.image_url ??
    property?.imageUrl ??
    property?.thumbnail ??
    property?.thumbnail_url ??
    property?.images?.[0]?.url ??
    property?.images?.[0]?.image_url ??
    ""
  );
};

/* =====================================================
   NORMALIZE PROPERTY
===================================================== */

const normalizeProperty = (property, index) => {
  return {
    ...property,

    id: getPropertyId(property, index),

    title: getPropertyTitle(property),

    location: getPropertyLocation(property),

    image: getPropertyImage(property),

    rating:
      property?.rating ??
      property?.average_rating ??
      null,

    price:
      property?.price ??
      property?.price_per_night ??
      property?.pricePerNight ??
      null,

    guests:
      property?.guests ??
      property?.max_guests ??
      property?.maximum_guests ??
      property?.capacity ??
      0,

    bedrooms:
      property?.bedrooms ??
      property?.bedroom_count ??
      0,

    baths:
      property?.baths ??
      property?.bathrooms ??
      property?.bathroom_count ??
      0,
  };
};

/* =====================================================
   COMPONENT
===================================================== */

function CustomerPopularProperties() {
  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [pricingByProperty, setPricingByProperty] = useState({});

  /* ===================================================
     LOAD PROPERTIES
  =================================================== */

  useEffect(() => {
    let mounted = true;

    const loadPopularProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getPopularProperties();

        let pricingMap = {};
        try {
          const pricingResponse = await getPricing();
          const pricingList = Array.isArray(pricingResponse)
            ? pricingResponse
            : pricingResponse?.data || pricingResponse?.items || [];

          pricingList.forEach((pricing) => {
            if (pricing?.property_id) {
              pricingMap[pricing.property_id] = pricing;
            }
          });
        } catch (pricingError) {
          console.error("Popular property pricing API error:", pricingError);
        }

        if (!mounted) {
          return;
        }

        /* =============================================
           HANDLE DIFFERENT API RESPONSE FORMATS
        ============================================= */

        let propertyList = [];

        if (Array.isArray(response)) {
          propertyList = response;
        } else if (
          Array.isArray(response?.data)
        ) {
          propertyList = response.data;
        } else if (
          Array.isArray(response?.properties)
        ) {
          propertyList = response.properties;
        } else if (
          Array.isArray(response?.results)
        ) {
          propertyList = response.results;
        } else if (
          Array.isArray(response?.items)
        ) {
          propertyList = response.items;
        } else if (
          Array.isArray(
            response?.data?.properties
          )
        ) {
          propertyList =
            response.data.properties;
        } else if (
          Array.isArray(
            response?.data?.items
          )
        ) {
          propertyList =
            response.data.items;
        }

        /* =============================================
           NORMALIZE + LIMIT
        ============================================= */

        const formattedProperties =
          propertyList
            .map((property, index) =>
              normalizeProperty(
                property,
                index
              )
            )
            .slice(0, 6);

          setPricingByProperty(pricingMap);
        setProperties(
          formattedProperties
        );
      } catch (err) {
        console.error(
          "Popular Properties API Error:",
          err?.response?.data ||
            err?.message ||
            err
        );

        if (!mounted) {
          return;
        }

        setError(
          err?.response?.data?.detail ||
            err?.response?.data?.message ||
            err?.message ||
            "Unable to load properties."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadPopularProperties();

    return () => {
      mounted = false;
    };
  }, []);

  /* ===================================================
     LOADING
  =================================================== */

  if (loading) {
    return (
      <motion.section
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        variants={fadeUp}
      >
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

        <div
          className="
            flex
            min-h-[300px]
            items-center
            justify-center
            rounded-2xl
            border
            border-gray-100
            bg-gray-50
          "
        >
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
      </motion.section>
    );
  }

  /* ===================================================
     ERROR
  =================================================== */

  if (error) {
    return (
      <motion.section
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        variants={fadeUp}
      >
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

        <div
          className="
            rounded-2xl
            border
            border-red-100
            bg-red-50
            px-6
            py-10
            text-center
          "
        >
          <p className="text-sm font-medium text-red-600">
            {error}
          </p>
        </div>
      </motion.section>
    );
  }

  /* ===================================================
     EMPTY
  =================================================== */

  if (!properties.length) {
    return (
      <motion.section
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        variants={fadeUp}
      >
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

        <div
          className="
            rounded-2xl
            border
            border-gray-100
            bg-gray-50
            px-6
            py-10
            text-center
          "
        >
          <p className="text-sm text-gray-500">
            No properties available.
          </p>
        </div>
      </motion.section>
    );
  }

  /* ===================================================
     MAIN UI
  =================================================== */

  return (
    <motion.section
      className="py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      variants={fadeUp}
    >
      {/* =================================================
          HEADER
      ================================================= */}

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

        <button
          type="button"
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

      {/* =================================================
          PROPERTY GRID
      ================================================= */}

      <motion.div
        className="
          grid
          grid-cols-1
          gap-7
          sm:grid-cols-2
          lg:grid-cols-3
        "
        variants={staggerContainer}
      >
        {properties.map(
          (property, index) => (
            <motion.div
              key={
                property.id ??
                property.property_id ??
                index
              }
              variants={fadeUp}
              whileHover={{
                y: -6,
              }}
              transition={{
                duration: 0.25,
              }}
            >
              <CustomerPropertyCard
                property={property}
              />
              <CustomerPopularityInformation
                property={property}
                pricing={pricingByProperty[property.id]}
              />
            </motion.div>
          )
        )}
      </motion.div>
    </motion.section>
  );
}

export default CustomerPopularProperties;