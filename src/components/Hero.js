import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
function SocialLink({ href, icon, label, }) {
    return (_jsx("a", { href: href, target: "_blank", rel: "noopener noreferrer", className: "hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full bg-background/50 backdrop-blur-sm border border-white/5", "aria-label": label, children: icon }));
}
const Hero = ({ translations, onNavigate }) => {
    return (_jsxs(motion.div, { className: "px-4 md:px-6 max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8 }, children: [_jsxs(motion.div, { className: "text-center lg:text-left", initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8 }, children: [_jsx("div", { className: "inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm", children: translations.hero.availability }), _jsxs("div", { className: "pt-6 space-y-4", children: [_jsx("p", { className: "text-lg text-muted-foreground", children: translations.hero.greet }), _jsx("h1", { className: "text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight", children: _jsx("span", { className: "text-gradient-primary", children: translations.hero.name }) }), _jsx("p", { className: "text-xl md:text-2xl text-muted-foreground font-light", children: _jsx(TypingText, { text: translations.hero.tagline }) }), _jsxs("div", { className: "flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4", children: [_jsx(Button, { size: "lg", onClick: () => onNavigate('projects'), className: "bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base shadow-lg shadow-primary/20", children: translations.hero.ctaPrimary }), _jsx(Button, { variant: "outline", size: "lg", onClick: () => onNavigate('contact'), className: "h-12 px-8 text-base border-primary/20 hover:bg-primary/10 bg-background/50 backdrop-blur-sm", children: translations.hero.ctaSecondary })] }), _jsxs("div", { className: "flex items-center justify-center lg:justify-start gap-6 pt-8 text-muted-foreground", children: [_jsx(SocialLink, { href: "https://github.com/y0ussefmahmoud", icon: _jsx(Github, {}), label: "GitHub" }), _jsx(SocialLink, { href: "https://linkedin.com/in/y0ussefmahmoud", icon: _jsx(Linkedin, {}), label: "LinkedIn" }), _jsx(SocialLink, { href: "mailto:y0ussefmahmoud@gmail.com", icon: _jsx(Mail, {}), label: "Email" }), _jsx(SocialLink, { href: "https://twitter.com/y0ussefmahmoud", icon: _jsx(Twitter, {}), label: "Twitter" })] })] })] }), _jsx(motion.div, { className: "relative hidden lg:block", initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.8, delay: 0.2 }, children: _jsxs("div", { className: "relative w-[450px] h-[450px] mx-auto", children: [_jsx("div", { className: "absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse" }), _jsx("img", { src: "/images/hero-800x1000.webp", alt: "Y0ussef Mahmoud - Full-Stack Developer", className: "relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl border border-white/10", style: {
                                maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                            } }), _jsx("div", { className: "absolute -top-4 -right-4 z-20", children: _jsx(motion.div, { animate: { y: [0, -10, 0] }, transition: {
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }, children: _jsxs("div", { className: "bg-card/80 backdrop-blur-md border border-border p-4 rounded-xl shadow-xl flex items-center gap-3", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-green-500 animate-pulse" }), _jsx("span", { className: "font-mono text-sm font-medium", children: translations.hero.badges.primary })] }) }) }), _jsx("div", { className: "absolute bottom-20 -left-8 z-20", children: _jsx(motion.div, { animate: { y: [0, 10, 0] }, transition: {
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: 1,
                                }, children: _jsxs("div", { className: "bg-card/80 backdrop-blur-md border border-border p-4 rounded-xl shadow-xl flex items-center gap-3", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-blue-500 animate-pulse" }), _jsx("span", { className: "font-mono text-sm font-medium", children: translations.hero.badges.secondary })] }) }) })] }) })] }));
};
export default Hero;
