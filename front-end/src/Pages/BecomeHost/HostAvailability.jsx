import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Loader2,
} from "lucide-react";

import {
  createAvailability,
} from "../../api/hostApi";

function Availability() {
  const navigate = useNavigate();

  const propertyId =
    sessionStorage.getItem(
      "host_property_id"
    );

  const [form, setForm] = useState({
    available_from: "2026-09-01",
    available_to: "2026-12-31",
    is_available: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleContinue = async (e) => {
    e.preventDefault();

    if (!propertyId) {
      setError("Property ID is missing.");
      return;
    }

    if (
      new Date(form.available_to) <=
      new Date(form.available_from)
    ) {
      setError(
        "Available to date must be after available from date."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        property_id: Number(propertyId),
        available_from:
          form.available_from,
        available_to:
          form.available_to,
        is_available:
          form.is_available,
      };

      const result =
        await createAvailability(payload);

      console.log(
        "Availability created:",
        result
      );

      sessionStorage.setItem(
        "host_availability",
        JSON.stringify(result)
      );

      navigate("/become-host/review");

    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.detail ||
          "Unable to save availability."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="host-flow-page min-h-screen bg-[#fafafa]">

      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-6 py-5">

          <button
            onClick={() =>
              navigate("/become-host/pricing")
            }
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft size={18} />
            Back
          </button>

        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">

        
        <h1 className="mt-2 text-3xl font-bold">
          Set your availability
        </h1>

        <p className="mt-2 text-gray-500">
          Tell guests when your property is available.
        </p>

        <form
          onSubmit={handleContinue}
          className="mt-8 rounded-3xl border bg-white p-6 sm:p-8"
        >

          {error && (
            <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label className="text-sm font-semibold">
                Available from
              </label>

              <div className="relative mt-2">

                <CalendarDays
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="date"
                  name="available_from"
                  value={
                    form.available_from
                  }
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border py-3 pl-11 pr-4"
                />

              </div>
            </div>

            <div>
              <label className="text-sm font-semibold">
                Available to
              </label>

              <div className="relative mt-2">

                <CalendarDays
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="date"
                  name="available_to"
                  value={
                    form.available_to
                  }
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border py-3 pl-11 pr-4"
                />

              </div>
            </div>

          </div>

          <label className="mt-6 flex cursor-pointer items-center gap-3">

            <input
              type="checkbox"
              checked={
                form.is_available
              }
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  is_available:
                    e.target.checked,
                }))
              }
              className="h-5 w-5"
            />

            <span className="text-sm font-medium">
              Property is available for booking
            </span>

          </label>

          <button
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#123d78] px-6 py-4 font-semibold text-white disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                Review property
                <ArrowRight size={20} />
              </>
            )}
          </button>

        </form>

      </main>
    </div>
  );
}

export default Availability;