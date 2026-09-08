"use client";

import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomerReveal from "./CustomerReveal";

function CustomerBecomeHost() {
  const navigate = useNavigate();

  const handleBecomeHost = () => {
    navigate("/become-host");
  };

  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <CustomerReveal>
          <div className="grid overflow-hidden rounded-3xl bg-gray-900 lg:grid-cols-2">

            {/* Image */}
            <div className="relative min-h-[320px]">
              <img
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85"
                alt="Become a host"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex items-center p-8 text-white sm:p-12">
              <div>

                <p className="text-sm font-semibold text-pink-300">
                  BECOME A HOST
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Turn your property into an opportunity
                </h2>

                <p className="mt-4 text-sm leading-6 text-gray-300">
                  Share your space with travelers and earn income
                  while helping guests discover amazing stays.
                </p>

                <button
                  type="button"
                  onClick={handleBecomeHost}
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
                    text-gray-900
                    transition
                    hover:bg-gray-200
                  "
                >
                  Start hosting
                  <ArrowRight size={16} />
                </button>

              </div>
            </div>

          </div>
        </CustomerReveal>

      </div>
    </section>
  );
}

export default CustomerBecomeHost;