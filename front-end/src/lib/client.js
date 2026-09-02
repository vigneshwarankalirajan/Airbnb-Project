// src/lib/client.js

import logger from "./logger";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const client = async (
  endpoint,
  options = {}
) => {
  const startTime = Date.now();

  const method = options.method || "GET";

  const url = `${API_BASE_URL}${endpoint}`;

  logger.apiRequest(method, url);

  try {
    const response = await fetch(url, {
      ...options,

      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    const duration = Date.now() - startTime;

    logger.apiResponse(
      method,
      url,
      response.status,
      duration
    );

    if (!response.ok) {
      const errorText = await response.text();

      logger.apiError(
        method,
        url,
        errorText,
        duration
      );

      throw new Error(
        `API Error: ${response.status}`
      );
    }

    const contentType =
      response.headers.get("content-type");

    if (
      contentType &&
      contentType.includes("application/json")
    ) {
      return await response.json();
    }

    return await response.text();

  } catch (error) {
    const duration = Date.now() - startTime;

    logger.apiError(
      method,
      url,
      error,
      duration
    );

    throw error;
  }
};

export default client;