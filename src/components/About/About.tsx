import React from 'react';
import styled from 'styled-components';
import { Translations } from '../../i18n/translations';

const AboutSection = styled.section`
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

const AboutInner = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
`;

const AboutContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.textPrimary};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const AboutBio = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
`;

const AboutList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  list-style: none;
  margin: 2rem 0;
  padding: 0;
`;

const AboutItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  background: ${props => props.theme.colors.bgPrimary};
  border-radius: 1rem;
  box-shadow: 0 4px 20px ${props => props.theme.colors.shadow};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const AboutLabel = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const AboutValue = styled.span`
  color: ${props => props.theme.colors.textPrimary};
  font-size: 1rem;
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const AboutActions = styled.div`
  margin-top: 2rem;
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 2rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(47, 111, 237, 0.3);
  }
`;

interface AboutProps {
  translations: Translations;
}

const About: React.FC<AboutProps> = ({ translations }) => {
  return (
    <AboutSection id="about">
      <Container>
        <AboutInner>
          <AboutContent>
            <SectionTitle>{translations.about.title}</SectionTitle>
            <AboutBio>{translations.about.bio}</AboutBio>
            
            <AboutList>
              <AboutItem>
                <AboutLabel>{translations.about.email}</AboutLabel>
                <AboutValue>
                  <a href="mailto:youssef11mahmoud112002@gmail.com">
                    youssef11mahmoud112002@gmail.com
                  </a>
                </AboutValue>
              </AboutItem>
              
              <AboutItem>
                <AboutLabel>{translations.about.phone}</AboutLabel>
                <AboutValue>
                  <a href="tel:+201129334173">01129334173</a>
                </AboutValue>
              </AboutItem>
              
              <AboutItem>
                <AboutLabel>{translations.about.location}</AboutLabel>
                <AboutValue>Giza, Egypt</AboutValue>
              </AboutItem>
            </AboutList>

            <AboutActions>
              <Button href="#contact">
                {translations.about.cta}
              </Button>
            </AboutActions>
          </AboutContent>
        </AboutInner>
      </Container>
    </AboutSection>
  );
};

export default About;
