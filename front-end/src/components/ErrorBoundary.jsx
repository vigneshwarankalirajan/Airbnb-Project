// src/components/ErrorBoundary.jsx

import React from "react";
import logger from "../lib/logger";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    logger.error(
      "React Component Error",
      error,
      {
        componentStack: errorInfo.componentStack,
      }
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: "20px",
          }}
        >
          <h1>Something went wrong</h1>

          <p>
            Please refresh the page and try again.
          </p>

          {import.meta.env.DEV && (
            <pre
              style={{
                marginTop: "20px",
                maxWidth: "800px",
                whiteSpace: "pre-wrap",
              }}
            >
              {this.state.error?.message}
            </pre>
          )}

          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;