/**
 * Footer Component
 *
 * Footer section with copyright and tagline.
 * Features:
 * - Current year display
 * - Multilingual support
 * - Clean, minimal design
 *
 * @author      م / يوسف محمود عبد الجواد
 * @author      Eng. Youssef Mahmoud Abdelgawad
 * @website     https://y0ussef.com
 * @version     3.0.7
 * @copyright   2024-2025 Youssef Mahmoud Abdelgawad. All rights reserved.
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
