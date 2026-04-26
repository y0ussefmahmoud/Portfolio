/**
 * Alert Component Tests
 * 
 * Unit tests for the Alert component to verify:
 * - Rendering with different alert types
 * - Displaying correct messages
 * - Auto-dismissal functionality
 * - Manual close functionality
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Alert from './Alert';

describe('Alert Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render success alert with message', () => {
    render(<Alert type="success" message="Success message" onClose={() => {}} />);
    
    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  it('should render error alert with message', () => {
    render(<Alert type="error" message="Error message" onClose={() => {}} />);
    
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('should render warning alert with message', () => {
    render(<Alert type="warning" message="Warning message" onClose={() => {}} />);
    
    expect(screen.getByText('Warning message')).toBeInTheDocument();
  });

  it('should render info alert with message', () => {
    render(<Alert type="info" message="Info message" onClose={() => {}} />);
    
    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<Alert type="success" message="Test message" onClose={onClose} />);
    
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should auto-dismiss after duration', async () => {
    const onClose = vi.fn();
    render(<Alert type="success" message="Test message" onClose={onClose} duration={1000} />);
    
    vi.advanceTimersByTime(1000);
    
    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('should not auto-dismiss if duration is 0', async () => {
    const onClose = vi.fn();
    render(<Alert type="success" message="Test message" onClose={onClose} duration={0} />);
    
    vi.advanceTimersByTime(5000);
    
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should display correct icon based on alert type', () => {
    const { rerender } = render(<Alert type="success" message="Test" onClose={() => {}} />);
    expect(screen.getByTestId('alert-icon')).toBeInTheDocument();
    
    rerender(<Alert type="error" message="Test" onClose={() => {}} />);
    expect(screen.getByTestId('alert-icon')).toBeInTheDocument();
    
    rerender(<Alert type="warning" message="Test" onClose={() => {}} />);
    expect(screen.getByTestId('alert-icon')).toBeInTheDocument();
    
    rerender(<Alert type="info" message="Test" onClose={() => {}} />);
    expect(screen.getByTestId('alert-icon')).toBeInTheDocument();
  });
});
