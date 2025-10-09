import React, { useState } from 'react';
import styled from 'styled-components';
import { Translations } from '../../i18n/translations';
// import EnhancedProjectCard from '../ProjectCard/ProjectCard';
// import AnimatedSection from '../Animations/AnimatedSection';

const ProjectsSection = styled.section`
  padding: 5rem 0;
  background: ${props => props.theme.colors.bgPrimary};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 3rem;
  text-align: center;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ isActive: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 2rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.isActive ? `
    background: ${props.theme.colors.primary};
    color: white;
  ` : `
    background: ${props.theme.colors.bgSecondary};
    color: ${props.theme.colors.textPrimary};
    border: 1px solid ${props.theme.colors.border};
    
    &:hover {
      background: ${props.theme.colors.primary}20;
      color: ${props.theme.colors.primary};
    }
  `}
`;

const ProjectGroup = styled.div`
  margin-bottom: 3rem;
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const GroupTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.textPrimary};
`;

const CountBadge = styled.span`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.article`
  background: ${props => props.theme.colors.bgSecondary};
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px ${props => props.theme.colors.shadow};
  }
`;

const ProjectMedia = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: ${props => props.theme.colors.primary}20;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  display: block;

  &:hover {
    transform: scale(1.05);
  }

  &:not([src]), &[src=""] {
    display: none;
  }
`;

const ProjectImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}20, ${props => props.theme.colors.accent}20);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
`;

const ProjectBody = styled.div`
  padding: 1.5rem;
`;

const StatusBadge = styled.span<{ status: 'completed' | 'in-progress' }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 1rem;
  
  ${props => props.status === 'completed' ? `
    background: #10b981;
    color: white;
  ` : `
    background: #f59e0b;
    color: white;
  `}
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: 0.5rem;
`;

const ProjectDesc = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const TechBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechBadge = styled.span`
  background: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.a<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  
  ${props => props.variant === 'primary' ? `
    background: ${props.theme.colors.primary};
    color: white;
    
    &:hover {
      background: ${props.theme.colors.accent};
      transform: translateY(-2px);
    }
  ` : `
    background: transparent;
    color: ${props.theme.colors.textPrimary};
    border: 1px solid ${props.theme.colors.border};
    
    &:hover {
      background: ${props.theme.colors.bgPrimary};
      border-color: ${props.theme.colors.primary};
    }
  `}
`;

interface ProjectsProps {
  translations: Translations;
}

