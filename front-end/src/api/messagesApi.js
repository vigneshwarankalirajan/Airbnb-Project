import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const createMessage = (data) => {
  return axios.post(
    `${API_URL}/messages/`,
    data
  );
};

export const getMessages = (conversationId) => {
  return axios.get(
    `${API_URL}/messages/`,
    {
      params: {
        conversation_id: conversationId,
      },
    }
  );
};

export const getMessage = (messageId) => {
  return axios.get(
    `${API_URL}/messages/${messageId}`
  );
};