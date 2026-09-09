"use client";

import {
  Heart,
  MapPin,
  Star,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const fallbackImage =
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80";

function CustomerPropertyCard({ property }) {
  const navigate = useNavigate();

  if (!property) {
    return null;
  }

  /* =======================================================
     PROPERTY ID
  ======================================================= */

  const propertyId =
    property?.id ??
    property?.property_id ??
    property?.propertyId;

  /* =======================================================
     PROPERTY DATA
  ======================================================= */

  const title =
    property?.title ??
    property?.property_name ??
    property?.name ??
    "Property";

  const image =
    property?.image ??
    property?.image_url ??
    property?.imageUrl ??
    property?.thumbnail ??
    property?.thumbnail_url ??
    property?.images?.[0]?.url ??
    property?.images?.[0]?.image_url ??
    fallbackImage;

  const address =
    property?.address ??
    property?.location ??
    property?.location_name ??
    "";

  const city = property?.city ?? "";

  const location =
    address && city && address !== city
      ? `${address}, ${city}`
      : address || city || "Location unavailable";

  const rating =
    property?.rating ??
    property?.average_rating ??
    null;

  const guests =
    property?.max_guests ??
    property?.maximum_guests ??
    property?.guests ??
    property?.capacity ??
    0;

  const bedrooms =
    property?.bedrooms ??
    property?.bedroom_count ??
    0;

  const bathrooms =
    property?.bathrooms ??
    property?.bathroom_count ??
    property?.baths ??
    0;

  /* =======================================================
     PROPERTY CLICK
  ======================================================= */

  const handlePropertyClick = () => {
    if (
      propertyId === undefined ||
      propertyId === null
    ) {
      console.error(
        "Property ID is missing:",
        property
      );

      return;
    }

    console.log(
      "Opening property:",
      propertyId
    );

    navigate(
      `/property-details/${propertyId}`
    );
  };

  /* =======================================================
     FAVORITE CLICK
  ======================================================= */

  const handleFavoriteClick = (event) => {
    event.stopPropagation();

    console.log(
      "Favorite property:",
      propertyId
    );
  };

  return (
    <article
      onClick={handlePropertyClick}
      className="
        group
        cursor-pointer
        overflow-hidden
      "
    >
      {/* =================================================
          IMAGE
      ================================================= */}

      <div
        className="
          relative
          aspect-[4/3]
          overflow-hidden
          rounded-2xl
          bg-gray-100
        "
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            ease-out
            group-hover:scale-105
          "
          onError={(event) => {
            event.currentTarget.src =
              fallbackImage;
          }}
        />

        {/* FAVORITE */}

        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label="Add property to wishlist"
          className="
            absolute
            right-3
            top-3
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white/95
            shadow-sm
            backdrop-blur
            transition
            hover:scale-105
          "
        >
          <Heart
            size={19}
            strokeWidth={1.8}
            className="text-gray-700"
          />
        </button>

        {/* PROPERTY TYPE */}

        {property?.property_type && (
          <div
            className="
              absolute
              bottom-3
              left-3
              rounded-full
              bg-white/95
              px-3
              py-1.5
              text-xs
              font-semibold
              text-gray-800
              shadow-sm
              backdrop-blur
            "
          >
            {property.property_type}
          </div>
        )}
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="mt-4">
        {/* TITLE + RATING */}

        <div className="flex items-start justify-between gap-3">
          <h3
            className="
              min-w-0
              flex-1
              truncate
              text-[17px]
              font-semibold
              leading-6
              text-gray-900
            "
          >
            {title}
          </h3>

          <div className="flex shrink-0 items-center gap-1">
            <Star
              size={15}
              fill="currentColor"
              className="text-gray-900"
            />

            <span className="text-sm font-medium text-gray-800">
              {rating !== null &&
              rating !== undefined &&
              rating !== ""
                ? rating
                : "New"}
            </span>
          </div>
        </div>

        {/* LOCATION */}

        <div
          className="
            mt-1.5
            flex
            items-start
            gap-1.5
            text-sm
            text-gray-500
          "
        >
          <MapPin
            size={15}
            className="mt-0.5 shrink-0"
          />

          <span className="line-clamp-2">
            {location}
          </span>
        </div>

        {/* DETAILS */}

        <div
          className="
            mt-2.5
            flex
            flex-wrap
            items-center
            gap-x-2
            gap-y-1
            text-sm
            text-gray-500
          "
        >
          <span>
            {guests} guests
          </span>

          <span>·</span>

          <span>
            {bedrooms} bedrooms
          </span>

          <span>·</span>

          <span>
            {bathrooms} baths
          </span>
        </div>

        {/* PRICE */}

        {property?.price !== null &&
          property?.price !== undefined &&
          property?.price !== "" && (
            <div className="mt-3">
              <span className="text-base font-semibold text-gray-900">
                ₹
                {Number(
                  property.price
                ).toLocaleString("en-IN")}
              </span>

              <span className="ml-1 text-sm text-gray-500">
                night
              </span>
            </div>
          )}
      </div>
    </article>
  );
}

export default CustomerPropertyCard;