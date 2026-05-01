/**
 * useNavigation Hook
 *
 * Custom hook for managing section navigation and transitions.
 * Handles navigation logic, direction calculation, and transition states.
 *
 * @author      م / يوسف محمود عبد الجواد
 * @author      Eng. Youssef Mahmoud Abdelgawad
 * @website     https://y0ussef.com
 * @version     3.0.7
 * @copyright   2024-2025 Youssef Mahmoud Abdelgawad. All rights reserved.
 * @hook
 */

import { useState, useCallback } from 'react';

type Section = 'home' | 'stack' | 'services' | 'projects' | 'secret' | 'dashboard' | 'view_link';

interface UseNavigationReturn {
  currentSection: Section;
  nextSection: Section | null;
  direction: number;
  isTransitioning: boolean;
  navigateTo: (section: Section) => void;
  setCurrentSection: (section: Section) => void;
  handleCurtainCovered: () => void;
  handleTransitionComplete: () => void;
  setDirection: (dir: number) => void;
}

/**
 * Custom hook for navigation management
 * @param initialSection - The initial section to start with
 * @returns Navigation state and handlers
 */
export const useNavigation = (initialSection: Section = 'home'): UseNavigationReturn => {
  const [currentSection, setCurrentSection] = useState<Section>(initialSection);
  const [nextSection, setNextSection] = useState<Section | null>(null);
  const [direction, setDirection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  /**
   * Navigate to a specific section
   * @param section - The section to navigate to
   */
  const navigateTo = useCallback((section: Section) => {
    if (section !== currentSection && !isTransitioning) {
      const order: Section[] = ['home', 'projects', 'services', 'stack'];
      const currIdx = order.indexOf(currentSection);
      const nextIdx = order.indexOf(section);

      let dir = 0;
      if (currIdx !== -1 && nextIdx !== -1) {
        dir = nextIdx > currIdx ? 1 : -1;
      }

      setDirection(dir);
      setNextSection(section);
      setCurrentSection(section);
      setIsTransitioning(true);
    }
  }, [currentSection, isTransitioning]);

  /**
   * Handle curtain covered during transition
   * Called when the transition curtain covers the screen
   */
  const handleCurtainCovered = useCallback(() => {
    // Placeholder for future curtain animation logic
  }, []);

  /**
   * Handle transition complete
   * Resets transitioning state when animation finishes
   */
  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  return {
    currentSection,
    nextSection,
    direction,
    isTransitioning,
    navigateTo,
    setCurrentSection,
    handleCurtainCovered,
    handleTransitionComplete,
    setDirection,
  };
};
