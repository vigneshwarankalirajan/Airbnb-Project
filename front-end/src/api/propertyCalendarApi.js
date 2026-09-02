import api from "./axios";

export const getPropertyCalendars = async () => {
  const response = await api.get("/property-calendar/");
  return response.data;
};

export const getPropertyCalendar = async (id) => {
  const response = await api.get(`/property-calendar/${id}`);
  return response.data;
};

export const createPropertyCalendar = async (data) => {
  const response = await api.post("/property-calendar/", data);
  return response.data;
};

export const updatePropertyCalendar = async (id, data) => {
  const response = await api.put(
    `/property-calendar/${id}`,
    data
  );

  return response.data;
};

export const deletePropertyCalendar = async (id) => {
  const response = await api.delete(
    `/property-calendar/${id}`
  );

  return response.data;
};