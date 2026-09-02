import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const checkAvailability = async ({
  propertyId,
  checkIn,
  checkOut,
  guests,
}) => {
  const response = await api.get("/availability/", {
    params: {
      property_id: propertyId,
      check_in: checkIn,
      check_out: checkOut,
      guests: guests,
    },
  });

  return response.data;
};

export default api;