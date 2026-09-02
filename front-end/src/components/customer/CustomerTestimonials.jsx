"use client";

import { Star } from "lucide-react";
import CustomerReveal from "./CustomerReveal";

const reviews = [
  {
    name: "Priya",
    location: "Chennai",
    review:
      "The booking process was simple and the property was exactly as shown.",
  },
  {
    name: "Rahul",
    location: "Bangalore",
    review:
      "Great experience. Easy search, good prices and excellent support.",
  },
  {
    name: "Ananya",
    location: "Mumbai",
    review:
      "Found a beautiful stay for our family trip within our budget.",
  },
];

function CustomerTestimonials() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <CustomerReveal>
          <div className="text-center">
            <p className="text-sm font-semibold text-[#e61e4d]">
              GUEST REVIEWS
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              What our guests say
            </h2>
          </div>
        </CustomerReveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <CustomerReveal
              key={review.name}
              delay={index * 0.08}
            >
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex gap-1 text-yellow-500">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={15}
                      fill="currentColor"
                    />
                  ))}
                </div>

                <p className="mt-5 text-sm leading-6 text-gray-600">
                  “{review.review}”
                </p>

                <div className="mt-6">
                  <p className="text-sm font-bold text-gray-900">
                    {review.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {review.location}
                  </p>
                </div>
              </div>
            </CustomerReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomerTestimonials;