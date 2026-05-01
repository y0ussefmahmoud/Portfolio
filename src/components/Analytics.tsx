/**
 * Analytics Component
 * 
 * Google Analytics 4 integration with privacy-focused tracking
 * Tracks page views, user interactions, and performance metrics
 */

import { useEffect } from 'react';

interface AnalyticsProps {
  measurementId?: string;
  enableDebug?: boolean;
}

/**
 * Google Analytics 4 Component
 * 
 * @param measurementId - GA4 Measurement ID (G-XXXXXXXXXX)
 * @param enableDebug - Enable debug mode for development
 */
export const Analytics: React.FC<AnalyticsProps> = ({ 
  measurementId = 'G-XXXXXXXXXX', // Replace with actual GA4 Measurement ID
  enableDebug = import.meta.env.DEV
}) => {

  useEffect(() => {
    // Skip GA4 in development unless debug is enabled
    if (import.meta.env.DEV && !enableDebug) {
      return;
    }

    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    
    script.onload = () => {
      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      
      // Configure GA4
      window.gtag('js', new Date());
      window.gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: false, // We'll send page views manually
        anonymize_ip: true,
        cookie_flags: 'SameSite=Lax;Secure',
        allow_google_signals: false, // Disable cross-site tracking
        allow_ad_personalization_signals: false, // Disable ad personalization
        debug_mode: enableDebug
      });

      // Send initial page view
      trackPageView();
    };

    document.head.appendChild(script);

    // Cleanup
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [measurementId, enableDebug]);

  // Track page views on hash changes (SPA navigation)
  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window.gtag === 'function') {
        trackPageView();
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  /**
   * Track page view
   */
  const trackPageView = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname + window.location.hash
      });
    }
  };

  // This component doesn't render anything
  return null;
};

/**
 * Custom hook for tracking events
 */
export const useAnalytics = () => {
  /**
   * Track custom events
   */
  const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window.gtag === 'function' && !import.meta.env.DEV) {
      window.gtag('event', eventName, parameters);
    } else if (import.meta.env.DEV) {
      console.log('Analytics Event:', eventName, parameters);
    }
  };

  /**
   * Track section navigation
   */
  const trackSectionView = (sectionName: string) => {
    trackEvent('section_view', {
      section_name: sectionName,
      page_location: window.location.href + '#' + sectionName
    });
  };

  /**
   * Track project interactions
   */
  const trackProjectInteraction = (projectName: string, action: 'view' | 'code' | 'share') => {
    trackEvent('project_interaction', {
      project_name: projectName,
      interaction_type: action
    });
  };

  /**
   * Track service interactions
   */
  const trackServiceInteraction = (serviceName: string, action: 'quote' | 'details') => {
    trackEvent('service_interaction', {
      service_name: serviceName,
      interaction_type: action
    });
  };

  /**
   * Track contact form submission
   */
  const trackContactSubmission = (method: 'email' | 'whatsapp') => {
    trackEvent('contact_submission', {
      contact_method: method
    });
  };

  /**
   * Track modal interactions
   */
  const trackModalInteraction = (modalType: string, action: 'open' | 'close') => {
    trackEvent('modal_interaction', {
      modal_type: modalType,
      interaction_type: action
    });
  };

  /**
   * Track performance metrics
   */
  const trackPerformance = (metricName: string, value: number) => {
    trackEvent('performance_metric', {
      metric_name: metricName,
      metric_value: value,
      custom_parameter_1: new Date().toISOString()
    });
  };

  /**
   * Track theme changes
   */
  const trackThemeChange = (theme: 'light' | 'dark' | 'system') => {
    trackEvent('theme_change', {
      theme_type: theme
    });
  };

  /**
   * Track language changes
   */
  const trackLanguageChange = (language: 'en' | 'ar') => {
    trackEvent('language_change', {
      language_code: language
    });
  };

  return {
    trackEvent,
    trackSectionView,
    trackProjectInteraction,
    trackServiceInteraction,
    trackContactSubmission,
    trackModalInteraction,
    trackPerformance,
    trackThemeChange,
    trackLanguageChange
  };
};

// Type declarations for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default Analytics;
