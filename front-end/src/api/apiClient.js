import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getPaymentMethods = async (params = {}) => {
  try {
    const response = await apiClient.get("/payment-methods/", {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(
      "GET PAYMENT METHODS ERROR:",
      error?.response?.data || error?.message
    );

    throw error;
  }
};

export const createPaymentMethod = async (data) => {
  try {
    const response = await apiClient.post(
      "/payment-methods/",
      data
    );

    return response.data;
  } catch (error) {
    console.error(
      "CREATE PAYMENT METHOD ERROR:",
      error?.response?.data || error?.message
    );

    throw error;
  }
};

export default apiClient;