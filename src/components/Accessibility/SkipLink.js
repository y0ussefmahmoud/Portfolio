import { jsx as _jsx } from "react/jsx-runtime";
/**
 * SkipLink Component
 *
 * Accessibility feature that allows keyboard users to skip navigation.
 * Hidden by default, appears when focused via Tab key.
 * Helps screen reader users navigate directly to main content.
 *
 * @component
 */
import React from 'react';
const SkipLink = ({ href, children }) => {
    return (_jsx("a", { href: href, className: "absolute -top-10 left-1.5 bg-primary text-white px-2 py-1 no-underline rounded font-semibold z-50 transition-all duration-300 focus:top-1.5 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2", children: children }));
};
export default React.memo(SkipLink);
