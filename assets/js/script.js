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
      'hero.tagline': 'Full‑Stack Developer building scalable web and mobile apps.',
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
      'contact.ph_name': 'Your name',
      'contact.ph_email': 'you@example.com',
      'contact.ph_message': 'Tell me about your project...',
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
      'hero.tagline': 'مطوّر أبني تطبيقات ويب وموبايل قابلة للتوسّع.',
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
      'contact.ph_name': 'اسمك',
      'contact.ph_email': 'you@example.com',
      'contact.ph_message': 'حدّثني عن مشروعك...',
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
    // Apply placeholders i18n
    $$('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] && 'placeholder' in el) el.placeholder = dict[key];
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
      const hidden = card.classList.contains('is-hidden') || card.style.display === 'none';
      if (!hidden && status && counters.hasOwnProperty(status)) counters[status]++;
    });
    Object.keys(counters).forEach(key => {
      document.querySelectorAll(`.count-badge[data-count-for="${key}"]`).forEach(badge => {
        badge.textContent = String(counters[key]);
      });
    });
  }

  // --- Scrollspy ---
  function initScrollspy() {
    const sections = $$('section[id]');
    const links = $$('.nav-list a[href^="#"]');
    const map = new Map();
    links.forEach(a => {
      const id = a.getAttribute('href').slice(1);
      const sec = document.getElementById(id);
      if (sec) map.set(sec, a);
    });
    const opts = { root: null, rootMargin: '0px 0px -60% 0px', threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const link = map.get(entry.target);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(l => { l.classList.remove('active'); l.removeAttribute('aria-current'); });
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        }
      });
    }, opts);
    sections.forEach(sec => observer.observe(sec));
  }

  // --- Escape key to close menu ---
  function bindEscapeToCloseMenu() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Back to Top ---
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    const showAt = 320;
    const onScroll = () => {
      if (window.scrollY > showAt) btn.classList.add('show');
      else btn.classList.remove('show');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    btn.addEventListener('click', () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  }

  // --- Reveal on scroll ---
  function initRevealAnimations() {
    const targets = document.querySelectorAll(
      '.section-title, .section-subtitle, .service-card, .project-card, .testimonial-card, .skill-group, .edu-item, .hero-media img, .about-media img, .project-media img'
    );
    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('reveal-visible'));
      return;
    }
    targets.forEach((el, idx) => {
      el.classList.add('reveal');
      // optional simple stagger
      el.style.transitionDelay = `${Math.min(idx % 8, 4) * 40}ms`;
    });
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
    targets.forEach(el => obs.observe(el));
  }

  // --- Projects Filter ---
  function initProjectsFilter() {
    const toolbar = document.querySelector('.projects-filter');
    if (!toolbar) return;
    const buttons = Array.from(toolbar.querySelectorAll('.filter-btn'));
    const cards = Array.from(document.querySelectorAll('.project-card'));

    function setButtonState(activeBtn) {
      buttons.forEach(b => {
        const isActive = b === activeBtn;
        b.classList.toggle('is-active', isActive);
        b.setAttribute('aria-pressed', String(isActive));
      });
    }

    function updateGroupVisibility() {
      const groups = Array.from(document.querySelectorAll('.project-group'));
      groups.forEach(group => {
        const visible = group.querySelector('.project-card:not(.is-hidden)');
        group.classList.toggle('is-empty', !visible);
      });
    }

    let countRaf = 0;
    function refreshCounts() {
      if (countRaf) return;
      countRaf = requestAnimationFrame(() => {
        updateProjectCounts();
        updateGroupVisibility();
        countRaf = 0;
      });
    }

    function applyFilter(filter) {
      const [type, value] = filter === 'all' ? ['all', ''] : filter.split(':');
      cards.forEach(card => {
        let show = true;
        if (type === 'status') {
          show = (card.getAttribute('data-status') === value);
        } else if (type === 'tech') {
          const techs = (card.getAttribute('data-tech') || '').toLowerCase();
          const arr = techs.split(',').map(t => t.trim()).filter(Boolean);
          show = arr.includes(value);
        }
        card.classList.toggle('is-hidden', type !== 'all' && !show);
      });
      refreshCounts();
    }

    toolbar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      setButtonState(btn);
      const filter = btn.getAttribute('data-filter') || 'all';
      applyFilter(filter);
    });

    // Initialize default state
    const initial = toolbar.querySelector('.filter-btn.is-active') || buttons[0];
    if (initial) {
      setButtonState(initial);
      applyFilter(initial.getAttribute('data-filter') || 'all');
    }
  }

  // --- Bind Events ---
  function bindEvents() {
    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
    if (nav) nav.addEventListener('click', closeMenuOnNavigate);
    bindEscapeToCloseMenu();

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
    // Language via query param has priority on first load
    const qsLang = new URLSearchParams(window.location.search).get('lang');
    if (qsLang && (qsLang.toLowerCase() === 'ar' || qsLang.toLowerCase() === 'en')) {
      setLang(qsLang.toLowerCase());
    }
    applyLangLabel();
    applyTranslations((docEl.lang || 'en').toLowerCase());
    syncThemeIcon();
    updateProjectCounts();
    initScrollspy();
    initBackToTop();
    initRevealAnimations();
    initProjectsFilter();

    // Footer year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // Contact form placeholder handler
    const form = document.getElementById('contactForm');
    if (form) {
      const statusEl = document.getElementById('formStatus');
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        let error = '';
        if (!name || !email || !message) {
          error = (docEl.lang === 'ar') ? 'من فضلك أكمل كل الحقول المطلوبة.' : 'Please fill in all required fields.';
        } else if (!emailRe.test(email)) {
          error = (docEl.lang === 'ar') ? 'صيغة البريد غير صحيحة.' : 'Invalid email format.';
        }
        if (statusEl) {
          statusEl.textContent = error || (docEl.lang === 'ar' ? 'تم إرسال النموذج (تجريبي).' : 'Form submitted (placeholder).');
          statusEl.classList.toggle('is-error', Boolean(error));
          statusEl.classList.toggle('is-success', !error);
        }
        if (!error) form.reset();
      });
    }
  }

  // Kickoff
  bindEvents();
  init();
})();