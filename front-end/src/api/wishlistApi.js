import apiClient from "./apiClient";

// GET /api/wishlist
export const getWishlist = async () => {
  const response = await apiClient.get(
    "/api/wishlist"
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