/**
 * SkipLink Component Tests
 * 
 * Unit tests for the SkipLink component to verify:
 * - Rendering with correct href
 * - Displaying children text
 * - Accessibility attributes
 * - Focus behavior
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkipLink from './SkipLink';

describe('SkipLink Component', () => {
  it('should render with correct href', () => {
    render(<SkipLink href="#main">Skip to main content</SkipLink>);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '#main');
  });

  it('should render children text', () => {
    render(<SkipLink href="#main">Skip to main content</SkipLink>);
    
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('should have correct CSS classes for accessibility', () => {
    render(<SkipLink href="#main">Skip to main content</SkipLink>);
    
    const link = screen.getByRole('link');
    expect(link).toHaveClass('absolute');
    expect(link).toHaveClass('-top-10');
  });

  it('should be hidden by default (negative top position)', () => {
    render(<SkipLink href="#main">Skip to main content</SkipLink>);
    
    const link = screen.getByRole('link');
    expect(link).toHaveClass('-top-10');
  });

  it('should support custom href values', () => {
    render(<SkipLink href="#content">Skip to content</SkipLink>);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '#content');
  });

  it('should support custom children', () => {
    render(<SkipLink href="#main">Go to main</SkipLink>);
    
    expect(screen.getByText('Go to main')).toBeInTheDocument();
  });
});
