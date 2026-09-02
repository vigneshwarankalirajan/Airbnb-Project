"use client";

import { ArrowRight, Tag } from "lucide-react";
import CustomerReveal from "./CustomerReveal";

function CustomerSpecialOffers() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <CustomerReveal>
          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              bg-[#123d78]
              px-6
              py-10
              text-white
              sm:px-10
              lg:px-14
            "
          >
            <div className="relative z-10 max-w-xl">
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-200">
                <Tag size={17} />
                SPECIAL OFFER
              </div>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Save more on your next stay
              </h2>

              <p className="mt-4 text-sm leading-6 text-blue-100">
                Discover selected properties with exclusive discounts
                and limited-time offers.
              </p>

              <button
                className="
                  mt-7
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-[#123d78]
                  transition
                  hover:bg-gray-100
                "
              >
                Explore deals
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="absolute -right-10 -top-20 h-72 w-72 rounded-full bg-white/10" />
            <div className="absolute -bottom-32 right-40 h-72 w-72 rounded-full bg-white/10" />
          </div>
        </CustomerReveal>

      </div>
    </section>
  );
}

export default CustomerSpecialOffers;