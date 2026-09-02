import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Loader2,
} from "lucide-react";

import { createProperty } from "../../api/hostApi";

function PropertyDetails() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    host_id: 5,
    category_id: 1,
    title: "",
    description: "",
    property_type: "Apartment",
    address: "",
    city: "",
    state: "",
    country: "India",
    max_guests: 1,
    bedrooms: 1,
    bathrooms: 1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const payload = {
        ...form,
        host_id: Number(form.host_id),
        category_id: Number(form.category_id),
        max_guests: Number(form.max_guests),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        status: "draft",
      };

     const result = await createProperty(payload);

console.log("PROPERTY CREATE RESPONSE:", result);

const propertyId =
  result?.id ??
  result?.property_id ??
  result?.data?.id ??
  result?.data?.property_id ??
  result?.property?.id;

console.log("PROPERTY ID:", propertyId);

if (!propertyId) {
  throw new Error(
    "Property ID was not returned by API."
  );
}

sessionStorage.setItem(
  "host_property_id",
  String(propertyId)
);

sessionStorage.setItem(
  "host_property",
  JSON.stringify(result)
);

console.log(
  "SAVED HOST PROPERTY ID:",
  sessionStorage.getItem("host_property_id")
);

navigate("/become-host/amenities");

    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Unable to create property."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">

      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-6 py-5">

          <button
            onClick={() =>
              navigate("/become-host")
            }
            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
          >
            <ArrowLeft size={18} />
            Back
          </button>

        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">

        <div className="mb-8">

          <p className="text-sm font-bold uppercase tracking-widest text-[#e61e4d]">
            Step 1
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Tell us about your property
          </h1>

          <p className="mt-2 text-gray-500">
            Add the basic details of your property.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8"
        >

          {error && (
            <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="space-y-5">

            <div>
              <label className="text-sm font-semibold">
                Property title
              </label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Modern Chennai Apartment"
                className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-[#123d78]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Describe your property..."
                className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-[#123d78]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">
                Property type
              </label>

              <select
                name="property_type"
                value={form.property_type}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border px-4 py-3"
              >
                <option>Apartment</option>
                <option>House</option>
                <option>Villa</option>
                <option>Hotel</option>
                <option>Cabin</option>
                <option>Room</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold">
                Address
              </label>

              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                placeholder="Porur"
                className="mt-2 w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                placeholder="City"
                className="rounded-xl border px-4 py-3"
              />

              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                required
                placeholder="State"
                className="rounded-xl border px-4 py-3"
              />

            </div>

            <div className="grid gap-4 sm:grid-cols-3">

              <div>
                <label className="text-sm font-semibold">
                  Guests
                </label>

                <input
                  type="number"
                  min="1"
                  name="max_guests"
                  value={form.max_guests}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">
                  Bedrooms
                </label>

                <input
                  type="number"
                  min="1"
                  name="bedrooms"
                  value={form.bedrooms}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div>
                <label className="text-sm font-semibold">
                  Bathrooms
                </label>

                <input
                  type="number"
                  min="1"
                  name="bathrooms"
                  value={form.bathrooms}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border px-4 py-3"
                />
              </div>

            </div>

          </div>

          <button
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#123d78] px-6 py-4 font-semibold text-white hover:bg-[#0e315f] disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />
                Creating...
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

export default PropertyDetails;