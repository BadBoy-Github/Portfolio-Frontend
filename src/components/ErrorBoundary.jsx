import { Component } from 'react';
import PropTypes from 'prop-types';

const isDevelopment = import.meta.env.MODE === 'development';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to console in development
    if (isDevelopment) {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-card rounded-xl border border-error/20">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
              className="px-6 py-3 bg-accent-secondary hover:bg-accent-secondary/90 text-accent-foreground rounded-lg transition-colors"
            >
              Try Again
            </button>
            {isDevelopment && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 p-4 bg-muted rounded text-sm text-error overflow-auto max-h-64">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
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
