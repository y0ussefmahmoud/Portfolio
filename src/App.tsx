import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Services from './components/Services/Services';
import Projects from './components/Projects/Projects';
import Education from './components/Education/Education';
import Feedback from './components/Feedback/Feedback';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';
import { lightTheme, darkTheme } from './theme/theme';
import { translations } from './i18n/translations';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.colors.bgPrimary};
    color: ${props => props.theme.colors.textPrimary};
    direction: ${props => props.theme.direction};
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
`;

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
  
  &:focus {
    top: 6px;
  }
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  // Initialize theme and language from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedLang = localStorage.getItem('lang') as 'en' | 'ar';
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }

    if (savedLang) {
      setLanguage(savedLang);
    } else {
      // Check browser language
      const browserLang = navigator.language.toLowerCase();
      setLanguage(browserLang.startsWith('ar') ? 'ar' : 'en');
    }
  }, []);

  // Update document attributes when theme or language changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('lang', language);
  }, [isDarkMode, language]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const currentTheme = {
    ...(isDarkMode ? darkTheme : lightTheme),
    direction: language === 'ar' ? 'rtl' : 'ltr'
  };

  const t = translations[language];

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <AppContainer>
        <SkipLink href="#home">Skip to content</SkipLink>
        
        <Header 
          isDarkMode={isDarkMode}
          language={language}
          onToggleTheme={toggleTheme}
          onToggleLanguage={toggleLanguage}
          translations={t}
        />
        
        <main>
          <Hero translations={t} />
          <About translations={t} />
          <Skills translations={t} />
          <Services translations={t} />
          <Projects translations={t} />
          <Education translations={t} />
          <Feedback translations={t} />
          <Contact translations={t} />
        </main>
        
        <Footer translations={t} />
        <BackToTop />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
