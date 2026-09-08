"use client";

import {
  Search,
  CalendarCheck,
  CreditCard,
  Loader2,
  ArrowRight,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomerReveal from "./CustomerReveal";
import apiClient from "../../api/apiClient";

const steps = [
  {
    icon: Search,
    title: "Search",
    description:
      "Choose your destination, dates and number of guests.",
    action: "search",
  },
  {
    
    icon: CalendarCheck,
    title: "Choose your stay",
    description:
      "Compare properties and choose the perfect place for your trip.",
    action: "choose",
  },
  {
    
    icon: CreditCard,
    title: "Book securely",
    description:
      "Complete your booking securely and enjoy your stay.",
    action: "book",
  },
];

function CustomerHowItWorks() {
  const navigate = useNavigate();

  const [loadingStep, setLoadingStep] = useState(null);
  const [error, setError] = useState("");

  const handleStepClick = async (step) => {
    if (loadingStep) return;

    setLoadingStep(step.number);
    setError("");

    try {
      /* =====================================================
         01. SEARCH
         Load properties from API
         ===================================================== */
      if (step.action === "search") {
        const response = await apiClient.get("/properties/");

        let properties = [];

        if (Array.isArray(response.data)) {
          properties = response.data;
        } else if (Array.isArray(response.data?.data)) {
          properties = response.data.data;
        } else if (Array.isArray(response.data?.properties)) {
          properties = response.data.properties;
        } else if (Array.isArray(response.data?.results)) {
          properties = response.data.results;
        }

        navigate("/properties", {
          state: {
            properties,
            fromHowItWorks: true,
          },
        });

        return;
      }

      /* =====================================================
         02. CHOOSE YOUR STAY
         Load properties + property images
         ===================================================== */
      if (step.action === "choose") {
        const [propertiesResponse, imagesResponse] =
          await Promise.all([
            apiClient.get("/properties/"),
            apiClient.get("/property-images/"),
          ]);

        let properties = [];
        let propertyImages = [];

        if (Array.isArray(propertiesResponse.data)) {
          properties = propertiesResponse.data;
        } else if (Array.isArray(propertiesResponse.data?.data)) {
          properties = propertiesResponse.data.data;
        } else if (
          Array.isArray(propertiesResponse.data?.properties)
        ) {
          properties = propertiesResponse.data.properties;
        } else if (
          Array.isArray(propertiesResponse.data?.results)
        ) {
          properties = propertiesResponse.data.results;
        }

        if (Array.isArray(imagesResponse.data)) {
          propertyImages = imagesResponse.data;
        } else if (Array.isArray(imagesResponse.data?.data)) {
          propertyImages = imagesResponse.data.data;
        } else if (Array.isArray(imagesResponse.data?.items)) {
          propertyImages = imagesResponse.data.items;
        } else if (Array.isArray(imagesResponse.data?.images)) {
          propertyImages = imagesResponse.data.images;
        } else if (
          Array.isArray(imagesResponse.data?.results)
        ) {
          propertyImages = imagesResponse.data.results;
        }

        navigate("/properties", {
          state: {
            properties,
            propertyImages,
            fromHowItWorks: true,
          },
        });

        return;
      }

      /* =====================================================
         03. BOOK SECURELY
         No property ID exists in this section.
         So open property listing first.
         User selects a property -> existing booking flow
         handles pricing + availability + booking.
         ===================================================== */
      if (step.action === "book") {
        const response = await apiClient.get("/properties/");

        let properties = [];

        if (Array.isArray(response.data)) {
          properties = response.data;
        } else if (Array.isArray(response.data?.data)) {
          properties = response.data.data;
        } else if (Array.isArray(response.data?.properties)) {
          properties = response.data.properties;
        } else if (Array.isArray(response.data?.results)) {
          properties = response.data.results;
        }

        navigate("/properties", {
          state: {
            properties,
            startBookingFlow: true,
            fromHowItWorks: true,
          },
        });
      }
    } catch (err) {
      console.error(
        "How It Works API error:",
        err?.response?.data || err?.message || err
      );

      setError(
        err?.response?.data?.detail ||
          err?.response?.data?.message ||
          "Unable to load properties. Please try again."
      );
    } finally {
      setLoadingStep(null);
    }
  };

  return (
    <section className=" py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <CustomerReveal>
          <div className="text-center">
            <p className="text-sm font-semibold text-[#e61e4d]">
              SIMPLE PROCESS
            </p>

            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              How it works
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500">
              Find your perfect stay and book your trip in just a
              few simple steps.
            </p>
          </div>
        </CustomerReveal>

        {/* Steps */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLoading = loadingStep === step.number;

            return (
              <CustomerReveal
                key={step.number}
                delay={index * 0.1}
              >
                <button
                  type="button"
                  onClick={() => handleStepClick(step)}
                  disabled={Boolean(loadingStep)}
                  className="group relative w-full text-center"
                >
                  {/* Connecting line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[calc(50%+42px)] top-8 hidden h-px w-[calc(100%-84px)] bg-gray-200 md:block" />
                  )}

                  {/* Icon */}
                  <div
                    className={`relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#123d78] text-white shadow-lg transition-all duration-300 ${
                      isLoading
                        ? "scale-105"
                        : "group-hover:-translate-y-1 group-hover:shadow-xl"
                    }`}
                  >
                    {isLoading ? (
                      <Loader2
                        size={25}
                        className="animate-spin"
                      />
                    ) : (
                      <Icon size={25} />
                    )}
                  </div>

                  {/* Number */}
                  <span className="mt-4 block text-xs font-bold text-[#e61e4d]">
                    {step.number}
                  </span>

                  {/* Title */}
                  <h3 className="mt-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-[#123d78]">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-gray-500">
                    {step.description}
                  </p>

                  {/* Click action */}
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#123d78] opacity-0 transition-all duration-300 group-hover:opacity-100">
                    {isLoading ? "Loading..." : "Continue"}

                    {!isLoading && (
                      <ArrowRight
                        size={13}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    )}
                  </span>
                </button>
              </CustomerReveal>
            );
          })}
        </div>

        {/* API Error */}
        {error && (
          <div className="mx-auto mt-8 max-w-lg rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
            {error}
          </div>
        )}
      </div>
    </section>
  );
}

export default CustomerHowItWorks;