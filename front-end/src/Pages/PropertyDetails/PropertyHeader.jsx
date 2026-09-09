import React from "react";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Share2,
  Star,
} from "lucide-react";

const PropertyHeader = ({
  property,
  rating,
  favorite,
  setFavorite,
  onBack,
}) => {
  const title =
    property?.title ||
    property?.name ||
    "Beautiful stay";

  const location = [
    property?.address,
    property?.city ||
      property?.location?.city,
    property?.state,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-xl">

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between">

          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <div className="hidden text-center md:block">
           
          </div>

          <div className="flex items-center gap-2">

            <button
              onClick={() =>
                setFavorite(!favorite)
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
            >
              <Heart
                size={18}
                className={
                  favorite
                    ? "fill-[#e61e4d] text-[#e61e4d]"
                    : "text-gray-700"
                }
              />
            </button>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
            >
              <Share2 size={18} />
            </button>

          </div>

        </div>

        <div className="mt-5">

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">

            <span className="flex items-center gap-1 font-semibold">
              <Star
                size={15}
                fill="currentColor"
              />
              {rating}
            </span>

            <span className="text-gray-300">
              •
            </span>

            <span className="flex items-center gap-1 text-gray-600">
              <MapPin size={15} />

              {location || "Location"}
            </span>

          </div>

        </div>

      </div>

    </header>
  );
};

export default PropertyHeader;