/**
 * useNavigation Hook Tests
 * 
 * Unit tests for the useNavigation custom hook
 */

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useNavigation } from '../useNavigation';

describe('useNavigation', () => {
  beforeEach(() => {
    // Reset any state before each test
  });

  it('should initialize with default section', () => {
    const { result } = renderHook(() => useNavigation('home'));
    
    expect(result.current.currentSection).toBe('home');
    expect(result.current.nextSection).toBe(null);
    expect(result.current.direction).toBe(0);
    expect(result.current.isTransitioning).toBe(false);
  });

  it('should navigate to a different section', () => {
    const { result } = renderHook(() => useNavigation('home'));
    
    act(() => {
      result.current.navigateTo('stack');
    });
    
    expect(result.current.currentSection).toBe('stack');
    expect(result.current.isTransitioning).toBe(true);
  });

  it('should not navigate to the same section', () => {
    const { result } = renderHook(() => useNavigation('home'));
    
    act(() => {
      result.current.navigateTo('home');
    });
    
    expect(result.current.currentSection).toBe('home');
    expect(result.current.isTransitioning).toBe(false);
  });

  it('should calculate direction correctly for forward navigation', () => {
    const { result } = renderHook(() => useNavigation('home'));
    
    act(() => {
      result.current.navigateTo('stack');
    });
    
    expect(result.current.direction).toBe(1);
  });

  it('should calculate direction correctly for backward navigation', () => {
    const { result } = renderHook(() => useNavigation('stack'));
    
    act(() => {
      result.current.navigateTo('home');
    });
    
    expect(result.current.direction).toBe(-1);
  });

  it('should reset transitioning state on transition complete', () => {
    const { result } = renderHook(() => useNavigation('home'));
    
    act(() => {
      result.current.navigateTo('stack');
    });
    
    expect(result.current.isTransitioning).toBe(true);
    
    act(() => {
      result.current.handleTransitionComplete();
    });
    
    expect(result.current.isTransitioning).toBe(false);
  });
});
