import React, { useState, useRef, useEffect } from "react";
import { useAppStore, THEMES } from "../store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import { FaPalette, FaSun, FaMoon, FaCheck } from "react-icons/fa";

/**
 * Senior Developer Component: ThemeSelector
 * Displays an elegant floating popover showing the 8 primary colorways and a light/dark toggle switch.
 */
export const ThemeSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  
  const themeId = useAppStore((state) => state.themeId);
  const mode = useAppStore((state) => state.mode);
  const setTheme = useAppStore((state) => state.setTheme);
  const toggleMode = useAppStore((state) => state.toggleMode);

  // Close the popover on clicking outside
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
  }, [isOpen]);

  const activeTheme = THEMES[themeId] || THEMES.apricot;

  return (
    <div className="relative" ref={popoverRef}>
      {/* Floating Theme Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 text-xl md:text-2xl bg-white/70 dark:bg-neutral-900/70 border border-sky-100 dark:border-neutral-800 backdrop-blur-md rounded-full shadow-md text-theme-accent hover:scale-105 active:scale-95 transition-all duration-200"
        title="Customize Theme & Colorway"
      >
        <FaPalette />
      </button>

      {/* Popover Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute right-0 mt-3 w-80 bg-white dark:bg-neutral-900 border border-sky-100 dark:border-neutral-800 rounded-3xl p-5 shadow-2xl z-50 backdrop-blur-md"
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-neutral-850 pb-3 mb-4 select-none">
              <span className="font-bold text-sm tracking-wider uppercase text-theme-text opacity-85">
                Colorways
              </span>
              
              {/* Light/Dark Toggle Switch */}
              <button
                onClick={toggleMode}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-sky-50 dark:bg-neutral-850 rounded-full border border-sky-100 dark:border-neutral-800 hover:scale-105 active:scale-95 transition text-xs font-bold text-theme-text"
              >
                {mode === "dark" ? (
                  <>
                    <FaSun className="text-amber-400 text-sm" /> Light Mode
                  </>
                ) : (
                  <>
                    <FaMoon className="text-indigo-500 text-sm" /> Dark Mode
                  </>
                )}
              </button>
            </div>

            {/* Grid of the 8 Colorways */}
            <div className="grid grid-cols-2 gap-3.5">
              {Object.values(THEMES).map((t) => {
                const isActive = t.id === themeId;
                const previewColor = mode === "dark" ? t.dark.accent : t.light.accent;
                const swatchBg = mode === "dark" ? t.dark.bg : t.light.bg;
                const swatchBorder = mode === "dark" ? t.dark.borderColor : t.light.borderColor;
                const swatchText = mode === "dark" ? t.dark.text : t.light.text;

                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    style={{ backgroundColor: swatchBg, borderColor: swatchBorder }}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between h-20 relative group transition-all duration-200 ${
                      isActive 
                        ? "shadow-md ring-2 ring-offset-2 ring-offset-white dark:ring-offset-neutral-900 ring-theme-accent scale-102" 
                        : "hover:scale-[1.02] hover:shadow-sm"
                    }`}
                  >
                    {/* Color dot and active mark */}
                    <div className="flex items-center justify-between w-full">
                      <span 
                        style={{ backgroundColor: previewColor }} 
                        className="w-4 h-4 rounded-full shadow-inner border border-white/20" 
                      />
                      {isActive && (
                        <span className="text-theme-accent animate-fade-in text-xs">
                          <FaCheck />
                        </span>
                      )}
                    </div>
                    
                    {/* Swatch labels */}
                    <div>
                      <p 
                        style={{ color: swatchText }} 
                        className="text-xs font-bold truncate leading-tight select-none"
                      >
                        {t.name}
                      </p>
                      <p 
                        style={{ color: swatchText }} 
                        className="text-3xs opacity-65 truncate select-none leading-none mt-0.5"
                      >
                        {t.description.split(" + ")[0]}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
