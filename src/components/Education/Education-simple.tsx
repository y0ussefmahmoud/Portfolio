import React from 'react';
import styled from 'styled-components';
import { Translations } from '../../i18n/translations';

const EducationSection = styled.section`
  padding: 5rem 0;
  background: ${props => props.theme.colors.bgPrimary};
  scroll-margin-top: 100px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const EducationTimeline = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${props => props.theme.colors.primary};
    transform: translateX(-50%);
    
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      left: 20px;
    }
  }
`;

const EducationItem = styled.div<{ isLeft?: boolean }>`
  position: relative;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  
  ${props => props.isLeft ? `
    justify-content: flex-end;
    padding-right: calc(50% + 2rem);
    
    @media (max-width: ${props.theme.breakpoints.tablet}) {
      justify-content: flex-start;
      padding-right: 0;
      padding-left: 3rem;
    }
  ` : `
    justify-content: flex-start;
    padding-left: calc(50% + 2rem);
    
    @media (max-width: ${props.theme.breakpoints.tablet}) {
      padding-left: 3rem;
    }
  `}
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: flex-start;
    padding-left: 3rem;
    padding-right: 0;
  }
`;

const EducationCard = styled.div`
  background: ${props => props.theme.colors.bgSecondary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px ${props => props.theme.colors.shadow};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 20px;
    height: 20px;
    background: ${props => props.theme.colors.primary};
    border: 4px solid ${props => props.theme.colors.bgPrimary};
    border-radius: 50%;
    transform: translateY(-50%);
    
    ${props => props.theme.breakpoints.tablet && `
      left: -41px;
    `}
  }
`;

const EducationYear = styled.div`
  display: inline-block;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const EducationInstitution = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: 0.5rem;
`;

const EducationDegree = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const EducationDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const EducationAchievements = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Achievement = styled.li`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 0.5rem;
  position: relative;
  padding-left: 1.5rem;
  
  &::before {
    content: '🎯';
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const CertificationsSection = styled.div`
  margin-top: 4rem;
  text-align: center;
`;

const CertificationsTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: 2rem;
`;

const CertificationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const CertificationCard = styled.div`
  background: ${props => props.theme.colors.bgSecondary};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px ${props => props.theme.colors.shadow};
  }
`;

const CertificationIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const CertificationName = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: 0.5rem;
`;

const CertificationIssuer = styled.p`
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const CertificationDate = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

interface EducationProps {
  translations: Translations;
}

const Education: React.FC<EducationProps> = ({ translations }) => {
  const educationData = [
    {
      year: "2020 - 2024",
      institution: "Egyptian Korean Faculty of Technological Industry and Energy",
      degree: "Bachelor of Software Engineering",
      description: "Specialized in Computer Engineering with focus on software development, algorithms, and system design.",
      achievements: [
        "Relevant Coursework: Data Structures, Algorithms, Database Systems",
        "Software Engineering, Web Development, Mobile Development",
        "Computer Networks, Operating Systems, Computer Architecture"
      ]
    }
    /*
    ,
    {
      year: "2017 - 2020",
      institution: "Helwan STEM High School",
      degree: "High School Diploma - STEM Program",
      description: "Science, Technology, Engineering, and Mathematics focused education with emphasis on problem-solving and innovation.",
      achievements: [
        "STEM Program Graduate with Excellence",
        "Focus on Mathematics, Physics, and Computer Science",
        "Participated in Science Olympiad and Programming Competitions"
      ]
    }
    */
  ];

  const certifications = [
    {
      name: "Full-Stack Web Development",
      issuer: "Meta (Facebook)",
      date: "2023",
      icon: "🌐"
    },
    {
      name: "React.js Development",
      issuer: "Meta (Facebook)",
      date: "2023",
      icon: "⚛️"
    },
    {
      name: "Node.js Backend Development",
      issuer: "IBM",
      date: "2023",
      icon: "🟢"
    },
    {
      name: "Database Design & Management",
      issuer: "Oracle",
      date: "2022",
      icon: "🗄️"
    },
    {
      name: "Flutter Mobile Development",
      issuer: "Google",
      date: "2023",
      icon: "📱"
    },
    {
      name: "Cloud Computing Fundamentals",
      issuer: "Amazon Web Services",
      date: "2023",
      icon: "☁️"
    }
  ];

  return (
    <EducationSection id="education">
      <Container>
        <SectionHeader>
          <Title>Education & Certifications</Title>
          <Subtitle>
            My academic journey and professional certifications that shaped my expertise in software development
          </Subtitle>
        </SectionHeader>

        <EducationTimeline>
          {educationData.map((item, index) => (
            <EducationItem key={index} isLeft={index % 2 === 0}>
              <EducationCard>
                <EducationYear>{item.year}</EducationYear>
                <EducationInstitution>{item.institution}</EducationInstitution>
                <EducationDegree>{item.degree}</EducationDegree>
                <EducationDescription>{item.description}</EducationDescription>
                <EducationAchievements>
                  {item.achievements.map((achievement, achIndex) => (
                    <Achievement key={achIndex}>{achievement}</Achievement>
                  ))}
                </EducationAchievements>
              </EducationCard>
            </EducationItem>
          ))}
        </EducationTimeline>

        <CertificationsSection>
          <CertificationsTitle>Professional Certifications</CertificationsTitle>
          <CertificationGrid>
            {certifications.map((cert, index) => (
              <CertificationCard key={index}>
                <CertificationIcon>{cert.icon}</CertificationIcon>
                <CertificationName>{cert.name}</CertificationName>
                <CertificationIssuer>{cert.issuer}</CertificationIssuer>
                <CertificationDate>{cert.date}</CertificationDate>
              </CertificationCard>
            ))}
          </CertificationGrid>
        </CertificationsSection>
      </Container>
    </EducationSection>
  );
};

export default Education;
