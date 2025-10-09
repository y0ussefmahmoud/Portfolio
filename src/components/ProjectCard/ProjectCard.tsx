import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import LazyImage from '../LazyImage/LazyImage';
import AnimatedSection from '../Animations/AnimatedSection';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const shine = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const Card = styled.div`
  background: ${props => props.theme.colors.bgSecondary};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.colors.border};
  position: relative;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: ${props => props.theme.colors.primary};
  }

  &:hover .image-container {
    transform: scale(1.05);
  }

  &:hover .shine-effect {
    animation: ${shine} 0.6s ease-in-out;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  
  .image-container {
    transition: transform 0.3s ease;
  }
`;

const ShineEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  background-size: 200px 100%;
  z-index: 1;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;

  ${Card}:hover & {
    color: ${props => props.theme.colors.primary};
  }
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    animation: ${float} 0.6s ease-in-out;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.a<{ variant: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  text-align: center;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  ${props => props.variant === 'primary' ? `
    background: ${props.theme.colors.primary};
    color: white;
    
    &:hover {
      background: ${props.theme.colors.primary};
      transform: translateY(-2px);
      box-shadow: 0 8px 20px ${props.theme.colors.primary}40;
    }
  ` : `
    background: transparent;
    color: ${props.theme.colors.textPrimary};
    border: 1px solid ${props.theme.colors.border};
    
    &:hover {
      background: ${props.theme.colors.bgPrimary};
      border-color: ${props.theme.colors.primary};
      color: ${props.theme.colors.primary};
    }
  `}

  &:active {
    transform: translateY(0);
  }
`;

const StatusBadge = styled.div<{ status: 'completed' | 'in-progress' }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  z-index: 2;
  
  ${props => props.status === 'completed' ? `
    background: #10b981;
    color: white;
  ` : `
    background: #f59e0b;
    color: white;
  `}
`;

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    tech: string[];
    image: string;
    viewLink: string;
    codeLink: string;
  };
  status: 'completed' | 'in-progress';
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, status, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <AnimatedSection
      animation="fadeInUp"
      delay={index * 0.1}
      threshold={0.2}
    >
      <Card>
        <ImageContainer>
          <LazyImage
            src={project.image}
            alt={project.title}
            className="image-container"
          />
          <ShineEffect className="shine-effect" />
          <StatusBadge status={status}>
            {status === 'completed' ? '✅ Completed' : '🚧 In Progress'}
          </StatusBadge>
        </ImageContainer>
        
        <Content>
          <Title>{project.title}</Title>
          <Description>{project.description}</Description>
          
          <TechStack>
            {project.tech.map((tech, i) => (
              <TechTag key={i}>{tech}</TechTag>
            ))}
          </TechStack>
          
          <Actions>
            {project.viewLink !== '#' && (
              <ActionButton
                href={project.viewLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                aria-label={`View live demo of ${project.title}`}
              >
                🚀 Live Demo
              </ActionButton>
            )}
            {project.codeLink !== '#' && (
              <ActionButton
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                aria-label={`View source code of ${project.title}`}
              >
                📂 Source Code
              </ActionButton>
            )}
          </Actions>
        </Content>
      </Card>
    </AnimatedSection>
  );
};

export default ProjectCard;
