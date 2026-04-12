import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Hero Component - Main landing section with animations
 *
 * Features:
 * - Typing effect for tagline
 * - Social links with hover animations
 * - Responsive layout for all devices
 * - Reduced motion support for accessibility
 * - Advanced Framer Motion animations
 */
import * as React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
// WhatsApp Icon Component
const WhatsAppIcon = ({ className }) => (_jsx("svg", { className: className, viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.08 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) }));
/**
 * Custom hook to detect user's reduced motion preference
 * Respects accessibility settings for users who prefer reduced motion
 */
function usePrefersReducedMotion() {
    const [reduced, setReduced] = React.useState(false);
    React.useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia)
            return;
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const onChange = () => setReduced(Boolean(media.matches));
        onChange();
        if (typeof media.addEventListener === 'function') {
            media.addEventListener('change', onChange);
            return () => media.removeEventListener('change', onChange);
        }
        media.addListener(onChange);
        return () => media.removeListener(onChange);
    }, []);
    return reduced;
}
/**
 * TypingText Component - Animated typing effect for text
 *
 * @param text - The text to type out
 * @param speedMs - Typing speed in milliseconds (default: 24ms)
 */
function TypingText({ text, speedMs = 24 }) {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [visibleCount, setVisibleCount] = React.useState(prefersReducedMotion ? text.length : 0);
    const [isMeasuring, setIsMeasuring] = React.useState(true);
    const measureRef = React.useRef(null);
    const [minHeightPx, setMinHeightPx] = React.useState(undefined);
    React.useEffect(() => {
        setVisibleCount(prefersReducedMotion ? text.length : 0);
    }, [text, prefersReducedMotion]);
    React.useEffect(() => {
        if (prefersReducedMotion)
            return;
        setIsMeasuring(true);
    }, [text, prefersReducedMotion]);
    React.useLayoutEffect(() => {
        if (!isMeasuring)
            return;
        if (!measureRef.current)
            return;
        const rect = measureRef.current.getBoundingClientRect();
        setMinHeightPx(rect.height);
        setIsMeasuring(false);
    }, [isMeasuring, text]);
    React.useEffect(() => {
        if (prefersReducedMotion)
            return;
        if (isMeasuring)
            return;
        let rafId = null;
        let timeoutId = null;
        let cancelled = false;
        const tick = () => {
            if (cancelled)
                return;
            setVisibleCount((c) => {
                if (c >= text.length)
                    return c;
                return c + 1;
            });
            timeoutId = window.setTimeout(() => {
                rafId = window.requestAnimationFrame(tick);
            }, speedMs);
        };
        rafId = window.requestAnimationFrame(tick);
        return () => {
            cancelled = true;
            if (rafId !== null)
                window.cancelAnimationFrame(rafId);
            if (timeoutId !== null)
                window.clearTimeout(timeoutId);
        };
    }, [text, speedMs, prefersReducedMotion, isMeasuring]);
    return (_jsxs("span", { style: minHeightPx ? { minHeight: `${minHeightPx}px`, display: 'block' } : undefined, children: [isMeasuring ? (_jsx("span", { ref: measureRef, className: "sr-only", children: text })) : null, _jsxs("span", { "aria-label": text, "aria-live": "polite", children: [_jsx("span", { "aria-hidden": "true", children: text.slice(0, visibleCount) }), prefersReducedMotion ? null : (_jsx(motion.span, { "aria-hidden": "true", className: "inline-block w-[0.5ch]", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, repeat: Infinity, repeatType: 'reverse' }, children: "|" }))] })] }));
}
/**
 * SocialLink Component - Animated social media link
 *
 * Features:
 * - Hover scale and rotation animations
 * - Glow effect on hover
 * - Spring physics for smooth transitions
 * - Gradient background on hover
 *
 * @param href - Link URL
 * @param icon - Icon component to display
 * @param label - Accessibility label for screen readers
 */
