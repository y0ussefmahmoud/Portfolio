/**
 * Language Switcher Component
 * 
 * Button to toggle between Arabic and English languages.
 * Displays current language and allows switching.
 * 
 * @component
 */

import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  isMobile: boolean;
  iconSize: number;
  isDark: boolean;
}

/**
 * Language Switcher Component
 * @param isMobile - Whether the component is in mobile view
 * @param iconSize - Size of the icon
 * @param isDark - Whether dark mode is active
 */
export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isMobile, iconSize, isDark }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
      className={`
        btn-icon flex items-center justify-center gap-2
        ${isMobile ? 'p-2 rounded-xl' : 'p-3 rounded-2xl'}
        text-muted hover:text-primary hover:bg-[rgba(0,0,0,0.04)] dark:hover:bg-[rgba(255,255,255,0.1)]
        hover:scale-110 transition-all duration-200
      `}
    >
      <Globe size={iconSize} strokeWidth={2} />
      <span className={`font-semibold ${isMobile ? 'text-sm' : 'text-base'}`}>
        {language === 'en' ? 'AR' : 'EN'}
      </span>
    </button>
  );
};
