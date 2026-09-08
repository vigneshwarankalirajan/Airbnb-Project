"use client";

import { useEffect, useState } from "react";
import { Star, Loader2 } from "lucide-react";

import CustomerReveal from "./CustomerReveal";
import apiClient from "../../api/apiClient";

function CustomerTestimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiClient.get("/reviews/");

        console.log("REVIEWS API RESPONSE:", response.data);

        let reviewData = [];

        if (Array.isArray(response.data)) {
          reviewData = response.data;
        } else if (Array.isArray(response.data?.data)) {
          reviewData = response.data.data;
        } else if (Array.isArray(response.data?.reviews)) {
          reviewData = response.data.reviews;
        } else if (Array.isArray(response.data?.results)) {
          reviewData = response.data.results;
        }

        // Only active reviews
        const activeReviews = reviewData
          .filter((review) => review?.status === "active")
          .sort((a, b) => {
            const dateA = new Date(a?.created_at || 0);
            const dateB = new Date(b?.created_at || 0);

            return dateB - dateA;
          })
          .slice(0, 3);

        setReviews(activeReviews);
      } catch (err) {
        console.error(
          "Reviews API Error:",
          err?.response?.data || err?.message || err
        );

        setError(
          err?.response?.data?.detail ||
            err?.response?.data?.message ||
            "Unable to load guest reviews."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className=" py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <CustomerReveal>
          <div className="text-center">
            <p className="text-sm font-semibold text-[#e61e4d]">
              GUEST REVIEWS
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              What our guests say
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500">
              See what our guests have to say about their experience.
            </p>
          </div>
        </CustomerReveal>

        {/* LOADING */}
        {loading && (
          <div className="mt-10 flex justify-center">
            <Loader2
              size={30}
              className="animate-spin text-[#123d78]"
            />
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="mx-auto mt-10 max-w-lg rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {/* NO REVIEWS */}
        {!loading && !error && reviews.length === 0 && (
          <div className="mx-auto mt-10 max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-gray-500">
              No guest reviews available yet.
            </p>
          </div>
        )}

        {/* REVIEWS */}
        {!loading && !error && reviews.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">

            {reviews.map((review, index) => {

              const rating = Number(review.rating || 0);

              return (
                <CustomerReveal
                  key={review.id}
                  delay={index * 0.08}
                >
                  <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">

                    {/* STARS */}
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          fill={
                            star <= Math.round(rating)
                              ? "currentColor"
                              : "none"
                          }
                          className={
                            star <= Math.round(rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>

                    {/* REVIEW TEXT */}
                    <p className="mt-5 text-sm leading-7 text-gray-600">
                      "{review.review_text || "Great experience!"}"
                    </p>

                    {/* REVIEWER */}
                    <div className="mt-6">

                      <p className="font-semibold text-gray-900">
                        Guest #{review.reviewer_id}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Property #{review.property_id}
                      </p>

                    </div>

                  </div>
                </CustomerReveal>
              );
            })}

          </div>
        )}
      </div>
    </section>
  );
}

export default CustomerTestimonials;