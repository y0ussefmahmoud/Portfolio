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
import { Translations } from '@/i18n/translations';

/**
 * Custom hook to detect user's reduced motion preference
 * Respects accessibility settings for users who prefer reduced motion
 */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
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
function TypingText({ text, speedMs = 24 }: { text: string; speedMs?: number }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visibleCount, setVisibleCount] = React.useState(prefersReducedMotion ? text.length : 0);
  const [isMeasuring, setIsMeasuring] = React.useState(true);
  const measureRef = React.useRef<HTMLSpanElement | null>(null);
  const [minHeightPx, setMinHeightPx] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    setVisibleCount(prefersReducedMotion ? text.length : 0);
  }, [text, prefersReducedMotion]);

  React.useEffect(() => {
    if (prefersReducedMotion) return;
    setIsMeasuring(true);
  }, [text, prefersReducedMotion]);

  React.useLayoutEffect(() => {
    if (!isMeasuring) return;
    if (!measureRef.current) return;

    const rect = measureRef.current.getBoundingClientRect();
    setMinHeightPx(rect.height);
    setIsMeasuring(false);
  }, [isMeasuring, text]);

  React.useEffect(() => {
    if (prefersReducedMotion) return;
    if (isMeasuring) return;

    let rafId: number | null = null;
    let timeoutId: number | null = null;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      setVisibleCount((c) => {
        if (c >= text.length) return c;
        return c + 1;
      });
      timeoutId = window.setTimeout(() => {
        rafId = window.requestAnimationFrame(tick);
      }, speedMs);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
  }, [text, speedMs, prefersReducedMotion, isMeasuring]);

  return (
    <span style={minHeightPx ? { minHeight: `${minHeightPx}px`, display: 'block' } : undefined}>
      {isMeasuring ? (
        <span ref={measureRef} className="sr-only">
          {text}
        </span>
      ) : null}
      <span aria-label={text} aria-live="polite">
        <span aria-hidden="true">{text.slice(0, visibleCount)}</span>
        {prefersReducedMotion ? null : (
          <motion.span
            aria-hidden="true"
            className="inline-block w-[0.5ch]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          >
            |
          </motion.span>
        )}
      </span>
    </span>
  );
}

/**
 * Hero Component Props Interface
 */
interface HeroProps {
  translations: Translations;
  onNavigate: (tabId: string) => void;
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
function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative p-3 rounded-full bg-background/50 backdrop-blur-sm border border-white/5 transition-colors hover:text-primary overflow-hidden"
      aria-label={label}
      whileHover={{ 
        scale: 1.1, 
        rotate: 5
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 15 
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 opacity-0"
        whileHover={{ 
          opacity: 1
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="relative z-10"
        whileHover={{ 
          rotate: -5,
          scale: 1.05
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }}
      >
        {icon}
      </motion.div>
    </motion.a>
  );
}

const Hero: React.FC<HeroProps> = ({ translations, onNavigate }) => {
  return (
    <motion.div
      className="px-4 md:px-6 max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="text-center lg:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          className="inline-block"
        >
          <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm">
            {translations.hero.availability}
          </div>
        </motion.div>

        <div className="pt-6 space-y-4">
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {translations.hero.greet}
          </motion.p>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              className="text-gradient-primary inline-block"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {translations.hero.name}
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <TypingText text={translations.hero.tagline} />
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Button
                size="lg"
                onClick={() => onNavigate('projects')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base shadow-lg shadow-primary/20"
                shine={true}
                hoverScale={1.05}
                tapScale={0.95}
              >
                {translations.hero.ctaPrimary}
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('contact')}
                className="h-12 px-8 text-base border-primary/20 hover:bg-primary/10 bg-background/50 backdrop-blur-sm"
                shine={true}
                hoverScale={1.05}
                tapScale={0.95}
              >
                {translations.hero.ctaSecondary}
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center justify-center lg:justify-start gap-6 pt-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.0 }}
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SocialLink
                href="https://github.com/y0ussefmahmoud"
                icon={<Github />}
                label="GitHub"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.1 }}
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SocialLink
                href="https://linkedin.com/in/y0ussefmahmoud"
                icon={<Linkedin />}
                label="LinkedIn"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SocialLink
                href="mailto:youssef11mahmoud112002@gmail.com"
                icon={<Mail />}
                label="Email"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.3 }}
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SocialLink
                href="https://twitter.com/y0ussefmahmoudd"
                icon={<Twitter />}
                label="Twitter"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="relative hidden lg:block"
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="relative 'w-450px' 'h-450px' mx-auto">
          <motion.div
            className="absolute inset-0 bg-primary/20 rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.img
            src="/Portfolio/images/hero-800x1000.webp"
            alt="Y0ussef Mahmoud - Full-Stack Developer"
            className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl border border-white/10"
            style={{
              maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.05 }}
          />

          <motion.div
            className="absolute -top-4 -right-4 z-20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="bg-card/80 backdrop-blur-md border border-border p-4 rounded-xl shadow-xl flex items-center gap-3">
                <motion.div
                  className="w-3 h-3 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="font-mono text-sm font-medium">
                  {translations.hero.badges.primary}
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-20 -left-8 z-20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.7 }}
            whileHover={{ scale: 1.1, rotate: -5 }}
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            >
              <div className="bg-card/80 backdrop-blur-md border border-border p-4 rounded-xl shadow-xl flex items-center gap-3">
                <motion.div
                  className="w-3 h-3 rounded-full bg-blue-500"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                />
                <span className="font-mono text-sm font-medium">
                  {translations.hero.badges.secondary}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
