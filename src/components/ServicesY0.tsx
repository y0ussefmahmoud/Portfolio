/**
 * ServicesY0 Component
 *
 * Services section displaying available development services.
 * Features:
 * - Animated service cards with hover effects
 * - Responsive grid layout
 * - Glass morphism design
 * - Quote request functionality
 * - Multi-language support
 *
 * @component
 */

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { Globe, Smartphone, Code2, Palette, Database, Cloud, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Service card data interface
 * @interface ServiceCard
 */
interface ServiceCard {
  id: string;
  icon: React.ElementType;
  titleKey: string;
  descriptionKey: string;
  featuresKeys: string[];
  color: string;
  gradient: string;
}

/**
 * ServiceCard Component
 *
 * Individual service card with animation and hover effects.
 * @param service - Service data object
 * @param index - Card index for stagger animation
 * @param onGetQuote - Callback when quote button is clicked
 */
const ServiceCardComponent = ({
  service,
  index,
  onGetQuote,
  t
}: {
  service: ServiceCard;
  index: number;
  onGetQuote: (serviceTitle: string) => void;
  t: any;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  useEffect(() => {
    anime({
      targets: cardRef.current,
      opacity: [0, 1],
      translateY: [60, 0],
      scale: [0.9, 1],
      duration: 800,
      delay: index * 150,
      easing: 'easeOutExpo'
    });
  }, [index]);

  // Get translation values safely
  const title = t.services[service.id]?.title || service.titleKey;
  const description = t.services[service.id]?.desc || service.descriptionKey;
  const features = service.featuresKeys.map((key, i) =>
    t.services[service.id]?.features?.[key] || key
  );

  return (
    <div
      ref={cardRef}
      className="opacity-0 group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-xl border transition-all duration-500 ${
          isHovered
            ? 'border-white/20 shadow-2xl scale-[1.02]'
            : 'border-white/10 shadow-lg'
        }`}
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${service.gradient}20 0%, rgba(255,255,255,0.05) 100%)`
            : 'rgba(255, 255, 255, 0.02)'
        }}
      >
        {/* Glow effect on hover */}
        <div
          className={`absolute inset-0 rounded-2xl sm:rounded-3xl transition-opacity duration-500 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(600px circle at 50% 0%, ${service.color}15, transparent 40%)`
          }}
        />

        {/* Icon */}
        <div
          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6 transition-all duration-500 ${
            isHovered ? 'scale-110 rotate-3' : ''
          }`}
          style={{
            background: `linear-gradient(135deg, ${service.color}30 0%, ${service.color}10 100%)`,
            boxShadow: isHovered ? `0 10px 40px -10px ${service.color}50` : 'none'
          }}
        >
          <Icon
            size={28}
            className="sm:w-8 sm:h-8 transition-all duration-300"
            style={{ color: service.color }}
          />
        </div>

        {/* Title */}
        <h3 className="relative text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="relative text-sm sm:text-base text-zinc-400 mb-5 sm:mb-6 leading-relaxed">
          {description}
        </p>

        {/* Features list */}
        <ul className="relative space-y-2 sm:space-y-3 mb-6 sm:mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-zinc-300">
              <div
                className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${service.color}20` }}
              >
                <Check size={10} className="sm:w-3 sm:h-3" style={{ color: service.color }} />
              </div>
              <span className="truncate">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          onClick={() => onGetQuote(title)}
          className={`relative w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
            isHovered
              ? 'text-white'
              : 'text-zinc-300 hover:text-white'
          }`}
          style={{
            background: isHovered
              ? `linear-gradient(135deg, ${service.color} 0%, ${service.color}dd 100%)`
              : 'rgba(255, 255, 255, 0.05)',
            boxShadow: isHovered ? `0 10px 40px -10px ${service.color}60` : 'none'
          }}
        >
          <span>{t.services.getQuote}</span>
          <ArrowRight
            size={16}
            className="sm:w-5 sm:h-5 transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
};

/**
 * ServicesY0 Component
 *
 * Main services section component.
 * Displays a grid of service cards with animations.
 */
const ServicesY0 = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // Services data configuration
  const services: ServiceCard[] = [
    {
      id: 'web',
      icon: Globe,
      titleKey: 'Web Development',
      descriptionKey: 'Modern web applications',
      featuresKeys: ['responsive', 'modernUI', 'performance', 'seo', 'crossBrowser'],
      color: '#3b82f6',
      gradient: '#3b82f6'
    },
    {
      id: 'mobile',
      icon: Smartphone,
      titleKey: 'Mobile Development',
      descriptionKey: 'Cross-platform mobile apps',
      featuresKeys: ['crossPlatform', 'nativePerformance', 'appStore', 'pushNotifications', 'offline'],
      color: '#8b5cf6',
      gradient: '#8b5cf6'
    },
    {
      id: 'uiux',
      icon: Palette,
      titleKey: 'UI/UX Design',
      descriptionKey: 'Beautiful user interfaces',
      featuresKeys: ['userResearch', 'wireframing', 'prototyping', 'designSystem', 'accessibility'],
      color: '#ec4899',
      gradient: '#ec4899'
    },
    {
      id: 'backend',
      icon: Database,
      titleKey: 'Backend Development',
      descriptionKey: 'Scalable server solutions',
      featuresKeys: ['apiDesign', 'database', 'authentication', 'security', 'scalability'],
      color: '#10b981',
      gradient: '#10b981'
    },
    {
      id: 'cloud',
      icon: Cloud,
      titleKey: 'Cloud Services',
      descriptionKey: 'Cloud infrastructure',
      featuresKeys: ['deployment', 'ci/cd', 'monitoring', 'optimization', 'backup'],
      color: '#06b6d4',
      gradient: '#06b6d4'
    },
    {
      id: 'consulting',
      icon: Code2,
      titleKey: 'Tech Consulting',
      descriptionKey: 'Expert guidance',
      featuresKeys: ['planning', 'updates', 'quality', 'documentation', 'support'],
      color: '#f59e0b',
      gradient: '#f59e0b'
    }
  ];

  useEffect(() => {
    // Title animation
    anime({
      targets: titleRef.current,
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 1000,
      easing: 'easeOutExpo'
    });
  }, []);

  const handleGetQuote = (serviceTitle: string) => {
    // Dispatch custom event to open contact modal with service info
    const event = new CustomEvent('y0:openContact', {
      detail: { service: serviceTitle }
    });
    window.dispatchEvent(event);
  };

  return (
    <div
      ref={sectionRef}
      className="min-h-screen w-full flex flex-col items-center justify-start py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-y-auto custom-scrollbar"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12 sm:mb-16 lg:mb-20 opacity-0">
          <span className="inline-block px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-medium tracking-wider uppercase bg-white/5 border border-white/10 text-zinc-400 mb-4 sm:mb-6">
            {t.nav.services}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tight">
            {t.services.title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-zinc-400 max-w-2xl mx-auto px-4">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCardComponent
              key={service.id}
              service={service}
              index={index}
              onGetQuote={handleGetQuote}
              t={t}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <p className="text-zinc-500 text-sm sm:text-base mb-4">
            {t.services.price || 'Need something custom? Let\'s talk!'}
          </p>
          <button
            onClick={() => handleGetQuote('Custom Project')}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-zinc-900 font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/20"
          >
            <span>{t.services.getQuote}</span>
            <ArrowRight size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesY0;
