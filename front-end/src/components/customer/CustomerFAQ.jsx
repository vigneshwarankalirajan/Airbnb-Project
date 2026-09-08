"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import CustomerReveal from "./CustomerReveal";

const faqs = [
  {
    question: "How do I book a property?",
    answer:
      "Choose your location, dates and number of guests, then select a property and complete the booking.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Cancellation depends on the cancellation policy of the selected property.",
  },
  {
    question: "Are payments secure?",
    answer:
      "Yes. Payments are processed through secure payment methods.",
  },
  {
    question: "Can I become a host?",
    answer:
      "Yes. Property owners can create listings and manage their bookings.",
  },
];

function CustomerFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">

        <CustomerReveal>
          <div className="text-center">
            

            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              Frequently asked questions?
            </h2>
          </div>
        </CustomerReveal>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index;

            return (
              <CustomerReveal
                key={faq.question}
                delay={index * 0.05}
              >
                <div className="rounded-xl border border-gray-200">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex(open ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="text-sm font-semibold text-gray-900">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`shrink-0 transition ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {open && (
                    <div className="border-t px-5 py-4">
                      <p className="text-sm leading-6 text-gray-500">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              </CustomerReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CustomerFAQ;