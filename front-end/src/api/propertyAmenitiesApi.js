import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// GET ALL PROPERTY AMENITIES
export const getPropertyAmenities = async () => {
  const response = await api.get(
    "/property-amenities/"
  );

  return response.data;
};

// GET AMENITIES FOR PROPERTY
export const getPropertyAmenitiesByProperty = async (
  propertyId
) => {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  const response = await api.get(
    `/property-amenities/property/${propertyId}`
  );

  return response.data;
};

// GET ONE PROPERTY AMENITY
export const getPropertyAmenity = async (
  propertyAmenityId
) => {
  if (!propertyAmenityId) {
    throw new Error(
      "Property Amenity ID is required"
    );
  }

  const response = await api.get(
    `/property-amenities/${propertyAmenityId}`
  );

  return response.data;
};

// CREATE PROPERTY AMENITY
export const createPropertyAmenity = async (
  data
) => {
  const response = await api.post(
    "/property-amenities/",
    data
  );

  return response.data;
};

// DELETE PROPERTY AMENITY
export const deletePropertyAmenity = async (
  propertyAmenityId
) => {
  const response = await api.delete(
    `/property-amenities/${propertyAmenityId}`
  );

  return response.data;
};

export default api;