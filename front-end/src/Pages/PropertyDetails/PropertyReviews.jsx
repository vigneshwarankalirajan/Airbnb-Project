import React from "react";
import { Star } from "lucide-react";

const PropertyReviews = ({
  property,
  rating,
}) => {
  const reviews =
    property?.reviews ||
    property?.property_reviews ||
    [];

  return (
    <section className="border-b border-gray-200 py-8">

      <div className="flex items-center gap-2">

        <Star
          size={22}
          fill="currentColor"
        />

        <h2 className="text-2xl font-bold">
          {rating} ·{" "}
          {reviews.length || 0} reviews
        </h2>

      </div>

      {reviews.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">

          {reviews
            .slice(0, 6)
            .map((review, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 p-5"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-bold">
                    {(
                      review?.user_name ||
                      review?.name ||
                      "G"
                    ).charAt(0)}
                  </div>

                  <div>

                    <p className="font-semibold">
                      {review?.user_name ||
                        review?.name ||
                        "Guest"}
                    </p>

                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <Star
                            key={star}
                            size={12}
                            fill="currentColor"
                          />
                        )
                      )}
                    </div>

                  </div>

                </div>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {review?.comment ||
                    review?.review ||
                    review?.message ||
                    "Great stay and experience."}
                </p>

              </div>
            ))}

        </div>
      ) : (
        <div className="mt-6 rounded-2xl bg-gray-50 p-6 text-center">

          <p className="font-medium text-gray-700">
            No reviews yet
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Be the first guest to review this property.
          </p>

        </div>
      )}

    </section>
  );
};

export default PropertyReviews;