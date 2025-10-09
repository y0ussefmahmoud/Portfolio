import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './components/Header/Header-enhanced';
import Hero from './components/Hero/Hero-enhanced';
import About from './components/About/About-simple';
import Skills from './components/Skills/Skills-simple';
import Services from './components/Services/Services-enhanced';
import Projects from './components/Projects/Projects-enhanced';
import Education from './components/Education/Education-simple';
// import Testimonials from './components/Testimonials/Testimonials-simple';
import Contact from './components/Contact/Contact-simple';
import Footer from './components/Footer/Footer';
import SEOHead from './components/SEO/SEOHead';
import AccessibilitySkipLink from './components/Accessibility/SkipLink';
import { lightTheme, darkTheme } from './theme/theme';
import { translations } from './i18n/translations';

const FooterComponent = ({ translations }: any) => (
  <footer style={{ 
    padding: '2rem 0', 
    textAlign: 'center', 
    borderTop: '1px solid var(--border)',
    background: 'var(--bg-secondary)',
    color: 'var(--text-secondary)'
  }}>
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
      <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem' }}>
        {translations.footer.tag}
      </p>
      <p style={{ margin: 0, fontSize: '0.75rem' }}>
        © 2024 Y0ussef Mahmoud. {translations.footer.rights}
      </p>
    </div>
  </footer>
);

const BackToTop = () => (
  <button 
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
    style={{ 
      position: 'fixed', 
      bottom: '2rem', 
      right: '2rem', 
      width: '50px',
      height: '50px',
      borderRadius: '50%', 
      border: 'none', 
      background: 'var(--primary)', 
      color: 'white', 
      cursor: 'pointer', 
      zIndex: 1000,
      fontSize: '1.25rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      transition: 'all 0.3s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.25)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    }}
  >
    ↑
  </button>
);

const GlobalStyle = createGlobalStyle<{ theme: any }>`
  body {
    background-color: ${props => props.theme.colors.bgPrimary};
    color: ${props => props.theme.colors.textPrimary};
    direction: ${props => props.theme.direction};
    font-family: ${props => props.theme.fonts.primary};
    line-height: 1.6;
    transition: all 0.3s ease;
  }

  * {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.bgSecondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.accent};
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
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

const LoadingScreen = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.colors.bgPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: ${props => props.isVisible ? 1 : 0};
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
  transition: all 0.5s ease;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid ${props => props.theme.colors.border};
  border-top: 3px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1rem;
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [isLoading, setIsLoading] = useState(true);

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

    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // Update document attributes when theme or language changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('lang', language);

    // Update page title
    document.title = language === 'ar' 
      ? 'يوسف محمود - مطور Full-Stack' 
      : 'Y0ussef Mahmoud - Full-Stack Developer';
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

  if (isLoading) {
    return (
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle theme={currentTheme} />
        <LoadingScreen isVisible={isLoading}>
          <div style={{ textAlign: 'center' }}>
            <LoadingSpinner />
            <LoadingText>
              {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
            </LoadingText>
          </div>
        </LoadingScreen>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <SEOHead 
        title={language === 'ar' ? 'يوسف محمود - مطور Full-Stack' : 'Y0ussef Mahmoud - Full-Stack Developer Portfolio'}
        description={language === 'ar' 
          ? 'مطور Full-Stack شغوف. خبير في React.js, Node.js, TypeScript, MySQL, Flutter. بناء تطبيقات ويب حديثة.'
          : 'Passionate Full-Stack Developer & Project Engineer. Expert in React.js, Node.js, TypeScript, MySQL, Flutter. Building modern web and mobile applications.'
        }
      />
      <AppContainer>
        <AccessibilitySkipLink href="#main">
          {language === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content'}
        </AccessibilitySkipLink>
        
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
          <Contact translations={t} />
          {/* <Feedback translations={t} /> */}
        </main>
        
        <Footer translations={t} />
        <BackToTop />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
