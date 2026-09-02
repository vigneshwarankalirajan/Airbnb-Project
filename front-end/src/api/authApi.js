import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

// ===============================
// REGISTER
// ===============================

export const register = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/users/`,
      data
    );

    return response;
  } catch (error) {
    console.error(
      "Register API Error:",
      error.response?.status,
      error.response?.data || error.message
    );

    throw error;
  }
};


// ===============================
// LOGIN
// ===============================

export const login = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/login`,
      data
    );

    return response;
  } catch (error) {
    console.error(
      "Login API Error:",
      error.response?.status,
      error.response?.data || error.message
    );

    throw error;
  }
};