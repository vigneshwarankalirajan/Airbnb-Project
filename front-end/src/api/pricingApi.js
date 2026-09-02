import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// CALCULATE PROPERTY PRICE
export const calculatePricing = async ({
  propertyId,
  checkIn,
  checkOut,
  guests,
}) => {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  if (!checkIn || !checkOut) {
    throw new Error(
      "Check-in and check-out dates are required"
    );
  }

  const response = await api.get(
    "/pricing/calculate",
    {
      params: {
        property_id: propertyId,
        check_in: checkIn,
        check_out: checkOut,
        guests,
      },
    }
  );

  return response.data;
};

// GET ALL PRICING
export const getPricing = async () => {
  const response = await api.get("/pricing/");
  return response.data;
};

// GET PROPERTY PRICING
export const getPropertyPricing = async (
  propertyId
) => {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  const response = await api.get(
    `/pricing/property/${propertyId}`
  );

  return response.data;
};

export default api;