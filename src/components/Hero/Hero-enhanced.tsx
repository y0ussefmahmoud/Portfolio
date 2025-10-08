import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Translations } from '../../i18n/translations';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 6rem 0 6rem 0;
  background: ${props => props.theme.colors.bgPrimary};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${props => props.theme.colors.primary}10,
      ${props => props.theme.colors.accent}10,
      transparent
    );
    background-size: 400% 400%;
    animation: ${gradient} 15s ease infinite;
    z-index: 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 5rem 0 5rem 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 5rem 0 4rem 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 5rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
    margin-bottom: 4rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: 3rem;
  }
`;

const TextContent = styled.div`
  animation: ${fadeInUp} 1s ease-out;
`;

const Greeting = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
  font-weight: 500;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }
`;

const Name = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.accent}
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${gradient} 3s ease infinite;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.25rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.125rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, ${props.theme.colors.primary}, ${props.theme.colors.accent});
    color: white;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px ${props.theme.colors.primary}40;
    }
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }
    
    &:hover::before {
      left: 100%;
    }
  ` : `
    background: transparent;
    color: ${props.theme.colors.textPrimary};
    border: 2px solid ${props.theme.colors.primary};
    
    &:hover {
      background: ${props.theme.colors.primary};
      color: white;
      transform: translateY(-3px);
      box-shadow: 0 10px 25px ${props.theme.colors.primary}40;
    }
  `}

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    max-width: 300px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.theme.colors.bgSecondary};
  border: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textPrimary};
  text-decoration: none;
  font-size: 1.25rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 25px ${props => props.theme.colors.primary}40;
  }
`;

const ImageContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeInUp} 1s ease-out 0.3s both;
`;

const ProfileImageContainer = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 50%;
  position: relative;
  animation: ${float} 6s ease-in-out infinite;
  overflow: hidden;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      ${props => props.theme.colors.primary},
      ${props => props.theme.colors.accent}
    );
    z-index: -1;
    animation: ${gradient} 3s ease infinite;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 280px;
    height: 280px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 220px;
    height: 220px;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 5px solid ${props => props.theme.colors.bgPrimary};
`;

const ProfilePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary}20,
    ${props => props.theme.colors.accent}20
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8rem;
  color: ${props => props.theme.colors.primary};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 6rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 5rem;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  animation: ${float} 2s ease-in-out infinite;
  z-index: 10;

  &:hover {
    color: ${props => props.theme.colors.primary};
    transform: translateX(-50%) translateY(-5px);
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    bottom: -1rem;
    left: 50%;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    bottom: -1rem;
    left: 50%;
    font-size: 0.875rem;
  }
`;

const ScrollText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.75rem;
  }
`;

const ScrollArrow = styled.div`
  font-size: 1.5rem;
  animation: ${float} 1.5s ease-in-out infinite;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

interface HeroProps {
  translations: Translations;
}

const Hero: React.FC<HeroProps> = ({ translations }) => {

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroSection id="home">
      <Container>
        <HeroContent>
          <TextContent>
            <Greeting>{translations.hero.greet}</Greeting>
            <Name>Y0ussef Mahmoud</Name>
            <Tagline>{translations.hero.tagline}</Tagline>
            
            <ButtonGroup>
              <Button variant="primary" onClick={scrollToProjects}>
                {translations.hero.ctaPrimary}
              </Button>
              <Button variant="secondary" onClick={scrollToContact}>
                {translations.hero.ctaSecondary}
              </Button>
            </ButtonGroup>

            <SocialLinks>
              <SocialLink href="https://github.com/y0ussefmahmoud" target="_blank" rel="noopener noreferrer">
                📱
              </SocialLink>
              <SocialLink href="https://linkedin.com/in/y0ussefmahmoud" target="_blank" rel="noopener noreferrer">
                💼
              </SocialLink>
              <SocialLink href="mailto:y0ussefmahmoud@gmail.com">
                ✉️
              </SocialLink>
              <SocialLink href="https://twitter.com/y0ussefmahmoud" target="_blank" rel="noopener noreferrer">
                🐦
              </SocialLink>
            </SocialLinks>
          </TextContent>

          <ImageContent>
            <ProfileImageContainer>
              <ProfileImage 
                src="/images/hero-800x1000.webp" 
                alt="Y0ussef Mahmoud - Full-Stack Developer"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  e.currentTarget.style.display = 'none';
                  const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = 'flex';
                }}
              />
              <ProfilePlaceholder style={{ display: 'none' }}>
                👨‍💻
              </ProfilePlaceholder>
            </ProfileImageContainer>
          </ImageContent>
        </HeroContent>

        <ScrollIndicator onClick={scrollToAbout}>
          <ScrollText>Explore More</ScrollText>
          <ScrollArrow>↓</ScrollArrow>
        </ScrollIndicator>
      </Container>
    </HeroSection>
  );
};

export default Hero;
