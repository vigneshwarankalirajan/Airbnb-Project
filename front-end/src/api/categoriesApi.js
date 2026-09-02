import apiClient from "./apiClient";

// GET /categories/
export const getCategories = async () => {
  const response = await apiClient.get("/categories/");
  return response.data;
};