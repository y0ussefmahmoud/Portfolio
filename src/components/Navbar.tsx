import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Code,
  Globe,
  GraduationCap,
  Home,
  Mail,
  Moon,
  Sun,
  User,
} from "lucide-react";
import React from "react";
import { Translations } from "../i18n/translations";

type TabId =
  | "home"
  | "about"
  | /*"skills"
  |*/ "services"
  | "projects"
  | "education"
  | "contact";

interface NavbarProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  language: "en" | "ar";
  toggleLanguage: () => void;
  translations: Translations;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  isDarkMode,
  toggleTheme,
  language,
  toggleLanguage,
  translations,
}: NavbarProps) {
  const [hoveredTab, setHoveredTab] = React.useState<TabId | null>(null);

  const navItems: Array<{ id: TabId; label: string; Icon: React.ComponentType<any> }> =
    [
      { id: "home", label: translations.nav.home, Icon: Home },
      { id: "about", label: translations.nav.about, Icon: User },
      //{ id: "skills", label: translations.nav.skills, Icon: Code },
      { id: "services", label: translations.nav.services, Icon: Briefcase },
      { id: "projects", label: translations.nav.projects, Icon: Briefcase },
      { id: "education", label: translations.nav.education, Icon: GraduationCap },
      { id: "contact", label: translations.nav.contact, Icon: Mail },
    ];

  const flag = language === "en" ? "🇬🇧" : "🇸🇦";
  
  const themeIcon = isDarkMode ? Moon : Sun;
  const themeLabel = isDarkMode ? "Light Mode" : "Dark Mode";
  const languageLabel = language === "en" ? "العربية" : "English";

  return (
    <motion.nav
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
      aria-label="Primary"
    >
      <div className="flex items-center gap-1.5 bg-background/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl px-2 py-2">
        {navItems.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;
          const showTooltip = hoveredTab === id || isActive;

          return (
            <div key={id} className="relative">
              <button
                type="button"
                onClick={() => setActiveTab(id)}
                onMouseEnter={() => setHoveredTab(id)}
                onMouseLeave={() => setHoveredTab(null)}
                onFocus={() => setHoveredTab(id)}
                onBlur={() => setHoveredTab(null)}
                className={[
                  "relative flex items-center justify-center rounded-full transition-colors",
                  "h-10 w-10 sm:h-11 sm:w-11",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
                aria-label={label}
              >
                {isActive ? (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-primary/10"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                ) : null}

                <motion.span
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative z-10"
                >
                  <Icon className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
                </motion.span>
              </button>

              <AnimatePresence>
                {showTooltip ? (
                  <motion.div
                    key="tooltip"
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-9"
                  >
                    <div className="px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-xl border border-white/10 shadow-lg">
                      <span className="text-xs text-foreground/90 whitespace-nowrap">
                        {label}
                      </span>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}

        <div className="h-6 w-px bg-white/10 mx-1" />

        <div className="relative">
          <motion.button
            type="button"
            onClick={toggleTheme}
            className="relative flex items-center justify-center rounded-full transition-all duration-300 h-10 w-10 sm:h-11 sm:w-11 text-muted-foreground hover:text-foreground hover:bg-white/5 group overflow-hidden"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            whileHover={{ scale: 1.08, rotate: isDarkMode ? 180 : 0 }}
            whileTap={{ scale: 0.96 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <motion.span 
              className="relative z-10"
              initial={{ rotate: 0 }}
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.div
                key={isDarkMode ? "moon" : "sun"}
                initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {React.createElement(themeIcon, { className: "h-5 w-5 sm:h-5.5 sm:w-5.5" })}
              </motion.div>
            </motion.span>
          </motion.button>
        </div>

        <div className="relative">
          <motion.button
            type="button"
            onClick={toggleLanguage}
            className="relative flex items-center justify-center rounded-full transition-all duration-300 h-10 w-10 sm:h-11 sm:w-11 text-muted-foreground hover:text-foreground hover:bg-white/5 group overflow-hidden"
            aria-label={language === "en" ? "Switch to Arabic" : "Switch to English"}
            whileHover={{ scale: 1.08, rotate: language === "en" ? 360 : 0 }}
            whileTap={{ scale: 0.96 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <motion.div className="flex items-center gap-1 relative z-10">
              <motion.div
                key={language}
                initial={{ rotate: -180 }}
                animate={{ rotate: language === "en" ? 360 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Globe className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
              </motion.div>
              <motion.span
                key="flag"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="hidden sm:inline text-xs font-medium"
              >
                {flag}
              </motion.span>
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
