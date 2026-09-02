"use client";

import {
  ShieldCheck,
  Headphones,
  BadgeDollarSign,
  Sparkles,
} from "lucide-react";

import CustomerReveal from "./CustomerReveal";

const items = [
  {
    icon: ShieldCheck,
    title: "Secure booking",
    description: "Your booking and payment information stay protected.",
  },
  {
    icon: BadgeDollarSign,
    title: "Best prices",
    description: "Find competitive prices for every type of stay.",
  },
  {
    icon: Headphones,
    title: "24/7 support",
    description: "Our support team is ready whenever you need help.",
  },
  {
    icon: Sparkles,
    title: "Quality stays",
    description: "Discover comfortable and trusted properties.",
  },
];

function CustomerWhyChooseUs() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <CustomerReveal>
          <div className="text-center">
           
            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              Why choose us?
            </h2>
          </div>
        </CustomerReveal>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <CustomerReveal
                key={item.title}
                delay={index * 0.08}
              >
                <div className="rounded-2xl border border-gray-200 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-[#123d78]">
                    <Icon size={25} />
                  </div>

                  <h3 className="mt-5 font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>
                </div>
              </CustomerReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CustomerWhyChooseUs;