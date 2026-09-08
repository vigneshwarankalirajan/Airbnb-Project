"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Loader2, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomerReveal from "./CustomerReveal";
import { getProperties } from "../../api/propertiesApi";
import { getPropertyImages } from "../../api/propertyImagesApi";

const getPropertyList = (response) => {
  if (Array.isArray(response)) return response;
  return response?.data || response?.items || response?.properties || [];
};

const getPropertyImage = (property, images) => {
  const propertyId = property?.id || property?.property_id;
  const uploadedImage = images.find(
    (image) => Number(image?.property_id) === Number(propertyId)
  );

  return (
    uploadedImage?.image_url ||
    uploadedImage?.url ||
    property?.image ||
    property?.image_url ||
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80"
  );
};

function CustomerSpecialOffers() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [propertyImages, setPropertyImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUploadedStays = async () => {
      try {
        const [propertiesResponse, imagesResponse] = await Promise.all([
          getProperties(),
          getPropertyImages(),
        ]);

        setProperties(getPropertyList(propertiesResponse).slice(0, 4));
        setPropertyImages(getPropertyList(imagesResponse));
      } catch (error) {
        console.error("Unable to load uploaded stays:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    loadUploadedStays();
  }, []);

  return (
    <section className=" py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <CustomerReveal>
          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              bg-[#123d78]
              px-6
              py-10
              text-white
              sm:px-10
              lg:px-14
            "
          >
            <div className="relative z-10 max-w-xl">
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-200">
                <Tag size={17} />
                SPECIAL OFFER
              </div>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Save more on your next stay
              </h2>

              <p className="mt-4 text-sm leading-6 text-blue-100">
                Discover selected properties with exclusive discounts
                and limited-time offers.
              </p>

              <button
                type="button"
                onClick={() => navigate("/properties")}
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
                  text-[#123d78]
                  transition
                  hover:bg-gray-100
                "
              >
                Explore deals
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="absolute -right-10 -top-20 h-72 w-72 rounded-full bg-white/10" />
            <div className="absolute -bottom-32 right-40 h-72 w-72 rounded-full bg-white/10" />
          </div>
        </CustomerReveal>

        <CustomerReveal delay={0.1}>
          <div className="mt-8">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#123d78]">
                  Uploaded stays
                </p>
                <h3 className="mt-1 text-2xl font-bold text-gray-900">
                  Special stays from our hosts
                </h3>
              </div>
              <button
                type="button"
                onClick={() => navigate("/properties")}
                className="hidden items-center gap-1 text-sm font-semibold text-[#123d78] sm:flex"
              >
                View all <ArrowRight size={15} />
              </button>
            </div>

            {loading ? (
              <div className="flex min-h-40 items-center justify-center rounded-2xl border border-gray-200 bg-white">
                <Loader2 className="animate-spin text-[#123d78]" size={28} />
              </div>
            ) : properties.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-sm text-gray-500">
                No uploaded stays are available yet.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {properties.map((property) => {
                  const propertyId = property?.id || property?.property_id;
                  const title = property?.title || property?.name || "Special stay";
                  const location = property?.city || property?.address || "Location unavailable";

                  return (
                    <button
                      key={propertyId}
                      type="button"
                      onClick={() => navigate(`/property-details/${propertyId}`)}
                      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                        <img
                          src={getPropertyImage(property, propertyImages)}
                          alt={title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#123d78]">
                          Special stay
                        </span>
                      </div>
                      <div className="p-4">
                        <p className="line-clamp-1 font-bold text-gray-900">{title}</p>
                        <p className="mt-1 line-clamp-1 text-xs text-gray-500">{location}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </CustomerReveal>

      </div>
    </section>
  );
}

export default CustomerSpecialOffers;