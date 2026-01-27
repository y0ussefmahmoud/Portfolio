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
  | "skills"
  | "services"
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
      { id: "skills", label: translations.nav.skills, Icon: Code },
      { id: "services", label: translations.nav.services, Icon: Briefcase },
      { id: "projects", label: translations.nav.projects, Icon: Briefcase },
      { id: "education", label: translations.nav.education, Icon: GraduationCap },
      { id: "contact", label: translations.nav.contact, Icon: Mail },
    ];

  const flag = language === "en" ? "🇬🇧" : "🇸🇦";

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
                  <Icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
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
          <button
            type="button"
            onClick={toggleTheme}
            className="relative flex items-center justify-center rounded-full transition-colors h-10 w-10 sm:h-11 sm:w-11 text-muted-foreground hover:text-foreground hover:bg-white/5"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <motion.span whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
              {isDarkMode ? (
                <Moon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
              ) : (
                <Sun className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
              )}
            </motion.span>
          </button>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={toggleLanguage}
            className="relative flex items-center justify-center rounded-full transition-colors h-10 w-10 sm:h-11 sm:w-11 text-muted-foreground hover:text-foreground hover:bg-white/5"
            aria-label={language === "en" ? "Switch to Arabic" : "Switch to English"}
          >
            <span className="flex items-center gap-1">
              <Globe className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
              <span className="hidden sm:inline text-xs">{flag}</span>
            </span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
