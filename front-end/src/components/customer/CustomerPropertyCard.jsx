import { Heart, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CustomerPropertyCard({ property }) {
  const navigate = useNavigate();

  const handlePropertyClick = () => {
    if (!property?.id) {
      console.error("Property ID is missing:", property);
      return;
    }

    console.log("Opening property:", property.id);

    navigate(`/property-details/${property.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();

    console.log("Favorite property:", property?.id);
  };

  if (!property) {
    return null;
  }

  return (
    <div
      onClick={handlePropertyClick}
      className="
        group
        cursor-pointer
        overflow-hidden
      "
    >
      {/* IMAGE */}
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
          src={
            property.image ||
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
          }
          alt={property.title || "Property"}
          className="
            h-full
            w-full
            object-cover
            transition
            duration-500
            group-hover:scale-105
          "
        />

        {/* FAVORITE */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          className="
            absolute
            right-4
            top-4
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white/95
            shadow-md
            transition
            hover:scale-105
          "
        >
          <Heart
            size={19}
            className="text-gray-700"
          />
        </button>

        {/* PROPERTY TYPE */}
        {property.property_type && (
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
            "
          >
            {property.property_type}
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="mt-4">

        {/* TITLE + RATING */}
        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
        >
          <h3
            className="
              line-clamp-1
              text-base
              font-semibold
              text-gray-900
            "
          >
            {property.title || "Untitled Property"}
          </h3>

          <div
            className="
              flex
              shrink-0
              items-center
              gap-1
              text-sm
              text-gray-500
            "
          >
            <Star size={14} />

            <span>New</span>
          </div>
        </div>

        {/* LOCATION */}
        <div
          className="
            mt-1
            flex
            items-center
            gap-1
            text-sm
            text-gray-500
          "
        >
          <MapPin size={14} />

          <span>
            {property.address || property.city || "Location unavailable"}
            {property.address && property.city
              ? `, ${property.city}`
              : ""}
          </span>
        </div>

        {/* PROPERTY INFO */}
        <div
          className="
            mt-2
            flex
            flex-wrap
            items-center
            gap-2
            text-sm
            text-gray-500
          "
        >
          <span>
            {property.max_guests || 0} guests
          </span>

          <span>·</span>

          <span>
            {property.bedrooms || 0} bedrooms
          </span>

          <span>·</span>

          <span>
            {property.bathrooms || 0} baths
          </span>
        </div>
      </div>
    </div>
  );
}

export default CustomerPropertyCard;