import React from 'react';
import styled from 'styled-components';
import { Translations } from '../../i18n/translations';

const EducationSection = styled.section`
  padding: 5rem 0;
  background: ${props => props.theme.colors.bgSecondary};
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

const Timeline = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 2rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${props => props.theme.colors.primary};
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      left: 1rem;
    }
  }
`;

const TimelineItem = styled.li`
  position: relative;
  padding-left: 5rem;
  padding-bottom: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding-left: 3rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 1.5rem;
    top: 0.5rem;
    width: 1rem;
    height: 1rem;
    background: ${props => props.theme.colors.primary};
    border-radius: 50%;
    border: 3px solid ${props => props.theme.colors.bgSecondary};
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      left: 0.5rem;
    }
  }
  
  &:last-child {
    padding-bottom: 0;
  }
`;

const EducationCard = styled.div`
  background: ${props => props.theme.colors.bgPrimary};
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px ${props => props.theme.colors.shadow};
  }
`;

const EducationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const EducationTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin: 0;
`;

const EducationMeta = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  font-weight: 500;
`;

const EducationDesc = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin: 0;
`;

const CertificationsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const CertificationItem = styled.div`
  background: ${props => props.theme.colors.bgSecondary};
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary}10;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const CertIcon = styled.div`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
`;

const CertText = styled.span`
  color: ${props => props.theme.colors.textPrimary};
  font-weight: 500;
  font-size: 0.875rem;
`;

interface EducationProps {
  translations: Translations;
}

const Education: React.FC<EducationProps> = ({ translations }) => {
  const educationData = [
    {
      id: 1,
      title: translations.education.d1.title,
      meta: '2020–2024 · Giza, EG',
      description: translations.education.d1.desc,
      type: 'degree'
    },
    {
      id: 2,
      title: translations.education.d2.title,
      meta: translations.education.d2.meta,
      description: translations.education.d2.desc,
      type: 'certifications',
      certifications: [
        { name: 'Docker Essentials', icon: '🐳' },
        { name: 'REST API Design', icon: '🔗' },
        { name: 'Flutter Development', icon: '📱' },
        { name: 'Node.js Fundamentals', icon: '🟢' },
        { name: 'MySQL Database', icon: '🗄️' },
        { name: 'Git & GitHub', icon: '📝' }
      ]
    }
  ];

  return (
    <EducationSection id="education">
      <Container>
        <Title>{translations.education.title}</Title>
        <Subtitle>{translations.education.subtitle}</Subtitle>

        <Timeline>
          {educationData.map((item) => (
            <TimelineItem key={item.id}>
              <EducationCard>
                <EducationHeader>
                  <EducationTitle>{item.title}</EducationTitle>
                  <EducationMeta>{item.meta}</EducationMeta>
                </EducationHeader>
                <EducationDesc>{item.description}</EducationDesc>
                
                {item.type === 'certifications' && item.certifications && (
                  <CertificationsList>
                    {item.certifications.map((cert, index) => (
                      <CertificationItem key={index}>
                        <CertIcon>{cert.icon}</CertIcon>
                        <CertText>{cert.name}</CertText>
                      </CertificationItem>
                    ))}
                  </CertificationsList>
                )}
              </EducationCard>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </EducationSection>
  );
};

export default Education;
