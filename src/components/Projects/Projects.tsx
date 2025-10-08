import React, { useState } from 'react';
import styled from 'styled-components';
import { Translations } from '../../i18n/translations';

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

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.textPrimary};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.125rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 3rem;
`;

const ProjectsFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ isActive: boolean }>`
  padding: 0.5rem 1.5rem;
  border: 2px solid ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.border};
  background: ${props => props.isActive ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.isActive ? 'white' : props.theme.colors.textPrimary};
  border-radius: 2rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.isActive ? 'white' : props.theme.colors.primary};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled.article`
  background: ${props => props.theme.colors.bgSecondary};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px ${props => props.theme.colors.shadow};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const ProjectMedia = styled.div`
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ProjectBody = styled.div`
  padding: 1.5rem;
`;

const StatusBadge = styled.span<{ status: 'completed' | 'in-progress' }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1rem;
  
  ${props => props.status === 'completed' ? `
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
  ` : `
    background: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
  `}
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${props => props.theme.colors.textPrimary};
`;

const ProjectDesc = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Badges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Badge = styled.span`
  padding: 0.25rem 0.75rem;
  background: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.a<{ variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  
  ${props => props.variant === 'primary' ? `
    background: ${props.theme.colors.primary};
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(47, 111, 237, 0.3);
    }
  ` : `
    background: transparent;
    color: ${props.theme.colors.textPrimary};
    border: 1px solid ${props.theme.colors.border};
    
    &:hover {
      border-color: ${props.theme.colors.primary};
      color: ${props.theme.colors.primary};
    }
  `}
`;

interface Project {
  id: string;
  title: string;
  desc: string;
  image: string;
  status: 'completed' | 'in-progress';
  technologies: string[];
  viewLink?: string;
  codeLink?: string;
}

interface ProjectsProps {
  translations: Translations;
}

const Projects: React.FC<ProjectsProps> = ({ translations }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projectsData: Project[] = [
    {
      id: '1',
      title: 'My Portfolio',
      desc: 'My Portfolio with Html, Css & JavaScript.',
      image: 'assets/images/My-Portfolio-1200x675.webp',
      status: 'completed',
      technologies: ['Html', 'CSS', 'JavaScript'],
      viewLink: 'https://y0ussefmahmoud.github.io/Portfolio/',
      codeLink: '#'
    },
    {
      id: '2',
      title: 'Y0 Hardware',
      desc: 'Y0 Hardware with clean architecture.',
      image: 'assets/images/Y0-Hardware-1200x675.webp',
      status: 'in-progress',
      technologies: ['Html', 'CSS', 'JavaScript', 'REST'],
      viewLink: '#',
      codeLink: '#'
    },
    {
      id: '3',
      title: 'Y0 AI Assistant',
      desc: 'AI Assistant app with clean architecture.',
      image: 'assets/images/ai-assistant-1200x675.webp',
      status: 'in-progress',
      technologies: ['React.js', 'Node.js', 'OpenAI', 'PostgreSQL'],
      viewLink: '#',
      codeLink: '#'
    }
  ];

  const filteredProjects = projectsData.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'completed') return project.status === 'completed';
    if (activeFilter === 'in-progress') return project.status === 'in-progress';
    return true;
  });

  return (
    <ProjectsSection id="projects">
      <Container>
        <SectionTitle>{translations.projects.title}</SectionTitle>
        <SectionSubtitle>{translations.projects.subtitle}</SectionSubtitle>
        
        <ProjectsFilter>
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
        </ProjectsFilter>
        
        <ProjectsGrid>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id}>
              <ProjectMedia>
                <img 
                  src={project.image} 
                  alt={`${project.title} project cover`}
                  loading="lazy"
                />
              </ProjectMedia>
              <ProjectBody>
                <StatusBadge status={project.status}>
                  {project.status === 'completed' ? translations.projects.completed : translations.projects.inProgress}
                </StatusBadge>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDesc>{project.desc}</ProjectDesc>
                <Badges>
                  {project.technologies.map((tech, index) => (
                    <Badge key={index}>{tech}</Badge>
                  ))}
                </Badges>
                <ProjectActions>
                  <Button href={project.viewLink} variant="primary">
                    {translations.projects.view}
                  </Button>
                  <Button href={project.codeLink} variant="secondary">
                    {translations.projects.code}
                  </Button>
                </ProjectActions>
              </ProjectBody>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;
