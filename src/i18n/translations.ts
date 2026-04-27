export interface Translations {
  nav: {
    home: string;
    about: string;
    //skills: string;
    services: string;
    projects: string;
    education: string;
    contact: string;
  };
  windowTitles: {
    about: string;
    //skills: string;
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
  };/*
  skills: {
    title: string;
    subtitle: string;
    frontend: string;
    backend: string;
    mobile: string;
    tools: string;
  };*/
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
        nativePerformance: string;
        appStore: string;
        pushNotifications: string;
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
        designSystem: string;
        accessibility: string;
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
        optimization: string;
        backup: string;
      };
    };
    consulting: {
      title: string;
      desc: string;
      features: {
        planning: string;
        updates: string;
        quality: string;
        documentation: string;
        support: string;
      };
    };
    freelance: {
      title: string;
      desc: string;
      features: {
        planning: string;
        updates: string;
        quality: string;
        documentation: string;
        support: string;
      };
    }
  };
  projects: {
    title: string;
    subtitle: string;
    completed: string;
    inProgress: string;
    view: string;
    code: string;
    viewDetails: string;
    projectDetails: string;
    videoDemo: string;
    imageGallery: string;
    techStack: string;
    challenges: string;
    solutions: string;
    features: string;
    statistics: string;
    projectLinks: string;
    downloadPDF: string;
    watchOnYoutube: string;
    projectMeta: string;
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
      //skills: 'Skills',
      services: 'Services',
      projects: 'Projects',
      education: 'Education',
      contact: 'Contact',
    },
    windowTitles: {
      about: '~/about-me',
     // skills: '~/my-skills',
      services: '~/services-offered',
      projects: '~/featured-projects',
      education: '~/education-background',
      contact: '~/contact-me',
    },
    hero: {
      greet: 'Hello, I\'m',
      name: 'Y0ussef Mahmoud',
      tagline: 'Full‑Stack Developer & Project Engineer at Shehabco.',
      availability: 'Available for Freelance & Part-time',
      badges: {
        primary: 'React.js',
        secondary: 'Node.js & Flutter',
      },
      ctaPrimary: 'View Projects',
      ctaSecondary: 'Get in Touch',
    },
    about: {
      title: 'About Me',
      //bio: 'I\'m a Full‑Stack Developer and Project Engineer at Shehabco. I build responsive web and mobile apps using Node.js, MySQL, and Flutter, working with RESTful APIs and Docker to deliver scalable, maintainable solutions. I love solving real‑world problems with clean code and continuously learning.',
      bio: "I\'m Youssef Mahmoud Abdelgawad, a Full-Stack Developer and Project Engineer at Shehabco with a unique dual profile – I bridge the gap between physical infrastructure and digital innovation, At Shehabco, I manage integrated security system projects from installation to handover – working with CCTV, Access Control, Fire Alarm, and Suppression Systems across commercial and industrial sites. I lead technical teams, ensure project timelines, and liaise directly with clients. As a Freelance Developer (Upwork & Khamsat), I build: 📱 Cross-platform mobile apps with Flutter & Dart 🌐 Full-stack web applications using React.js, Node.js, Express.js, and MySQL 🔗 RESTful APIs with JWT authentication and third-party integrations, Frontend: React.js, Flutter, HTML5, CSS3, JavaScript (ES6+), Backend: Node.js, Express.js, REST APIs, Database: MySQL, Database Design & Optimization, DevOps: Docker, Git, GitHub, Postman, Network Configuration, CCTV Systems.",
      email: 'Email',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      location: 'Location',
      cta: 'Contact Me',
    },/*
    skills: {
      title: 'Skills',
      subtitle: 'Technologies I work with',
      frontend: 'Frontend',
      backend: 'Backend',
      mobile: 'Mobile',
      tools: 'Tools',
    },*/
    services: {
      title: 'Services',
      subtitle: 'What I can help you with',
      getQuote: 'Get Quote',
      price: 'Price: Custom packages available',
      web: {
        title: 'Web Development',
        desc: 'Modern, responsive websites and dashboards built with clean, maintainable code.',
        features: {
          responsive: 'Responsive Web Design',
          modernUI: 'Modern UI/UX',
          performance: 'Performance Optimization',
          seo: 'SEO Friendly',
          crossBrowser: 'Cross-browser Compatible',
        },
      },
      mobile: {
        title: 'Mobile Apps',
        desc: 'Cross‑platform apps with Flutter focusing on performance and user experience.',
        features: {
          crossPlatform: 'Cross-platform Development',
          nativePerformance: 'Native Performance',
          appStore: 'App Store Deployment',
          pushNotifications: 'Push Notifications',
          offline: 'Offline Functionality',
        },
      },
      uiux: {
        title: 'UI/UX Design',
        desc: 'Beautiful, intuitive interfaces that users love.',
        features: {
          userResearch: 'User Research',
          wireframing: 'Wireframing',
          prototyping: 'Prototyping',
          designSystem: 'Design Systems',
          accessibility: 'Accessibility Standards',
        },
      },
      backend: {
        title: 'Backend Development',
        desc: 'Robust server-side solutions and APIs.',
        features: {
          apiDesign: 'RESTful API Design',
          database: 'Database Architecture',
          authentication: 'Auth & Security',
          security: 'Data Protection',
          scalability: 'Scalable Infrastructure',
        },
      },
      cloud: {
        title: 'Cloud Services',
        desc: 'Deploy and scale with modern cloud infrastructure.',
        features: {
          deployment: 'Cloud Deployment',
          ciCd: 'CI/CD Pipelines',
          monitoring: 'Monitoring & Logging',
          optimization: 'Cost Optimization',
          backup: 'Backup & Recovery',
        },
      },
      consulting: {
        title: 'Tech Consulting',
        desc: 'Expert guidance for your technical decisions.',
        features: {
          planning: 'Architecture Planning',
          updates: 'Tech Stack Advice',
          quality: 'Code Review',
          documentation: 'Technical Docs',
          support: 'Ongoing Support',
        },
      },
      freelance: {
        title: 'Freelance Projects',
        desc: 'End‑to‑end delivery with clear communication, timelines, and documentation.',
        features: {
          planning: 'Project Planning',
          updates: 'Regular Updates',
          quality: 'Quality Assurance',
          documentation: 'Documentation',
          support: 'Post-launch Support',
        },
      }
    },
    projects: {
      title: 'Projects',
      subtitle: 'Recent work and selected case studies',
      completed: 'Completed',
      inProgress: 'In Progress',
      view: 'View',
      code: 'Code',
      viewDetails: 'View Details',
      projectDetails: 'Project Details',
      videoDemo: 'Video Demo',
      imageGallery: 'Image Gallery',
      techStack: 'Tech Stack',
      challenges: 'Challenges',
      solutions: 'Solutions',
      features: 'Features',
      statistics: 'Statistics',
      projectLinks: 'Project Links',
      downloadPDF: 'Download PDF',
      watchOnYoutube: 'Watch on YouTube',
      projectMeta: 'Project Metadata',
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
      home: '',
      about: '',
      //skills: '',
      services: '',
      projects: '',
      education: '',
      contact: '',
    },
    windowTitles: {
      about: '',
     // skills: '',
      services: '',
      projects: '',
      education: '',
      contact: '',
    },
    hero: {
      greet: '',
      name: '',
      tagline: '',
      availability: '',
      badges: {
        primary: '',
        secondary: '',
      },
      ctaPrimary: '',
      ctaSecondary: '',
    },
    about: {
      title: '',
      bio: '',
      email: '',
      phone: '',
      whatsapp: '',
      location: '',
      cta: '',
    },
    services: {
      title: '',
      subtitle: '',
      getQuote: '',
      price: '',
      web: {
        title: '',
        desc: '',
        features: {
          responsive: '',
          modernUI: '',
          performance: '',
          seo: '',
          crossBrowser: '',
        },
      },
      mobile: {
        title: '',
        desc: '',
        features: {
          crossPlatform: '',
          nativePerformance: '',
          appStore: '',
          pushNotifications: '',
          offline: '',
        },
      },
      uiux: {
        title: '',
        desc: '',
        features: {
          userResearch: '',
          wireframing: '',
          prototyping: '',
          designSystem: '',
          accessibility: '',
        },
      },
      backend: {
        title: '',
        desc: '',
        features: {
          apiDesign: '',
          database: '',
          authentication: '',
          security: '',
          scalability: '',
        },
      },
      cloud: {
        title: '',
        desc: '',
        features: {
          deployment: '',
          ciCd: '',
          monitoring: '',
          optimization: '',
          backup: '',
        },
      },
      consulting: {
        title: '',
        desc: '',
        features: {
          planning: '',
          updates: '',
          quality: '',
          documentation: '',
          support: '',
        },
      },
      freelance: {
        title: '',
        desc: '',
        features: {
          planning: '',
          updates: '',
          quality: '',
          documentation: '',
          support: '',
        },
      }
    },
    projects: {
      title: '',
      subtitle: '',
      completed: '',
      inProgress: '',
      view: '',
      code: '',
      viewDetails: '',
      projectDetails: '',
      videoDemo: '',
      imageGallery: '',
      techStack: '',
      challenges: '',
      solutions: '',
      features: '',
      statistics: '',
      projectLinks: '',
      downloadPDF: '',
      watchOnYoutube: '',
      projectMeta: '',
    },
    education: {
      title: '',
      subtitle: '',
      d1: {
        title: '',
        desc: '',
      },
      d2: {
        title: '',
        meta: '',
        desc: '',
      },
    },
    feedback: {
      title: '',
      subtitle: '',
      t1: {
        text: '',
        role: '',
      },
      t2: {
        text: '',
        role: '',
      },
      t3: {
        text: '',
        role: '',
      },
    },
    contact: {
      title: '',
      subtitle: '',
      name: '',
      email: '',
      message: '',
      send: '',
      ph_name: '',
      ph_email: '',
      ph_message: '',
    },
    footer: {
      tag: '',
      links: '',
      follow: '',
      rights: '',
    },
  },
};
