import apiClient from "./apiClient";

export const getWishlist = async (userId) => {
  const response = await apiClient.get(
    `/wishlists/user/${userId}`
  );

  return response.data;
};

// POST wishlist
export const addToWishlist = async (
  propertyId
) => {
  const response = await apiClient.post(
    "/api/wishlist",
    {
      property_id: propertyId,
    }
  );

  return response.data;
};

// DELETE wishlist
export const removeFromWishlist = async (
  propertyId
) => {
  const response = await apiClient.delete(
    `/api/wishlist/${propertyId}`
  );

  return response.data;
};