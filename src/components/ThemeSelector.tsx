import React, { useState, useRef, useEffect } from "react";
import { useAppStore, THEMES } from "../store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import { FaPalette, FaSun, FaMoon, FaTimes } from "react-icons/fa";

interface ThemeSelectorProps {
  layoutId?: string;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ layoutId = "theme-selector-container" }) => {
  const isOpen = useAppStore((state) => state.themeCustomizeOpen);
  const setIsOpen = useAppStore((state) => state.setThemeCustomizeOpen);
  const [hoveredThemeId, setHoveredThemeId] = useState<string | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  
  const { themeId, mode, setTheme, toggleMode } = useAppStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div className="relative pointer-events-auto" ref={popoverRef}>
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            key="collapsed-button"
            layoutId={layoutId}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-5 py-3 bg-theme-accent/10 hover:bg-theme-accent/20 border border-theme-accent/20 backdrop-blur-md rounded-full shadow-md text-theme-accent hover:scale-105 active:scale-95 transition-colors duration-150 font-bold text-sm tracking-wide select-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 550, damping: 36 }}
          >
            <FaPalette className="text-base text-theme-accent" />
            <span className="text-theme-accent">Customize</span>
          </motion.button>
        ) : (
          <motion.div
            key="expanded-bar"
            layoutId={layoutId}
            className="flex items-center gap-3.5 px-4 py-2 bg-theme-card/95 border border-theme-border backdrop-blur-xl rounded-full shadow-2xl z-50 max-w-full overflow-x-auto scrollbar-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 550, damping: 36 }}
          >
            <div className="flex items-center gap-2">
              {Object.values(THEMES).map((t) => {
                const isActive = t.id === themeId;
                const isHovered = hoveredThemeId === t.id;
                
                const previewColor = mode === "dark" ? t.dark.accent : t.light.accent;
                const swatchBg = mode === "dark" ? t.dark.bg : t.light.bg;
                const swatchText = mode === "dark" ? t.dark.text : t.light.text;
                const swatchBorder = mode === "dark" ? t.dark.borderColor : t.light.borderColor;

                const isExpanded = isHovered || isActive;

                return (
                  <button
                    key={t.id}
                    onMouseEnter={() => setHoveredThemeId(t.id)}
                    onMouseLeave={() => setHoveredThemeId(null)}
                    onClick={() => setTheme(t.id)}
                    style={{ 
                      backgroundColor: isActive ? previewColor : swatchBg, 
                      borderColor: isActive ? "transparent" : swatchBorder,
                      color: isActive ? "#FFFFFF" : swatchText,
                    }}
                    className={`h-8 border flex items-center rounded-full transition-all duration-200 ease-in-out relative overflow-hidden ${
                      isActive 
                        ? "shadow-sm" 
                        : "hover:scale-[1.03]"
                    } ${isExpanded ? "w-auto max-w-[135px] px-2.5 gap-1.5 justify-start" : "w-8 max-w-[32px] justify-center"}`}
                    title={t.name}
                  >
                    <span 
                      style={{ backgroundColor: isActive ? "#FFFFFF" : previewColor }} 
                      className="w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-inner transition-colors duration-200"
                    />
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.1 }}
                          className="text-[10px] font-extrabold uppercase tracking-widest select-none truncate leading-none pr-0.5"
                        >
                          {t.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>

            <span className="w-px h-5 bg-theme-border" />

            <button
              onClick={toggleMode}
              className="p-2 bg-theme-bg/60 hover:bg-theme-accent/10 border border-theme-border text-theme-text rounded-full transition flex-shrink-0"
              title={mode === "dark" ? "Light Mode" : "Dark Mode"}
            >
              {mode === "dark" ? (
                <FaSun className="text-amber-400 text-xs" />
              ) : (
                <FaMoon className="text-indigo-400 text-xs" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-red-500/10 dark:hover:bg-red-500/20 text-red-500 rounded-full transition flex-shrink-0"
              title="Close Panel"
            >
              <FaTimes className="text-xs" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
