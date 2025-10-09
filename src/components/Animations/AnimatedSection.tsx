import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const AnimatedContainer = styled.div<{
  isVisible: boolean;
  animation: string;
  delay: number;
  duration: number;
}>`
  opacity: 0;
  transition: all 0.3s ease;

  ${props => props.isVisible && css`
    animation: ${
      props.animation === 'fadeInUp' ? fadeInUp :
      props.animation === 'fadeInLeft' ? fadeInLeft :
      props.animation === 'fadeInRight' ? fadeInRight :
      scaleIn
    } ${props.duration}s ease-out ${props.delay}s forwards;
  `}
`;

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  className
}) => {
  const { elementRef, isIntersecting } = useIntersectionObserver({ 
    threshold,
    triggerOnce: true 
  });

  return (
    <AnimatedContainer
      ref={elementRef}
      isVisible={isIntersecting}
      animation={animation}
      delay={delay}
      duration={duration}
      className={className}
    >
      {children}
    </AnimatedContainer>
  );
};

export default AnimatedSection;
