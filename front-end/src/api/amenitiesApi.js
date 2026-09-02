import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// GET ALL AMENITIES
export const getAmenities = async () => {
  const response = await api.get("/amenities/");
  return response.data;
};

// GET ONE AMENITY
export const getAmenity = async (amenityId) => {
  if (!amenityId) {
    throw new Error("Amenity ID is required");
  }

  const response = await api.get(
    `/amenities/${amenityId}`
  );

  return response.data;
};

// CREATE AMENITY
export const createAmenity = async (amenityData) => {
  const response = await api.post(
    "/amenities/",
    amenityData
  );

  return response.data;
};

// UPDATE AMENITY
export const updateAmenity = async (
  amenityId,
  amenityData
) => {
  const response = await api.put(
    `/amenities/${amenityId}`,
    amenityData
  );

  return response.data;
};

// DELETE AMENITY
export const deleteAmenity = async (amenityId) => {
  const response = await api.delete(
    `/amenities/${amenityId}`
  );

  return response.data;
};

export default api;