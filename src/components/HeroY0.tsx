/**
 * HeroY0 Component
 *
 * Hero section with handwriting animation and interactive elements.
 * Features:
 * - Handwriting text animation using anime.js
 * - Animated background elements
 * - Interactive availability badge with tooltip
 * - Responsive design
 * - Smooth animations
 *
 * @author      م / يوسف محمود عبد الجواد
 * @author      Eng. Youssef Mahmoud Abdelgawad
 * @website     https://y0ussef.com
 * @version     3.0.7
 * @copyright   2024-2025 Youssef Mahmoud Abdelgawad. All rights reserved.
 * @component
 */

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import anime from 'animejs';
import { Plus, Briefcase } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const DEFAULT_HERO_URL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/**
 * HandwritingText Component
 * 
 * Animated text with handwriting effect using anime.js.
 * @param text - Text to animate
 * @param fontSize - Font size in pixels
 * @param delay - Animation delay in milliseconds
 * @param color - Text color
 * @param rotate - Rotation angle in degrees
 * @param isReady - Whether component is ready to animate
 */
const HandwritingText = ({
    text,
    fontSize = 70,
    delay = 0,
    color = '#3b82f6',
    rotate = 0,
    isReady = true
}: {
    text: string;
    fontSize?: number;
    delay?: number;
    color?: string;
    rotate?: number;
    isReady?: boolean;
}) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current || !isReady) return;

        const startDelay = delay + 500;

        // Get all letter elements for animation
        const letters = svgRef.current.querySelectorAll('.letter-path');
        anime.remove(letters); // Clear any existing animations

        // Create timeline for sequential letter animation
        const tl = anime.timeline({
            easing: 'easeOutSine',
            autoplay: true,
        });

        letters.forEach((letter, index) => {
            const textEl = letter as SVGTextElement;
            const estimatedLength = fontSize * 2;

            // Explicitly reset to transparent outline (stroke animation)
            // This creates the "handwriting" effect by drawing the stroke first
            textEl.style.visibility = 'hidden';
            textEl.style.strokeDasharray = `${estimatedLength}`;
            textEl.style.strokeDashoffset = `${estimatedLength}`;
            textEl.style.fill = 'transparent';

            // Add animation to timeline for each letter
            tl.add({
                targets: textEl,
                strokeDashoffset: [estimatedLength, 0], // Draw stroke from full to zero
                opacity: [0, 1], // Fade in
                duration: 120, // Smooth & Elegant per letter
                delay: index === 0 ? startDelay : 0, // Only delay first letter
                begin: () => {
                    textEl.style.visibility = 'visible';
                },
                complete: () => {
                    // Immediate solid fill upon stroke completion
                    textEl.style.fill = color;
                    textEl.style.strokeOpacity = '0.4';
                }
            }, index === 0 ? startDelay : '-=60'); // More overlap for smoothness
        });
    }, [text, delay, fontSize, color, isReady]);

    // Calculate letter positions - normal spacing
    const letterSpacing = fontSize * 0.5;
    const spaceWidth = fontSize * 0.3;
    let xPos = 0;
    const positions: number[] = [];

    text.split('').forEach(char => {
        positions.push(xPos);
        xPos += char === ' ' ? spaceWidth : letterSpacing;
    });

    const width = xPos + 20;
    const height = fontSize * 1.4;

    return (
        <div style={{
            transform: `rotate(${rotate}deg)`,
            transformOrigin: 'left center',
            display: 'inline-block',
            maxWidth: '100%'
        }}>
            <svg
                ref={svgRef}
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                style={{ overflow: 'visible', maxWidth: '100%' }}
                preserveAspectRatio="xMidYMid meet"
            >
                {text.split('').map((char, index) => {
                    if (char === ' ') return null;

                    return (
                        <text
                            key={index}
                            className="letter-path"
                            x={positions[index]}
                            y={fontSize}
                            fontFamily="'Permanent Marker', cursive"
                            fontSize={fontSize}
                            fill="transparent"
                            stroke={color}
                            strokeWidth={fontSize < 30 ? 1 : 1.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                                paintOrder: 'stroke fill',
                                visibility: 'hidden'
                            }}
                        >
                            {char}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
};

const AvailableBadge = ({ entryDelay = 1200, isReady = true }: { entryDelay?: number; isReady?: boolean }) => {
    const badgeRef = useRef<HTMLDivElement>(null);
    const pulseRef = useRef<HTMLDivElement>(null);
    const [isDark, setIsDark] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isTinyMobile = windowWidth < 320;
    const isExtraSmallMobile = windowWidth < 360;
    const isSmallMobile = windowWidth < 480;

    useEffect(() => {
        const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isReady) return;
        const startDelay = entryDelay + 500;

        const pulse = anime({
            targets: pulseRef.current,
            scale: [1, 1.5],
            opacity: [0.8, 0],
            duration: 1500,
            loop: true,
            easing: 'easeOutQuad'
        });

        anime({
            targets: badgeRef.current,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            delay: startDelay,
            easing: 'easeOutExpo'
        });

        return () => pulse.pause();
    }, [entryDelay, isReady]);

    return (
        <div ref={badgeRef} className="flex items-center gap-2 sm:gap-4 opacity-0 flex-wrap justify-center relative">
            <div className={`group cursor-default transition-all active:scale-[0.98] flex items-center gap-2 sm:gap-3 rounded-full relative z-[100] ${isTinyMobile ? 'px-3 py-2' : (isExtraSmallMobile ? 'px-4 py-2.5' : 'px-5 sm:px-7 py-3 sm:py-3.5')}`} style={{
                background: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: isDark ? '0 8px 32px rgba(0, 0, 0, 0.2)' : '0 8px 32px rgba(0, 0, 0, 0.05)'
            }}>
                <div className="relative">
                    <div className={`rounded-full transition-slow ${isTinyMobile ? 'w-2 h-2' : (isExtraSmallMobile ? 'w-2.5 h-2.5' : 'w-3 h-3')}`} style={{ backgroundColor: '#22c55e' }}></div>
                    <div ref={pulseRef} className={`absolute inset-0 rounded-full transition-slow ${isTinyMobile ? 'w-2 h-2' : (isExtraSmallMobile ? 'w-2.5 h-2.5' : 'w-3 h-3')}`} style={{ backgroundColor: '#22c55e' }}></div>
                </div>
                <span className={`font-bold text-primary tracking-tight ${isTinyMobile ? 'text-xs' : (isExtraSmallMobile ? 'text-sm' : 'text-sm sm:text-[15px]')}`}>
                    Available
                </span>
            </div>

            {/* iOS Time Lockup Style */}
            <div className={`rounded-full font-semibold border border-white/10 shadow-lg transition-all ${isTinyMobile ? 'px-3 py-1.5 text-xs' : (isExtraSmallMobile ? 'px-4 py-2 text-sm' : 'px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-[15px]')}`} style={{
                background: isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                color: 'var(--text-primary)'
            }}>
                UTC+02:00
            </div>
        </div>
    );
};

const HeroY0 = ({ onLoaded, onAnimationComplete, isReady = true }: { onLoaded?: () => void; onAnimationComplete?: () => void; isReady?: boolean }) => {
    const { t } = useLanguage();
    const titleRef = useRef<HTMLHeadingElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const box1Ref = useRef<HTMLDivElement>(null);
    const box2Ref = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isDark, setIsDark] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const profileName = "Y0ussef Mahmoud";
    const profileTitle = "Full-Stack Developer";

    useEffect(() => {
        const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
        const handleResize = () => setWindowWidth(window.innerWidth);

        checkTheme();
        window.addEventListener('resize', handleResize);
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, []);

    // Responsive sizes - improved for very small devices
    const isMobile = windowWidth < 768;
    const isSmallMobile = windowWidth < 480;
    const isExtraSmallMobile = windowWidth < 360;
    const isTinyMobile = windowWidth < 320;

    // Smooth 1.5s Sequential Reveal
    const timing = {
        slogan1: 0,
        name: 400,
        slogan2: 800,
        rest: 1200
    };

    // Split name into two for staggered layout
    const nameParts = profileName.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    // Balanced font sizes for a cleaner look - optimized for all screen sizes
    const topSloganSize = isTinyMobile ? 28 : (isExtraSmallMobile ? 32 : (isSmallMobile ? 40 : (isMobile ? 50 : 70)));
    const bottomSloganSize = isTinyMobile ? 22 : (isExtraSmallMobile ? 26 : (isSmallMobile ? 32 : (isMobile ? 40 : 60)));

    useEffect(() => {
        if (!isReady) return;

        // Small delay to let loader fade out completely
        const startDelay = 500;

        // Step 2: Animate name (typing effect)
        anime({
            targets: '.name-char',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            delay: anime.stagger(60, { start: timing.name + startDelay }),
            easing: 'easeOutQuart'
        });

        // Step 4: Animate Image entrance
        anime({
            targets: imageRef.current,
            opacity: [0, 1],
            scale: [0.98, 1],
            duration: 1200,
            easing: 'easeOutQuart',
            delay: timing.rest + startDelay
        });

        // Step 4: Floating animation for the entire wrapper (image + boxes)
        anime({
            targets: wrapperRef.current,
            translateY: [-10, 10],
            rotate: [-1, 1],
            duration: 4000,
            easing: 'easeInOutSine',
            direction: 'alternate',
            loop: true
        });

        // Notify parent when entrance animations are finished
        const revealTimeout = window.setTimeout(() => {
            if (onAnimationComplete) onAnimationComplete();
        }, timing.rest + 1700);

        return () => {
            window.clearTimeout(revealTimeout);
        };
    }, [isReady, timing.name, timing.rest, onAnimationComplete]);

    return (
        <div className={`w-full flex items-center justify-center overflow-hidden relative transition-slow ${isTinyMobile ? 'min-h-[calc(100vh-60px)] pt-16 pb-16' : (isExtraSmallMobile ? 'min-h-screen pt-16 pb-20' : 'min-h-screen pt-20 pb-32')}`}>

            {/* Wall texture - subtle grain pattern */}
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: `
                    radial-gradient(circle at 25% 25%, rgba(0,0,0,0.02) 1px, transparent 1px),
                    radial-gradient(circle at 75% 75%, rgba(0,0,0,0.02) 1px, transparent 1px),
                    radial-gradient(circle at 50% 50%, rgba(0,0,0,0.01) 2px, transparent 2px)
                `,
                backgroundSize: '20px 20px, 20px 20px, 40px 40px'
            }}></div>

            <div className={`grid md:grid-cols-2 items-center relative z-10 w-full ${isTinyMobile ? 'gap-4 px-2 mt-4' : (isExtraSmallMobile ? 'gap-6 px-3 mt-6' : (isSmallMobile ? 'gap-8 px-4 mt-8' : 'gap-12 page-padding mt-10'))}`}>

                {/* Left Content */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left relative">
                    <div className={`origin-center md:origin-left z-20 ${isTinyMobile ? 'mb-[-8px] ml-[-5px]' : (isExtraSmallMobile ? 'mb-[-10px] ml-[-8px]' : (isSmallMobile ? 'mb-[-12px] ml-[-12px]' : 'md:ml-[-20px] mb-[-15px] md:mb-[-40px]'))}`}>
                        <HandwritingText
                            key="slogan-1"
                            text="THIS IS"
                            fontSize={topSloganSize}
                            delay={timing.slogan1}
                            rotate={-6}
                            isReady={isReady}
                        />
                    </div>

                    <div ref={titleRef} className="z-10 transition-slow uppercase flex flex-col gap-0 w-full max-w-[500px]" style={{
                        fontWeight: 900,
                        fontFamily: "'Archivo Black', sans-serif",
                        lineHeight: '0.8'
                    }}>
                        <span className={`tracking-tighter self-start ml-[-5px] md:ml-[-15px] flex ${isTinyMobile ? 'text-3xl' : (isExtraSmallMobile ? 'text-4xl' : (isSmallMobile ? 'text-5xl' : (isMobile ? 'text-6xl' : (windowWidth < 1024 ? 'text-7xl' : 'text-8xl lg:text-[7rem]'))))}`}>
                            {firstName.split('').map((char, i) => (
                                <span key={i} className="name-char opacity-0 inline-block">{char}</span>
                            ))}
                        </span>
                        <span className={`tracking-tighter self-end mr-[-5px] md:mr-[-15px] flex ${isTinyMobile ? 'text-3xl mt-[-15px]' : (isExtraSmallMobile ? 'text-4xl mt-[-20px]' : (isSmallMobile ? 'text-5xl mt-[-20px]' : (isMobile ? 'text-6xl mt-[-25px]' : (windowWidth < 1024 ? 'text-7xl mt-[-35px]' : 'text-8xl lg:text-[7rem] mt-[-50px]'))))}`}>
                            {lastName.split('').map((char, i) => (
                                <span key={i} className="name-char opacity-0 inline-block">{char === ' ' ? '\u00A0' : char}</span>
                            ))}
                        </span>
                    </div>

                    <div className="mt-[-10px] md:mt-[-50px] md:self-end md:mr-[-10px] lg:mr-[-20px] origin-center md:origin-right z-20">
                        <HandwritingText
                            key={`slogan-2-${profileTitle}`}
                            text={profileTitle}
                            fontSize={bottomSloganSize}
                            delay={timing.slogan2}
                            rotate={-3}
                            isReady={isReady}
                        />
                    </div>

                    {/* Decorative Elements - Hide on mobile if too crowded */}
                    <div className="hidden md:grid absolute top-1/2 left-0 -translate-x-8 translate-y-24 grid-cols-3 gap-2">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="w-3 h-3 rounded-full border-2 border-info opacity-40"></div>
                        ))}
                    </div>

                    {/* Available Badge */}
                    <div className={`relative z-[5000] ${isTinyMobile ? 'mt-8' : (isExtraSmallMobile ? 'mt-10' : (isSmallMobile ? 'mt-12' : 'mt-12 md:mt-20 md:ml-4 md:pl-4'))}`}>
                        <AvailableBadge entryDelay={timing.rest} isReady={isReady} />
                    </div>
                </div>

                {/* Right Content - Image */}
                <div className={`relative flex justify-center ${isTinyMobile ? 'mt-6' : (isExtraSmallMobile ? 'mt-7' : 'mt-8 md:mt-0')}`} ref={imageRef} style={{ opacity: 0 }}>
                    <div ref={wrapperRef} className={`relative inline-block max-w-full ${isTinyMobile ? 'scale-[0.70]' : (isExtraSmallMobile ? 'scale-[0.80]' : (isSmallMobile ? 'scale-[0.90]' : ''))}`}>
                        {/* Decorative Squares - with floating animation */}
                        <div ref={box1Ref} className={`absolute ${isTinyMobile ? '-top-3 -left-3 w-16 h-16' : (isExtraSmallMobile ? '-top-4 -left-4 w-20 h-20' : '-top-6 -left-6 size-xl')} bg-white/10 backdrop-blur-md border border-white/20 ${isDark ? 'z-0' : 'z-30'} scale-75 sm:scale-100`}></div>
                        <div ref={box2Ref} className={`absolute ${isTinyMobile ? '-bottom-3 -right-3 w-16 h-16' : (isExtraSmallMobile ? '-bottom-4 -right-4 w-20 h-20' : '-bottom-6 -right-6 size-xl')} bg-white/10 backdrop-blur-md border border-white/20 ${isDark ? 'z-0' : 'z-30'} scale-75 sm:scale-100`}></div>

                        {/* Image Container - with floating animation */}
                        <div ref={imageContainerRef} className="relative p-4 border border-white/10 z-10 rounded-lg max-w-full glass-panel" style={{ borderRadius: '16px' }}>
                            <div className={`relative w-full aspect-[4/5] overflow-hidden bg-white/5 rounded-sm ${isTinyMobile ? 'max-w-[200px]' : (isExtraSmallMobile ? 'max-w-[240px]' : (isSmallMobile ? 'max-w-[280px]' : 'max-w-[320px]'))}`}>
                                {/* shimmer-fast keyframes are in globals.css */}
                                {/* Skeleton Loader Container */}
                                <div
                                    className={`absolute inset-0 z-10 bg-white/5 overflow-hidden transition-opacity duration-1000 ease-out ${isImageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                                >
                                    {/* Moving Light effect - only rendered when loading */}
                                    {!isImageLoaded && (
                                        <div
                                            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            style={{ animation: 'shimmer-fast 1.2s infinite ease-in-out' }}
                                        />
                                    )}
                                </div>

                                <img
                                    src={imageError ? DEFAULT_HERO_URL : `${import.meta.env.BASE_URL}images/hero-800x1000.webp`}
                                    alt="Y0ussef Mahmoud - Full-Stack Developer"
                                    onLoad={() => setIsImageLoaded(true)}
                                    onError={() => setImageError(true)}
                                    className="w-full h-full object-cover transition-all duration-[1500ms] ease-out"
                                    style={{
                                        filter: isImageLoaded ? 'blur(0px)' : 'blur(20px)',
                                        opacity: isImageLoaded ? 1 : 0,
                                        transform: isImageLoaded ? 'scale(1)' : 'scale(1.05)'
                                    }}
                                />
                            </div>

                            {/* Numbers */}
                            <div className="absolute -left-8 top-1/2 -rotate-90 font-bold text-xl hidden sm:block text-sec">4.0</div>
                            <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 font-bold text-xl text-sec">5.0</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroY0;
