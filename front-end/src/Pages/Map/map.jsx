import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import CustomerNavbar from "../../Components/CustomerNavbar";

import {
  getNearbyProperties,
} from "../../api/propertiesApi";

const Location = () => {
  const [params] =
    useSearchParams();

  const location =
    params.get("location") || "";

  const [properties, setProperties] =
    useState([]);

  useEffect(() => {
    const loadNearby =
      async () => {
        try {
          const data =
            await getNearbyProperties({
              location,
            });

          setProperties(
            Array.isArray(data)
              ? data
              : data?.properties || []
          );
        } catch (error) {
          console.error(
            "Nearby API error:",
            error
          );
        }
      };

    loadNearby();
  }, [location]);

  return (
    <>
      <CustomerNavbar />

      <main className="mx-auto max-w-[1400px] px-5 py-10">

        <h1 className="text-3xl font-bold">
          Nearby stays
        </h1>

        {location && (
          <p className="mt-2 text-gray-500">
            Location: {location}
          </p>
        )}

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          {properties.map(
            (property) => (
              <div
                key={
                  property.id ||
                  property._id
                }
                className="rounded-2xl border p-5 shadow-sm"
              >
                <h3 className="font-bold">
                  {property.name ||
                    property.title}
                </h3>
              </div>
            )
          )}

        </div>

      </main>
    </>
  );
};

export default Location;