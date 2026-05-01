import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useNavigation } from './useNavigation';

describe('useNavigation', () => {
  beforeEach(() => {
    vi.clearAllTimers();
  });

  it('should initialize with default section', () => {
    const { result } = renderHook(() => useNavigation('home'));

    expect(result.current.currentSection).toBe('home');
    expect(result.current.nextSection).toBeNull();
    expect(result.current.direction).toBe(0);
    expect(result.current.isTransitioning).toBe(false);
  });

  it('should initialize with custom section', () => {
    const { result } = renderHook(() => useNavigation('projects'));

    expect(result.current.currentSection).toBe('projects');
  });

  describe('navigateTo', () => {
    it('should navigate to a different section', () => {
      const { result } = renderHook(() => useNavigation('home'));

      act(() => {
        result.current.navigateTo('projects');
      });

      expect(result.current.currentSection).toBe('projects');
      expect(result.current.isTransitioning).toBe(true);
    });

    it('should not navigate to the same section', () => {
      const { result } = renderHook(() => useNavigation('home'));

      act(() => {
        result.current.navigateTo('home');
      });

      expect(result.current.isTransitioning).toBe(false);
    });

    it('should not navigate while transitioning', () => {
      const { result } = renderHook(() => useNavigation('home'));

      // First navigation
      act(() => {
        result.current.navigateTo('projects');
      });

      // Should not allow second navigation while transitioning
      act(() => {
        result.current.navigateTo('services');
      });

      expect(result.current.currentSection).toBe('projects');
    });

    it('should set direction based on navigation order (forward)', () => {
      const { result } = renderHook(() => useNavigation('home'));

      act(() => {
        result.current.navigateTo('projects');
      });

      expect(result.current.direction).toBe(1);
    });

    it('should set direction based on navigation order (backward)', () => {
      const { result } = renderHook(() => useNavigation('projects'));

      act(() => {
        result.current.navigateTo('home');
      });

      expect(result.current.direction).toBe(-1);
    });

    it('should set direction for non-sequential sections to 0', () => {
      const { result } = renderHook(() => useNavigation('secret'));

      act(() => {
        result.current.navigateTo('home');
      });

      expect(result.current.direction).toBe(0);
    });

    it('should set nextSection before completing transition', () => {
      const { result } = renderHook(() => useNavigation('home'));

      act(() => {
        result.current.navigateTo('stack');
      });

      expect(result.current.nextSection).toBe('stack');
    });
  });

  describe('handleTransitionComplete', () => {
    it('should reset transitioning state', () => {
      const { result } = renderHook(() => useNavigation('home'));

      act(() => {
        result.current.navigateTo('projects');
      });

      expect(result.current.isTransitioning).toBe(true);

      act(() => {
        result.current.handleTransitionComplete();
      });

      expect(result.current.isTransitioning).toBe(false);
    });
  });

  describe('handleCurtainCovered', () => {
    it('should execute without errors', () => {
      const { result } = renderHook(() => useNavigation('home'));

      act(() => {
        result.current.handleCurtainCovered();
      });

      // This is a placeholder function, should not throw
      expect(result.current).toBeDefined();
    });
  });

  describe('setCurrentSection', () => {
    it('should manually set current section', () => {
      const { result } = renderHook(() => useNavigation('home'));

      act(() => {
        result.current.setCurrentSection('services');
      });

      expect(result.current.currentSection).toBe('services');
    });
  });

  describe('setDirection', () => {
    it('should manually set direction', () => {
      const { result } = renderHook(() => useNavigation('home'));

      act(() => {
        result.current.setDirection(2);
      });

      expect(result.current.direction).toBe(2);
    });
  });
});
