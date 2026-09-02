import {
  useEffect,
  useState,
} from "react";

import CustomerNavbar from "../../Components/CustomerNavbar";

import {
  getWishlist,
} from "../../api/wishlistApi";

const Wishlist = () => {
  const [items, setItems] =
    useState([]);

  useEffect(() => {
    const loadWishlist =
      async () => {
        try {
          const data =
            await getWishlist();

          setItems(
            Array.isArray(data)
              ? data
              : data?.wishlist || []
          );
        } catch (error) {
          console.error(
            "Wishlist API error:",
            error
          );
        }
      };

    loadWishlist();
  }, []);

  return (
    <>
      <CustomerNavbar />

      <main className="mx-auto max-w-[1200px] px-5 py-10">

        <h1 className="text-3xl font-bold">
          Wishlist
        </h1>

        <div className="mt-8 space-y-4">

          {items.map((item) => (
            <div
              key={
                item.id ||
                item._id
              }
              className="rounded-2xl border p-5"
            >
              {item.property?.name ||
                item.property_name ||
                item.name ||
                "Saved property"}
            </div>
          ))}

        </div>

      </main>
    </>
  );
};

export default Wishlist;