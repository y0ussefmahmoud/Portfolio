import { jsx as _jsx } from "react/jsx-runtime";
/**
 * BackToTop Component
 *
 * Floating button that appears when user scrolls down.
 * Smoothly scrolls to top of page when clicked.
 *
 * @component
 */
import { useState, useEffect } from 'react';
const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        /**
         * Shows/hides button based on scroll position
         * Button appears when user scrolls past 300px
         */
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        // Cleanup event listener on unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    /**
     * Smoothly scrolls page to top
     */
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (_jsx("button", { onClick: scrollToTop, "aria-label": "Back to top", className: `fixed bottom-8 right-8 w-12 h-12 border-0 rounded-full bg-primary text-white cursor-pointer flex items-center justify-center transition-all duration-300 z-50 hover:-translate-y-1 hover:shadow-lg ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`, children: _jsx("i", { className: "fas fa-arrow-up" }) }));
};
export default BackToTop;
