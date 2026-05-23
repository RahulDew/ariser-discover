import React, { useState, useRef, useEffect } from "react";
import { useAppStore, THEMES } from "../store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import { FaPalette, FaSun, FaMoon, FaTimes } from "react-icons/fa";

/**
 * Senior Developer Component: ThemeSelector
 * Displays an elegant floating pill theme button in the center-bottom of the page.
 * When clicked, it morphs dynamically into a sleek color selection bar.
 * When hovering over a color swatch, it expands horizontally to show the colorway name.
 */
export const ThemeSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredThemeId, setHoveredThemeId] = useState<string | null>(null);
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

  return (
    <div className="relative pointer-events-auto" ref={popoverRef}>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Floating Pill Theme Button */
          <motion.button
            key="collapsed-button"
            layoutId="theme-selector-container"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-5 py-3 bg-white/85 dark:bg-neutral-900/85 border border-sky-100/30 dark:border-neutral-800/40 backdrop-blur-md rounded-full shadow-lg text-theme-accent hover:scale-105 active:scale-95 transition-colors duration-200 font-bold text-sm tracking-wide select-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <FaPalette className="text-base" />
            <span>Customize</span>
          </motion.button>
        ) : (
          /* Expanded Sleek Theme Selection Bar */
          <motion.div
            key="expanded-bar"
            layoutId="theme-selector-container"
            className="flex items-center gap-3.5 px-4 py-2 bg-white/95 dark:bg-neutral-950/95 border border-sky-100/30 dark:border-neutral-850 backdrop-blur-xl rounded-full shadow-2xl z-50 max-w-full overflow-x-auto scrollbar-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {/* Color swatches row - standard flex container with CSS width transitions */}
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
                    className={`h-8 border flex items-center rounded-full transition-all duration-200 ease-in-out relative ${
                      isActive 
                        ? "shadow-sm" 
                        : "hover:scale-[1.03]"
                    } ${isExpanded ? "w-28 px-2.5 gap-1.5 justify-start" : "w-8 justify-center"}`}
                    title={t.name}
                  >
                    {/* Circle Color Accent Indicator */}
                    <span 
                      style={{ backgroundColor: isActive ? "#FFFFFF" : previewColor }} 
                      className="w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-inner transition-colors duration-200"
                    />
                    
                    {/* Color Name revealed on hover/active - simple opacity transition, no width stretch */}
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

            {/* Small divider */}
            <span className="w-px h-5 bg-gray-200/60 dark:bg-neutral-800/60" />

            {/* Mode switch button */}
            <button
              onClick={toggleMode}
              className="p-2 bg-sky-50/50 dark:bg-neutral-900 hover:bg-sky-100/60 dark:hover:bg-neutral-800 border border-sky-100/30 dark:border-neutral-800 text-theme-text rounded-full transition flex-shrink-0"
              title={mode === "dark" ? "Light Mode" : "Dark Mode"}
            >
              {mode === "dark" ? (
                <FaSun className="text-amber-400 text-xs" />
              ) : (
                <FaMoon className="text-indigo-400 text-xs" />
              )}
            </button>

            {/* Collapse / Close Button */}
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
