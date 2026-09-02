import apiClient from "./apiClient";

/* =====================================================
   PROPERTY
===================================================== */

export const createProperty = async (payload) => {
  const response = await apiClient.post(
    "/api/properties",
    payload
  );

  return response.data;
};

export const getProperty = async (propertyId) => {
  const response = await apiClient.get(
    `/api/properties/${propertyId}`
  );

  return response.data;
};

export const updateProperty = async (
  propertyId,
  payload
) => {
  const response = await apiClient.put(
    `/api/properties/${propertyId}`,
    payload
  );

  return response.data;
};


/* =====================================================
   AMENITIES
===================================================== */

export const getAmenities = async () => {
  const response = await apiClient.get(
    "/api/amenities"
  );

  return response.data;
};

export const addPropertyAmenity = async (payload) => {
  const response = await apiClient.post(
    "/api/property-amenities",
    payload
  );

  return response.data;
};


/* =====================================================
   PROPERTY IMAGES
===================================================== */

export const createPropertyImage = async (payload) => {
  const response = await apiClient.post(
    "/api/property-images",
    payload
  );

  return response.data;
};


/* =====================================================
   PRICING
===================================================== */

export const createPricing = async (payload) => {
  const response = await apiClient.post(
    "/api/pricing",
    payload
  );

  return response.data;
};


/* =====================================================
   AVAILABILITY
===================================================== */

export const createAvailability = async (payload) => {
  const response = await apiClient.post(
    "/api/property-availability",
    payload
  );

  return response.data;
};


/* =====================================================
   HOST DASHBOARD
===================================================== */

export const getHostDashboard = async () => {
  const response = await apiClient.get(
    "/api/host/dashboard"
  );

  return response.data;
};