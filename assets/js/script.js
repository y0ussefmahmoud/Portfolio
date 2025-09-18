// assets/js/script.js
// Author: Y0ussef Mahmoud
// Purpose: Global UI interactions (header/menu, theme, language)

(function () {
  'use strict';

  // --- DOM helpers ---
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // --- Elements ---
  const docEl = document.documentElement;
  const nav = $('#nav');
  const menuBtn = $('#menu');
  const themeBtn = $('#themeToggle');
  const langBtn = $('#langToggle');

  // --- i18n (basic map, extend later) ---
  const i18n = {
    en: {
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.services': 'Services',
      'nav.skills': 'Skills',
      'nav.projects': 'Projects',
      'nav.education': 'Education',
      'nav.experience': 'Experience',
      'nav.contact': 'Contact',
      // Hero
      'hero.greet': "Hello, I’m",
      'hero.tagline': 'Full‑Stack Developer & Project Engineer at Shehabco. I build responsive web and mobile apps with Node.js, MySQL, Flutter, REST APIs, and Docker.',
      'hero.ctaPrimary': 'View Projects',
      'hero.ctaSecondary': 'Get in Touch',
      // About
      'about.title': 'About Me',
      'about.bio': 'I’m a Full‑Stack Developer and Project Engineer at Shehabco. I build responsive web and mobile apps using Node.js, MySQL, and Flutter, working with RESTful APIs and Docker to deliver scalable, maintainable solutions. I love solving real‑world problems with clean code and continuously learning.',
      'about.email': 'Email',
      'about.phone': 'Phone',
      'about.location': 'Location',
      'about.cta': 'Contact Me',
      // Services
      'services.title': 'Services',
      'services.subtitle': 'What I can help you with',
      'services.web.title': 'Web Development',
      'services.web.desc': 'Modern, responsive websites and dashboards built with clean, maintainable code.',
      'services.mobile.title': 'Mobile Apps',
      'services.mobile.desc': 'Cross‑platform apps with Flutter focusing on performance and user experience.',
      'services.api.title': 'APIs & Integrations',
      'services.api.desc': 'RESTful APIs, authentication, and third‑party integrations for robust backends.',
      'services.devops.title': 'Docker & DevOps',
      'services.devops.desc': 'Containerized deployments and scalable setups using Docker best practices.',
      'services.db.title': 'Database Design',
      'services.db.desc': 'MySQL schema design, optimization, and data modeling for real‑world scale.',
      'services.freelance.title': 'Freelance Projects',
      'services.freelance.desc': 'End‑to‑end delivery with clear communication, timelines, and documentation.',
      // Projects
      'projects.title': 'Projects',
      'projects.subtitle': 'Recent work and selected case studies',
      'projects.completed': 'Completed',
      'projects.inProgress': 'In Progress',
      'projects.view': 'View',
      'projects.code': 'Code',
      // Feedback
      'feedback.title': 'Feedback',
      'feedback.subtitle': 'What clients and teammates say',
      'feedback.t1.text': '“Delivered on time with clean, scalable code. Communication was smooth throughout.”',
      'feedback.t1.role': 'Product Manager',
      'feedback.t2.text': '“Great ownership and technical depth across backend and Flutter.”',
      'feedback.t2.role': 'Tech Lead',
      'feedback.t3.text': '“Understood requirements quickly and suggested better architecture decisions.”',
      'feedback.t3.role': 'Founder',
      // Contact
      'contact.title': 'Contact',
      'contact.subtitle': 'Let’s build something great together',
      'contact.name': 'Name',
      'contact.email': 'Email',
      'contact.message': 'Message',
      'contact.send': 'Send Message',
      'contact.note': 'No backend connected yet — this button is a placeholder for now.',
      // Footer
      'footer.tag': 'Building scalable web and mobile solutions.',
      'footer.links': 'Links',
      'footer.follow': 'Follow',
      'footer.rights': 'All rights reserved.',
      // Skills
      'skills.title': 'Skills',
      'skills.subtitle': 'Technologies I work with',
      'skills.frontend': 'Frontend',
      'skills.backend': 'Backend',
      'skills.mobile': 'Mobile',
      'skills.tools': 'Tools',
      // Education
      'education.title': 'Education',
      'education.subtitle': 'Degrees and certifications',
      'education.d1.title': 'B.Sc. in Engineering',
      'education.d1.desc': 'Core studies in software engineering foundations, data structures, and systems design.',
      'education.d2.title': 'Certifications',
      'education.d2.meta': 'Selected',
      'education.d2.desc': 'Docker essentials, REST API design, and Flutter development best practices.'
    },
    ar: {
      'nav.home': 'الرئيسية',
      'nav.about': 'نبذة',
      'nav.services': 'الخدمات',
      'nav.skills': 'المهارات',
      'nav.projects': 'المشاريع',
      'nav.education': 'التعليم',
      'nav.experience': 'الخبرات',
      'nav.contact': 'تواصل',
      // Hero
      'hero.greet': 'مرحباً، أنا',
      'hero.tagline': 'مطوّر فل‑ستاك ومهندس مشاريع لدى شهابكو. أبني تطبيقات ويب وموبايل سريعة الاستجابة باستخدام Node.js وMySQL وFlutter، وأعمل مع واجهات REST وDocker لتقديم حلول قابلة للتوسّع وموثوقة.',
      'hero.ctaPrimary': 'استعرض المشاريع',
      'hero.ctaSecondary': 'تواصل معي',
      // About
      'about.title': 'نبذة عني',
      'about.bio': 'أنا مطوّر فل‑ستاك ومهندس مشاريع لدى شهابكو. أبني تطبيقات ويب وموبايل سريعة الاستجابة باستخدام Node.js وMySQL وFlutter، وأعمل مع واجهات REST وDocker لتقديم حلول قابلة للتوسّع وسهلة الصيانة. أحب حلّ المشكلات الواقعية بكود نظيف وأحرص على التعلّم المستمر.',
      'about.email': 'البريد الإلكتروني',
      'about.phone': 'الهاتف',
      'about.location': 'الموقع',
      'about.cta': 'تواصل معي',
      // Services
      'services.title': 'الخدمات',
      'services.subtitle': 'كيف أستطيع مساعدتك',
      'services.web.title': 'تطوير الويب',
      'services.web.desc': 'مواقع ولوحات تحكم عصرية ومتجاوبة تُبنى بكود نظيف وسهل الصيانة.',
      'services.mobile.title': 'تطبيقات الجوال',
      'services.mobile.desc': 'تطبيقات متعددة المنصات باستخدام Flutter مع التركيز على الأداء وتجربة المستخدم.',
      'services.api.title': 'واجهات برمجية والتكاملات',
      'services.api.desc': 'واجهات REST، التوثيق، وتكاملات الجهات الخارجية لباك إند قوي.',
      'services.devops.title': 'Docker وعمليات النشر',
      'services.devops.desc': 'نشر بالحاويات وإعدادات قابلة للتوسّع باستخدام أفضل ممارسات Docker.',
      'services.db.title': 'تصميم قواعد البيانات',
      'services.db.desc': 'تصميم مخططات MySQL وتحسينها ونمذجة البيانات لاحتياجات العالم الحقيقي.',
      'services.freelance.title': 'مشاريع حرة',
      'services.freelance.desc': 'تسليم متكامل مع تواصل واضح، جداول زمنية، وتوثيق.',
      // Projects
      'projects.title': 'المشاريع',
      'projects.subtitle': 'أعمال حديثة ودراسات حالة مختارة',
      'projects.completed': 'منجزة',
      'projects.inProgress': 'قيد التنفيذ',
      'projects.view': 'عرض',
      'projects.code': 'الكود',
      // Feedback
      'feedback.title': 'آراء العملاء',
      'feedback.subtitle': 'ماذا يقول العملاء وزملاء العمل',
      'feedback.t1.text': '“تم التسليم في الوقت وبكود نظيف قابل للتوسّع. التواصل كان سلساً طوال الفترة.”',
      'feedback.t1.role': 'مدير منتج',
      'feedback.t2.text': '“مسؤولية عالية وعمق تقني في الباك إند وFlutter.”',
      'feedback.t2.role': 'قائد تقني',
      'feedback.t3.text': '“استوعب المتطلبات بسرعة واقترح قرارات معمارية أفضل.”',
      'feedback.t3.role': 'مؤسس',
      // Contact
      'contact.title': 'تواصل',
      'contact.subtitle': 'لنصنع شيئًا عظيماً معًا',
      'contact.name': 'الاسم',
      'contact.email': 'البريد الإلكتروني',
      'contact.message': 'الرسالة',
      'contact.send': 'إرسال الرسالة',
      'contact.note': 'لا يوجد باك إند حالياً — هذا الزر تجريبي مؤقتاً.',
      // Footer
      'footer.tag': 'بناء حلول ويب وموبايل قابلة للتوسّع.',
      'footer.links': 'روابط',
      'footer.follow': 'تابعني',
      'footer.rights': 'جميع الحقوق محفوظة.',
      // Skills
      'skills.title': 'المهارات',
      'skills.subtitle': 'التقنيات التي أعمل بها',
      'skills.frontend': 'الواجهات الأمامية',
      'skills.backend': 'الخلفيات (Back‑End)',
      'skills.mobile': 'الجوال',
      'skills.tools': 'الأدوات',
      // Education
      'education.title': 'التعليم',
      'education.subtitle': 'الدرجات العلمية والشهادات',
      'education.d1.title': 'بكالوريوس هندسة',
      'education.d1.desc': 'أساسيات هندسة البرمجيات وهياكل البيانات وتصميم الأنظمة.',
      'education.d2.title': 'شهادات',
      'education.d2.meta': 'مختارة',
      'education.d2.desc': 'أساسيات Docker، تصميم واجهات REST، وأفضل ممارسات تطوير Flutter.'
    }
  };

  function applyTranslations(lang) {
    const dict = i18n[lang] || i18n.en;
    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
  }

  // Theme icon helper
  function syncThemeIcon() {
    if (!themeBtn) return;
    const curr = (docEl.getAttribute('data-theme') || 'light').toLowerCase();
    themeBtn.innerHTML = curr === 'dark'
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  }

  // --- Language ---
  function applyLangLabel() {
    const current = (docEl.lang || 'en').toLowerCase();
    if (langBtn) langBtn.textContent = current === 'ar' ? 'AR' : 'EN';
  }

  function setLang(lang) {
    docEl.lang = lang;
    docEl.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    localStorage.setItem('lang', lang);
    applyLangLabel();
    applyTranslations(lang);
  }

  // --- Theme ---
  function setTheme(theme) {
    docEl.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    syncThemeIcon();
  }

  // --- Menu ---
  function toggleMenu() {
    if (!nav || !menuBtn) return;
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  }

  function closeMenuOnNavigate(e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  }

  // --- Projects: dynamic counts ---
  function updateProjectCounts() {
    const counters = { 'completed': 0, 'in-progress': 0 };
    document.querySelectorAll('.project-card').forEach(card => {
      const status = card.getAttribute('data-status');
      if (status && counters.hasOwnProperty(status)) counters[status]++;
    });
    Object.keys(counters).forEach(key => {
      document.querySelectorAll(`.count-badge[data-count-for="${key}"]`).forEach(badge => {
        badge.textContent = String(counters[key]);
      });
    });
  }

  // --- Bind Events ---
  function bindEvents() {
    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
    if (nav) nav.addEventListener('click', closeMenuOnNavigate);

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const curr = (docEl.getAttribute('data-theme') || 'light').toLowerCase();
        setTheme(curr === 'dark' ? 'light' : 'dark');
      });
    }

    if (langBtn) {
      langBtn.addEventListener('click', () => {
        const curr = (docEl.lang || 'en').toLowerCase();
        setLang(curr === 'ar' ? 'en' : 'ar');
      });
    }
  }

  // --- Init ---
  function init() {
    applyLangLabel();
    applyTranslations((docEl.lang || 'en').toLowerCase());
    syncThemeIcon();
    updateProjectCounts();

    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // Contact form placeholder handler
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        alert(docEl.lang === 'ar' ? 'تم إرسال النموذج (تجريبي).' : 'Form submitted (placeholder).');
        form.reset();
      });
    }
  }

  // Kickoff
  bindEvents();
  init();
})();