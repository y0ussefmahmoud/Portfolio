export interface Translations {
  nav: {
    home: string;
    about: string;
    skills: string;
    services: string;
    projects: string;
    education: string;
    contact: string;
  };
  windowTitles: {
    about: string;
    skills: string;
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
    location: string;
    cta: string;
  };
  skills: {
    title: string;
    subtitle: string;
    frontend: string;
    backend: string;
    mobile: string;
    tools: string;
  };
  services: {
    title: string;
    subtitle: string;
    web: {
      title: string;
      desc: string;
    };
    mobile: {
      title: string;
      desc: string;
    };
    api: {
      title: string;
      desc: string;
    };
    devops: {
      title: string;
      desc: string;
    };
    db: {
      title: string;
      desc: string;
    };
    freelance: {
      title: string;
      desc: string;
    };
  };
  projects: {
    title: string;
    subtitle: string;
    completed: string;
    inProgress: string;
    view: string;
    code: string;
  };
  education: {
    title: string;
    subtitle: string;
    d1: {
      title: string;
      desc: string;
    };
    d2: {
      title: string;
      meta: string;
      desc: string;
    };
  };
  feedback: {
    title: string;
    subtitle: string;
    t1: {
      text: string;
      role: string;
    };
    t2: {
      text: string;
      role: string;
    };
    t3: {
      text: string;
      role: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    ph_name: string;
    ph_email: string;
    ph_message: string;
  };
  footer: {
    tag: string;
    links: string;
    follow: string;
    rights: string;
  };
}

export const translations: { en: Translations; ar: Translations } = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      services: 'Services',
      projects: 'Projects',
      education: 'Education',
      contact: 'Contact',
    },
    windowTitles: {
      about: '~/about-me',
      skills: '~/my-skills',
      services: '~/services-offered',
      projects: '~/featured-projects',
      education: '~/education-background',
      contact: '~/contact-me',
    },
    hero: {
      greet: 'Hello, I\'m',
      name: 'Y0ussef Mahmoud',
      tagline: 'Full‑Stack Developer & Project Engineer at Shehabco.',
      availability: 'Available for Freelance & Full-time',
      badges: {
        primary: 'Node.js Expert',
        secondary: 'React & Flutter',
      },
      ctaPrimary: 'View Projects',
      ctaSecondary: 'Get in Touch',
    },
    about: {
      title: 'About Me',
      bio: 'I\'m a Full‑Stack Developer and Project Engineer at Shehabco. I build responsive web and mobile apps using Node.js, MySQL, and Flutter, working with RESTful APIs and Docker to deliver scalable, maintainable solutions. I love solving real‑world problems with clean code and continuously learning.',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      cta: 'Contact Me',
    },
    skills: {
      title: 'Skills',
      subtitle: 'Technologies I work with',
      frontend: 'Frontend',
      backend: 'Backend',
      mobile: 'Mobile',
      tools: 'Tools',
    },
    services: {
      title: 'Services',
      subtitle: 'What I can help you with',
      web: {
        title: 'Web Development',
        desc: 'Modern, responsive websites and dashboards built with clean, maintainable code.',
      },
      mobile: {
        title: 'Mobile Apps',
        desc: 'Cross‑platform apps with Flutter focusing on performance and user experience.',
      },
      api: {
        title: 'APIs & Integrations',
        desc: 'RESTful APIs, authentication, and third‑party integrations for robust backends.',
      },
      devops: {
        title: 'Docker & DevOps',
        desc: 'Containerized deployments and scalable setups using Docker best practices.',
      },
      db: {
        title: 'Database Design',
        desc: 'MySQL schema design, optimization, and data modeling for real‑world scale.',
      },
      freelance: {
        title: 'Freelance Projects',
        desc: 'End‑to‑end delivery with clear communication, timelines, and documentation.',
      },
    },
    projects: {
      title: 'Projects',
      subtitle: 'Recent work and selected case studies',
      completed: 'Completed',
      inProgress: 'In Progress',
      view: 'View',
      code: 'Code',
    },
    education: {
      title: 'Education',
      subtitle: 'Degrees and certifications',
      d1: {
        title: 'B.Sc. in Engineering',
        desc: 'Core studies in software engineering foundations, data structures, and systems design.',
      },
      d2: {
        title: 'Certifications',
        meta: 'Selected',
        desc: 'Docker essentials, REST API design, and Flutter development best practices.',
      },
    },
    feedback: {
      title: 'Feedback',
      subtitle: 'What clients and teammates say',
      t1: {
        text: 'Delivered on time with clean, scalable code. Communication was smooth throughout.',
        role: 'Product Manager',
      },
      t2: {
        text: 'Great ownership and technical depth across backend and Flutter.',
        role: 'Tech Lead',
      },
      t3: {
        text: 'Understood requirements quickly and suggested better architecture decisions.',
        role: 'Founder',
      },
    },
    contact: {
      title: 'Contact',
      subtitle: 'Let\'s build something great together',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
      ph_name: 'Your name',
      ph_email: 'you@example.com',
      ph_message: 'Tell me about your project...',
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
      about: 'نبذة',
      skills: 'المهارات',
      services: 'الخدمات',
      projects: 'المشاريع',
      education: 'التعليم',
      contact: 'التواصل',
    },
    windowTitles: {
      about: '~/نبذة-عني',
      skills: '~/مهاراتي',
      services: '~/الخدمات-المقدمة',
      projects: '~/المشاريع-المميزة',
      education: '~/خلفيتي-التعليمية',
      contact: '~/تواصل-معي',
    },
    hero: {
      greet: 'مرحباً، أنا',
      name: 'يوسف محمود',
      tagline: 'مطور Full-Stack ومهندس مشاريع في شهابكو.',
      availability: 'متاح للعمل الحر والدوام الكامل',
      badges: {
        primary: 'خبير Node.js',
        secondary: 'React و Flutter',
      },
      ctaPrimary: 'عرض المشاريع',
      ctaSecondary: 'تواصل معي',
    },
    about: {
      title: 'نبذة عني',
      bio: 'أنا مطور Full-Stack ومهندس مشاريع في شهابكو. أقوم ببناء تطبيقات ويب وموبايل متجاوبة باستخدام Node.js و MySQL و Flutter، مع العمل على RESTful APIs و Docker لتقديم حلول قابلة للتطوير والصيانة. أحب حل المشاكل الحقيقية بكود نظيف والتعلم المستمر.',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      location: 'الموقع',
      cta: 'تواصل معي',
    },
    skills: {
      title: 'المهارات',
      subtitle: 'التقنيات التي أعمل بها',
      frontend: 'الواجهة الأمامية',
      backend: 'الواجهة الخلفية',
      mobile: 'تطبيقات الموبايل',
      tools: 'الأدوات',
    },
    services: {
      title: 'الخدمات',
      subtitle: 'كيف يمكنني مساعدتك',
      web: {
        title: 'تطوير المواقع',
        desc: 'مواقع ولوحات تحكم حديثة ومتجاوبة مبنية بكود نظيف وقابل للصيانة.',
      },
      mobile: {
        title: 'تطبيقات الموبايل',
        desc: 'تطبيقات متعددة المنصات بـ Flutter مع التركيز على الأداء وتجربة المستخدم.',
      },
      api: {
        title: 'APIs والتكاملات',
        desc: 'RESTful APIs والمصادقة وتكاملات الطرف الثالث للخوادم القوية.',
      },
      devops: {
        title: 'Docker و DevOps',
        desc: 'نشر بالحاويات وإعدادات قابلة للتطوير باستخدام أفضل ممارسات Docker.',
      },
      db: {
        title: 'تصميم قواعد البيانات',
        desc: 'تصميم MySQL وتحسين ونمذجة البيانات للمقياس الحقيقي.',
      },
      freelance: {
        title: 'مشاريع العمل الحر',
        desc: 'تسليم شامل مع تواصل واضح وجداول زمنية وتوثيق.',
      },
    },
    projects: {
      title: 'المشاريع',
      subtitle: 'أعمال حديثة ودراسات حالة مختارة',
      completed: 'مكتمل',
      inProgress: 'قيد التطوير',
      view: 'عرض',
      code: 'الكود',
    },
    education: {
      title: 'التعليم',
      subtitle: 'الدرجات والشهادات',
      d1: {
        title: 'بكالوريوس في الهندسة',
        desc: 'دراسات أساسية في أسس هندسة البرمجيات وهياكل البيانات وتصميم الأنظمة.',
      },
      d2: {
        title: 'الشهادات',
        meta: 'مختارة',
        desc: 'أساسيات Docker وتصميم REST API وأفضل ممارسات تطوير Flutter.',
      },
    },
    feedback: {
      title: 'التقييمات',
      subtitle: 'ما يقوله العملاء وزملاء الفريق',
      t1: {
        text: 'سلم في الوقت المحدد بكود نظيف وقابل للتطوير. التواصل كان سلساً طوال الوقت.',
        role: 'مدير المنتج',
      },
      t2: {
        text: 'ملكية رائعة وعمق تقني عبر الخادم و Flutter.',
        role: 'قائد تقني',
      },
      t3: {
        text: 'فهم المتطلبات بسرعة واقترح قرارات معمارية أفضل.',
        role: 'مؤسس',
      },
    },
    contact: {
      title: 'التواصل',
      subtitle: 'لنبني شيئاً رائعاً معاً',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      message: 'الرسالة',
      send: 'إرسال الرسالة',
      ph_name: 'اسمك',
      ph_email: 'you@example.com',
      ph_message: 'أخبرني عن مشروعك...',
    },
    footer: {
      tag: 'بناء حلول ويب وموبايل قابلة للتطوير.',
      links: 'الروابط',
      follow: 'تابع',
      rights: 'جميع الحقوق محفوظة.',
    },
  },
};
