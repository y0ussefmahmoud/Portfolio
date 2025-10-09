import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonBase = styled.div<{ 
  width?: string; 
  height?: string; 
  borderRadius?: string;
  margin?: string;
}>`
  background: linear-gradient(
    90deg,
    ${props => props.theme.colors.bgSecondary} 25%,
    ${props => props.theme.colors.border} 50%,
    ${props => props.theme.colors.bgSecondary} 75%
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '20px'};
  border-radius: ${props => props.borderRadius || '4px'};
  margin: ${props => props.margin || '0'};
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  margin?: string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = (props) => (
  <SkeletonBase {...props} />
);

export const SkeletonText: React.FC<{ lines?: number }> = ({ lines = 3 }) => (
  <SkeletonContainer>
    {Array.from({ length: lines }, (_, i) => (
      <Skeleton
        key={i}
        height="16px"
        width={i === lines - 1 ? '70%' : '100%'}
        margin="0.25rem 0"
      />
    ))}
  </SkeletonContainer>
);

export const SkeletonCard: React.FC = () => (
  <SkeletonContainer>
    <Skeleton height="200px" borderRadius="8px" />
    <Skeleton height="24px" width="80%" margin="1rem 0 0.5rem 0" />
    <SkeletonText lines={2} />
    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
      <Skeleton width="80px" height="32px" borderRadius="16px" />
      <Skeleton width="100px" height="32px" borderRadius="16px" />
    </div>
  </SkeletonContainer>
);

export const SkeletonProfile: React.FC = () => (
  <SkeletonContainer>
    <Skeleton 
      width="300px" 
      height="300px" 
      borderRadius="50%" 
      margin="0 auto 2rem auto" 
    />
    <Skeleton height="32px" width="60%" margin="0 auto 1rem auto" />
    <Skeleton height="20px" width="80%" margin="0 auto 0.5rem auto" />
    <Skeleton height="20px" width="70%" margin="0 auto" />
  </SkeletonContainer>
);

export default Skeleton;
