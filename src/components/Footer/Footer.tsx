/**
 * Footer Component
 * 
 * Simple footer with copyright information and tagline.
 * Displays current year dynamically.
 * 
 * @component
 */

import React, { memo } from 'react';
import { Translations } from '../../i18n/translations';

/**
 * Props for Footer component
 * 
 * @interface FooterProps
 * @property {Translations} translations - Translation object for current language
 */
interface FooterProps {
  translations: Translations;
}

const Footer: React.FC<FooterProps> = ({ translations }) => {
  return (
    <footer className="py-12 pb-4 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-8 text-center">
        <p>{translations.footer.tag}</p>
        <p>&copy; {new Date().getFullYear()} Y0ussef Mahmoud. {translations.footer.rights}</p>
      </div>
    </footer>
  );
};

export default memo(Footer);
