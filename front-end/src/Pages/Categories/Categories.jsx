import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Building2,
  Home,
  Hotel,
  Users,
  ArrowRight,
  Loader2,
  TentTree,
  Palmtree,
  Waves,
  Trees,
  Tractor,
  Crown,
  Droplets,
  Landmark,
  BedDouble,
  MapPin,
  Star,
  Heart,
  Bath,
  RefreshCw,
} from "lucide-react";

import { getCategories } from "../../api/categoriesApi";
import apiClient from "../../api/apiClient";

/* =========================================================
   CATEGORY IMAGES
========================================================= */

const categoryImages = {
  All:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85",

  Houses:
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=85",

  Apartments:
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",

  Villas:
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=85",

  Hotels:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85",

  Cabins:
    "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=900&q=85",

  Beachfront:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",

  "Amazing Pools":
    "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=900&q=85",

  Countryside:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=85",

  Farms:
    "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=900&q=85",

  Luxury:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",

  Lakefront:
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",

  City:
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=85",

  Nature:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=85",

  Rooms:
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=85",
};

/* =========================================================
   DESCRIPTIONS
========================================================= */

const descriptions = {
  All:
    "Explore all available stays and find the perfect place for your trip.",

  Houses:
    "Beautiful homes with comfort and privacy.",

  Apartments:
    "Comfortable and modern apartment stays.",

  Villas:
    "Private villas for relaxing getaways.",

  Hotels:
    "Comfortable hotel stays with great facilities.",

  Cabins:
    "Cozy cabins surrounded by peaceful nature.",

  Beachfront:
    "Relax in beautiful stays close to the beach.",

  "Amazing Pools":
    "Enjoy beautiful stays with amazing swimming pools.",

  Countryside:
    "Peaceful stays surrounded by countryside views.",

  Farms:
    "Relaxing farm stays close to nature.",

  Luxury:
    "Premium luxury stays with exceptional comfort.",

  Lakefront:
    "Beautiful stays with peaceful lake views.",

  City:
    "Modern stays in the heart of the city.",

  Nature:
    "Reconnect with nature in beautiful surroundings.",

  Rooms:
    "Comfortable private rooms for your stay.",
};

/* =========================================================
   DEFAULT CATEGORIES

   These are ALWAYS visible.
========================================================= */

const defaultCategories = [
  {
    name: "All",
    slug: "all",
  },

  {
    name: "Houses",
    slug: "houses",
  },

  {
    name: "Apartments",
    slug: "apartments",
  },

  {
    name: "Villas",
    slug: "villas",
  },

  {
    name: "Hotels",
    slug: "hotels",
  },

  {
    name: "Cabins",
    slug: "cabins",
  },

  {
    name: "Beachfront",
    slug: "beachfront",
  },

  {
    name: "Amazing Pools",
    slug: "amazing-pools",
  },

  {
    name: "Countryside",
    slug: "countryside",
  },

  {
    name: "Farms",
    slug: "farms",
  },

  {
    name: "Luxury",
    slug: "luxury",
  },

  {
    name: "Lakefront",
    slug: "lakefront",
  },

  {
    name: "City",
    slug: "city",
  },

  {
    name: "Nature",
    slug: "nature",
  },

  {
    name: "Rooms",
    slug: "rooms",
  },
];

/* =========================================================
   CATEGORY ALIASES
========================================================= */

const categoryAliases = {
  houses: [
    "house",
    "houses",
    "home",
    "homes",
    "independent house",
  ],

  apartments: [
    "apartment",
    "apartments",
    "flat",
    "flats",
    "studio",
  ],

  villas: [
    "villa",
    "villas",
    "private villa",
  ],

  hotels: [
    "hotel",
    "hotels",
    "resort",
    "resorts",
  ],

  cabins: [
    "cabin",
    "cabins",
    "cottage",
    "cottages",
  ],

  beachfront: [
    "beach",
    "beachfront",
    "beach front",
    "sea view",
    "ocean view",
    "oceanfront",
  ],

  "amazing pools": [
    "pool",
    "pools",
    "swimming pool",
    "private pool",
  ],

  countryside: [
    "countryside",
    "country side",
    "rural",
    "village",
  ],

  farms: [
    "farm",
    "farms",
    "farm stay",
    "farmhouse",
  ],

  luxury: [
    "luxury",
    "premium",
    "premium stay",
  ],

  lakefront: [
    "lake",
    "lakefront",
    "lake front",
    "lake view",
  ],

  city: [
    "city",
    "city center",
    "city centre",
    "urban",
  ],

  nature: [
    "nature",
    "forest",
    "jungle",
    "mountain",
    "mountains",
  ],

  rooms: [
    "room",
    "rooms",
    "private room",
    "bedroom",
  ],
};

/* =========================================================
   NORMALIZE
========================================================= */

