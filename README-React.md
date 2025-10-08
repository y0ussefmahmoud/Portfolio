# Y0ussef Mahmoud - React Portfolio

A modern, responsive portfolio website built with **React.js** and **TypeScript** showcasing skills, projects, and experience.

## 🚀 Features

- ⚛️ **React.js + TypeScript** - Modern React development with type safety
- 💅 **Styled Components** - CSS-in-JS with theming support
- 🌓 **Dark/Light Theme** - Automatic system preference detection with manual override
- 🌍 **Bilingual Support** - English and Arabic with RTL support
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ♿ **Accessible** - WCAG compliant with proper ARIA labels
- ⚡ **Performance Optimized** - Fast loading with React optimizations
- 🎨 **Modern Design** - Clean, professional design with smooth animations

## 🛠️ Tech Stack

- **Frontend**: React.js 18, TypeScript
- **Styling**: Styled Components
- **State Management**: React Hooks (useState, useEffect)
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins, Nunito)
- **Build Tool**: Create React App

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header/         # Navigation header
│   ├── Hero/           # Hero section
│   ├── About/          # About section
│   ├── Skills/         # Skills showcase
│   ├── Services/       # Services offered
│   ├── Projects/       # Portfolio projects
│   ├── Education/      # Education background
│   ├── Feedback/       # Client testimonials
│   ├── Contact/        # Contact form
│   ├── Footer/         # Site footer
│   └── BackToTop/      # Back to top button
├── theme/              # Theme configuration
├── i18n/               # Internationalization
├── App.tsx             # Main App component
└── index.tsx           # Entry point
```

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🎨 Customization

### Theme Colors
Edit `src/theme/theme.ts`:
```typescript
export const lightTheme: Theme = {
  colors: {
    primary: '#2f6fed',    // Primary brand color
    accent: '#00d3a7',     // Accent color
    // ... other colors
  }
};
```

### Content & Translations
Update translations in `src/i18n/translations.ts` for both English and Arabic content.

### Components
Each component is self-contained in its own folder with TypeScript interfaces for props.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📈 Performance

- **React Optimizations**: Proper component structure and hooks usage
- **Styled Components**: Efficient CSS-in-JS with theming
- **Image Optimization**: WebP format with proper sizing
- **Code Splitting**: Ready for React.lazy() implementation

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: youssef11mahmoud112002@gmail.com
- **LinkedIn**: [y0ussefmahmoud](https://www.linkedin.com/in/y0ussefmahmoud/)
- **GitHub**: [y0ussefmahmoud](https://github.com/y0ussefmahmoud)

---

Built with ❤️ and ⚛️ by Y0ussef Mahmoud
