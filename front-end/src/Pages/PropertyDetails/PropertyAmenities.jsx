import React from "react";
import {
  Snowflake,
  Car,
  Wifi,
  Baby,
  Waves,
  Gamepad2,
  BedDouble,
  Building2,
  CirclePlay,
  Tv,
  Sparkles,
  Trees,
} from "lucide-react";

const fallbackAmenities = [
  "Air Conditioning",
  "Parking",
  "Wifi",
  "Children Welcome",
  "Hot Tub",
  "Games Room",
  "Themed bedrooms",
  "Access to resort amenities",
  "Pool table",
  "Cable or Satellite TV",
  "Home Theater",
  "Bedding and towels included",
  "Garden views",
  "Balcony",
  "Other Theme",
];

const amenityIcons = {
  "Air Conditioning": Snowflake,
  Parking: Car,
  Wifi: Wifi,
  "Children Welcome": Baby,
  "Hot Tub": Waves,
  "Games Room": Gamepad2,
  "Themed bedrooms": BedDouble,
  "Access to resort amenities": Building2,
  "Pool table": Gamepad2,
  "Cable or Satellite TV": Tv,
  "Home Theater": CirclePlay,
  "Bedding and towels included": BedDouble,
  "Garden views": Trees,
  Balcony: Building2,
  "Other Theme": Sparkles,
};

const PropertyAmenities = ({ amenities = [] }) => {
  const list =
    Array.isArray(amenities) && amenities.length > 0
      ? amenities
      : fallbackAmenities;

  return (
    <section className="border-b border-gray-200 py-8">
      <h2 className="text-2xl font-bold">
        What this place offers
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((amenity, index) => {
          const name =
            typeof amenity === "string"
              ? amenity
              : amenity?.name ||
                amenity?.title ||
                amenity?.amenity_name ||
                amenity?.label ||
                "Amenity";

          const Icon = amenityIcons[name] || Sparkles;

          return (
            <div
              key={`${name}-${index}`}
              className="flex items-center gap-4 rounded-2xl border border-gray-100 p-4 transition hover:border-blue-100 hover:bg-blue-50/30"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
                <Icon
                  size={20}
                  strokeWidth={1.7}
                  className="text-[#123d78]"
                />
              </div>

              <span className="font-medium text-gray-700">
                {name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PropertyAmenities;