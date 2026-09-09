import apiClient from "./apiClient";

// GET PAYMENT METHODS
export const getPaymentMethods = async (params = {}) => {
  try {
    const response = await apiClient.get("/payment-methods/", {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(
      "GET /payment-methods/ Error:",
      error?.response?.data || error?.message
    );

    throw new Error(
      error?.response?.data?.detail ||
        error?.message ||
        "Unable to load payment methods"
    );
  }
};

// CREATE PAYMENT METHOD
export const createPaymentMethod = async (data) => {
  try {
    const response = await apiClient.post(
      "/payment-methods/",
      data
    );

    return response.data;
  } catch (error) {
    console.error(
      "POST /payment-methods/ Error:",
      error?.response?.data || error?.message
    );

    throw new Error(
      error?.response?.data?.detail ||
        error?.message ||
        "Unable to save payment method"
    );
  }
};