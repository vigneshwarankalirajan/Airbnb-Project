import { useNavigate } from "react-router-dom";

import {
  Home,
  House,
  Building2,
  Hotel,
  TentTree,
  Palmtree,
  Waves,
  Trees,
  Tractor,
  Crown,
  Droplets,
  Landmark,
  TreesIcon,
  BedDouble,
  ChevronRight,
} from "lucide-react";

import CustomerReveal from "./CustomerReveal";

const categories = [
  {
    label: "All",
    slug: "all",
    icon: Home,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=85",
  },
  {
    label: "Houses",
    slug: "houses",
    icon: House,
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=85",
  },
  {
    label: "Apartments",
    slug: "apartments",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=85",
  },
  {
    label: "Villas",
    slug: "villas",
    icon: House,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=700&q=85",
  },
  {
    label: "Hotels",
    slug: "hotels",
    icon: Hotel,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=85",
  },
  {
    label: "Cabins",
    slug: "cabins",
    icon: TentTree,
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=700&q=85",
  },
  {
    label: "Beachfront",
    slug: "beachfront",
    icon: Palmtree,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=85",
  },
  {
    label: "Amazing Pools",
    slug: "amazing-pools",
    icon: Waves,
    image:
      "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=700&q=85",
  },
  {
    label: "Countryside",
    slug: "countryside",
    icon: Trees,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=85",
  },
  {
    label: "Farms",
    slug: "farms",
    icon: Tractor,
    image:
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=700&q=85",
  },
  {
    label: "Luxury",
    slug: "luxury",
    icon: Crown,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=85",
  },
  {
    label: "Lakefront",
    slug: "lakefront",
    icon: Droplets,
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=700&q=85",
  },
  {
    label: "City",
    slug: "city",
    icon: Landmark,
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=700&q=85",
  },
  {
    label: "Nature",
    slug: "nature",
    icon: TreesIcon,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=700&q=85",
  },
  {
    label: "Rooms",
    slug: "rooms",
    icon: BedDouble,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=700&q=85",
  },
];

function CustomerCategories() {
  const navigate = useNavigate();

  const handleExplore = (category) => {
    navigate(
      `/category-properties?category=${encodeURIComponent(
        category.slug
      )}`
    );
  };

  return (
    <section className="bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-8">

        {/* =========================
            HEADER
        ========================= */}

        <CustomerReveal>
          <div className="mb-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e61e4d]">
              Stay your way
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Browse by property type
            </h2>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Choose the perfect stay for your trip
            </p>
          </div>
        </CustomerReveal>

        {/* =========================
            15 CATEGORY CARDS

            DESKTOP:
            5 columns × 3 rows

            TABLET:
            3 columns

            MOBILE:
            2 columns
        ========================= */}

        <div
          className="
            grid
            grid-cols-2
            gap-4
            sm:grid-cols-3
            lg:grid-cols-5
            lg:gap-5
          "
        >
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <CustomerReveal
                key={category.slug}
                delay={index * 0.04}
              >
                <div
                  className="
                    group
                    relative
                    h-[220px]
                    overflow-hidden
                    rounded-[20px]
                    bg-gray-200
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                    sm:h-[235px]
                    lg:h-[345px]
                  "
                >
                  {/* =========================
                      BACKGROUND IMAGE
                  ========================= */}

                  <img
                    src={category.image}
                    alt={category.label}
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                    "
                    loading="lazy"
                  />

                  {/* =========================
                      DARK GRADIENT
                  ========================= */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/85
                      via-black/30
                      to-black/5
                    "
                  />

                  {/* =========================
                      ICON
                  ========================= */}

                  <div
                    className="
                      absolute
                      left-4
                      top-4
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-white/95
                      text-gray-800
                      shadow-md
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      group-hover:scale-105
                    "
                  >
                    <Icon
                      size={19}
                      strokeWidth={2}
                    />
                  </div>

                  {/* =========================
                      ALL BADGE
                  ========================= */}

                  {category.slug === "all" && (
                    <span
                      className="
                        absolute
                        right-4
                        top-4
                        rounded-full
                        bg-[#e61e4d]
                        px-3
                        py-1
                        text-[10px]
                        font-bold
                        text-white
                        shadow-md
                      "
                    >
                      All
                    </span>
                  )}

                  {/* =========================
                      BOTTOM CONTENT
                  ========================= */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      right-0
                      p-4
                    "
                  >
                    <h3
                      className="
                        text-lg
                        font-bold
                        leading-tight
                        text-white
                        drop-shadow-md
                        sm:text-xl
                      "
                    >
                      {category.label}
                    </h3>

                    {/* =====================
                        EXPLORE STAYS
                    ===================== */}

                    <button
                      type="button"
                      onClick={() =>
                        handleExplore(category)
                      }
                      className="
                        mt-2
                        flex
                        items-center
                        gap-1
                        text-xs
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        hover:gap-2
                      "
                    >
                      Explore stays

                      <ChevronRight
                        size={15}
                        strokeWidth={2.5}
                      />
                    </button>
                  </div>
                </div>
              </CustomerReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CustomerCategories;