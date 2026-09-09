import apiClient from "./apiClient";

export const getPayments = async (params = {}) => {
  try {
    const response = await apiClient.get("/payments/", {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(
      "GET /payments/ Error:",
      error?.response?.data || error?.message
    );

    throw new Error(
      error?.response?.data?.detail ||
        error?.message ||
        "Unable to load payments"
    );
  }
};

export const createPayment = async (data) => {
  try {
    const response = await apiClient.post(
      "/payments/",
      data
    );

    return response.data;
  } catch (error) {
    console.error(
      "POST /payments/ Error:",
      error?.response?.data || error?.message
    );

    throw new Error(
      error?.response?.data?.detail ||
        error?.message ||
        "Unable to create payment"
    );
  }
};