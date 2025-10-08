import React from 'react';
import styled from 'styled-components';
import { Translations } from '../../i18n/translations';

const SkillsSection = styled.section`
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const SkillGroup = styled.div`
  background: ${props => props.theme.colors.bgSecondary};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px ${props => props.theme.colors.shadow};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const SkillHeading = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.primary};
  text-align: center;
`;

const SkillList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
`;

const SkillItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${props => props.theme.colors.bgPrimary};
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
    box-shadow: 0 2px 10px ${props => props.theme.colors.shadow};
  }
  
  i {
    font-size: 1.25rem;
    color: ${props => props.theme.colors.primary};
    width: 20px;
    text-align: center;
  }
  
  span {
    color: ${props => props.theme.colors.textPrimary};
    font-weight: 500;
  }
`;

interface SkillsProps {
  translations: Translations;
}

const Skills: React.FC<SkillsProps> = ({ translations }) => {
  const skillsData = [
    {
      title: translations.skills.frontend,
      skills: [
        { icon: 'fab fa-html5', name: 'HTML5' },
        { icon: 'fab fa-css3-alt', name: 'CSS3' },
        { icon: 'fab fa-js-square', name: 'JavaScript' },
        { icon: 'fab fa-react', name: 'React.js' },
      ]
    },
    {
      title: translations.skills.backend,
      skills: [
        { icon: 'fab fa-node-js', name: 'Node.js' },
        { icon: 'fas fa-server', name: 'Express' },
        { icon: 'fas fa-plug', name: 'REST APIs' },
        { icon: 'fas fa-database', name: 'MySQL' },
      ]
    },
    {
      title: translations.skills.mobile,
      skills: [
        { icon: 'fab fa-android', name: 'Flutter' },
        { icon: 'fas fa-code', name: 'Dart' },
        { icon: 'fas fa-mobile-alt', name: 'Mobile Development' },
        { icon: 'fas fa-diagram-project', name: 'Clean Architecture' },
      ]
    },
    {
      title: translations.skills.tools,
      skills: [
        { icon: 'fab fa-docker', name: 'Docker' },
        { icon: 'fab fa-git-alt', name: 'Git & GitHub' },
        { icon: 'fas fa-vial', name: 'Postman' },
        { icon: 'fab fa-linux', name: 'Linux' },
      ]
    }
  ];

  return (
    <SkillsSection id="skills">
      <Container>
        <SectionTitle>{translations.skills.title}</SectionTitle>
        <SectionSubtitle>{translations.skills.subtitle}</SectionSubtitle>
        
        <SkillsGrid>
          {skillsData.map((group, index) => (
            <SkillGroup key={index}>
              <SkillHeading>{group.title}</SkillHeading>
              <SkillList>
                {group.skills.map((skill, skillIndex) => (
                  <SkillItem key={skillIndex}>
                    <i className={skill.icon} aria-hidden="true"></i>
                    <span>{skill.name}</span>
                  </SkillItem>
                ))}
              </SkillList>
            </SkillGroup>
          ))}
        </SkillsGrid>
      </Container>
    </SkillsSection>
  );
};

export default Skills;
