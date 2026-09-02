import logger from "./logger";

export const setupGlobalErrorHandler = () => {
  // JavaScript errors
  window.addEventListener("error", (event) => {
    logger.error(
      "Global JavaScript Error",
      event.error || event.message,
      {
        filename: event.filename,
        lineNumber: event.lineno,
        columnNumber: event.colno,
      }
    );
  });

  // Promise / async errors
  window.addEventListener("unhandledrejection", (event) => {
    logger.error(
      "Unhandled Promise Rejection",
      event.reason
    );
  });
};