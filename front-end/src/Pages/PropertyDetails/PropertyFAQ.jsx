import React, {
  useState,
} from "react";
import {
  ChevronDown,
} from "lucide-react";

const PropertyFAQ = ({
  property,
}) => {
  const [openIndex, setOpenIndex] =
    useState(null);

  const faqs =
    property?.faqs ||
    property?.faq ||
    [
      {
        question:
          "What time is check-in?",
        answer:
          "Standard check-in starts after 2:00 PM.",
      },
      {
        question:
          "What time is check-out?",
        answer:
          "Standard check-out is before 11:00 AM.",
      },
      {
        question:
          "Is this property suitable for families?",
        answer:
          "Yes. This property is suitable for families and groups.",
      },
      {
        question:
          "Is WiFi available?",
        answer:
          "WiFi availability depends on the property configuration.",
      },
      {
        question:
          "Can I cancel my booking?",
        answer:
          "Cancellation depends on the property's cancellation policy.",
      },
    ];

  return (
    <section className="py-8">

      <h2 className="text-2xl font-bold">
        Frequently asked questions
      </h2>

      <div className="mt-6 divide-y rounded-2xl border">

        {faqs.map(
          (faq, index) => {

            const question =
              faq?.question ||
              faq?.title ||
              "Question";

            const answer =
              faq?.answer ||
              faq?.description ||
              "Please contact support for more information.";

            const open =
              openIndex === index;

            return (
              <div key={index}>

                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(
                      open
                        ? null
                        : index
                    )
                  }
                  className="flex w-full items-center justify-between px-5 py-5 text-left"
                >

                  <span className="font-medium text-gray-800">
                    {question}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`transition ${
                      open
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>

                {open && (
                  <div className="px-5 pb-5 text-sm leading-7 text-gray-500">
                    {answer}
                  </div>
                )}

              </div>
            );
          }
        )}

      </div>

    </section>
  );
};

export default PropertyFAQ;