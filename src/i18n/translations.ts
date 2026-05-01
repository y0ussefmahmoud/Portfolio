/**
 * Internationalization Translations
 *
 * Translation keys for multi-language support.
 * Supports English (en) and Arabic (ar) languages.
 *
 * @author      م / يوسف محمود عبد الجواد
 * @author      Eng. Youssef Mahmoud Abdelgawad
 * @website     https://y0ussef.com
 * @version     3.0.7
 * @copyright   2024-2025 Youssef Mahmoud Abdelgawad. All rights reserved.
 */

export interface Translations {
  nav: {
    home: string;
    about: string;
    services: string;
    projects: string;
    education: string;
    contact: string;
  };
  windowTitles: {
    about: string;
    services: string;
    projects: string;
    education: string;
    contact: string;
  };
  hero: {
    greet: string;
    name: string;
    tagline: string;
    availability: string;
    badges: {
      primary: string;
      secondary: string;
    };
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    title: string;
    bio: string;
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
    cta: string;
  };
  services: {
    title: string;
    subtitle: string;
    getQuote: string;
    price: string;
    web: {
      title: string;
      desc: string;
      features: {
        responsive: string;
        modernUI: string;
        performance: string;
        seo: string;
        crossBrowser: string;
      };
    };
    mobile: {
      title: string;
      desc: string;
      features: {
        crossPlatform: string;
        nativeUI: string;
        appStore: string;
        offline: string;
      };
    };
    uiux: {
      title: string;
      desc: string;
      features: {
        userResearch: string;
        wireframing: string;
        prototyping: string;
        testing: string;
      };
    };
    backend: {
      title: string;
      desc: string;
      features: {
        apiDesign: string;
        database: string;
        authentication: string;
        security: string;
        scalability: string;
      };
    };
    cloud: {
      title: string;
      desc: string;
      features: {
        deployment: string;
        ciCd: string;
        monitoring: string;
        backup: string;
      };
    };
    consulting: {
      title: string;
      desc: string;
      features: {
        codeReview: string;
        architecture: string;
        mentoring: string;
        optimization: string;
      };
    };
  };
  projects: {
    title: string;
    subtitle: string;
    viewProject: string;
    viewCode: string;
    technologies: string;
    status: {
      completed: string;
      inProgress: string;
      planned: string;
    };
  };
  stack: {
    title: string;
    subtitle: string;
    categories: {
      frontend: string;
      backend: string;
      mobile: string;
      database: string;
      tools: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    whatsapp: string;
    location: string;
    message: string;
    send: string;
    success: string;
    error: string;
  };
  footer: {
    tag: string;
    links: string;
    follow: string;
    rights: string;
  };
}

export const translations: Record<'en' | 'ar', Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      education: 'Education',
      contact: 'Contact',
    },
    windowTitles: {
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      education: 'Education',
      contact: 'Contact',
    },
    hero: {
      greet: 'Hello, I\'m',
      name: 'Y0ussef Mahmoud Abdelgawad',
      tagline: 'Full-Stack Developer & Project Engineer',
      availability: 'Available for Work',
      badges: {
        primary: 'Full-Stack Developer',
        secondary: 'Project Engineer',
      },
      ctaPrimary: 'View My Work',
      ctaSecondary: 'Get In Touch',
    },
    about: {
      title: 'About Me',
      bio: 'Passionate Full-Stack Developer and Project Engineer at Shehabco, building responsive web and mobile applications using Node.js, MySQL, Flutter, RESTful APIs, and Docker. I solve real-world problems with clean, maintainable code.',
      email: 'Email',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      location: 'Location',
      cta: 'Get In Touch',
    },
    services: {
      title: 'My Services',
      subtitle: 'Comprehensive development solutions for your digital needs',
      getQuote: 'Get Quote',
      price: 'From',
      web: {
        title: 'Web Development',
        desc: 'Modern, responsive web applications using cutting-edge technologies',
        features: {
          responsive: 'Responsive Design',
          modernUI: 'Modern UI/UX',
          performance: 'High Performance',
          seo: 'SEO Optimized',
          crossBrowser: 'Cross-Browser Compatible',
        },
      },
      mobile: {
        title: 'Mobile Apps',
        desc: 'Native mobile applications for iOS and Android platforms',
        features: {
          crossPlatform: 'Cross-Platform Development',
          nativeUI: 'Native UI Components',
          appStore: 'App Store Deployment',
          offline: 'Offline Functionality',
        },
      },
      uiux: {
        title: 'UI/UX Design',
        desc: 'Beautiful and intuitive user interfaces with great user experience',
        features: {
          userResearch: 'User Research',
          wireframing: 'Wireframing',
          prototyping: 'Prototyping',
          testing: 'Usability Testing',
        },
      },
      backend: {
        title: 'Backend Development',
        desc: 'Robust server-side applications with scalable architecture',
        features: {
          apiDesign: 'RESTful API Design',
          database: 'Database Design',
          authentication: 'Authentication & Security',
          security: 'Data Protection',
          scalability: 'Scalable Architecture',
        },
      },
      cloud: {
        title: 'Cloud Solutions',
        desc: 'Deploy and manage applications on cloud infrastructure',
        features: {
          deployment: 'Automated Deployment',
          ciCd: 'CI/CD Pipeline',
          monitoring: 'Monitoring & Analytics',
          backup: 'Backup & Recovery',
        },
      },
      consulting: {
        title: 'Technical Consulting',
        desc: 'Expert advice on software development and system architecture',
        features: {
          codeReview: 'Code Review',
          architecture: 'System Architecture',
          mentoring: 'Technical Mentoring',
          optimization: 'Performance Optimization',
        },
      },
    },
    projects: {
      title: 'My Projects',
      subtitle: 'Some of my recent work',
      viewProject: 'View Project',
      viewCode: 'View Code',
      technologies: 'Technologies Used',
      status: {
        completed: 'Completed',
        inProgress: 'In Progress',
        planned: 'Planned',
      },
    },
    stack: {
      title: 'My Tech Stack',
      subtitle: 'Technologies and tools I work with',
      categories: {
        frontend: 'Frontend',
        backend: 'Backend',
        mobile: 'Mobile',
        database: 'Database',
        tools: 'Tools',
      },
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Let\'s work together on your next project',
      email: 'Email',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      location: 'Location',
      message: 'Your Message',
      send: 'Send Message',
      success: 'Your message has been sent successfully!',
      error: 'Something went wrong. Please try again.',
    },
    footer: {
      tag: 'Building scalable web and mobile solutions.',
      links: 'Links',
      follow: 'Follow',
      rights: 'All rights reserved.',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'نبذة عني',
      services: 'الخدمات',
      projects: 'المشاريع',
      education: 'التعليم',
      contact: 'التواصل',
    },
    windowTitles: {
      about: 'نبذة عني',
      services: 'الخدمات',
      projects: 'المشاريع',
      education: 'التعليم',
      contact: 'التواصل',
    },
    hero: {
      greet: 'أهلاً بك',
      name: 'يوسف محمود عبد الجواد',
      tagline: 'مطور Full-Stack ومهندس مشاريع',
      availability: 'متاح للعمل',
      badges: {
        primary: 'Full-Stack Developer',
        secondary: 'Project Engineer',
      },
      ctaPrimary: 'شاهد أعمالي',
      ctaSecondary: 'تواصل معي',
    },
    about: {
      title: 'نبذة عني',
      bio: 'مطور Full-Stack شغوف ومهندس مشاريع في Shehabco. أقوم ببناء تطبيقات ويب وموبايل متجاوبة باستخدام Node.js, MySQL, Flutter, RESTful APIs, و Docker. أحل مشاكل العالم الحقيقي بكود نظيف وقابل للصيانة.',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      whatsapp: 'واتساب',
      location: 'الموقع',
      cta: 'تواصل معي',
    },
    services: {
      title: 'خدماتي',
      subtitle: 'حلول تطوير متكاملة لاحتياجاتك الرقمية',
      getQuote: 'اطلب عرض سعر',
      price: 'من',
      web: {
        title: 'تطوير الويب',
        desc: 'تطبيقات ويب حديثة ومتجاوبة باستخدام أحدث التقنيات',
        features: {
          responsive: 'تصميم متجاوب',
          modernUI: 'واجهة مستخدم حديثة',
          performance: 'أداء عالي',
          seo: 'تحسين محركات البحث',
          crossBrowser: 'متوافق مع جميع المتصفحات',
        },
      },
      mobile: {
        title: 'تطبيقات الموبايل',
        desc: 'تطبيقات موبايل أصلية لهواتف iOS و Android',
        features: {
          crossPlatform: 'تطوير متعدد المنصات',
          nativeUI: 'واجهة مستخدم أصلية',
          appStore: 'نشر على المتاجر',
          offline: 'يعمل بدون انترنت',
        },
      },
      uiux: {
        title: 'تصميم UI/UX',
        desc: 'تصاميم جذابة وسهلة الاستخدام',
        features: {
          userResearch: 'بحث المستخدمين',
          wireframing: 'النماذج الأولية',
          prototyping: 'النماذج التفاعلية',
          testing: 'اختبار قابلية الاستخدام',
        },
      },
      backend: {
        title: 'تطوير Backend',
        desc: 'بناء واجهات برمجية قوية وقواعد بيانات فعالة',
        features: {
          apiDesign: 'تصميم واجهات برمجية',
          database: 'قواعد البيانات',
          authentication: 'المصادقة والأمان',
          security: 'حماية البيانات',
          scalability: 'قابلية التوسع',
        },
      },
      cloud: {
        title: 'الحلول السحابية',
        desc: 'نشر وإدارة التطبيقات على السحابة',
        features: {
          deployment: 'النشر التلقائي',
          ciCd: 'CI/CD متكامل',
          monitoring: 'المراقبة والتتبع',
          backup: 'النسخ الاحتياطي',
        },
      },
      consulting: {
        title: 'الاستشارات التقنية',
        desc: 'خبرة في تطوير البرمجيات وهندسة الأنظمة',
        features: {
          codeReview: 'مراجعة الكود',
          architecture: 'تصميم الأنظمة',
          mentoring: 'التدريب والإرشاد',
          optimization: 'تحسين الأداء',
        },
      },
    },
    projects: {
      title: 'مشاريعي',
      subtitle: 'بعض من أعمالي الأخيرة',
      viewProject: 'عرض المشروع',
      viewCode: 'عرض الكود',
      technologies: 'التقنيات المستخدمة',
      status: {
        completed: 'مكتمل',
        inProgress: 'قيد التنفيذ',
        planned: 'مخطط',
      },
    },
    stack: {
      title: 'تقنياتي',
      subtitle: 'الأدوات والتقنيات التي أستخدمها',
      categories: {
        frontend: 'الواجهات الأمامية',
        backend: 'الواجهات الخلفية',
        mobile: 'تطبيقات الموبايل',
        database: 'قواعد البيانات',
        tools: 'الأدوات',
      },
    },
    contact: {
      title: 'تواصل معي',
      subtitle: 'دعنا نعمل معاً على مشروعك القادم',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      whatsapp: 'واتساب',
      location: 'الموقع',
      message: 'رسالتك',
      send: 'إرسال',
      success: 'تم إرسال رسالتك بنجاح!',
      error: 'حدث خطأ، يرجى المحاولة مرة أخرى.',
    },
    footer: {
      tag: 'بناء حلول ويب وموبايل قابلة للتوسع.',
      links: 'روابط',
      follow: 'تابعني',
      rights: 'جميع الحقوق محفوظة.',
    },
  },
};
