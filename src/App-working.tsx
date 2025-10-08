import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  // Initialize theme and language from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedLang = localStorage.getItem('lang') as 'en' | 'ar';
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }

    if (savedLang) {
      setLanguage(savedLang);
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

  const translations = {
    en: {
      title: "Y0ussef Mahmoud",
      subtitle: "Full-Stack Developer & Project Engineer",
      description: "Portfolio successfully converted to React.js with modern features",
      toggleTheme: "Toggle Theme",
      toggleLang: "عربي",
      features: "Features Completed",
      next: "Next Steps"
    },
    ar: {
      title: "يوسف محمود",
      subtitle: "مطور Full-Stack ومهندس مشاريع",
      description: "تم تحويل Portfolio بنجاح إلى React.js مع مميزات حديثة",
      toggleTheme: "تبديل الثيم",
      toggleLang: "English",
      features: "المميزات المكتملة",
      next: "الخطوات التالية"
    }
  };

  const t = translations[language];

  return (
    <div style={{ 
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'Cairo, Arial, sans-serif',
      direction: language === 'ar' ? 'rtl' : 'ltr',
      backgroundColor: isDarkMode ? '#0b1220' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#1a1a1a',
      transition: 'all 0.3s ease'
    }}>
      {/* Header */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '3rem',
        padding: '1rem 0',
        borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
      }}>
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700',
          color: '#2f6fed',
          margin: 0
        }}>
          Y0ussef<span style={{ color: '#00d3a7' }}>.</span>
        </h1>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={toggleLanguage}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
              color: isDarkMode ? '#ffffff' : '#1a1a1a',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            {t.toggleLang}
          </button>
          
          <button 
            onClick={toggleTheme}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#2f6fed',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            {isDarkMode ? '☀️' : '🌙'} {t.toggleTheme}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: '700',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #2f6fed, #00d3a7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          🎉 {t.title}
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem',
          marginBottom: '2rem',
          color: isDarkMode ? '#d1d5db' : '#6b7280'
        }}>
          {t.subtitle}
        </p>

        <div style={{
          padding: '2rem',
          backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
          borderRadius: '1rem',
          marginBottom: '3rem',
          border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
        }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '1rem',
            color: '#2f6fed'
          }}>
            ✅ {t.features}
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            textAlign: language === 'ar' ? 'right' : 'left'
          }}>
            <div>⚛️ React.js + TypeScript</div>
            <div>💅 Styled Components</div>
            <div>🌓 Dark/Light Theme</div>
            <div>🌍 English/Arabic</div>
            <div>📱 Responsive Design</div>
            <div>🎯 Interactive Components</div>
          </div>
        </div>

        <div style={{
          padding: '2rem',
          backgroundColor: isDarkMode ? '#0f172a' : '#f0f9ff',
          borderRadius: '1rem',
          border: `2px solid #2f6fed`
        }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            marginBottom: '1rem',
            color: '#2f6fed'
          }}>
            🚀 {t.next}
          </h3>
          
          <p style={{ marginBottom: '1.5rem' }}>
            {t.description}
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: '#2f6fed',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
              onClick={() => alert('Portfolio React.js يعمل بنجاح! 🎉')}
            >
              {language === 'ar' ? 'اختبار التفاعل' : 'Test Interaction'}
            </button>
            
            <button 
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: 'transparent',
                color: '#2f6fed',
                border: '2px solid #2f6fed',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
              onClick={() => window.open('http://localhost:3000', '_blank')}
            >
              {language === 'ar' ? 'فتح المشروع' : 'Open Project'}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ 
        marginTop: '4rem',
        textAlign: 'center',
        padding: '2rem 0',
        borderTop: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
        color: isDarkMode ? '#9ca3af' : '#6b7280'
      }}>
        <p>© 2024 Y0ussef Mahmoud. Built with ❤️ and ⚛️ React.js</p>
      </footer>
    </div>
  );
}

export default App;
