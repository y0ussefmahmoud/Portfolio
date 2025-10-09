import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const Skeleton = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    ${props => props.theme.colors.bgSecondary} 25%,
    ${props => props.theme.colors.border} 50%,
    ${props => props.theme.colors.bgSecondary} 75%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
  border-radius: inherit;
`;

const Image = styled.img<{ loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  opacity: ${props => props.loaded ? 1 : 0};
  animation: ${props => props.loaded ? fadeIn : 'none'} 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out;
`;

const ErrorPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.bgSecondary};
  color: ${props => props.theme.colors.textSecondary};
  font-size: 2rem;
  border-radius: inherit;
`;

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className, 
  placeholder = '🖼️' 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <ImageContainer className={className}>
      {!loaded && !error && <Skeleton />}
      
      {error ? (
        <ErrorPlaceholder>
          {placeholder}
        </ErrorPlaceholder>
      ) : (
        <Image
          ref={imgRef}
          src={inView ? src : ''}
          alt={alt}
          loaded={loaded}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </ImageContainer>
  );
};

export default LazyImage;
