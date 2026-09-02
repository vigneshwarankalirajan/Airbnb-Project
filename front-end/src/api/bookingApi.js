import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

/* =========================
   PRICING
========================= */

export const getPricingByProperty = (propertyId) => {
  return axios.get(`${API_URL}/pricing/`, {
    params: {
      property_id: propertyId,
    },
  });
};


/* =========================
   PROPERTY AVAILABILITY
========================= */

export const getPropertyAvailability = (propertyId) => {
  return axios.get(
    `${API_URL}/property-availability/property/${propertyId}`
  );
};


/* =========================
   CREATE BOOKING
========================= */

export const createBooking = (data) => {
  return axios.post(
    `${API_URL}/bookings/`,
    data
  );
};


/* =========================
   GET BOOKING
========================= */

export const getBooking = (bookingId) => {
  return axios.get(
    `${API_URL}/bookings/${bookingId}`
  );
};