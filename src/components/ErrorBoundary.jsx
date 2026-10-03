import { Component } from "react";
import PropTypes from "prop-types";
import Card from "./ui/Card";
import { Button } from "./Button";

const isDevelopment = import.meta.env.MODE === "development";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    if (isDevelopment) {
      console.error("Error caught by boundary:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
          <Card
            decoration="tape"
            tilt="-1"
            className="max-w-xl text-center"
            role="alert"
          >
            <div className="text-5xl mb-4" aria-hidden="true">
              ⚠️
            </div>

            <h2 className="headline-2 mb-4">Oops! Something went wrong</h2>

            <p className="text-ink-soft text-lg md:text-xl mb-8 max-w-md">
              We encountered an unexpected error. Please try refreshing the page
              or contact support if the problem persists.
            </p>

            <Button
              onClick={() =>
                this.setState({ hasError: false, error: null, errorInfo: null })
              }
            >
              Try Again
            </Button>

            {isDevelopment && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer font-display text-lg text-ink-soft hover:text-marker">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-4 p-4 bg-ink-night text-marker border-2 border-ink rounded-wobbly-sm font-mono text-sm overflow-auto max-h-64">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;