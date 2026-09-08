
import { useEffect, useState } from "react";
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
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import CustomerReveal from "./CustomerReveal";

const categories = [
  {
    label: "All",
    slug: "all",
    icon: Home,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=90",
  },
  {
    label: "Houses",
    slug: "houses",
    icon: House,
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=90",
  },
  {
    label: "Apartments",
    slug: "apartments",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90",
  },
  {
    label: "Villas",
    slug: "villas",
    icon: House,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=90",
  },
  {
    label: "Hotels",
    slug: "hotels",
    icon: Hotel,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=90",
  },
  {
    label: "Cabins",
    slug: "cabins",
    icon: TentTree,
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1400&q=90",
  },
  {
    label: "Beachfront",
    slug: "beachfront",
    icon: Palmtree,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=90",
  },
  {
    label: "Amazing Pools",
    slug: "amazing-pools",
    icon: Waves,
    image:
      "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=1400&q=90",
  },
  {
    label: "Countryside",
    slug: "countryside",
    icon: Trees,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=90",
  },
  {
    label: "Farms",
    slug: "farms",
    icon: Tractor,
    image:
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1400&q=90",
  },
  {
    label: "Luxury",
    slug: "luxury",
    icon: Crown,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=90",
  },
  {
    label: "Lakefront",
    slug: "lakefront",
    icon: Droplets,
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=90",
  },
  {
    label: "City",
    slug: "city",
    icon: Landmark,
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1400&q=90",
  },
  {
    label: "Nature",
    slug: "nature",
    icon: TreesIcon,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=90",
  },
  {
    label: "Rooms",
    slug: "rooms",
    icon: BedDouble,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=90",
  },
];

