import apiClient from "./apiClient";

/* =====================================================
   PROPERTY
===================================================== */

export const createProperty = async (payload) => {
  const response = await apiClient.post(
    "/properties/",
    payload
  );

  return response.data;
};

export const getProperty = async (propertyId) => {
  const response = await apiClient.get(
    `/properties/${propertyId}`
  );

  return response.data;
};

export const updateProperty = async (
  propertyId,
  payload
) => {
  const response = await apiClient.put(
    `/properties/${propertyId}`,
    payload
  );

  return response.data;
};


/* =====================================================
   AMENITIES
===================================================== */

export const getAmenities = async () => {
  const response = await apiClient.get(
    "/amenities/"
  );

  return response.data;
};

export const addPropertyAmenity = async (payload) => {
  const response = await apiClient.post(
    "/property-amenities/",
    payload
  );

  return response.data;
};


/* =====================================================
   PROPERTY IMAGES
===================================================== */

export const createPropertyImage = async (payload) => {
  const response = await apiClient.post(
    "/property-images/",
    payload
  );

  return response.data;
};


/* =====================================================
   PRICING
===================================================== */

export const createPricing = async (payload) => {
  const response = await apiClient.post(
    "/pricing/",
    payload
  );

  return response.data;
};


/* =====================================================
   AVAILABILITY
===================================================== */

export const createAvailability = async (payload) => {
  const response = await apiClient.post(
    "/property-availability/",
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