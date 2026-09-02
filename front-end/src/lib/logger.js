// src/lib/logger.js

const isDevelopment = import.meta.env.DEV;

class Logger {
  debug(message, data = {}) {
    if (!isDevelopment) return;

    console.debug(
      `[DEBUG] ${new Date().toISOString()} - ${message}`,
      data
    );
  }

  info(message, data = {}) {
    if (!isDevelopment) return;

    console.info(
      `[INFO] ${new Date().toISOString()} - ${message}`,
      data
    );
  }

  warn(message, data = {}) {
    console.warn(
      `[WARN] ${new Date().toISOString()} - ${message}`,
      data
    );
  }

  error(message, error = null, data = {}) {
    console.error(
      `[ERROR] ${new Date().toISOString()} - ${message}`,
      {
        error,
        ...data,
      }
    );
  }

  apiRequest(method, url, data = {}) {
    if (!isDevelopment) return;

    console.info(
      `[API REQUEST] ${new Date().toISOString()}`,
      {
        method,
        url,
        ...data,
      }
    );
  }

  apiResponse(method, url, status, duration) {
    if (!isDevelopment) return;

    console.info(
      `[API RESPONSE] ${new Date().toISOString()}`,
      {
        method,
        url,
        status,
        duration: `${duration}ms`,
      }
    );
  }

  apiError(method, url, error, duration) {
    console.error(
      `[API ERROR] ${new Date().toISOString()}`,
      {
        method,
        url,
        error,
        duration: `${duration}ms`,
      }
    );
  }
}

const logger = new Logger();

export default logger;