function CustomerCategories() {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /* =====================================================
     AUTOMATIC CATEGORY SLIDER
     Changes every 3.5 seconds
  ===================================================== */

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timer = setInterval(() => {
      setActiveIndex((current) => {
        if (current === categories.length - 1) {
          return 0;
        }

        return current + 1;
      });
    }, 3500);

    return () => {
      clearInterval(timer);
    };
  }, [isPaused]);

  /* =====================================================
     EXPLORE CATEGORY
  ===================================================== */

  const handleExplore = (category) => {
    navigate(
      `/category-properties?category=${encodeURIComponent(
        category.slug
      )}`
    );
  };

  /* =====================================================
     NEXT CATEGORY
  ===================================================== */

  const goNext = () => {
    setActiveIndex((current) => {
      if (current === categories.length - 1) {
        return 0;
      }

      return current + 1;
    });
  };

  /* =====================================================
     PREVIOUS CATEGORY
  ===================================================== */

  const goPrevious = () => {
    setActiveIndex((current) => {
      if (current === 0) {
        return categories.length - 1;
      }

      return current - 1;
    });
  };

  /* =====================================================
     SELECT CATEGORY
  ===================================================== */

  const selectCategory = (index) => {
    setActiveIndex(index);
  };

  const activeCategory = categories[activeIndex];

  const Icon = activeCategory.icon;

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <CustomerReveal>
          <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e61e4d]">
                Stay your way
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                Browse by property type
              </h2>

              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Discover stays that match your travel style
              </p>
            </div>

            {/* CATEGORY COUNTER */}

            <div className="flex items-center gap-2 text-sm font-semibold text-gray-400">
              <span className="text-gray-900">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>

              <span>/</span>

              <span>
                {String(categories.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </CustomerReveal>

        {/* =================================================
            MAIN CATEGORY
        ================================================= */}

        <CustomerReveal>
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >

            {/* =================================================
                LARGE CATEGORY CARD
            ================================================= */}

            <div className="group relative h-[430px] overflow-hidden rounded-[26px] bg-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:h-[500px] lg:h-[580px]">

              {/* =================================================
                  IMAGE
              ================================================= */}

              <img
                key={activeCategory.slug}
                src={activeCategory.image}
                alt={activeCategory.label}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  animate-category-image
                  transition-transform
                  duration-700
                  group-hover:scale-[1.04]
                "
              />

              {/* =================================================
                  DARK OVERLAY
              ================================================= */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/90
                  via-black/35
                  to-black/5
                "
              />

              {/* =================================================
                  TOP LEFT BADGE
              ================================================= */}

              <div className="absolute left-5 top-5 sm:left-7 sm:top-7">

                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">

                  <span className="h-2 w-2 rounded-full bg-[#e61e4d]" />

                  Featured stay category

                </div>
              </div>

              {/* =================================================
                  ICON
              ================================================= */}

              <div className="absolute right-5 top-5 sm:right-7 sm:top-7">

                <div
                  key={`icon-${activeCategory.slug}`}
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/20
                    bg-white/15
                    text-white
                    shadow-lg
                    backdrop-blur-xl
                    animate-category-content
                    sm:h-14
                    sm:w-14
                  "
                >
                  <Icon
                    size={23}
                    strokeWidth={1.8}
                  />
                </div>
              </div>

              {/* =================================================
                  CONTENT
              ================================================= */}

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">

                <div
                  key={`content-${activeCategory.slug}`}
                  className="max-w-2xl animate-category-content"
                >

                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                    Explore
                  </p>

                  <h3 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                    {activeCategory.label}
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                    Find beautiful{" "}
                    {activeCategory.label.toLowerCase()}{" "}
                    designed for comfortable and memorable stays.
                  </p>

                  {/* =================================================
                      EXPLORE BUTTON
                  ================================================= */}

                  <button
                    type="button"
                    onClick={() => handleExplore(activeCategory)}
                    className="
                      mt-6
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      bg-white
                      px-5
                      py-3
                      text-sm
                      font-bold
                      text-gray-900
                      shadow-lg
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:gap-3
                      hover:shadow-xl
                      active:scale-95
                    "
                  >
                    Explore stays

                    <ArrowRight
                      size={17}
                      strokeWidth={2.5}
                    />
                  </button>
                </div>
              </div>

              {/* =================================================
                  AUTO PROGRESS BAR
              ================================================= */}

              {!isPaused && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] overflow-hidden bg-white/20">

                  <div
                    key={`progress-${activeIndex}`}
                    className="h-full bg-white animate-category-progress"
                  />

                </div>
              )}
            </div>

            {/* =================================================
                PREVIOUS BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={goPrevious}
              aria-label="Previous category"
              className="
                absolute
                left-3
                top-1/2
                flex
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/30
                bg-black/25
                text-white
                shadow-lg
                backdrop-blur-md
                transition-all
                duration-300
                hover:scale-110
                hover:bg-black/50
                sm:left-5
                sm:h-12
                sm:w-12
              "
            >
              <ChevronLeft
                size={22}
                strokeWidth={2}
              />
            </button>

            {/* =================================================
                NEXT BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={goNext}
              aria-label="Next category"
              className="
                absolute
                right-3
                top-1/2
                flex
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/30
                bg-black/25
                text-white
                shadow-lg
                backdrop-blur-md
                transition-all
                duration-300
                hover:scale-110
                hover:bg-black/50
                sm:right-5
                sm:h-12
                sm:w-12
              "
            >
              <ChevronRight
                size={22}
                strokeWidth={2}
              />
            </button>
          </div>
        </CustomerReveal>

        {/* =================================================
            CATEGORY DOTS
        ================================================= */}

        <div className="mt-6 flex items-center justify-center gap-2">

          {categories.map((category, index) => (
            <button
              key={category.slug}
              type="button"
              aria-label={`Go to ${category.label}`}
              onClick={() => selectCategory(index)}
              className={`
                h-1.5
                rounded-full
                transition-all
                duration-500
                ${
                  index === activeIndex
                    ? "w-8 bg-[#e61e4d]"
                    : "w-1.5 bg-gray-300 hover:bg-gray-400"
                }
              `}
            />
          ))}

        </div>

        {/* =================================================
            CATEGORY NAME NAVIGATION
            DESKTOP ONLY
        ================================================= */}

        <div className="mt-5 hidden items-center justify-center gap-5 overflow-hidden lg:flex">

          {categories.map((category, index) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => selectCategory(index)}
              className={`
                whitespace-nowrap
                text-xs
                font-semibold
                transition-all
                duration-300
                ${
                  index === activeIndex
                    ? "text-[#e61e4d]"
                    : "text-gray-400 hover:text-gray-700"
                }
              `}
            >
              {category.label}
            </button>
          ))}

        </div>
      </div>

      {/* =================================================
          ANIMATIONS
      ================================================= */}

      <style>{`
        @keyframes categoryImage {
          0% {
            opacity: 0;
            transform: scale(1.08);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes categoryContent {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes categoryProgress {
          0% {
            width: 0%;
          }

          100% {
            width: 100%;
          }
        }

        .animate-category-image {
          animation: categoryImage 900ms ease-out;
        }

        .animate-category-content {
          animation: categoryContent 700ms ease-out;
        }

        .animate-category-progress {
          animation: categoryProgress 3.5s linear;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-category-image,
          .animate-category-content,
          .animate-category-progress {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

export default CustomerCategories;

