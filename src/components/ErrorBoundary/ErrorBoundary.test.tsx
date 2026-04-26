/**
 * ErrorBoundary Component Tests
 * 
 * Unit tests for the ErrorBoundary component to verify:
 * - Rendering children when no error occurs
 * - Displaying fallback UI when error occurs
 * - Logging errors to console
 * - Retry functionality
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// Mock console.error to avoid cluttering test output
const originalConsoleError = console.error;

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('should render children when no error occurs', () => {
    const ChildComponent = () => <div>Child Content</div>;
    
    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('should display fallback UI when error occurs', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };
    
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
  });

  it('should log error to console', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };
    
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(console.error).toHaveBeenCalled();
  });

  it('should call window.location.reload on retry', () => {
    const mockReload = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true,
    });
    
    const ThrowError = () => {
      throw new Error('Test error');
    };
    
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    const retryButton = screen.getByText('Refresh Page');
    fireEvent.click(retryButton);
    
    expect(mockReload).toHaveBeenCalled();
  });

  it('should display error message in fallback UI', () => {
    const ThrowError = () => {
      throw new Error('Custom error message');
    };
    
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText("We're sorry for the inconvenience. An unexpected error occurred. Please try refreshing the page.")).toBeInTheDocument();
  });
});