function SocialLink({ href, icon, label, }) {
    return (_jsxs(motion.a, { href: href, target: "_blank", rel: "noopener noreferrer", className: "relative p-3 rounded-full bg-background/50 backdrop-blur-sm border border-white/5 transition-colors hover:text-primary overflow-hidden", "aria-label": label, whileHover: {
            scale: 1.1,
            rotate: 5
        }, whileTap: { scale: 0.95 }, transition: {
            type: "spring",
            stiffness: 400,
            damping: 15
        }, children: [_jsx(motion.div, { className: "absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 opacity-0", whileHover: {
                    opacity: 1
                }, transition: { duration: 0.2 } }), _jsx(motion.div, { className: "relative z-10", whileHover: {
                    rotate: -5,
                    scale: 1.05
                }, transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }, children: icon })] }));
}
const Hero = ({ translations, onNavigate }) => {
    return (_jsxs(motion.div, { className: "px-4 md:px-6 max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8 }, children: [_jsxs(motion.div, { className: "text-center lg:text-left", initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8 }, children: [_jsx(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.6, delay: 0.2 }, whileHover: { scale: 1.05, rotate: 2 }, className: "inline-block", children: _jsx("div", { className: "px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm", children: translations.hero.availability }) }), _jsxs("div", { className: "pt-6 space-y-4", children: [_jsx(motion.p, { className: "text-lg text-muted-foreground", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.3 }, children: translations.hero.greet }), _jsx(motion.h1, { className: "text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight", initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.4 }, children: _jsx(motion.span, { className: "text-gradient-primary inline-block", whileHover: { scale: 1.02 }, transition: { type: "spring", stiffness: 400, damping: 10 }, children: translations.hero.name }) }), _jsx(motion.p, { className: "text-xl md:text-2xl text-muted-foreground font-light", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.5 }, children: _jsx(TypingText, { text: translations.hero.tagline }) }), _jsxs(motion.div, { className: "flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.6 }, children: [_jsx(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5, delay: 0.7 }, children: _jsx(Button, { size: "lg", onClick: () => onNavigate('projects'), className: "bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base shadow-lg shadow-primary/20", shine: true, hoverScale: 1.05, tapScale: 0.95, children: translations.hero.ctaPrimary }) }), _jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5, delay: 0.8 }, children: _jsx(Button, { variant: "outline", size: "lg", onClick: () => onNavigate('contact'), className: "h-12 px-8 text-base", shine: true, hoverScale: 1.05, tapScale: 0.95, children: translations.hero.ctaSecondary }) })] }), _jsxs(motion.div, { className: "flex items-center justify-center lg:justify-start gap-6 pt-8 text-muted-foreground", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.9 }, children: [_jsx(motion.div, { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4, delay: 1.0 }, whileHover: { y: -5, scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(SocialLink, { href: "https://github.com/y0ussefmahmoud", icon: _jsx(Github, {}), label: "GitHub" }) }), _jsx(motion.div, { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4, delay: 1.1 }, whileHover: { y: -5, scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(SocialLink, { href: "https://linkedin.com/in/y0ussefmahmoud", icon: _jsx(Linkedin, {}), label: "LinkedIn" }) }), _jsx(motion.div, { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4, delay: 1.2 }, whileHover: { y: -5, scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(SocialLink, { href: "https://www.facebook.com/y0ussefmahmoud", icon: _jsx(Facebook, {}), label: "Facebook" }) }), _jsx(motion.div, { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4, delay: 1.3 }, whileHover: { y: -5, scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(SocialLink, { href: "https://wa.me/201129334173", icon: _jsx(WhatsAppIcon, { className: "w-5 h-5" }), label: "WhatsApp" }) })] })] })] }), _jsx(motion.div, { className: "relative hidden lg:block", initial: { opacity: 0, scale: 0.8, rotate: -5 }, animate: { opacity: 1, scale: 1, rotate: 0 }, transition: { duration: 1, delay: 0.3, type: "spring", stiffness: 200 }, whileHover: { scale: 1.02 }, children: _jsxs("div", { className: "relative 'w-450px' 'h-450px' mx-auto", children: [_jsx(motion.div, { className: "absolute inset-0 bg-primary/20 rounded-full blur-[100px]", animate: {
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 0.8, 0.5],
                            }, transition: {
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            } }), _jsx(motion.img, { src: "/Portfolio/images/hero-800x1000.webp", alt: "Y0ussef Mahmoud - Full-Stack Developer", className: "relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl border border-white/10", style: {
                                maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                            }, animate: {
                                y: [0, -10, 0],
                            }, transition: {
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }, whileHover: { scale: 1.05 } }), _jsx(motion.div, { className: "absolute -top-4 -right-4 z-20", initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.6, delay: 1.5 }, whileHover: { scale: 1.1, rotate: 5 }, children: _jsx(motion.div, { animate: { y: [0, -15, 0] }, transition: {
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }, children: _jsxs("div", { className: "bg-card/80 backdrop-blur-md border border-border p-4 rounded-xl shadow-xl flex items-center gap-3", children: [_jsx(motion.div, { className: "w-3 h-3 rounded-full bg-green-500", animate: { scale: [1, 1.5, 1] }, transition: { duration: 1, repeat: Infinity } }), _jsx("span", { className: "font-mono text-sm font-medium", children: translations.hero.badges.primary })] }) }) }), _jsx(motion.div, { className: "absolute bottom-20 -left-8 z-20", initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.6, delay: 1.7 }, whileHover: { scale: 1.1, rotate: -5 }, children: _jsx(motion.div, { animate: { y: [0, 15, 0] }, transition: {
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: 0.5,
                                }, children: _jsxs("div", { className: "bg-card/80 backdrop-blur-md border border-border p-4 rounded-xl shadow-xl flex items-center gap-3", children: [_jsx(motion.div, { className: "w-3 h-3 rounded-full bg-blue-500", animate: { scale: [1, 1.5, 1] }, transition: { duration: 1, repeat: Infinity, delay: 0.5 } }), _jsx("span", { className: "font-mono text-sm font-medium", children: translations.hero.badges.secondary })] }) }) })] }) })] }));
};
export default Hero;
