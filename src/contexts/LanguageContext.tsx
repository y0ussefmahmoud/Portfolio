/**
 * Language Context
 *
 * Provides language state and translation management for the application.
 * Currently supports English only. Arabic support is disabled for future development.
 *
 * @component
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Translations } from '@/i18n/translations';

type Language = 'en'; // English only for now

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  toggleLanguage: () => void; // Disabled for now
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

/**
 * Language Provider Component
 * Wraps the application to provide language context
 * Currently defaults to English only
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize language - default to 'en' only
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    // Update document direction for RTL support (disabled for now)
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    // Disabled - language switching not available yet
    console.log('Language switching is disabled. Arabic support coming soon.');
  };

  // Set initial document direction
  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Custom hook to use language context
 * @throws Error if used outside LanguageProvider
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
