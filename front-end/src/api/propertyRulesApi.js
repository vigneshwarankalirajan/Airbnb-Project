import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// GET ALL PROPERTY RULES
export const getPropertyRules = async () => {
  const response = await api.get(
    "/property-rules/"
  );

  return response.data;
};

// GET RULES FOR PROPERTY
export const getPropertyRulesByProperty = async (
  propertyId
) => {
  if (!propertyId) {
    throw new Error("Property ID is required");
  }

  const response = await api.get(
    `/property-rules/property/${propertyId}`
  );

  return response.data;
};

// GET ONE PROPERTY RULE
export const getPropertyRule = async (ruleId) => {
  if (!ruleId) {
    throw new Error("Rule ID is required");
  }

  const response = await api.get(
    `/property-rules/${ruleId}`
  );

  return response.data;
};

// CREATE RULE
export const createPropertyRule = async (
  ruleData
) => {
  const response = await api.post(
    "/property-rules/",
    ruleData
  );

  return response.data;
};

// UPDATE RULE
export const updatePropertyRule = async (
  ruleId,
  ruleData
) => {
  const response = await api.put(
    `/property-rules/${ruleId}`,
    ruleData
  );

  return response.data;
};

// DELETE RULE
export const deletePropertyRule = async (
  ruleId
) => {
  const response = await api.delete(
    `/property-rules/${ruleId}`
  );

  return response.data;
};

export default api;