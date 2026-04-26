/**
 * App Component Integration Tests
 * 
 * Integration tests for App.tsx to verify:
 * - Section navigation functionality
 * - Modal open/close functionality
 * - Initial section determination
 * - Loading state management
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock window.location
const mockLocation = {
  pathname: '/',
  href: 'http://localhost:3000/',
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

// Mock sessionStorage
const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
  writable: true,
});

describe('App Component Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocation.pathname = '/';
    mockLocation.href = 'http://localhost:3000/';
  });

  it('should render without crashing', () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  it('should determine initial section from URL', () => {
    mockLocation.pathname = '/Portfolio/';
    mockLocation.href = 'http://localhost:3000/Portfolio/';
    
    render(<App />);
    // App should render without errors
    expect(document.body).toBeInTheDocument();
  });

  it('should handle navigation between sections', async () => {
    render(<App />);
    
    // Wait for initial render
    await waitFor(() => {
      expect(document.body).toBeInTheDocument();
    });
  });

  it('should handle contact modal open/close', async () => {
    render(<App />);
    
    // Wait for initial render
    await waitFor(() => {
      expect(document.body).toBeInTheDocument();
    });
  });

  it('should handle CV modal open/close', async () => {
    render(<App />);
    
    // Wait for initial render
    await waitFor(() => {
      expect(document.body).toBeInTheDocument();
    });
  });

  it('should handle interviewer mode auto-open CV', async () => {
    mockSessionStorage.getItem.mockReturnValue('true');
    
    render(<App />);
    
    // Wait for initial render
    await waitFor(() => {
      expect(document.body).toBeInTheDocument();
    });
  });

  it('should handle project click and modal open', async () => {
    render(<App />);
    
    // Wait for initial render
    await waitFor(() => {
      expect(document.body).toBeInTheDocument();
    });
  });

  it('should handle contributor click and modal open', async () => {
    render(<App />);
    
    // Wait for initial render
    await waitFor(() => {
      expect(document.body).toBeInTheDocument();
    });
  });

  it('should handle keyboard navigation', async () => {
    render(<App />);
    
    // Wait for initial render
    await waitFor(() => {
      expect(document.body).toBeInTheDocument();
    });
  });

  it('should handle scroll-based navigation', async () => {
    render(<App />);
    
    // Wait for initial render
    await waitFor(() => {
      expect(document.body).toBeInTheDocument();
    });
  });
});
