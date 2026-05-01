import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { LanguageProvider, useLanguage } from './LanguageContext';
import React from 'react';

// Mock component that uses the context
const TestComponent = () => {
  const { language, t, toggleLanguage } = useLanguage();
  return (
    <div>
      <span data-testid="language">{language}</span>
      <span data-testid="hero-name">{t.hero.name}</span>
      <button onClick={toggleLanguage}>Toggle</button>
    </div>
  );
};

describe('LanguageContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset document attributes
    document.documentElement.lang = '';
    document.documentElement.dir = '';
  });

  describe('LanguageProvider', () => {
    it('should render children', () => {
      render(
        <LanguageProvider>
          <div data-testid="child">Child Content</div>
        </LanguageProvider>
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should provide English as default language', () => {
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId('language')).toHaveTextContent('en');
    });

    it('should provide translations', () => {
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId('hero-name')).toBeInTheDocument();
    });

    it('should set document attributes correctly', () => {
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      expect(document.documentElement.lang).toBe('en');
      expect(document.documentElement.dir).toBe('ltr');
    });

    it('should log message when toggle is called', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      act(() => {
        screen.getByText('Toggle').click();
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        'Language switching is disabled. Arabic support coming soon.'
      );

      consoleSpy.mockRestore();
    });
  });

  describe('useLanguage hook', () => {
    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useLanguage must be used within a LanguageProvider');

      consoleError.mockRestore();
    });

    it('should return context when used inside provider', () => {
      render(
        <LanguageProvider>
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId('language')).toBeInTheDocument();
    });
  });
});
