# 🌐 Y0ussef.com - Business Website

**م / يوسف محمود عبد الجواد**  
**Eng. / Youssef Mahmoud Abdelgawad**

A modern, high-performance, and responsive **business website** (not just a portfolio) built with **React.js**, **TypeScript**, **Vite 6**, and **Tailwind CSS 4**.

**Live Site**: [https://y0ussef.com](https://y0ussef.com) 🚀

**Developed by**: Youssef Mahmoud Abdelgawad (يوسف محمود عبد الجواد)  
**Role**: Software Engineer & Full-Stack Developer
**Company**: Y0ussef Software Solutions

## What's New in V3.0.7

- **Author Attribution**: Added comprehensive author documentation (م / يوسف محمود عبد الجواد) across all source files
- **Business Website Branding**: Clarified that this is y0ussef.com business website, not just a portfolio
- **Digital CV Updated**: Personal information in CV modal now displays correct contact details (Y0ussef Mahmoud, y0@gmail.com, +20 1129334173)
- **README v3.0.7**: Updated documentation with author credits and business website branding
- **TypeScript Fixes**: Fixed setTimeout type issues in Navbar component

## What's New in V3.0.6

- **Services Section Added**: New comprehensive Services section with 6 service cards (Web Development, Mobile Apps, UI/UX Design, Backend Development, Cloud Services, Tech Consulting)
- **Hero Section Redesigned**: Replicated hero design and animations from revil project with handwriting SVG animations using Anime.js
- **Projects Section Reordered**: Projects section now appears immediately after Hero section for better content flow
- **New Navigation Order**: Home → Projects → Services → Stack (optimized for user experience)
- **Responsive Design Improvements**: Added extra small mobile breakpoint (320px) with optimized font sizes and spacing
- **Services Translations**: Added complete translations for services section in both English and Arabic
- **Project Link Updated**: Updated Abdulaziz Alablam project link to new domain (https://alablam.org/)
- **Security Headers**: Added CSP, HSTS, and security headers in .htaccess for Hostinger deployment
- **Custom Hooks**: Refactored App.tsx with useNavigation and useModal hooks for better code organization
- **Type Safety**: Maintained 100% TypeScript coverage with zero lint errors

## What's New in V2.5.0

- **Contact WhatsApp Integration**: Replaced phone contact with WhatsApp integration using official WhatsApp icon and API
- **Hero Social Media Updates**: Replaced Twitter with Facebook, added WhatsApp to social media links
- **Services WhatsApp Integration**: Changed Get Quote button to open WhatsApp instead of email
- **Get Quote Translation**: Added Arabic translation for Get Quote button ("احصل على عرض سعر")
- **Services Features Translation**: Translated all service features to Arabic (responsive design, UI/UX, performance, SEO, etc.)
- **Services Button Centering**: Centered Get Quote button in service cards for better visual balance
- **Projects Buttons Layout**: Made project action buttons side-by-side on all screen sizes with responsive text sizing
- **Responsive Improvements**: Added text-xs sm:text-sm for better readability on small devices

## What's New in V2.4.1

- **Version Update**: Updated to version 2.4.1 with latest dependencies
- **Performance Optimizations**: Enhanced scroll behavior and navigation experience
- **Accessibility Improvements**: Added comprehensive ARIA labels for screen readers
- **SEO Enhancements**: Implemented robots.txt and sitemap.xml for better search indexing
- **Visual Polish**: Improved header with glass-morphism backdrop filter effect
- **Code Quality**: Maintained TypeScript-only codebase with optimized structure

## What's New in V2.4.0

- **Project Images Updated**: Added proper images for in-progress projects including sa3rk, Y0-ModStation, Y0 WArchive App, Dubai Key, and Y0 Ai Assistant.
- **Project Details Enhanced**: Updated project metadata with correct image paths and improved project identification.
- **Visual Improvements**: Better project presentation with actual screenshots instead of placeholder images.
- **Code Quality**: Maintained TypeScript-only codebase with optimized package structure from V2.3.6.

## Features

- **React.js 18 + TypeScript**: Built with the latest industry standards.
- **Tailwind CSS 4**: Modern styling with zero-runtime CSS variables.
- **Fully Responsive**: Optimized for mobile, tablet, and desktop with extra small breakpoint (320px).
- **Dark/Light Theme**: Automatic and manual theme switching.
- **Multi-language**: Seamless English and Arabic (RTL) support with complete translations.
- **SEO Optimized**: Complete meta tags, JSON-LD schema, `robots.txt`, and `sitemap.xml`.
- **Accessible**: WCAG 2.1 compliant with proper ARIA labels and skip links.
- **Section Navigation**: Scroll-based and keyboard navigation between sections.
- **Custom Hooks**: useNavigation and useModal for reusable logic.
- **Security Hardened**: CSP, HSTS, and security headers configured.
- **Anime.js Animations**: Handwriting SVG animations and entrance effects.
- **Error Boundaries**: Graceful error handling with fallback UI.

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Page Transitions & Animations
- **Anime.js** - Handwriting SVG Animations
- **Lucide React** - Iconography
- **Radix UI** - Accessible Components

### Build & Tools
- **Vite 6** - Next Generation Frontend Tooling
- **npm** - Package Management
- **GitHub Actions** - CI/CD for Deployment
- **Vitest** - Unit Testing
- **Sentry** - Error Tracking & Monitoring

## 📥 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Y0ussefMahmoud/Portfolio.git

# Navigate to project directory
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Available Scripts

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
npm run test          # Run unit tests
npm run test:ui       # Run tests with UI
npm run test:run      # Run tests once
npm run deploy        # Deploy to GitHub Pages
```

## 🚀 Deployment

### GitHub Pages (Automated)
The project is configured with **GitHub Actions**. Every push to the `main` branch automatically builds and deploys the site to:
**[https://y0ussefmahmoud.github.io/Portfolio/](https://y0ussefmahmoud.github.io/Portfolio/)**

### Hostinger (Recommended for Custom Domain)
Configured with `.htaccess` for SPA routing and security headers:
1. Build the project: `npm run build`
2. Upload `dist/` contents to Hostinger public_html
3. Domain: https://y0ussef.com

### Manual Deployment
```bash
npm run build
npm run deploy
```

## 📂 Project Structure

```
Portfolio/
├── public/              # Static assets (images, icons, robots.txt, .htaccess)
├── src/
│   ├── components/      # Atomic React components
│   │   ├── HeroY0.tsx      # Hero section with handwriting animations
│   │   ├── ProjectsY0.tsx  # Projects gallery
│   │   ├── ServicesY0.tsx  # Services section (6 cards)
│   │   ├── Stack.tsx       # Tech stack display
│   │   ├── Navbar.tsx      # Navigation with section buttons
│   │   └── ...
│   ├── contexts/      # React contexts (LanguageContext)
│   ├── data/          # Content and configuration data
│   ├── hooks/         # Custom React hooks
│   │   ├── useNavigation.ts  # Section navigation logic
│   │   ├── useModal.ts       # Modal state management
│   │   └── useIntersectionObserver.ts
│   ├── i18n/          # Translation files (EN/AR)
│   ├── types/         # TypeScript interfaces and types
│   ├── App.tsx        # Main application logic & modal system
│   └── main.tsx       # Application entry point
├── index.html         # HTML Entry & Meta Tags
├── package.json       # Project dependencies & scripts
├── vite.config.ts     # Vite configuration
└── tsconfig.json      # TypeScript configuration
```

## �‍💻 About the Developer

**Youssef Mahmoud Abdelgawad** (يوسف محمود عبد الجواد)

- **Position**: Software Engineer & Full-Stack Developer
- **Website**: [https://y0ussef.com](https://y0ussef.com)
- **Email**: [y0@gmail.com](mailto:y0@gmail.com)
- **Phone**: +20 1129334173
- **LinkedIn**: [Y0ussef Mahmoud](https://linkedin.com/in/y0ussefmahmoud)
- **GitHub**: [Y0ussefMahmoud](https://github.com/Y0ussefMahmoud)

**This website was designed and developed entirely by Eng. Youssef Mahmoud Abdelgawad.**

---

## 📞 Contact

- **Email**: [y0@gmail.com](mailto:y0@gmail.com)
- **LinkedIn**: [Y0ussef Mahmoud](https://linkedin.com/in/y0ussefmahmoud)
- **GitHub**: [Y0ussefMahmoud](https://github.com/Y0ussefMahmoud)

---

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

**Version 3.0.7** | Built with ❤️ by **Youssef Mahmoud Abdelgawad** (يوسف محمود عبد الجواد)  
**All rights reserved © 2024-2025** | **Business Website**: [y0ussef.com](https://y0ussef.com)
