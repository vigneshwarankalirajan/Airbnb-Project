import React from "react";
import {
  Bath,
  BedDouble,
  Home,
  ShieldCheck,
  Users,
} from "lucide-react";

const PropertyInfo = ({
  property,
}) => {
  const propertyType =
    property?.property_type ||
    property?.type ||
    "Entire property";

  const guests =
    property?.max_guests ??
    property?.guests ??
    0;

  const bedrooms =
    property?.bedrooms ?? 0;

  const bathrooms =
    property?.bathrooms ?? 0;

  return (
    <>

      <section className="border-b border-gray-200 pb-8">

        <h2 className="text-2xl font-bold text-gray-900">
          {propertyType}
        </h2>

        <p className="mt-2 text-gray-500">
          {guests} guests · {bedrooms} bedrooms ·{" "}
          {bathrooms} bathrooms
        </p>

      </section>

      {/* HIGHLIGHTS */}

      <section className="border-b border-gray-200 py-8">

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">

          <div className="flex gap-4">
            <ShieldCheck className="text-[#123d78]" />

            <div>
              <p className="font-semibold">
                Verified stay
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Trusted property
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Home className="text-[#123d78]" />

            <div>
              <p className="font-semibold">
                Comfortable space
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Designed for your stay
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <ShieldCheck className="text-[#123d78]" />

            <div>
              <p className="font-semibold">
                Easy booking
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Secure reservation
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* DESCRIPTION */}

      <section className="border-b border-gray-200 py-8">

        <h2 className="text-2xl font-bold">
          About this place
        </h2>

        <p className="mt-4 whitespace-pre-line text-base leading-8 text-gray-600">
          {property?.description ||
            "Enjoy a comfortable and memorable stay at this beautiful property."}
        </p>

      </section>

      {/* PROPERTY STATS */}

      <section className="border-b border-gray-200 py-8">

        <h2 className="text-2xl font-bold">
          Property details
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">

          <div className="rounded-2xl border border-gray-200 p-4">
            <Users size={22} />

            <p className="mt-3 text-xs text-gray-500">
              Guests
            </p>

            <p className="mt-1 font-semibold">
              {guests}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4">
            <BedDouble size={22} />

            <p className="mt-3 text-xs text-gray-500">
              Bedrooms
            </p>

            <p className="mt-1 font-semibold">
              {bedrooms}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4">
            <Bath size={22} />

            <p className="mt-3 text-xs text-gray-500">
              Bathrooms
            </p>

            <p className="mt-1 font-semibold">
              {bathrooms}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4">
            <Home size={22} />

            <p className="mt-3 text-xs text-gray-500">
              Type
            </p>

            <p className="mt-1 font-semibold">
              {propertyType}
            </p>
          </div>

        </div>

      </section>

    </>
  );
};

export default PropertyInfo;