import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * App Component - المكون الجذري للتطبيق
 *
 * معمارية اللعبة (Game-Like Architecture):
 * ====================================
 *
 * النهج المتبع:
 * - الصفحة الرئيسية ثابتة بدون scroll (Hero component فقط)
 * - جميع الأقسام (About, Skills, Services, Projects, Education, Contact) تظهر في modals منبثقة
 * - المستخدم يتنقل عبر navbar أو أزرار CTA لفتح الـ modals
 * - كل modal يحتوي على scroll داخلي مستقل
 * - تجربة مستخدم تشبه اللعبة: شاشة رئيسية ثابتة + نوافذ منبثقة للمحتوى
 *
 * إدارة الحالة (State Management):
 * - activeModal: string | null - يحدد الـ modal المفتوح حالياً
 * - openModal(modalId): فتح modal محدد
 * - closeModal(): إغلاق الـ modal النشط
 *
 * طرق الإغلاق:
 * - الضغط على زر X في رأس الـ modal
 * - الضغط على مفتاح ESC
 * - الضغط على الخلفية الداكنة (overlay)
 *
 * الميزات:
 * - منع scroll الصفحة الرئيسية (overflow: hidden)
 * - scroll مستقل داخل كل modal
 * - animations سلسة (fade-in, slide-up)
 * - دعم RTL للعربية
 * - responsive design لجميع الشاشات
 */
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import SEOHead from './components/SEO/SEOHead';
import AccessibilitySkipLink from './components/Accessibility/SkipLink';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { translations } from './i18n/translations';
import WindowFrame from './components/WindowFrame';
import Navbar from './components/Navbar';
function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState('en');
    const [isLoading, setIsLoading] = useState(true);
    /**
     * إدارة حالة الـ Modal System
     * ===========================
     *
     * activeModal: يحمل معرف الـ modal المفتوح حالياً
     * القيم الممكنة: 'home' | 'about' | 'skills' | 'services' | 'projects' | 'education' | 'contact' | null
     * null = لا يوجد modal مفتوح (الشاشة الرئيسية فقط)
     *
     * isTransitioning: حالة الانتقال بين الـ modals
     * true = يتم التبديل بين modals، false = لا يوجد انتقال
     *
     * closingModal: معرف الـ modal الذي يتم إغلاقه خلال الانتقال
     * يمنع flicker في الـ navbar أثناء التبديل السريع
     */
    const [activeTab, setActiveTab] = useState('home');
    /**
     * Initializes theme and language from localStorage or system preferences
     * Runs once on component mount
     * - Checks localStorage for saved preferences
     * - Falls back to system/browser preferences if not found
     * - Simulates loading screen for 1.5 seconds
     */
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const savedLang = localStorage.getItem('lang');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        }
        else {
            // Check system preference using media query
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(prefersDark);
        }
        if (savedLang) {
            setLanguage(savedLang);
        }
        else {
            // Detect browser language and set Arabic if detected
            const browserLang = navigator.language.toLowerCase();
            setLanguage(browserLang.startsWith('ar') ? 'ar' : 'en');
        }
        // Simulate loading time for smooth transition
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);
    /**
     * Updates document attributes and localStorage when theme or language changes
     * - Sets data-theme attribute for CSS variables
     * - Sets lang and dir attributes for accessibility and RTL support
     * - Persists preferences to localStorage
     * - Updates page title based on language
     */
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        document.documentElement.setAttribute('lang', language);
        document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.classList.toggle('dark', isDarkMode);
        // Persist preferences
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('lang', language);
        // Update page title dynamically
        document.title = language === 'ar'
            ? 'يوسف محمود - مطور Full-Stack'
            : 'Y0ussef Mahmoud - Full-Stack Developer';
    }, [isDarkMode, language]);
    /**
     * Toggles between dark and light theme
     */
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };
    /**
     * Toggles between English and Arabic language
     */
    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };
    const t = translations[language];
    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return _jsx(Hero, { translations: t, onNavigate: (id) => setActiveTab(id) });
            case 'about':
                return (_jsx(WindowFrame, { title: t.windowTitles.about, onClose: () => setActiveTab('home'), children: _jsx(About, { translations: t }) }));
            case 'skills':
                return (_jsx(WindowFrame, { title: t.windowTitles.skills, onClose: () => setActiveTab('home'), children: _jsx(Skills, { translations: t }) }));
            case 'services':
                return (_jsx(WindowFrame, { title: t.windowTitles.services, onClose: () => setActiveTab('home'), children: _jsx(Services, { translations: t }) }));
            case 'projects':
                return (_jsx(WindowFrame, { title: t.windowTitles.projects, onClose: () => setActiveTab('home'), children: _jsx(Projects, { translations: t }) }));
            case 'education':
                return (_jsx(WindowFrame, { title: t.windowTitles.education, onClose: () => setActiveTab('home'), children: _jsx(Education, { translations: t }) }));
            case 'contact':
                return (_jsx(WindowFrame, { title: t.windowTitles.contact, onClose: () => setActiveTab('home'), children: _jsx(Contact, { translations: t }) }));
            default:
                return null;
        }
    };
    if (isLoading) {
        return (_jsx("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center bg-background text-foreground", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "h-12 w-12 rounded-full border-2 border-border border-t-primary animate-spin mx-auto" }), _jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: language === 'ar' ? 'جاري التحميل...' : 'Loading...' })] }) }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(SEOHead, { title: language === 'ar' ? 'يوسف محمود - مطور Full-Stack' : 'Y0ussef Mahmoud - Full-Stack Developer Portfolio', description: language === 'ar'
                    ? 'مطور Full-Stack شغوف. خبير في React.js, Node.js, TypeScript, MySQL, Flutter. بناء تطبيقات ويب حديثة.'
                    : 'Passionate Full-Stack Developer & Project Engineer. Expert in React.js, Node.js, TypeScript, MySQL, Flutter. Building modern web and mobile applications.' }), _jsxs("div", { className: "h-screen w-screen overflow-hidden bg-background text-foreground relative", children: [_jsxs("div", { className: "absolute inset-0 z-0 pointer-events-none", children: [_jsx("div", { className: "absolute inset-0 bg-background/80 z-10" }), _jsx("img", { src: "/images/My-Portfolio-1200x675.webp", alt: "", className: "w-full h-full object-cover opacity-30 scale-110" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 z-20" }), _jsx("div", { className: "absolute inset-0 opacity-[0.03] z-10", style: {
                                    backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                                    backgroundSize: '40px 40px',
                                } })] }), _jsx(AccessibilitySkipLink, { href: "#main", children: language === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content' }), _jsx("main", { id: "main", className: "relative z-20 h-full w-full flex items-center justify-center p-4 pb-24", children: _jsx(ErrorBoundary, { children: _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.2, ease: 'easeOut' }, className: "w-full flex items-center justify-center", children: renderContent() }, activeTab) }) }) }), _jsx(Navbar, { activeTab: activeTab, setActiveTab: setActiveTab, isDarkMode: isDarkMode, toggleTheme: toggleTheme, language: language, toggleLanguage: toggleLanguage, translations: t })] })] }));
}
export default App;
