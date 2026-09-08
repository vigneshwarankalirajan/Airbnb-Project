import { useEffect, useState } from "react";
import { Heart, Trash2, Loader2 } from "lucide-react";

import CustomerNavbar from "../../components/customer/CustomerNavbar";

import {
  getWishlist,
  removeFromWishlist,
} from "../../api/wishlistApi";

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);

  /* =========================================================
     GET VALUE FROM LOCAL STORAGE
  ========================================================= */

  const getStorageValue = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Unable to read localStorage key: ${key}`, error);
      return null;
    }
  };

  /* =========================================================
     FIND USER ID INSIDE OBJECT
  ========================================================= */

  const findUserId = (data) => {
    if (!data) return null;

    // Direct ID
    if (data.id !== undefined && data.id !== null) {
      return data.id;
    }

    // user_id
    if (
      data.user_id !== undefined &&
      data.user_id !== null
    ) {
      return data.user_id;
    }

    // userId
    if (
      data.userId !== undefined &&
      data.userId !== null
    ) {
      return data.userId;
    }

    // Nested user
    if (data.user) {
      const nestedUserId = findUserId(data.user);

      if (nestedUserId) {
        return nestedUserId;
      }
    }

    // Nested data
    if (data.data) {
      const nestedDataId = findUserId(data.data);

      if (nestedDataId) {
        return nestedDataId;
      }
    }

    return null;
  };

  /* =========================================================
     DECODE JWT
  ========================================================= */

  const getUserIdFromToken = (token) => {
    try {
      if (!token) return null;

      const parts = token.split(".");

      if (parts.length !== 3) {
        return null;
      }

      const payload = parts[1];

      const base64 = payload
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(
            (char) =>
              "%" +
              ("00" + char.charCodeAt(0).toString(16)).slice(-2)
          )
          .join("")
      );

      const decoded = JSON.parse(jsonPayload);

      return (
        decoded?.user_id ||
        decoded?.userId ||
        decoded?.id ||
        decoded?.sub ||
        null
      );
    } catch (error) {
      console.error("Unable to decode token:", error);
      return null;
    }
  };

  /* =========================================================
     GET LOGGED-IN USER ID
  ========================================================= */

  const getLoggedInUserId = () => {
    // -------------------------------------------------------
    // 1. Direct user_id
    // -------------------------------------------------------

    const directUserId = getStorageValue("user_id");

    if (directUserId) {
      console.log("User ID found from user_id:", directUserId);
      return directUserId;
    }

    // -------------------------------------------------------
    // 2. Check common user object keys
    // -------------------------------------------------------

    const userKeys = [
      "user",
      "currentUser",
      "authUser",
      "loggedInUser",
      "userData",
      "profile",
    ];

    for (const key of userKeys) {
      const value = getStorageValue(key);

      if (!value) continue;

      try {
        const parsed = JSON.parse(value);

        const id = findUserId(parsed);

        if (id !== null && id !== undefined) {
          console.log(
            `User ID found from ${key}:`,
            id
          );

          return id;
        }
      } catch (error) {
        console.log(
          `${key} is not JSON data`
        );
      }
    }

    // -------------------------------------------------------
    // 3. Check token keys
    // -------------------------------------------------------

    const tokenKeys = [
      "token",
      "access_token",
      "accessToken",
      "auth_token",
      "authToken",
      "jwt",
    ];

    for (const key of tokenKeys) {
      const token = getStorageValue(key);

      if (!token) continue;

      const id = getUserIdFromToken(token);

      if (id) {
        console.log(
          `User ID found from ${key}:`,
          id
        );

        return id;
      }
    }

    // -------------------------------------------------------
    // 4. Check all localStorage values as final fallback
    // -------------------------------------------------------

    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (!key) continue;

        const value = localStorage.getItem(key);

        if (!value) continue;

        // Try JSON
        try {
          const parsed = JSON.parse(value);

          const id = findUserId(parsed);

          if (id !== null && id !== undefined) {
            console.log(
              `User ID found from localStorage key ${key}:`,
              id
            );

            return id;
          }
        } catch {
          // Ignore non JSON values
        }

        // Try JWT
        if (value.split(".").length === 3) {
          const id = getUserIdFromToken(value);

          if (id) {
            console.log(
              `User ID found from token in ${key}:`,
              id
            );

            return id;
          }
        }
      }
    } catch (error) {
      console.error(
        "Unable to inspect localStorage:",
        error
      );
    }

    return null;
  };

  /* =========================================================
     LOAD WISHLIST
  ========================================================= */

  const loadWishlist = async () => {
    try {
      setLoading(true);
      setError("");

      const userId = getLoggedInUserId();

      console.log(
        "================================="
      );
      console.log(
        "WISHLIST USER ID:",
        userId
      );
      console.log(
        "================================="
      );

      if (!userId) {
        setItems([]);
        setError(
          "Please log in to view your wishlist."
        );
        return;
      }

      const response = await getWishlist(userId);

      console.log(
        "WISHLIST API RESPONSE:",
        response
      );

      let wishlistData = [];

      if (Array.isArray(response)) {
        wishlistData = response;
      } else if (
        Array.isArray(response?.wishlist)
      ) {
        wishlistData = response.wishlist;
      } else if (
        Array.isArray(response?.items)
      ) {
        wishlistData = response.items;
      } else if (
        Array.isArray(response?.data)
      ) {
        wishlistData = response.data;
      } else if (
        Array.isArray(response?.results)
      ) {
        wishlistData = response.results;
      }

      setItems(wishlistData);
    } catch (error) {
      console.error(
        "WISHLIST API ERROR:",
        error
      );

      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Unable to load your wishlist.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    loadWishlist();
  }, []);

  /* =========================================================
     GET PROPERTY
  ========================================================= */

  const getProperty = (item) => {
    return (
      item?.property ||
      item?.listing ||
      item
    );
  };

  /* =========================================================
     GET PROPERTY ID
  ========================================================= */

  const getPropertyId = (item) => {
    return (
      item?.property_id ||
      item?.propertyId ||
      item?.property?.id ||
      item?.property?.property_id ||
      item?.listing?.id ||
      item?.id ||
      item?._id
    );
  };

  /* =========================================================
     GET NAME
  ========================================================= */

  const getPropertyName = (item) => {
    const property = getProperty(item);

    return (
      property?.name ||
      property?.title ||
      property?.property_name ||
      property?.propertyName ||
      "Saved property"
    );
  };

  /* =========================================================
     GET IMAGE
  ========================================================= */

  const getPropertyImage = (item) => {
    const property = getProperty(item);

    return (
      property?.image ||
      property?.image_url ||
      property?.imageUrl ||
      property?.cover_image ||
      property?.coverImage ||
      property?.property_image ||
      property?.thumbnail ||
      property?.photos?.[0]?.url ||
      property?.photos?.[0] ||
      item?.image ||
      item?.image_url ||
      null
    );
  };

  /* =========================================================
     GET DESCRIPTION
  ========================================================= */

  const getPropertyDescription = (item) => {
    const property = getProperty(item);

    return (
      property?.description ||
      item?.description ||
      ""
    );
  };

  /* =========================================================
     GET LOCATION
  ========================================================= */

  const getPropertyLocation = (item) => {
    const property = getProperty(item);

    if (typeof property?.location === "string") {
      return property.location;
    }

    if (property?.location) {
      return (
        property.location?.city ||
        property.location?.name ||
        property.location?.address ||
        ""
      );
    }

    return (
      property?.city ||
      property?.location_name ||
      property?.address ||
      item?.city ||
      ""
    );
  };

  /* =========================================================
     GET PRICE
  ========================================================= */

  const getPropertyPrice = (item) => {
    const property = getProperty(item);

    return (
      property?.price ||
      property?.price_per_night ||
      property?.nightly_price ||
      property?.pricePerNight ||
      item?.price ||
      item?.price_per_night ||
      null
    );
  };

  /* =========================================================
     REMOVE WISHLIST
  ========================================================= */

  const handleRemove = async (item) => {
    const propertyId =
      getPropertyId(item);

    if (!propertyId) {
      console.error(
        "Property ID missing:",
        item
      );
      return;
    }

    try {
      setRemovingId(propertyId);

      await removeFromWishlist(propertyId);

      setItems((previousItems) =>
        previousItems.filter(
          (wishlistItem) => {
            const currentId =
              getPropertyId(wishlistItem);

            return (
              String(currentId) !==
              String(propertyId)
            );
          }
        )
      );
    } catch (error) {
      console.error(
        "REMOVE WISHLIST ERROR:",
        error
      );

      alert(
        error?.response?.data?.detail ||
          error?.response?.data?.message ||
          "Unable to remove this property."
      );
    } finally {
      setRemovingId(null);
    }
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="min-h-screen bg-white">

      <CustomerNavbar />

      <main className="mx-auto w-full max-w-[1200px] px-5 py-10 md:px-8 lg:px-10">

        {/* HEADER */}

        <div className="mb-8 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50">
            <Heart
              size={22}
              className="fill-red-500 text-red-500"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Wishlist
            </h1>

            {!loading &&
              !error &&
              items.length > 0 && (
                <p className="mt-1 text-sm text-gray-500">
                  {items.length}{" "}
                  {items.length === 1
                    ? "saved property"
                    : "saved properties"}
                </p>
              )}
          </div>
        </div>

        {/* LOADING */}

        {loading && (
          <div className="flex min-h-[350px] items-center justify-center">

            <div className="flex flex-col items-center gap-3">

              <Loader2
                size={32}
                className="animate-spin text-gray-700"
              />

              <p className="text-sm text-gray-500">
                Loading your wishlist...
              </p>

            </div>

          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6">

            <p className="text-sm font-medium text-red-600">
              {error}
            </p>

            {error !==
              "Please log in to view your wishlist." && (
              <button
                type="button"
                onClick={loadWishlist}
                className="mt-4 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700"
              >
                Try Again
              </button>
            )}

          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          items.length === 0 && (
            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-gray-200 bg-gray-50 px-6 text-center">

              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">

                <Heart
                  size={30}
                  className="text-gray-400"
                />

              </div>

              <h2 className="text-xl font-semibold text-gray-900">
                Your wishlist is empty
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                Save your favorite stays and properties
                here so you can easily find them later.
              </p>

            </div>
          )}

        {/* WISHLIST */}

        {!loading &&
          !error &&
          items.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {items.map((item, index) => {

                const propertyId =
                  getPropertyId(item);

                const name =
                  getPropertyName(item);

                const image =
                  getPropertyImage(item);

                const description =
                  getPropertyDescription(item);

                const location =
                  getPropertyLocation(item);

                const price =
                  getPropertyPrice(item);

                const isRemoving =
                  String(removingId) ===
                  String(propertyId);

                return (
                  <div
                    key={
                      propertyId ||
                      item?._id ||
                      index
                    }
                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >

                    {/* IMAGE */}

                    <div className="relative h-56 overflow-hidden bg-gray-100">

                      {image ? (
                        <img
                          src={image}
                          alt={name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          onError={(event) => {
                            event.currentTarget.style.display =
                              "none";
                          }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Heart
                            size={40}
                            className="text-gray-300"
                          />
                        </div>
                      )}

                      {/* HEART */}

                      <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">

                        <Heart
                          size={19}
                          className="fill-red-500 text-red-500"
                        />

                      </div>

                      {/* REMOVE */}

                      <button
                        type="button"
                        onClick={() =>
                          handleRemove(item)
                        }
                        disabled={isRemoving}
                        className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-md transition hover:bg-red-50 hover:text-red-600 disabled:opacity-60"
                      >

                        {isRemoving ? (
                          <Loader2
                            size={14}
                            className="animate-spin"
                          />
                        ) : (
                          <Trash2 size={14} />
                        )}

                        Remove

                      </button>

                    </div>

                    {/* CONTENT */}

                    <div className="p-5">

                      <h2 className="line-clamp-1 text-lg font-semibold text-gray-900">
                        {name}
                      </h2>

                      {location && (
                        <p className="mt-1 line-clamp-1 text-sm text-gray-500">
                          {location}
                        </p>
                      )}

                      {description && (
                        <p className="mt-3 line-clamp-2 text-sm leading-5 text-gray-600">
                          {description}
                        </p>
                      )}

                      {price !== null &&
                        price !== undefined &&
                        price !== "" && (
                          <div className="mt-4">

                            <span className="text-lg font-bold text-gray-900">
                              ₹{price}
                            </span>

                            <span className="ml-1 text-sm text-gray-500">
                              / night
                            </span>

                          </div>
                        )}

                    </div>

                  </div>
                );
              })}

            </div>
          )}

      </main>
    </div>
  );
};

export default Wishlist;