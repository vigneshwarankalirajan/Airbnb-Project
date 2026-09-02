import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// GET ALL PROPERTY IMAGES
export const getPropertyImages = async () => {
  const response = await api.get(
    "/property-images/"
  );

  return response.data;
};

// GET IMAGES FOR ONE PROPERTY
export const getPropertyImagesByProperty = async (
  propertyId
) => {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  const response = await api.get(
    `/property-images/property/${propertyId}`
  );

  return response.data;
};

// GET ONE PROPERTY IMAGE
export const getPropertyImage = async (imageId) => {
  if (!imageId) {
    throw new Error("Image ID is required");
  }

  const response = await api.get(
    `/property-images/${imageId}`
  );

  return response.data;
};

// CREATE PROPERTY IMAGE
export const createPropertyImage = async (
  imageData
) => {
  const response = await api.post(
    "/property-images/",
    imageData
  );

  return response.data;
};

// DELETE PROPERTY IMAGE
export const deletePropertyImage = async (
  imageId
) => {
  const response = await api.delete(
    `/property-images/${imageId}`
  );

  return response.data;
};

export default api;