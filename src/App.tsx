/**
 * App Component
 *
 * Main application component that manages section navigation, modals, and page transitions.
 * Features:
 * - Section-based navigation (home, stack, projects)
 * - Scroll-based navigation with wheel and keyboard support
 * - Modal management (Contact, CV, Project, Contributor)
 * - Page transitions with animation
 * - Loading state management
 * - Interviewer mode for auto-opening CV
 *
 * @author      م / يوسف محمود عبد الجواد
 * @author      Eng. Youssef Mahmoud Abdelgawad
 * @website     https://y0ussef.com
 * @version     3.0.7
 * @copyright   2024-2025 Youssef Mahmoud Abdelgawad. All rights reserved.
 * @component
 */

import { useState, useCallback, useEffect, useRef, lazy, Suspense } from 'react';
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Hero from './components/HeroY0';
import Navbar from './components/Navbar';
import Stack from './components/Stack';
import Services from './components/ServicesY0';
import PageTransition from './components/PageTransition';
import Projects from './components/ProjectsY0';
// import SecretPage from './components/SecretPage';
// import Dashboard from './components/Dashboard';
import Loader from './components/reactbits/Loader';
// import { Algorithm } from './components/Algorithm';
import { LanguageProvider } from './contexts/LanguageContext';

// Code splitting for large components
const MContact = lazy(() => import('./components/M-Contact'));
const MCV = lazy(() => import('./components/M-CV'));
const MProjectView = lazy(() => import('./components/M-ProjectView'));
const MContributorView = lazy(() => import('./components/M-ContributorView'));

import { ProjectData as Project, ContributorData as Contributor } from './types';

/**
 * Section type for navigation
 * Represents different sections of the portfolio
 */
type Section = 'home' | 'stack' | 'services' | 'projects' | 'secret' | 'dashboard' | 'view_link';

