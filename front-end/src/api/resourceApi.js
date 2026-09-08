import apiClient from "./apiClient";

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.detail || error?.message || fallback;

export const createResourceApi = (resource, label = resource) => ({
  list: async () => {
    try {
      const response = await apiClient.get(`/${resource}/`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, `Unable to load ${label}`));
    }
  },
  get: async (id) => {
    try {
      const response = await apiClient.get(`/${resource}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, `Unable to load ${label}`));
    }
  },
  create: async (payload) => {
    try {
      const response = await apiClient.post(`/${resource}/`, payload);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, `Unable to create ${label}`));
    }
  },
  update: async (id, payload) => {
    try {
      const response = await apiClient.put(`/${resource}/${id}`, payload);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, `Unable to update ${label}`));
    }
  },
  remove: async (id) => {
    try {
      const response = await apiClient.delete(`/${resource}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, `Unable to delete ${label}`));
    }
  },
});
