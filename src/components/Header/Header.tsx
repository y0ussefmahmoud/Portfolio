import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Translations } from '../../i18n/translations';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.bgPrimary};
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${props => props.theme.colors.border};
  z-index: 1000;
  transition: all 0.3s ease;
`;

const HeaderInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.textPrimary};
  text-decoration: none;
  
  .accent {
    color: ${props => props.theme.colors.accent};
  }
`;

const Nav = styled.nav<{ isOpen: boolean }>`
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: ${props => props.theme.colors.bgPrimary};
    border-bottom: 1px solid ${props => props.theme.colors.border};
    transform: translateY(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease;
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
    padding: 1rem 2rem;
    gap: 1rem;
  }
`;

const NavItem = styled.li``;

const NavLink = styled.a`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.bgSecondary};
    color: ${props => props.theme.colors.primary};
  }
`;

const Hamburger = styled.button<{ isOpen: boolean }>`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  flex-direction: column;
  gap: 4px;
  
  span {
    width: 24px;
    height: 2px;
    background: ${props => props.theme.colors.textPrimary};
    transition: all 0.3s ease;
    transform-origin: center;
    
    &:nth-child(1) {
      transform: ${props => props.isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'};
    }
    
    &:nth-child(2) {
      opacity: ${props => props.isOpen ? '0' : '1'};
    }
    
    &:nth-child(3) {
      transform: ${props => props.isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'};
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: flex;
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer style={{ 
      boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,0.1)' : 'none' 
    }}>
      <HeaderInner>
        <Logo href="#home" onClick={closeMenu}>
          Y0ussef
        </Logo>

        <Nav isOpen={isMenuOpen}>
          <NavList>
            <NavItem>
              <NavLink href="#home" onClick={closeMenu}>
                {translations.nav.home}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#about" onClick={closeMenu}>
                {translations.nav.about}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#skills" onClick={closeMenu}>
                {translations.nav.skills}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#services" onClick={closeMenu}>
                {translations.nav.services}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#projects" onClick={closeMenu}>
                {translations.nav.projects}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#education" onClick={closeMenu}>
                {translations.nav.education}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#contact" onClick={closeMenu}>
                {translations.nav.contact}
              </NavLink>
            </NavItem>
          </NavList>
        </Nav>

        <HeaderActions>
          <IconButton onClick={onToggleLanguage}>
            {language.toUpperCase()}
          </IconButton>
          <IconButton onClick={onToggleTheme}>
            {isDarkMode ? '☀️' : '🌙'}
          </IconButton>
          <Hamburger isOpen={isMenuOpen} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </Hamburger>
        </HeaderActions>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header;
