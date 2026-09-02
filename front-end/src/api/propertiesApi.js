import apiClient from "./apiClient";

// GET /properties/
export const getProperties = async (params = {}) => {
  try {
    const response = await apiClient.get("/properties/", {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(
      "GET /properties/ Error:",
      error?.response?.data || error?.message
    );

    throw new Error(
      error?.response?.data?.detail ||
        error?.message ||
        "Unable to load properties"
    );
  }
};

// GET /properties/{id}
export const getPropertyById = async (id) => {
  if (!id) {
    throw new Error("Property ID is required");
  }

  try {
    const response = await apiClient.get(`/properties/${id}`);

    return response.data;
  } catch (error) {
    console.error(
      `GET /properties/${id} Error:`,
      error?.response?.data || error?.message
    );

    throw new Error(
      error?.response?.data?.detail ||
        error?.message ||
        "Unable to load property"
    );
  }
};

// GET /properties/featured
export const getFeaturedProperties = async () => {
  try {
    const response = await apiClient.get("/properties/featured");

    return response.data;
  } catch (error) {
    console.error(
      "GET /properties/featured Error:",
      error?.response?.data || error?.message
    );

    throw new Error(
      error?.response?.data?.detail ||
        error?.message ||
        "Unable to load featured properties"
    );
  }
};

// GET /properties/search
export const searchProperties = async (params = {}) => {
  try {
    const response = await apiClient.get("/properties/search", {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(
      "GET /properties/search Error:",
      error?.response?.data || error?.message
    );

    throw new Error(
      error?.response?.data?.detail ||
        error?.message ||
        "Unable to search properties"
    );
  }
};

// GET /properties/nearby
export const getNearbyProperties = async (params = {}) => {
  try {
    const response = await apiClient.get("/properties/nearby", {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(
      "GET /properties/nearby Error:",
      error?.response?.data || error?.message
    );

    throw new Error(
      error?.response?.data?.detail ||
        error?.message ||
        "Unable to load nearby properties"
    );
  }
};

// POST /properties/
export const createProperty = async (propertyData) => {
  try {
    const response = await apiClient.post(
      "/properties/",
      propertyData
    );

    return response.data;
  } catch (error) {
    console.error(
      "POST /properties/ Error:",
      error?.response?.data || error?.message
    );

    throw new Error(
      error?.response?.data?.detail ||
        error?.message ||
        "Unable to create property"
    );
  }
};