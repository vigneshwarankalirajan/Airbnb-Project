import api from "./axios";

export const getCityZones = async () => {
  const response = await api.get("/city-zones/");
  return response.data;
};

export const getCityZone = async (id) => {
  const response = await api.get(`/city-zones/${id}`);
  return response.data;
};