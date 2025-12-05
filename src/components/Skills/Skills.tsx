import React from 'react';
import styled from 'styled-components';
import { Translations } from '../../i18n/translations';

const SkillsSection = styled.section`
  padding: 5rem 0;
  background: ${props => props.theme.colors.bgPrimary};
  scroll-margin-top: 100px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 3rem;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const SkillCard = styled.div`
  background: ${props => props.theme.colors.bgSecondary};
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px ${props => props.theme.colors.shadow};
  }
`;

const SkillTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

const SkillTag = styled.span`
  background: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

interface SkillsProps {
  translations: Translations;
}

const Skills: React.FC<SkillsProps> = ({ translations }) => {
  const skillsData = {
    frontend: ['React.js', 'TypeScript', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
    backend: ['Node.js', 'Express.js', 'NestJS', 'MySQL', 'PostgreSQL', 'MongoDB'],
    mobile: ['Flutter', 'Dart', 'React Native', 'Firebase'],
    tools: ['Docker', 'Git', 'VS Code', 'Figma', 'Postman']
  };

  return (
    <SkillsSection id="skills">
      <Container>
        <Title>{translations.skills.title}</Title>
        <Subtitle>{translations.skills.subtitle}</Subtitle>
        
        <SkillsGrid>
          <SkillCard>
            <SkillTitle>{translations.skills.frontend}</SkillTitle>
            <SkillList>
              {skillsData.frontend.map((skill, index) => (
                <SkillTag key={index}>{skill}</SkillTag>
              ))}
            </SkillList>
          </SkillCard>

          <SkillCard>
            <SkillTitle>{translations.skills.backend}</SkillTitle>
            <SkillList>
              {skillsData.backend.map((skill, index) => (
                <SkillTag key={index}>{skill}</SkillTag>
              ))}
            </SkillList>
          </SkillCard>

          <SkillCard>
            <SkillTitle>{translations.skills.mobile}</SkillTitle>
            <SkillList>
              {skillsData.mobile.map((skill, index) => (
                <SkillTag key={index}>{skill}</SkillTag>
              ))}
            </SkillList>
          </SkillCard>

          <SkillCard>
            <SkillTitle>{translations.skills.tools}</SkillTitle>
            <SkillList>
              {skillsData.tools.map((skill, index) => (
                <SkillTag key={index}>{skill}</SkillTag>
              ))}
            </SkillList>
          </SkillCard>
        </SkillsGrid>
      </Container>
    </SkillsSection>
  );
};

export default Skills;
