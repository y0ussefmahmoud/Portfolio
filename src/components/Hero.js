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
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    return (_jsxs(motion.div, { className: "px-4 md:px-6 max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8 }, children: [_jsxs(motion.div, { className: "text-center lg:text-left", initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8 }, children: [_jsx(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.6, delay: 0.2 }, whileHover: { scale: 1.05, rotate: 2 }, className: "inline-block", children: _jsx("div", { className: "px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm", children: translations.hero.availability }) }), _jsxs("div", { className: "pt-6 space-y-4", children: [_jsx(motion.p, { className: "text-lg text-muted-foreground", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.3 }, children: translations.hero.greet }), _jsx(motion.h1, { className: "text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight", initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.4 }, children: _jsx(motion.span, { className: "text-gradient-primary inline-block", whileHover: { scale: 1.02 }, transition: { type: "spring", stiffness: 400, damping: 10 }, children: translations.hero.name }) }), _jsx(motion.p, { className: "text-xl md:text-2xl text-muted-foreground font-light", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.5 }, children: _jsx(TypingText, { text: translations.hero.tagline }) }), _jsxs(motion.div, { className: "flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.6 }, children: [_jsx(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5, delay: 0.7 }, children: _jsx(Button, { size: "lg", onClick: () => onNavigate('projects'), className: "bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base shadow-lg shadow-primary/20", shine: true, hoverScale: 1.05, tapScale: 0.95, children: translations.hero.ctaPrimary }) }), _jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5, delay: 0.8 }, children: _jsx(Button, { variant: "outline", size: "lg", onClick: () => onNavigate('contact'), className: "h-12 px-8 text-base border-primary/20 hover:bg-primary/10 bg-background/50 backdrop-blur-sm", shine: true, hoverScale: 1.05, tapScale: 0.95, children: translations.hero.ctaSecondary }) })] }), _jsxs(motion.div, { className: "flex items-center justify-center lg:justify-start gap-6 pt-8 text-muted-foreground", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.9 }, children: [_jsx(motion.div, { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4, delay: 1.0 }, whileHover: { y: -5, scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(SocialLink, { href: "https://github.com/y0ussefmahmoud", icon: _jsx(Github, {}), label: "GitHub" }) }), _jsx(motion.div, { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4, delay: 1.1 }, whileHover: { y: -5, scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(SocialLink, { href: "https://linkedin.com/in/y0ussefmahmoud", icon: _jsx(Linkedin, {}), label: "LinkedIn" }) }), _jsx(motion.div, { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4, delay: 1.2 }, whileHover: { y: -5, scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(SocialLink, { href: "mailto:youssef11mahmoud112002@gmail.com", icon: _jsx(Mail, {}), label: "Email" }) }), _jsx(motion.div, { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4, delay: 1.3 }, whileHover: { y: -5, scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(SocialLink, { href: "https://twitter.com/y0ussefmahmoudd", icon: _jsx(Twitter, {}), label: "Twitter" }) })] })] })] }), _jsx(motion.div, { className: "relative hidden lg:block", initial: { opacity: 0, scale: 0.8, rotate: -5 }, animate: { opacity: 1, scale: 1, rotate: 0 }, transition: { duration: 1, delay: 0.3, type: "spring", stiffness: 200 }, whileHover: { scale: 1.02 }, children: _jsxs("div", { className: "relative 'w-450px' 'h-450px' mx-auto", children: [_jsx(motion.div, { className: "absolute inset-0 bg-primary/20 rounded-full blur-[100px]", animate: {
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
