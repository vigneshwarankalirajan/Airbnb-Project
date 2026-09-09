import React from "react";
import {
  Bath,
  BedDouble,
  Heart,
  MapPin,
  Star,
  Users,
  Wifi,
} from "lucide-react";

function PropertySummary({ property }) {
  const propertyImage =
    property?.image ||
    property?.image_url ||
    property?.images?.[0]?.image_url ||
    property?.images?.[0] ||
    "";

  const title =
    property?.title ||
    property?.name ||
    "Luxury Ocean View Villa";

  const location =
    property?.city ||
    property?.location ||
    "Kovur, Chennai, Tamil Nadu";

  const rating = property?.rating || 4.8;

  const reviews = property?.reviews || 320;

  const guests =
    property?.guest_count ||
    property?.max_guests ||
    property?.guests ||
    4;

  const bedrooms =
    property?.bedrooms ||
    property?.bedroom_count ||
    2;

  const bathrooms =
    property?.bathrooms ||
    property?.bathroom_count ||
    2;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_3px_14px_rgba(15,23,42,0.035)] sm:p-5">
      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-2xl">
        {propertyImage ? (
          <img
            src={propertyImage}
            alt={title}
            className="h-[245px] w-full object-cover transition duration-500 hover:scale-[1.02] sm:h-[275px]"
          />
        ) : (
          <div className="flex h-[245px] items-center justify-center bg-slate-100 sm:h-[275px]">
            <HomeIcon />
          </div>
        )}

        {/* HEART */}
        <button
          type="button"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
        >
          <Heart
            size={21}
            strokeWidth={2}
            className="text-[#52627a]"
          />
        </button>

        {/* IMAGE COUNT */}
        <div className="absolute bottom-4 right-4 rounded-lg bg-slate-900/75 px-3 py-1.5 text-xs font-semibold text-white">
          🖼 1 / 12
        </div>
      </div>

      {/* PROPERTY CONTENT */}
      <div className="mt-4">
        {/* TYPE */}
        <span className="inline-flex rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-600">
          Entire villa
        </span>

        {/* TITLE */}
        <h2 className="mt-2 text-[21px] font-extrabold tracking-[-0.3px] text-[#10213f]">
          {title}
        </h2>

        {/* LOCATION + RATING */}
        <div className="mt-1.5 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div className="flex items-center gap-1.5 text-sm text-[#52627a]">
            <MapPin size={17} />

            <span>{location}</span>
          </div>

          <div className="flex items-center gap-1 text-sm font-bold text-[#10213f]">
            <Star
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />

            <span>{rating}</span>

            <span className="font-normal text-[#64748b]">
              ({reviews} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="my-4 border-t border-slate-200" />

      {/* PROPERTY FEATURES */}
      <div className="grid grid-cols-2 gap-y-4 text-sm text-[#52627a] sm:grid-cols-4 sm:gap-0">
        <Feature
          icon={<Users size={17} />}
          text={`${guests} guests`}
        />

        <Feature
          icon={<BedDouble size={17} />}
          text={`${bedrooms} bedrooms`}
        />

        <Feature
          icon={<Bath size={17} />}
          text={`${bathrooms} bathrooms`}
        />

        <Feature
          icon={<Wifi size={17} />}
          text="Free WiFi"
        />
      </div>
    </section>
  );
}

function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-2 sm:border-r sm:border-slate-200 sm:px-3 first:pl-0 last:border-r-0">
      {icon}
      <span className="whitespace-nowrap">{text}</span>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="text-slate-400"
    >
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  );
}

export default PropertySummary;