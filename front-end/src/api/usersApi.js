import apiClient from "./apiClient";

// GET /api/users/me
export const getCurrentUser = async () => {
  const response = await apiClient.get(
    "/api/users/me"
  );

  return response.data;
};

// Update profile
export const updateProfile = async (
  userData
) => {
  const response = await apiClient.put(
    "/api/users/me",
    userData
  );

  return response.data;
};