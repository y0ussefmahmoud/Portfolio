/**
 * HeroRevil Component
 * 
 * Hero section with handwriting animation and interactive elements.
 * Features:
 * - Handwriting text animation using anime.js
 * - Animated background elements
 * - Interactive buttons for CV and projects
 * - Responsive design
 * - Smooth animations
 * 
 * @component
 */

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { Plus, Briefcase } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const DEFAULT_HERO_URL = "";

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

        const letters = svgRef.current.querySelectorAll('.letter-path');
        anime.remove(letters);

        const tl = anime.timeline({
            easing: 'easeOutSine',
            autoplay: true,
        });

        letters.forEach((letter, index) => {
            const textEl = letter as SVGTextElement;
            const estimatedLength = fontSize * 2;

            // Explicitly reset to transparent outline
            textEl.style.visibility = 'hidden';
            textEl.style.strokeDasharray = `${estimatedLength}`;
            textEl.style.strokeDashoffset = `${estimatedLength}`;
            textEl.style.fill = 'transparent';

            tl.add({
                targets: textEl,
                strokeDashoffset: [estimatedLength, 0],
                opacity: [0, 1],
                duration: 120, // Smooth & Elegant
                delay: index === 0 ? startDelay : 0,
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
            display: 'inline-block'
        }}>
            <svg
                ref={svgRef}
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                style={{ overflow: 'visible' }}
            >
                {text.split('').map((char, index) => {
                    if (char === ' ') return null;

                    return (
                        <text
                            key={index}
                            x={positions[index]}
                            y={fontSize}
                            fontSize={fontSize}
                            fontFamily="'Rock Salt', cursive"
                            fill={color}
                            stroke={color}
                            strokeWidth="2"
                            className="letter-path"
                            style={{
                                visibility: 'hidden',
                                fill: 'transparent',
                                strokeDasharray: `${fontSize * 2}`,
                                strokeDashoffset: `${fontSize * 2}`
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

const AvailableBadge = () => {
    return (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[var(--navbar-border)] shadow-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-semibold text-primary">Available for work</span>
        </div>
    );
};

const HeroRevil = () => {
    const { t } = useLanguage();
    const sloganRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);

        // Animate slogan
        anime({
            targets: sloganRef.current,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: 300,
            easing: 'easeOutExpo'
        });

        // Animate name
        anime({
            targets: nameRef.current,
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1000,
            delay: 600,
            easing: 'easeOutExpo'
        });

        // Animate image
        anime({
            targets: imageRef.current,
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 1200,
            delay: 900,
            easing: 'easeOutExpo'
        });
    }, []);

    return (
        <div className="min-h-screen w-full flex items-center justify-center page-padding">
            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="flex flex-col items-start">
                    <AvailableBadge />
                    
                    <div ref={sloganRef} className="mt-6 opacity-0">
                        <HandwritingText 
                            text="Hello, I'm"
                            fontSize={48}
                            color="var(--accent)"
                            delay={0}
                            isReady={isReady}
                        />
                    </div>

                    <h1 
                        ref={nameRef}
                        className="text-6xl md:text-8xl lg:text-9xl font-black mt-4 opacity-0 leading-none"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Y0ussef
                    </h1>

                    <p className="text-xl md:text-2xl text-sec mt-6 max-w-lg">
                        {t.hero.tagline}
                    </p>

                    <div className="flex gap-4 mt-8">
                        <button
                            className="px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold hover:scale-105 transition-transform"
                            aria-label="View projects portfolio"
                        >
                            {t.hero.ctaPrimary}
                        </button>
                        <button
                            className="px-6 py-3 rounded-xl glass-panel border border-[var(--navbar-border)] font-semibold hover:scale-105 transition-transform"
                            aria-label="Open contact form"
                        >
                            {t.hero.ctaSecondary}
                        </button>
                    </div>
                </div>

                {/* Right Content - Image */}
                <div ref={imageRef} className="flex justify-center opacity-0">
                    <div className="relative">
                        <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden glass-panel border border-[var(--navbar-border)] shadow-2xl">
                            <img
                                src={`${import.meta.env.BASE_URL}images/hero-800x1000.webp`}
                                alt="Y0ussef Mahmoud - Full-Stack Developer"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    console.error('Hero image failed to load:', e.currentTarget.src);
                                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23f5f5f5' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%23999'%3EProfile Image%3C/text%3E%3C/svg%3E";
                                }}
                                onLoad={() => {
                                    console.log('Hero image loaded successfully');
                                }}
                            />
                        </div>
                        
                        {/* Floating decorative elements */}
                        <div className="absolute -top-4 -right-4 w-12 h-12 rounded-lg glass-panel flex items-center justify-center animate-float">
                            <Briefcase size={24} style={{ color: 'var(--accent)' }} />
                        </div>
                        <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-lg glass-panel flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                            <Plus size={24} style={{ color: 'var(--accent)' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroRevil;
