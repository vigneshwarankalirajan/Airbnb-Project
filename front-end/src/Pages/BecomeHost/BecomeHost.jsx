import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

function BecomeHost() {
  const navigate = useNavigate();

  const features = [
    "Create your property listing",
    "Add photos and amenities",
    "Set your price and availability",
    "Review and publish your property",
  ];

  return (
    <div className="min-h-screen w-full bg-white">

      {/* ================= HEADER ================= */}
      <header className="w-full border-b border-gray-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-8">

          {/* LOGO */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex shrink-0 items-center gap-2 text-lg font-bold text-[#123d78] transition hover:opacity-80 sm:text-xl"
          >
            <Home
              size={22}
              strokeWidth={2}
              className="shrink-0"
            />

            <span>Airbnb</span>
          </button>

          {/* EXIT */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="shrink-0 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 sm:px-5"
          >
            Exit
          </button>

        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="w-full">

        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

          <div className="grid w-full grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">

            {/* ================= LEFT CONTENT ================= */}
            <div className="min-w-0 w-full">

              {/* LABEL */}
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e61e4d] sm:text-sm">
                Become a Host
              </p>

              {/* TITLE */}
              <h1 className="mt-3 text-3xl font-bold leading-[1.15] tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Share your space,
                <br className="hidden sm:block" />
                earn from your home
              </h1>

              {/* DESCRIPTION */}
              <p className="mt-4 max-w-xl text-base leading-7 text-gray-500 sm:mt-5 sm:text-lg sm:leading-8">
                List your property and welcome guests
                from around the world.
              </p>

              {/* ================= FEATURES ================= */}
              <div className="mt-6 space-y-4 sm:mt-8">

                {features.map((item) => (
                  <div
                    key={item}
                    className="flex w-full items-start gap-3"
                  >
                    <CheckCircle
                      size={21}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-green-600"
                    />

                    <span className="min-w-0 text-sm leading-6 text-gray-700 sm:text-base">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

              {/* ================= BUTTON ================= */}
              <button
                type="button"
                onClick={() =>
                  navigate("/become-host/property")
                }
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-[#e61e4d] px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#d91545] active:scale-[0.99] sm:mt-10 sm:w-fit sm:text-base"
              >
                <span>Get started</span>

                <ArrowRight
                  size={20}
                  strokeWidth={2}
                  className="shrink-0"
                />
              </button>

            </div>

            {/* ================= IMAGE ================= */}
            <div className="w-full min-w-0 overflow-hidden rounded-2xl bg-gray-100 sm:rounded-3xl">

              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                alt="Become a host"
                className="block h-64 w-full object-cover sm:h-80 md:h-96 lg:h-[500px]"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                  event.currentTarget.parentElement.classList.add(
                    "flex",
                    "items-center",
                    "justify-center"
                  );
                }}
              />

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default BecomeHost;