const normalize = (value) => {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ");
};

/* =========================================================
   ICON
========================================================= */

const getCategoryIcon = (name) => {
  const value = normalize(name);

  if (value === "all") return Home;

  if (value.includes("house")) return Home;

  if (value.includes("villa")) return Home;

  if (value.includes("apartment")) {
    return Building2;
  }

  if (value.includes("hotel")) {
    return Hotel;
  }

  if (value.includes("cabin")) {
    return TentTree;
  }

  if (value.includes("beach")) {
    return Palmtree;
  }

  if (value.includes("pool")) {
    return Waves;
  }

  if (value.includes("country")) {
    return Trees;
  }

  if (value.includes("farm")) {
    return Tractor;
  }

  if (value.includes("luxury")) {
    return Crown;
  }

  if (value.includes("lake")) {
    return Droplets;
  }

  if (value.includes("city")) {
    return Landmark;
  }

  if (value.includes("nature")) {
    return Trees;
  }

  if (value.includes("room")) {
    return BedDouble;
  }

  return Building2;
};

/* =========================================================
   COMPONENT
========================================================= */

function Categories() {
  const navigate = useNavigate();

  {/* =========================================================
    CATEGORIES
========================================================= */}

<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14">
  <div className="mb-7 flex items-end justify-between gap-4">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#123d78]">
        Explore by category
      </p>

      <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#10213f]">
        Find the perfect stay
      </h2>

      <p className="mt-2 text-sm sm:text-base text-gray-500">
        Choose a category and explore stays that match your trip.
      </p>
    </div>

    <span className="hidden sm:flex items-center rounded-full bg-[#eef4fb] px-4 py-2 text-sm font-semibold text-[#123d78]">
      {categories.length} Categories
    </span>
  </div>

  {/* ALL CATEGORIES ALWAYS VISIBLE */}
  <div
    className="
      grid
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-4
      lg:grid-cols-5
      xl:grid-cols-6
      2xl:grid-cols-7
      gap-4
      sm:gap-5
    "
  >
    {categories.map((category, index) => {
      const name =
        category?.name ||
        category?.title ||
        category?.category_name ||
        `Category ${index + 1}`;

      const Icon = getCategoryIcon(name);

      const image =
        categoryImages[name] ||
        categoryImages[
          Object.keys(categoryImages).find(
            (key) =>
              key.toLowerCase() === name.toLowerCase()
          )
        ] ||
        categoryImages.All;

      const description =
        descriptions[name] ||
        "Explore beautiful stays in this category.";

      const isSelected =
        selectedCategory?.toLowerCase() ===
        name.toLowerCase();

      return (
        <button
          key={`${name}-${index}`}
          type="button"
          onClick={() => handleCategoryClick(category)}
          className={`
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            text-left
            transition-all
            duration-300
            focus:outline-none
            focus:ring-2
            focus:ring-[#123d78]
            focus:ring-offset-2
            ${
              isSelected
                ? "border-[#123d78] bg-white shadow-xl shadow-[#123d78]/15"
                : "border-gray-200 bg-white shadow-sm hover:-translate-y-1 hover:border-[#123d78]/30 hover:shadow-xl"
            }
          `}
        >
          {/* IMAGE */}
          <div className="relative h-36 sm:h-40 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-110
              "
              loading="lazy"
            />

            {/* IMAGE OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* ICON */}
            <div
              className={`
                absolute
                left-3
                top-3
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                backdrop-blur-md
                transition-all
                duration-300
                ${
                  isSelected
                    ? "bg-[#123d78] text-white"
                    : "bg-white/90 text-[#123d78] group-hover:bg-[#123d78] group-hover:text-white"
                }
              `}
            >
              <Icon size={20} strokeWidth={2} />
            </div>

            {/* SELECTED */}
            {isSelected && (
              <div className="absolute right-3 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#123d78] shadow-md">
                Selected
              </div>
            )}

            {/* CATEGORY NAME ON IMAGE */}
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="text-base font-bold text-white sm:text-lg">
                {name}
              </h3>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-4">
            <p className="min-h-[42px] text-xs leading-5 text-gray-500 sm:text-sm">
              {description}
            </p>

            <div
              className={`
                mt-4
                flex
                items-center
                justify-between
                text-xs
                font-semibold
                transition-colors
                ${
                  isSelected
                    ? "text-[#123d78]"
                    : "text-gray-500 group-hover:text-[#123d78]"
                }
              `}
            >
              <span>
                Explore stays
              </span>

              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-100
                  transition-all
                  duration-300
                  group-hover:bg-[#123d78]
                  group-hover:text-white
                "
              >
                <ArrowRight size={15} />
              </span>
            </div>
          </div>
        </button>
      );
    })}
  </div>
</section>

}

export default Categories;