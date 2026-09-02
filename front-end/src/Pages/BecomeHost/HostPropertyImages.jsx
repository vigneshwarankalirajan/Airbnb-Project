import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ImagePlus,
  Loader2,
  Trash2,
} from "lucide-react";

// import { createPropertyImage } from "../../api/hostApi";

function HostPropertyImages() {
  const navigate = useNavigate();

 const storedPropertyId =
  sessionStorage.getItem("host_property_id");

const storedProperty =
  sessionStorage.getItem("host_property");

let propertyId = storedPropertyId;

if (!propertyId && storedProperty) {
  try {
    const property = JSON.parse(storedProperty);

    propertyId =
      property?.id ||
      property?.property_id ||
      property?.property?.id ||
      null;
  } catch (error) {
    console.error(
      "Unable to read stored property:",
      error
    );
  }
}

  const [images, setImages] = useState([]);
  const [url, setUrl] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const addImage = () => {
    const value = url.trim();

    if (!value) {
      setError("Please enter an image URL.");
      return;
    }

    setImages((prev) => [
      ...prev,
      {
        image_url: value,
        media_type: "image",
      },
    ]);

    setUrl("");
    setError("");
  };

  const removeImage = (index) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleContinue = async () => {
    if (!propertyId) {
      setError(
        "Property ID is missing. Please create the property first."
      );
      return;
    }

    if (images.length === 0) {
      setError(
        "Please add at least one property image."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      const savedImages = [];

      for (let i = 0; i < images.length; i++) {
        const payload = {
          property_id: Number(propertyId),
          image_url: images[i].image_url,
          media_type: "image",
          display_order: i + 1,
        };

        const result =
          await createPropertyImage(payload);

        savedImages.push(result);
      }

      sessionStorage.setItem(
        "host_property_images",
        JSON.stringify(savedImages)
      );

      navigate("/become-host/pricing");

    } catch (err) {
      console.error(
        "Property image API error:",
        err
      );

      setError(
        err?.response?.data?.detail ||
          "Unable to save property images."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">

      {/* HEADER */}

      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-6 py-5">

          <button
            type="button"
            onClick={() =>
              navigate("/become-host/amenities")
            }
            className="flex items-center gap-2 text-sm font-semibold text-gray-700"
          >
            <ArrowLeft size={18} />
            Back
          </button>

        </div>
      </header>

      {/* CONTENT */}

      <main className="mx-auto max-w-3xl px-6 py-10">

        <p className="text-sm font-bold uppercase tracking-widest text-[#e61e4d]">
          Step 3
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Add photos of your place
        </h1>

        <p className="mt-2 text-gray-500">
          Add image URLs for your property.
        </p>

        {/* PROPERTY ID */}

        {!propertyId && (
          <div className="mt-5 rounded-xl bg-yellow-50 p-4 text-sm text-yellow-700">
            Property ID is missing. Please go back
            and create the property first.
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ADD IMAGE */}

        <div className="mt-8 rounded-3xl border bg-white p-6">

          <div className="flex flex-col gap-3 sm:flex-row">

            <input
              type="url"
              value={url}
              onChange={(e) =>
                setUrl(e.target.value)
              }
              placeholder="https://images.unsplash.com/..."
              className="flex-1 rounded-xl border px-4 py-3 outline-none focus:border-[#123d78]"
            />

            <button
              type="button"
              onClick={addImage}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#123d78] px-5 py-3 font-semibold text-white"
            >
              <ImagePlus size={19} />
              Add
            </button>

          </div>

          {/* IMAGE PREVIEW */}

          {images.length === 0 ? (
            <div className="mt-6 flex min-h-52 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">

              <div className="text-center">

                <ImagePlus
                  size={40}
                  className="mx-auto text-gray-400"
                />

                <p className="mt-3 text-sm text-gray-500">
                  No images added yet
                </p>

              </div>

            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              {images.map((image, index) => (
                <div
                  key={`${image.image_url}-${index}`}
                  className="relative overflow-hidden rounded-2xl border bg-white"
                >

                  <img
                    src={image.image_url}
                    alt={`Property ${index + 1}`}
                    className="h-52 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.opacity =
                        "0.4";
                    }}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeImage(index)
                    }
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>
              ))}

            </div>
          )}

        </div>

        {/* CONTINUE */}

        <button
          type="button"
          onClick={handleContinue}
          disabled={saving}
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

export default HostPropertyImages;