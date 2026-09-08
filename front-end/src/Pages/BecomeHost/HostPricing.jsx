import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { createPricing } from "../../api/hostApi";

function Pricing() {
  const navigate = useNavigate();

  const propertyId =
    sessionStorage.getItem(
      "host_property_id"
    );

  const [form, setForm] = useState({
    base_price: "5000",
    cleaning_fee: "500",
    service_fee: "300",
    tax_percentage: "5",
    start_date: "2026-09-01",
    end_date: "2026-09-30",
    currency: "INR",
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
      new Date(form.end_date) <=
      new Date(form.start_date)
    ) {
      setError(
        "End date must be after start date."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        property_id: Number(propertyId),
        base_price: form.base_price,
        cleaning_fee: form.cleaning_fee,
        service_fee: form.service_fee,
        tax_percentage: form.tax_percentage,
        start_date: form.start_date,
        end_date: form.end_date,
        currency: form.currency,
      };

      const result =
        await createPricing(payload);

      console.log(
        "Pricing created:",
        result
      );

      sessionStorage.setItem(
        "host_pricing",
        JSON.stringify(result)
      );

      navigate(
        "/become-host/availability"
      );

    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.detail ||
          "Unable to save pricing."
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
              navigate("/become-host/images")
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
          Set your pricing
        </h1>

        <p className="mt-2 text-gray-500">
          Add your property pricing details.
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

            <Field
              label="Base price"
              name="base_price"
              value={form.base_price}
              onChange={handleChange}
            />

            <Field
              label="Cleaning fee"
              name="cleaning_fee"
              value={form.cleaning_fee}
              onChange={handleChange}
            />

            <Field
              label="Service fee"
              name="service_fee"
              value={form.service_fee}
              onChange={handleChange}
            />

            <Field
              label="Tax percentage"
              name="tax_percentage"
              value={form.tax_percentage}
              onChange={handleChange}
            />

            <Field
              label="Start date"
              name="start_date"
              type="date"
              value={form.start_date}
              onChange={handleChange}
            />

            <Field
              label="End date"
              name="end_date"
              type="date"
              value={form.end_date}
              onChange={handleChange}
            />

          </div>

          <div className="mt-5">

            <label className="text-sm font-semibold">
              Currency
            </label>

            <select
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border px-4 py-3"
            >
              <option value="INR">
                INR
              </option>
              <option value="USD">
                USD
              </option>
            </select>

          </div>

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
                Continue
                <ArrowRight size={20} />
              </>
            )}
          </button>

        </form>

      </main>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "number",
}) {
  return (
    <div>
      <label className="text-sm font-semibold">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={type === "number" ? "0" : undefined}
        required
        className="mt-2 w-full rounded-xl border px-4 py-3"
      />
    </div>
  );
}

export default Pricing;