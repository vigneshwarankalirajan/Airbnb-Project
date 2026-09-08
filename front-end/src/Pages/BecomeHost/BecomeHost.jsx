import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  ArrowRight,
  CheckCircle,
  BadgeCheck,
  Camera,
  CalendarDays,
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
    <div className="min-h-screen w-full bg-[#fbfbfb] text-[#303030]">

      {/* ================= HEADER ================= */}
      <header className="w-full border-b border-[#e4e4e4] bg-white">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8 sm:py-5">

          {/* LOGO */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex shrink-0 items-center gap-2 text-lg font-bold text-black transition hover:opacity-70 sm:text-xl"
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
            className="shrink-0 rounded-full border border-[#303030] bg-white px-4 py-2 text-sm font-semibold text-[#303030] transition hover:bg-[#f2f2f2] sm:px-5"
          >
            Exit
          </button>

        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="w-full">

        <div className="mx-auto w-full max-w-[1400px] px-5 py-10 sm:px-8 sm:py-16">

          <div className="mx-auto max-w-[1000px] text-center">

            {/* ================= LEFT CONTENT ================= */}
            <div className="w-full">

              {/* LABEL */}
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4081ff] sm:text-sm">
                Become a Host
              </p>

              {/* TITLE */}
              <h1 className="mt-3 text-4xl font-semibold leading-[1.08] tracking-tight text-[#101010] sm:text-5xl lg:text-6xl">
                Turn your space into a stay
              </h1>

              {/* DESCRIPTION */}
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#535353] sm:text-lg">
                Share a place people will remember and build a flexible source of income from your home.
              </p>

              {/* ================= FEATURES ================= */}
              <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-3 sm:gap-4">

                {[
                  { icon: BadgeCheck, text: "Trusted guests" },
                  { icon: Camera, text: "Beautiful listing" },
                  { icon: CalendarDays, text: "Flexible hosting" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-3 rounded-[10px] border border-[#e4e4e4] bg-white px-4 py-4 shadow-sm"
                  >
                    <Icon size={20} strokeWidth={1.8} className="shrink-0 text-[#4081ff]" />

                    <span className="text-sm font-semibold text-[#303030]">
                      {text}
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
                className="mx-auto mt-9 flex w-full items-center justify-center gap-3 rounded-[5px] bg-[#4081ff] px-7 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1a5cdd] active:scale-[0.99] sm:w-fit sm:text-base"
              >
                <span>Get started</span>

                <ArrowRight
                  size={20}
                  strokeWidth={2}
                  className="shrink-0"
                />
              </button>

            </div>

          </div>

          {/* ================= IMAGE ================= */}
          <div className="mx-auto mt-12 max-w-[1100px] overflow-hidden rounded-[20px] bg-gray-100 shadow-sm sm:mt-16">

              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                alt="Become a host"
                className="block h-64 w-full object-cover sm:h-[380px] lg:h-[520px]"
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

          <div className="mx-auto mt-8 flex max-w-[1100px] flex-col gap-4 border-t border-[#e4e4e4] pt-7 text-left sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#777]">
              Start with the basics. You can edit your listing anytime.
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#303030]">
              <CheckCircle size={17} className="text-[#05a457]" />
              Free to get started
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}

export default BecomeHost;