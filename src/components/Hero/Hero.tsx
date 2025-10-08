import React from 'react';
import styled from 'styled-components';
import { Translations } from '../../i18n/translations';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 2rem 0;
  background: ${props => props.theme.colors.bgPrimary};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const HeroInner = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
`;

const HeroContent = styled.div``;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.textPrimary};
  line-height: 1.2;
  
  .highlight {
    color: ${props => props.theme.colors.primary};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const HeroActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.a<{ variant?: 'primary' | 'ghost' }>`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  
  ${props => props.variant === 'primary' ? `
    background: ${props.theme.colors.primary};
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(47, 111, 237, 0.3);
    }
  ` : `
    background: transparent;
    color: ${props.theme.colors.textPrimary};
    border: 2px solid ${props.theme.colors.border};
    
    &:hover {
      border-color: ${props.theme.colors.primary};
      color: ${props.theme.colors.primary};
    }
  `}
`;

const Socials = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => props.theme.colors.bgSecondary};
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const HeroMedia = styled.div`
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    order: -1;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 20px 60px ${props => props.theme.colors.shadow};
`;

interface HeroProps {
  translations: Translations;
}

const Hero: React.FC<HeroProps> = ({ translations }) => {
  return (
    <HeroSection id="home">
      <Container>
        <HeroInner>
          <HeroContent>
            <HeroTitle>
              {translations.hero.greet}{' '}
              <span className="highlight">Y0ussef</span>
            </HeroTitle>
            <HeroSubtitle>
              {translations.hero.tagline}
            </HeroSubtitle>
            <HeroActions>
              <Button href="#projects" variant="primary">
                {translations.hero.ctaPrimary}
              </Button>
              <Button href="#contact" variant="ghost">
                {translations.hero.ctaSecondary}
              </Button>
            </HeroActions>
            <Socials>
              <li>
                <SocialLink 
                  href="https://www.linkedin.com/in/y0ussefmahmoud/" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin"></i>
                </SocialLink>
              </li>
              <li>
                <SocialLink 
                  href="https://github.com/y0ussefmahmoud" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                >
                  <i className="fab fa-github"></i>
                </SocialLink>
              </li>
              <li>
                <SocialLink 
                  href="https://www.upwork.com/freelancers/~01838199ccfa64f13e" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  aria-label="Upwork"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M18.53 6.06a5.47 5.47 0 0 0-5.47 5.47v.44a12.3 12.3 0 0 1-1.66-3.28L9 5.5H6.75v5.47a2.19 2.19 0 0 1-4.38 0V5.5H0v5.47a4.38 4.38 0 1 0 8.75 0V9.1c.4 1.01.9 2 1.5 2.93l-1.75 6.46h2.4l1.2-4.45c.93.86 2.16 1.4 3.53 1.4a5.47 5.47 0 1 0 0-10.93Zm0 8.2a2.73 2.73 0 0 1-2.73-2.73v-1.64h2.73a2.73 2.73 0 1 1 0 5.47Z"/>
                  </svg>
                </SocialLink>
              </li>
              <li>
                <SocialLink 
                  href="https://www.facebook.com/y0ussefmahmoud" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook"></i>
                </SocialLink>
              </li>
            </Socials>
          </HeroContent>
          <HeroMedia>
            <HeroImage 
              src="assets/images/hero-800x1000.webp" 
              alt="Y0ussef Mahmoud - Full-Stack Developer"
              width="800"
              height="1000"
            />
          </HeroMedia>
        </HeroInner>
      </Container>
    </HeroSection>
  );
};

export default Hero;
