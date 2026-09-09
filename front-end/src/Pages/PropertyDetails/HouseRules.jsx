import React from "react";
import { Check } from "lucide-react";

const HouseRules = ({
  rules = [],
}) => {
  const fallbackRules = [
    "Check-in after 2:00 PM",
    "Check-out before 11:00 AM",
    "No smoking inside",
    "No parties or events",
  ];

  const list =
    rules.length > 0
      ? rules
      : fallbackRules;

  return (
    <section className="border-b border-gray-200 py-8">

      <h2 className="text-2xl font-bold">
        House rules
      </h2>

      <div className="mt-5 space-y-4">

        {list.map((rule, index) => {

          const text =
            typeof rule === "string"
              ? rule
              : rule?.name ||
                rule?.rule ||
                rule?.title ||
                "House rule";

          return (
            <div
              key={index}
              className="flex items-center gap-3 text-gray-600"
            >
              <Check
                size={18}
                className="text-[#123d78]"
              />

              {text}
            </div>
          );
        })}

      </div>

    </section>
  );
};

export default HouseRules;