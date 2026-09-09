import React from "react";
import { MapPin } from "lucide-react";

const PropertyLocation = ({
  property,
}) => {
  const address = [
    property?.address,
    property?.city,
    property?.state,
    property?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <section className="border-b border-gray-200 py-8">

      <h2 className="text-2xl font-bold">
        Where you'll stay
      </h2>

      <div className="mt-4 flex items-center gap-2 text-gray-600">

        <MapPin size={19} />

        <span>
          {address || "Location unavailable"}
        </span>

      </div>

      <div className="mt-6 flex h-[300px] items-center justify-center rounded-[28px] bg-gray-100">

        <div className="text-center">

          <MapPin
            size={42}
            className="mx-auto text-[#123d78]"
          />

          <p className="mt-3 font-semibold text-gray-800">
            {property?.city ||
              property?.location?.city ||
              "Property location"}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Exact location will be shared after booking.
          </p>

        </div>

      </div>

    </section>
  );
};

export default PropertyLocation;