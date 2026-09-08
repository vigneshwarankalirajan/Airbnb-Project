
"use client";

import {
  ShieldCheck,
  Headphones,
  BadgeDollarSign,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import CustomerReveal from "./CustomerReveal";

const items = [
  {
    icon: ShieldCheck,
    number: "01",
    slug: "secure-booking",
    title: "Secure Booking",
    description:
      "Your booking and payment details are protected with a safe and trusted experience from start to finish.",
  },
  {
    icon: Headphones,
    number: "02",
    slug: "support",
    title: "24/7 Support",
    description:
      "Our dedicated support team is available whenever you need assistance before, during, or after your stay.",
  },
  {
    icon: BadgeDollarSign,
    number: "03",
    slug: "best-prices",
    title: "Best Prices",
    description:
      "Enjoy competitive prices and carefully selected stays that offer excellent value for your journey.",
  },
  {
    icon: Sparkles,
    number: "04",
    slug: "quality-stays",
    title: "Quality Stays",
    description:
      "Discover comfortable, beautiful and trusted properties selected to make every stay feel special.",
  },
];
function CustomerWhyChooseUs() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}
          <div>
            <CustomerReveal>
              <div>
                <p className="mb-6 text-[18px] font-bold uppercase tracking-[0.3em] text-[#FF6600]">
                  Why choose us
                </p>

                <h2 className="max-w-lg font-serif text-[46px] font-medium leading-[0.98] tracking-[-0.045em] text-[#142144] sm:text-[56px] lg:text-[68px]">
                  Stay with
                  <br />
                  <span className="text-[#FF6600]">
                    confidence.
                  </span>
                </h2>

                <div className="mt-8 h-px w-16 bg-[#FF6600]" />
              </div>
            </CustomerReveal>

            {/* =================================================
                VERTICAL FEATURES
            ================================================== */}
           <div className="mt-10">
  {items.map((item, index) => {
    const Icon = item.icon;

    return (
      <CustomerReveal
        key={item.title}
        delay={index * 0.08}
      >
        <button
          type="button"
          onClick={() =>
            navigate(`/why-choose-us/${item.slug}`)
          }
          className="
            group
            flex
            w-full
            items-start
            gap-5
            border-t
            border-[#dbe1ea]
            py-6
            text-left
            transition-all
            duration-300
            last:border-b
            hover:pl-2
            sm:gap-6
            sm:py-7
          "
        >
          {/* NUMBER */}
          <span
            className="
              mt-1
              w-10
              shrink-0
              font-serif
              text-[25px]
              font-medium
              leading-none
              text-[#FF6600]
              sm:w-12
              sm:text-[29px]
            "
          >
            {item.number}
          </span>

          {/* ICON */}
          <span
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#fff0e6]
              text-[#FF6600]
              transition-all
              duration-300
              group-hover:bg-[#FF6600]
              group-hover:text-white
              group-hover:scale-105
            "
          >
            <Icon
              size={21}
              strokeWidth={1.8}
            />
          </span>

          {/* TEXT CONTENT */}
          <div className="min-w-0 flex-1">
            {/* TITLE */}
            <h3
              className="
                font-serif
                text-[20px]
                font-bold
                leading-tight
                tracking-[-0.02em]
                text-[#142144]
                sm:text-[22px]
              "
            >
              {item.title}
            </h3>

            {/* DESCRIPTION */}
            <p
              className="
                mt-2
                block
                max-w-[480px]
                text-[13px]
                font-normal
                leading-[1.7]
                text-[#526079]
                opacity-100
                sm:text-[14px]
                sm:leading-6
              "
            >
              {item.description}
            </p>
          </div>

          {/* ARROW */}
          <ArrowUpRight
            size={19}
            strokeWidth={1.6}
            className="
              mt-1
              hidden
              shrink-0
              text-[#FF6600]
              transition-all
              duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1
              sm:block
            "
          />
        </button>
      </CustomerReveal>
    );
  })}
</div>
          </div>

          {/* =====================================================
              RIGHT IMAGE
          ====================================================== */}
          <CustomerReveal delay={0.15}>
            <div className="relative">

              {/* Image container */}
              <div
                className="
                  group
                  relative
                  h-[580px]
                  overflow-hidden
                  rounded-[3px]
                  sm:h-[760px]
                  lg:h-[880px]
                "
              >
                <img
                  src="/why choose image/image why choose.webp"
                  alt="Premium property interior"
                  className="
                    h-full
                    w-full
                    object-cover
                    object-center
                    transition-transform
                    duration-1000
                    ease-out
                    group-hover:scale-[1.025]
                  "
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#142144]/80 via-[#142144]/15 to-transparent" />

                {/* =================================================
                    PARAGRAPH ON IMAGE
                ================================================== */}
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10 lg:p-12">
                  <p
                    className="
                      max-w-lg
                      font-serif
                      text-[22px]
                      font-medium
                      leading-[1.3]
                      tracking-[-0.025em]
                      text-white
                      sm:text-[27px]
                      lg:text-[30px]
                    "
                  >
                    Every stay should feel effortless, memorable and
                    completely yours.
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <span className="h-px w-8 bg-white/70" />

                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80">
                      Your stay, our priority
                    </span>
                  </div>
                </div>

                {/* Image arrow */}
                <button
                  type="button"
                  onClick={() => navigate("/search")}
                  aria-label="Explore stays"
                  className="
                    absolute
                    right-6
                    top-6
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-[#FF6600]
                    shadow-xl
                    transition-all
                    duration-300
                    hover:scale-110
                    sm:right-8
                    sm:top-8
                  "
                >
                  <ArrowUpRight
                    size={19}
                    strokeWidth={1.7}
                  />
                </button>
              </div>

              {/* Small editorial text below image */}
              <div className="mt-6 flex items-start justify-between gap-5">
                <p className="max-w-sm text-[12px] leading-6 text-[#526079] sm:text-[13px]">
                  Thoughtfully selected properties, transparent pricing and
                  support from booking to checkout.
                </p>

                <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FF6600] sm:block">
                  04 reasons
                </span>
              </div>
            </div>
          </CustomerReveal>
        </div>
      </div>
    </section>
  );
}

export default CustomerWhyChooseUs;

