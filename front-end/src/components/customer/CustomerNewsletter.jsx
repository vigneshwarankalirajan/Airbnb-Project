"use client";

import { ArrowRight } from "lucide-react";
import CustomerReveal from "./CustomerReveal";

function CustomerNewsletter() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <CustomerReveal>
          <div className="rounded-3xl bg-[#eaf8fc] px-6 py-10 text-center sm:px-10">

            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Get travel inspiration in your inbox
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500">
              Discover new destinations, special offers and
              beautiful stays.
            </p>

            <div className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="
                  h-12
                  flex-1
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-4
                  text-sm
                  outline-none
                  focus:border-[#123d78]
                "
              />

              <button
                className="
                  flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#123d78]
                  px-6
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-[#0d315f]
                "
              >
                Subscribe
                <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </CustomerReveal>

      </div>
    </section>
  );
}

export default CustomerNewsletter;