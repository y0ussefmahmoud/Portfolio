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
import { Translations } from '@/i18n/translations';

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.08 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

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
                className="h-12 px-8 text-base"
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
                href="https://www.facebook.com/y0ussefmahmoud"
                icon={<Facebook />}
                label="Facebook"
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
                href="https://wa.me/201129334173"
                icon={<WhatsAppIcon className="w-5 h-5" />}
                label="WhatsApp"
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