function App() {
  const [currentSection, setCurrentSection] = useState<Section>(() => {
    const path = window.location.pathname;
    const base = import.meta.env.BASE_URL;
    const normPath = path.replace(/\/$/, '');
    const normBase = base.replace(/\/$/, '');
    if (normPath !== normBase && normPath !== '') {
      return 'view_link';
    }
    return 'home';
  });
  const [previousSection, setPreviousSection] = useState<Section>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextSection, setNextSection] = useState<Section>('home');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [forceHideLoading, setForceHideLoading] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);
  const [isWindowReady, setIsWindowReady] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedContributor, setSelectedContributor] = useState<Contributor | null>(null);
  const [showContributorModal, setShowContributorModal] = useState(false);
  const [hasAutoOpenedCV, setHasAutoOpenedCV] = useState(false);

  /**
   * Initialize window ready state
   * Sets isWindowReady to true when DOM is loaded or already interactive
   */
  useEffect(() => {
    const handleLoad = () => setIsWindowReady(true);
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(() => setIsWindowReady(true), 0);
    } else {
      window.addEventListener('DOMContentLoaded', handleLoad);
      return () => window.removeEventListener('DOMContentLoaded', handleLoad);
    }
  }, []);

  /**
   * Safety timer to hide loader if data never arrives
   * Prevents infinite loading state
   */
  useEffect(() => {
    const safety = setTimeout(() => {
      setForceHideLoading(true);
    }, 4000);
    return () => clearTimeout(safety);
  }, []);

  /**
   * Derived loading state
   * Avoids setting state synchronously inside effects
   */
  const appLoading = forceHideLoading ? false : !(isDataReady && isWindowReady);

  /**
   * Handle hero animation completion
   * Auto-opens CV modal in interviewer mode
   */
  const handleHeroAnimationComplete = useCallback(() => {
    const isInterviewerMode = sessionStorage.getItem('revil_interviewer_mode') === 'true';
    if (isInterviewerMode && !hasAutoOpenedCV && (currentSection === 'home' || currentSection === 'view_link')) {
      setHasAutoOpenedCV(true);
      setIsCVModalOpen(true);
    }
  }, [hasAutoOpenedCV, currentSection]);

  const [direction, setDirection] = useState(0);

  /**
   * Get the current scrollable container by ID
   * @param sectionName - The section name to get container for
   * @returns The scrollable container element or null
   */
  const getScrollContainer = (sectionName: Section) => {
    return document.getElementById(`section-${sectionName}`) as HTMLDivElement | null;
  };

  /**
   * Navigate to a specific section
   * @param section - The section to navigate to
   */
  const navigateTo = useCallback((section: Section) => {
    if (section !== currentSection && !isTransitioning) {
      const order: Section[] = ['home', 'stack', 'projects'];
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
  const handleCurtainCovered = useCallback(() => { }, []);

  /**
   * Handle transition complete
   * Resets transitioning state when animation finishes
   */
  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  /**
   * Open contact modal
   */
  const openContactModal = useCallback(() => setIsContactModalOpen(true), []);

  /**
   * Close contact modal
   */
  const closeContactModal = useCallback(() => setIsContactModalOpen(false), []);

  /**
   * Open CV modal
   */
  const openCVModal = useCallback(() => setIsCVModalOpen(true), []);

  /**
   * Close CV modal
   */
  const closeCVModal = useCallback(() => setIsCVModalOpen(false), []);

  /**
   * Handle project click
   * Opens project modal with selected project details
   * @param project - The project to display
   */
  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  }, []);

  /**
   * Handle contributor click
   * Opens contributor modal with selected contributor details
   * @param contributor - The contributor to display
   */
  const handleContributorClick = useCallback((contributor: Contributor) => {
    setSelectedContributor(contributor);
    setShowContributorModal(true);
  }, []);

  /**
   * Render the current section component
   * @returns The component for the current section
   */
  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <Hero />;
      case 'stack':
        return <Stack />;
      case 'services':
        return <Services />;
      case 'projects':
        return <Projects />;
      case 'view_link':
        return <Hero />;
      default:
        return <Hero />;
    }
  };

  // --- Touch Logic (Mobile) ---
  // Implements swipe-based navigation for mobile devices
  // Detects vertical swipes to navigate between sections
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    // Record initial touch position
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Update touch position as user moves finger
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    // Don't navigate if modal is open or page is locked
    if (isContactModalOpen || document.body.style.overflow === 'hidden') {
      touchStartX.current = 0; touchEndX.current = 0; touchStartY.current = 0; touchEndY.current = 0;
      return;
    }

    const SWIPE_THRESHOLD = 120; // High sensitivity to avoid accidental swipes
    const deltaX = touchStartX.current - touchEndX.current;
    const deltaY = touchStartY.current - touchEndY.current;

    // VERY IMPORTANT: Reset values immediately so a rapid double-tap doesn't use old cached end values
    touchStartX.current = 0; touchEndX.current = 0; touchStartY.current = 0; touchEndY.current = 0;

    // If there was basically no movement (like a single tap or tiny jitter), ignore it
    if (Math.abs(deltaX) < SWIPE_THRESHOLD && Math.abs(deltaY) < SWIPE_THRESHOLD) {
      return;
    }

    const container = getScrollContainer(currentSection);
    if (!container) return;

    // Use a small buffer (5px) for edge detection
    const scrolledToBottom = Math.ceil(container.clientHeight + container.scrollTop) >= container.scrollHeight - 5;
    const scrolledToTop = container.scrollTop <= 5;

    // Determine swipe direction (horizontal vs vertical)
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Secret section disabled - no horizontal navigation
    } else {
      // Vertical swipe detected
      if (deltaY > SWIPE_THRESHOLD && scrolledToBottom) {
        // Swipe down at bottom - navigate to next section
        if (currentSection === 'home' || currentSection === 'view_link') navigateTo('stack');
        else if (currentSection === 'stack') navigateTo('projects');
      }
      else if (deltaY < -SWIPE_THRESHOLD && scrolledToTop) {
        // Swipe up at top - navigate to previous section
        if (currentSection === 'projects') navigateTo('stack');
        else if (currentSection === 'stack') navigateTo('home');
      }
    }
  };


  // --- Wheel/Scroll Logic (Desktop) ---
  // Implements smooth scroll-based navigation with momentum handling
  // Uses accumulator pattern to detect intentional scroll gestures vs accidental movements
  const scrollAccumulator = useRef(0);
  const lastWheelTime = useRef(0);
  const navigationCooldownUntil = useRef(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();

      // HARD LOCK: After navigating, ignore ALL wheel events for 1.5s.
      // This prevents trackpad momentum from triggering unwanted navigation
      // No exceptions. No debounce. No acceleration detection.
      if (now < navigationCooldownUntil.current) return;

      // Don't navigate if modal is open or page is locked
      if (isContactModalOpen || document.body.style.overflow === 'hidden') return;
      if (isTransitioning) return;

      const container = getScrollContainer(currentSection);
      if (!container) return;

      // Reset accumulator if user paused scrolling for 200ms (new gesture)
      // This distinguishes between continuous scrolling and separate scroll actions
      if (now - lastWheelTime.current > 200) {
        scrollAccumulator.current = 0;
      }
      lastWheelTime.current = now;

      const isScrollDown = e.deltaY > 0;
      const isScrollUp = e.deltaY < 0;

      // Check if at edges (5px buffer for edge detection)
      const scrolledToBottom = Math.ceil(container.clientHeight + container.scrollTop) >= container.scrollHeight - 5;
      const scrolledToTop = container.scrollTop <= 5;

      // Threshold for scroll gesture detection (50px)
      const THRESHOLD = 50;

      // Handle scroll down - navigate to next section
      if (isScrollDown && scrolledToBottom) {
        scrollAccumulator.current += e.deltaY;

        // Only navigate if accumulated scroll exceeds threshold
        if (scrollAccumulator.current > THRESHOLD) {
          scrollAccumulator.current = 0;
          navigationCooldownUntil.current = now + 1500; // Lock for 1.5s

          // Navigation order: home -> projects -> services -> stack -> home (loop)
          if (currentSection === 'home' || currentSection === 'view_link') navigateTo('projects');
          else if (currentSection === 'projects') navigateTo('services');
          else if (currentSection === 'services') navigateTo('stack');
          else if (currentSection === 'stack') navigateTo('home'); // Loop back to home
        }
      } else if (isScrollUp && scrolledToTop) {
        // Handle scroll up - navigate to previous section
        scrollAccumulator.current += e.deltaY;

        if (scrollAccumulator.current < -THRESHOLD) {
          scrollAccumulator.current = 0;
          navigationCooldownUntil.current = now + 1500; // Lock for 1.5s

          // Reverse navigation order
          if (currentSection === 'stack') navigateTo('services');
          else if (currentSection === 'services') navigateTo('projects');
          else if (currentSection === 'projects') navigateTo('home');
        }
      } else {
        // Reset accumulator if not at edge (user is scrolling within section)
        scrollAccumulator.current = 0;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isContactModalOpen || document.body.style.overflow === 'hidden') {
        if (e.key === 'Escape') closeContactModal();
        const activeTag = document.activeElement?.tagName;
        if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) {
          e.preventDefault();
        }
        return;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection, isTransitioning, navigateTo, isContactModalOpen, closeContactModal]);

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mainContainer = mainRef.current;
    if (!mainContainer) return;

    const preventPullToRefresh = (e: TouchEvent) => {
      const container = getScrollContainer(currentSection);
      if (!container) return;
      const pullDelta = e.touches[0].clientY - touchStartY.current;
      const isPullingDown = pullDelta > 10; // 10px threshold
      const scrolledToTop = container.scrollTop <= 2;

      if (scrolledToTop && isPullingDown && !isContactModalOpen) {
        if (e.cancelable) e.preventDefault();
      }
    };

    mainContainer.addEventListener('touchmove', preventPullToRefresh, { passive: false });
    return () => mainContainer.removeEventListener('touchmove', preventPullToRefresh);
  }, [currentSection, isContactModalOpen]);

  const variants = {
    enter: (direction: number) => {
      if (Math.abs(direction) === 2) {
        return { x: direction === 2 ? '100%' : '-100%', y: 0, opacity: 1, scale: 1 };
      }
      return { y: direction > 0 ? '100vh' : '-100vh', x: 0, opacity: 1, scale: 0.95 };
    },
    center: { x: 0, y: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => {
      if (Math.abs(direction) === 2) {
        return { x: direction === 2 ? '-100%' : '100%', y: 0, opacity: 1, scale: 1 };
      }
      return { y: direction < 0 ? '100vh' : '-100vh', x: 0, opacity: 1, scale: 0.95 };
    }
  };

  return (
    <main
      ref={mainRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ touchAction: 'pan-y' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Loader isOpen={appLoading} isFullScreen={true} />
      {/* Algorithm component disabled - uses Firebase */}

      {(currentSection === 'home' || currentSection === 'view_link') && (
        <div className="blob-container" style={{ zIndex: 0 }}>
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
          <div className="blob blob-4"></div>
          <div className="blob blob-5"></div>
          <div className="blob blob-6"></div>
        </div>
      )}

      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentSection}
          id={`section-${currentSection}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.3 }
          }}
          className="absolute inset-0 w-full h-full overflow-y-auto custom-scrollbar"
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
      {currentSection !== 'secret' && (
        <button
          onClick={() => navigateTo('secret')}
          style={{
            position: 'fixed',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRight: 'none',
            borderTopLeftRadius: '12px',
            borderBottomLeftRadius: '12px',
            padding: '12px 4px',
            zIndex: 40,
            color: 'var(--text-muted)',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.paddingRight = '8px';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.paddingRight = '4px';
            e.currentTarget.style.color = 'var(--text-muted)';
          }}
          aria-label="Go to Secret Page"
        >
          <ChevronRight size={20} />
        </button>
      )}
      <LayoutGroup>
        <Navbar
          onNavigate={navigateTo}
          currentSection={currentSection}
          onOpenContact={openContactModal}
          isContactOpen={isContactModalOpen}
          onOpenCV={openCVModal}
          isCVOpen={isCVModalOpen}
        />
        <AnimatePresence>
          {isCVModalOpen && (
            <Suspense fallback={<Loader isOpen={true} isFullScreen={false} />}>
              <MCV onClose={closeCVModal} onProjectClick={handleProjectClick} />
            </Suspense>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isContactModalOpen && (
            <Suspense fallback={<Loader isOpen={true} isFullScreen={false} />}>
              <MContact onClose={closeContactModal} />
            </Suspense>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showProjectModal && selectedProject && (
            <Suspense fallback={<Loader isOpen={true} isFullScreen={false} />}>
              <MProjectView
                project={selectedProject}
                onClose={() => setShowProjectModal(false)}
                onContributorClick={handleContributorClick}
              />
            </Suspense>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showContributorModal && selectedContributor && (
            <Suspense fallback={<Loader isOpen={true} isFullScreen={false} />}>
              <MContributorView
                contributor={selectedContributor as any}
                onClose={() => setShowContributorModal(false)}
              />
            </Suspense>
          )}
        </AnimatePresence>
      </LayoutGroup>
      <PageTransition
        isTransitioning={isTransitioning}
        onCurtainCovered={handleCurtainCovered}
        onTransitionComplete={handleTransitionComplete}
        nextSectionName={nextSection}
        direction={direction}
      />
    </main>
  );
}

/**
 * App Wrapper with LanguageProvider
 * Wraps the main App component with language context
 */
const AppWithLanguage: React.FC = () => {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
};

export default AppWithLanguage;
