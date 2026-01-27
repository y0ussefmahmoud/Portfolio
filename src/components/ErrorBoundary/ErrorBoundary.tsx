/**
 * ErrorBoundary Component
 * 
 * React Error Boundary to catch JavaScript errors in child components.
 * Displays fallback UI instead of crashing the entire app.
 * Logs errors to console for debugging.
 * 
 * @component
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';

/**
 * Props for ErrorBoundary component
 * 
 * @interface ErrorBoundaryProps
 * @property {ReactNode} children - Child components to wrap
 */
interface ErrorBoundaryProps {
  children: ReactNode;
}

/**
 * State for ErrorBoundary component
 * 
 * @interface ErrorBoundaryState
 * @property {boolean} hasError - Whether an error has been caught
 * @property {Error | null} error - The caught error object
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  /**
   * Updates state when an error is caught
   * Called during render phase
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  /**
   * Logs error details to console
   * Called after error is caught
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Error Info:', errorInfo);
  }

  /**
   * Resets error state and reloads page
   */
  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-background">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Oops! Something went wrong</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            We're sorry for the inconvenience. An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={this.handleRetry}
            className="px-8 py-4 bg-primary text-white rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-accent hover:-translate-y-1"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
