/**
 * SEOHead Component Tests
 * 
 * Unit tests for the SEOHead component to verify:
 * - Setting document title
 * - Updating meta tags
 * - Setting Open Graph tags
 * - Setting Twitter Card tags
 * - Handling default values
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import SEOHead from './SEOHead';

describe('SEOHead Component', () => {
  beforeEach(() => {
    document.title = '';
    // Clear existing meta tags
    document.querySelectorAll('meta').forEach(meta => meta.remove());
  });

  afterEach(() => {
    document.title = '';
    document.querySelectorAll('meta').forEach(meta => meta.remove());
  });

  it('should set document title', () => {
    render(<SEOHead title="Test Title" />);
    
    expect(document.title).toBe('Test Title');
  });

  it('should set default title when not provided', () => {
    render(<SEOHead />);
    
    expect(document.title).toBe('Y0ussef Mahmoud - Full-Stack Developer Portfolio');
  });

  it('should set description meta tag', () => {
    render(<SEOHead description="Test description" />);
    
    const meta = document.querySelector('meta[name="description"]');
    expect(meta).toBeTruthy();
    expect(meta?.getAttribute('content')).toBe('Test description');
  });

  it('should set keywords meta tag', () => {
    render(<SEOHead keywords={['React', 'TypeScript']} />);

    const meta = document.querySelector('meta[name="keywords"]');
    expect(meta).toBeTruthy();
    expect(meta?.getAttribute('content')).toBe('React, TypeScript');
  });

  it('should set author meta tag', () => {
    render(<SEOHead />);
    
    const meta = document.querySelector('meta[name="author"]');
    expect(meta).toBeTruthy();
    expect(meta?.getAttribute('content')).toBe('Y0ussef Mahmoud');
  });

  it('should set Open Graph title', () => {
    render(<SEOHead title="Test Title" />);
    
    const meta = document.querySelector('meta[property="og:title"]');
    expect(meta).toBeTruthy();
    expect(meta?.getAttribute('content')).toBe('Test Title');
  });

  it('should set Open Graph description', () => {
    render(<SEOHead description="Test description" />);
    
    const meta = document.querySelector('meta[property="og:description"]');
    expect(meta).toBeTruthy();
    expect(meta?.getAttribute('content')).toBe('Test description');
  });

  it('should set Open Graph image', () => {
    render(<SEOHead image="test-image.jpg" />);
    
    const meta = document.querySelector('meta[property="og:image"]');
    expect(meta).toBeTruthy();
    expect(meta?.getAttribute('content')).toContain('test-image.jpg');
  });

  it('should set Open Graph URL', () => {
    render(<SEOHead url="https://example.com" />);
    
    const meta = document.querySelector('meta[property="og:url"]');
    expect(meta).toBeTruthy();
    expect(meta?.getAttribute('content')).toBe('https://example.com');
  });

  it('should set Twitter Card title', () => {
    render(<SEOHead title="Test Title" />);
    
    const meta = document.querySelector('meta[name="twitter:title"]');
    expect(meta).toBeTruthy();
    expect(meta?.getAttribute('content')).toBe('Test Title');
  });

  it('should set Twitter Card description', () => {
    render(<SEOHead description="Test description" />);
    
    const meta = document.querySelector('meta[name="twitter:description"]');
    expect(meta).toBeTruthy();
    expect(meta?.getAttribute('content')).toBe('Test description');
  });

  it('should set Twitter Card image', () => {
    render(<SEOHead image="test-image.jpg" />);
    
    const meta = document.querySelector('meta[name="twitter:image"]');
    expect(meta).toBeTruthy();
    expect(meta?.getAttribute('content')).toContain('test-image.jpg');
  });

  it('should handle relative image URLs by prepending URL', () => {
    render(<SEOHead image="test.jpg" url="https://example.com/" />);
    
    const ogImage = document.querySelector('meta[property="og:image"]');
    expect(ogImage?.getAttribute('content')).toBe('https://example.com/test.jpg');
  });

  it('should handle absolute image URLs', () => {
    render(<SEOHead image="https://cdn.example.com/test.jpg" url="https://example.com/" />);
    
    const ogImage = document.querySelector('meta[property="og:image"]');
    expect(ogImage?.getAttribute('content')).toBe('https://cdn.example.com/test.jpg');
  });
});
