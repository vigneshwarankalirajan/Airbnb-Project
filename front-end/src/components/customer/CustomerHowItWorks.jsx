"use client";

import {
  Search,
  CalendarCheck,
  CreditCard,
  Home,
} from "lucide-react";

import CustomerReveal from "./CustomerReveal";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search",
    description: "Choose your destination and travel dates.",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Choose your stay",
    description: "Compare properties and find your perfect stay.",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Book securely",
    description: "Complete your booking with secure payment.",
  },
  {
    number: "04",
    icon: Home,
    title: "Enjoy your stay",
    description: "Check in and enjoy your trip.",
  },
];

function CustomerHowItWorks() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <CustomerReveal>
          <div className="text-center">
            <p className="text-sm font-semibold text-[#e61e4d]">
              SIMPLE PROCESS
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              How it works
            </h2>
          </div>
        </CustomerReveal>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <CustomerReveal
                key={step.number}
                delay={index * 0.1}
              >
                <div className="relative text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#123d78] text-white shadow-lg">
                    <Icon size={25} />
                  </div>

                  <span className="mt-4 block text-xs font-bold text-[#e61e4d]">
                    {step.number}
                  </span>

                  <h3 className="mt-2 font-bold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {step.description}
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

export default CustomerHowItWorks;