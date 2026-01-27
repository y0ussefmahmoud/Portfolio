import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * ErrorBoundary Component
 *
 * React Error Boundary to catch JavaScript errors in child components.
 * Displays fallback UI instead of crashing the entire app.
 * Logs errors to console for debugging.
 *
 * @component
 */
import { Component } from 'react';
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        /**
         * Resets error state and reloads page
         */
        this.handleRetry = () => {
            this.setState({ hasError: false, error: null });
            window.location.reload();
        };
        this.state = {
            hasError: false,
            error: null
        };
    }
    /**
     * Updates state when an error is caught
     * Called during render phase
     */
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    /**
     * Logs error details to console
     * Called after error is caught
     */
    componentDidCatch(error, errorInfo) {
        console.error('Error caught by ErrorBoundary:', error);
        console.error('Error Info:', errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (_jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center p-8 text-center bg-background", children: [_jsx("div", { className: "text-6xl mb-4", children: "\u26A0\uFE0F" }), _jsx("h1", { className: "text-3xl font-bold text-foreground mb-4", children: "Oops! Something went wrong" }), _jsx("p", { className: "text-lg text-muted-foreground mb-8 max-w-2xl", children: "We're sorry for the inconvenience. An unexpected error occurred. Please try refreshing the page." }), _jsx("button", { onClick: this.handleRetry, className: "px-8 py-4 bg-primary text-white rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-accent hover:-translate-y-1", children: "Refresh Page" })] }));
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