const Projects: React.FC<ProjectsProps> = ({ translations }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projectsData = {
    completed: [
      {
        id: 1,
        title: 'My Portfolio',
        description: 'My Portfolio with Html, Css & JavaScript.',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive'],
        image: `${process.env.PUBLIC_URL}/images/My-Portfolio-1200x675.webp`,
        viewLink: 'https://y0ussefmahmoud.github.io/Portfolio/',
        codeLink: 'https://github.com/y0ussefmahmoud/Portfolio'
      },
      {
        id: 2,
        title: 'Node.js API',
        description: 'RESTful API with Node.js, Express, JWT auth, and MySQL.',
        tech: ['Node.js', 'Express', 'JWT', 'MySQL'],
        image: `${process.env.PUBLIC_URL}/images/node-api-1200x675.webp`,
        viewLink: '#',
        codeLink: '#'
      },
      {
        id: 3,
        title: 'Admin Dashboard',
        description: 'Responsive dashboard with charts, auth, and role management.',
        tech: ['React', 'TypeScript', 'Charts', 'Auth'],
        image: `${process.env.PUBLIC_URL}/images/admin-dashboard-1200x675.webp`,
        viewLink: '#',
        codeLink: '#'
      }
    ],
    inProgress: [
      {
        id: 4,
        title: 'Y0 Hardware',
        description: 'E-commerce website for computer hardware with modern design.',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'E-commerce'],
        image: `${process.env.PUBLIC_URL}/images/Y0-Hardware-1200x675.webp`,
        viewLink: '#',
        codeLink: '#'
      },
      {
        id: 5,
        title: 'Flutter App',
        description: 'Cross‑platform mobile app with clean architecture and REST.',
        tech: ['Flutter', 'Dart', 'Clean Architecture', 'REST'],
        image: `${process.env.PUBLIC_URL}/images/flutter-app-1200x675.webp`,
        viewLink: '#',
        codeLink: '#'
      },
      {
        id: 6,
        title: 'Y0 AI Assistant',
        description: 'AI-powered chat assistant with modern UI and smart features.',
        tech: ['Next.js', 'TypeScript', 'OpenAI', 'NestJS'],
        image: `${process.env.PUBLIC_URL}/images/ai-assistant-1200x675.webp`,
        viewLink: '#',
        codeLink: '#'
      }
    ]
  };

  const getFilteredProjects = () => {
    if (activeFilter === 'all') {
      return { completed: projectsData.completed, inProgress: projectsData.inProgress };
    } else if (activeFilter === 'completed') {
      return { completed: projectsData.completed, inProgress: [] };
    } else {
      return { completed: [], inProgress: projectsData.inProgress };
    }
  };

  const filteredProjects = getFilteredProjects();

  return (
    <ProjectsSection id="projects">
      <Container>
        <Title>{translations.projects.title}</Title>
        <Subtitle>{translations.projects.subtitle}</Subtitle>

        <FilterBar>
          <FilterButton 
            isActive={activeFilter === 'all'}
            onClick={() => setActiveFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton 
            isActive={activeFilter === 'completed'}
            onClick={() => setActiveFilter('completed')}
          >
            {translations.projects.completed}
          </FilterButton>
          <FilterButton 
            isActive={activeFilter === 'in-progress'}
            onClick={() => setActiveFilter('in-progress')}
          >
            {translations.projects.inProgress}
          </FilterButton>
        </FilterBar>

        {filteredProjects.completed.length > 0 && (
          <ProjectGroup>
            <GroupHeader>
              <GroupTitle>{translations.projects.completed}</GroupTitle>
              <CountBadge>{filteredProjects.completed.length}</CountBadge>
            </GroupHeader>
            <ProjectsGrid>
              {filteredProjects.completed.map((project) => (
                <ProjectCard key={project.id}>
                  <ProjectMedia>
                    <ProjectImage 
                      src={project.image} 
                      alt={`${project.title} project cover`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                    />
                    <ProjectImagePlaceholder style={{ display: 'none' }}>
                      {project.id === 1 ? '🌐' : project.id === 2 ? '🔧' : project.id === 3 ? '📊' : '💼'}
                    </ProjectImagePlaceholder>
                  </ProjectMedia>
                  <ProjectBody>
                    <StatusBadge status="completed">
                      {translations.projects.completed}
                    </StatusBadge>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectDesc>{project.description}</ProjectDesc>
                    <TechBadges>
                      {project.tech.map((tech, index) => (
                        <TechBadge key={index}>{tech}</TechBadge>
                      ))}
                    </TechBadges>
                    <ProjectActions>
                      <ActionButton 
                        variant="primary" 
                        href={project.viewLink}
                        target={project.viewLink !== '#' ? '_blank' : undefined}
                        rel={project.viewLink !== '#' ? 'noopener noreferrer' : undefined}
                      >
                        {translations.projects.view}
                      </ActionButton>
                      <ActionButton 
                        variant="secondary" 
                        href={project.codeLink}
                        target={project.codeLink !== '#' ? '_blank' : undefined}
                        rel={project.codeLink !== '#' ? 'noopener noreferrer' : undefined}
                      >
                        {translations.projects.code}
                      </ActionButton>
                    </ProjectActions>
                  </ProjectBody>
                </ProjectCard>
              ))}
            </ProjectsGrid>
          </ProjectGroup>
        )}

        {filteredProjects.inProgress.length > 0 && (
          <ProjectGroup>
            <GroupHeader>
              <GroupTitle>{translations.projects.inProgress}</GroupTitle>
              <CountBadge>{filteredProjects.inProgress.length}</CountBadge>
            </GroupHeader>
            <ProjectsGrid>
              {filteredProjects.inProgress.map((project) => (
                <ProjectCard key={project.id}>
                  <ProjectMedia>
                    <ProjectImage 
                      src={project.image} 
                      alt={`${project.title} project cover`}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                    />
                    <ProjectImagePlaceholder style={{ display: 'none' }}>
                      {project.id === 4 ? '🖥️' : project.id === 5 ? '📱' : project.id === 6 ? '🤖' : '⚡'}
                    </ProjectImagePlaceholder>
                  </ProjectMedia>
                  <ProjectBody>
                    <StatusBadge status="in-progress">
                      {translations.projects.inProgress}
                    </StatusBadge>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectDesc>{project.description}</ProjectDesc>
                    <TechBadges>
                      {project.tech.map((tech, index) => (
                        <TechBadge key={index}>{tech}</TechBadge>
                      ))}
                    </TechBadges>
                    <ProjectActions>
                      <ActionButton variant="primary" href={project.viewLink}>
                        {translations.projects.view}
                      </ActionButton>
                      <ActionButton variant="secondary" href={project.codeLink}>
                        {translations.projects.code}
                      </ActionButton>
                    </ProjectActions>
                  </ProjectBody>
                </ProjectCard>
              ))}
            </ProjectsGrid>
          </ProjectGroup>
        )}
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
