import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
} from "lucide-react";

import {
  getAmenities,
  addPropertyAmenity,
} from "../../api/hostApi";

function HostAmenities() {
  const navigate = useNavigate();

  const propertyId =
    sessionStorage.getItem(
      "host_property_id"
    );

  const [amenities, setAmenities] = useState([]);
  const [selected, setSelected] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadAmenities();
  }, []);

  const loadAmenities = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getAmenities();

      console.log(
        "Amenities API:",
        response
      );

      let list = [];

      if (Array.isArray(response)) {
        list = response;
      } else if (
        Array.isArray(response?.data)
      ) {
        list = response.data;
      } else if (
        Array.isArray(response?.items)
      ) {
        list = response.items;
      } else if (
        Array.isArray(response?.results)
      ) {
        list = response.results;
      }

      setAmenities(list);

    } catch (err) {
      console.error(
        "Amenities API error:",
        err
      );

      setError(
        err?.response?.data?.detail ||
          "Unable to load amenities."
      );

      setAmenities([]);

    } finally {
      setLoading(false);
    }
  };

  const toggleAmenity = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter(
          (item) => item !== id
        );
      }

      return [...prev, id];
    });
  };

  const handleContinue = async () => {
    if (!propertyId) {
      setError(
        "Property ID is missing."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      for (const amenityId of selected) {
        await addPropertyAmenity({
          property_id: Number(propertyId),
          amenity_id: Number(amenityId),
        });
      }

      sessionStorage.setItem(
        "host_selected_amenities",
        JSON.stringify(selected)
      );

      navigate(
        "/become-host/images"
      );

    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.detail ||
          "Unable to save amenities."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">

      <header className="border-b bg-white">

        <div className="mx-auto max-w-5xl px-6 py-5">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/become-host/property"
              )
            }
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <ArrowLeft size={18} />
            Back
          </button>

        </div>

      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">

        <p className="text-sm font-bold uppercase tracking-widest text-[#e61e4d]">
          Step 2
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          What does your place offer?
        </h1>

        <p className="mt-2 text-gray-500">
          Select all amenities available.
        </p>

        {error && (
          <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 flex min-h-48 items-center justify-center rounded-3xl border bg-white">

            <div className="text-center">

              <Loader2
                size={32}
                className="mx-auto animate-spin text-[#123d78]"
              />

              <p className="mt-3 text-sm text-gray-500">
                Loading amenities...
              </p>

            </div>

          </div>
        ) : amenities.length === 0 ? (
          <div className="mt-8 rounded-3xl border bg-white p-8 text-center">

            <p className="font-semibold text-gray-900">
              No amenities found
            </p>

            <p className="mt-2 text-sm text-gray-500">
              The amenities API did not return any
              amenities.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/become-host/images"
                )
              }
              className="mt-6 rounded-xl bg-[#123d78] px-6 py-3 font-semibold text-white"
            >
              Continue without amenities
            </button>

          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">

            {amenities.map((amenity) => {

              const id = Number(
                amenity.id
              );

              const active =
                selected.includes(id);

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() =>
                    toggleAmenity(id)
                  }
                  className={`flex items-center justify-between rounded-2xl border p-5 text-left transition ${
                    active
                      ? "border-[#123d78] bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-400"
                  }`}
                >

                  <div>

                    <h3 className="font-semibold">
                      {amenity.name ||
                        amenity.title ||
                        `Amenity ${id}`}
                    </h3>

                    {amenity.description && (
                      <p className="mt-1 text-sm text-gray-500">
                        {amenity.description}
                      </p>
                    )}

                  </div>

                  {active && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#123d78] text-white">
                      <Check size={16} />
                    </div>
                  )}

                </button>
              );
            })}

          </div>
        )}

        <button
          type="button"
          onClick={handleContinue}
          disabled={
            saving ||
            loading
          }
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#123d78] px-6 py-4 font-semibold text-white disabled:opacity-60"
        >

          {saving ? (
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

      </main>
    </div>
  );
}

export default HostAmenities;