import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Footer Component
 *
 * Simple footer with copyright information and tagline.
 * Displays current year dynamically.
 *
 * @component
 */
import { memo } from 'react';
const Footer = ({ translations }) => {
    return (_jsx("footer", { className: "py-12 pb-4 bg-background border-t border-border", children: _jsxs("div", { className: "max-w-6xl mx-auto px-8 text-center", children: [_jsx("p", { children: translations.footer.tag }), _jsxs("p", { children: ["\u00A9 ", new Date().getFullYear(), " Y0ussef Mahmoud. ", translations.footer.rights] })] }) }));
};
export default memo(Footer);
