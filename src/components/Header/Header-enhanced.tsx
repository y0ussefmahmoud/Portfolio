import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Translations } from '../../i18n/translations';

const HeaderContainer = styled.header<{ isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.isScrolled 
    ? `${props.theme.colors.bgPrimary}ee` 
    : 'transparent'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(10px)' : 'none'};
  border-bottom: ${props => props.isScrolled 
    ? `1px solid ${props.theme.colors.border}` 
    : 'none'};
  z-index: 1000;
  transition: all 0.3s ease;
  padding: ${props => props.isScrolled ? '0.75rem 0' : '1rem 0'};
`;

const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.75rem;
  }
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  span {
    color: ${props => props.theme.colors.accent};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

const Nav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: ${props => props.theme.colors.bgPrimary};
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease;
    z-index: 999;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
`;

const NavItem = styled.li``;

const NavLink = styled.a<{ isActive?: boolean }>`
  color: ${props => props.isActive 
    ? props.theme.colors.primary 
    : props.theme.colors.textPrimary};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: all 0.3s ease;
  padding: 0.5rem 0;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 2px;
    background: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    position: relative;
    z-index: 1001;
  }
`;

const ControlButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${props => props.variant === 'primary' ? `
    background: ${props.theme.colors.primary};
    color: white;
    
    &:hover {
      background: ${props.theme.colors.accent};
      transform: translateY(-2px);
    }
  ` : `
    background: ${props.theme.colors.bgSecondary};
    color: ${props.theme.colors.textPrimary};
    border: 1px solid ${props.theme.colors.border};
    
    &:hover {
      background: ${props.theme.colors.border};
      transform: translateY(-2px);
    }
  `}

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.75rem 1rem;
    font-size: 1rem;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: ${props => props.theme.colors.textPrimary};
  font-size: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

const CloseButton = styled.button`
  display: none;
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.textPrimary};
  font-size: 2rem;
  z-index: 1002;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: block;
  }
`;

interface HeaderProps {
  isDarkMode: boolean;
  language: 'en' | 'ar';
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
  translations: Translations;
}

const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  language,
  onToggleTheme,
  onToggleLanguage,
  translations
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleSectionChange = () => {
      const sections = ['home', 'about', 'skills', 'services', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleSectionChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleSectionChange);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: translations.nav.home },
    { id: 'about', label: translations.nav.about },
    { id: 'skills', label: translations.nav.skills },
    { id: 'services', label: translations.nav.services },
    { id: 'projects', label: translations.nav.projects },
    { id: 'education', label: translations.nav.education },
    { id: 'contact', label: translations.nav.contact },
  ];

  return (
    <HeaderContainer isScrolled={isScrolled}>
      <HeaderInner>
        <Logo href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
          Y0ussef
        </Logo>

        <Nav isOpen={isMobileMenuOpen}>
          <CloseButton onClick={() => setIsMobileMenuOpen(false)}>
            ×
          </CloseButton>
          
          <NavList>
            {navItems.map((item) => (
              <NavItem key={item.id}>
                <NavLink
                  href={`#${item.id}`}
                  isActive={activeSection === item.id}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                >
                  {item.label}
                </NavLink>
              </NavItem>
            ))}
          </NavList>

          <Controls>
            <ControlButton onClick={onToggleLanguage}>
              {language === 'en' ? '🇸🇦 عربي' : '🇺🇸 English'}
            </ControlButton>
            
            <ControlButton variant="primary" onClick={onToggleTheme}>
              {isDarkMode ? '☀️' : '🌙'}
              {isDarkMode 
                ? (language === 'ar' ? 'فاتح' : 'Light') 
                : (language === 'ar' ? 'داكن' : 'Dark')
              }
            </ControlButton>
          </Controls>
        </Nav>

        <MobileMenuButton onClick={() => setIsMobileMenuOpen(true)}>
          ☰
        </MobileMenuButton>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header;
