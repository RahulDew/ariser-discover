import React, { useState, useEffect } from "react";
import { createRoute, useRouter, Link } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";
import { useAppStore, THEMES } from "../store/useAppStore";
import { FaSearch, FaHistory, FaTrashAlt, FaTimes, FaGlobe, FaPalette } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Brand } from "../components/Brand";
import Footer from "../components/Footer";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomeComponent,
});

function HomeComponent() {
  const router = useRouter();
  const { searchHistory, clearHistory, removeFromHistory, themeId, mode } = useAppStore();
  const [localSearch, setLocalSearch] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrapeMode, setScrapeMode] = useState(false);

  useEffect(() => {
    document.title = "Ariser Discover - Search softly";
  }, []);

  const isValidUrl = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return true;
    return (trimmed.startsWith("http://") || trimmed.startsWith("https://")) ||
      (!trimmed.includes(" ") && trimmed.includes(".") && trimmed.length > 4);
  };

  const isValidationError = scrapeMode && localSearch.trim().length > 0 && !isValidUrl(localSearch);

  useEffect(() => {
    if (!localSearch.trim()) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(localSearch)}`);
        const data = await res.json();
        setSuggestions(data[1] || []);
      } catch (e) {
        console.error("Autocomplete failed:", e);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [localSearch]);

  const activeTheme = THEMES[themeId] || THEMES.apricot;
  const currentAccentHover = mode === "dark" ? activeTheme.dark.accentHover : activeTheme.light.accentHover;

  const handleSearchSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     if (!localSearch.trim()) return;
     setShowDropdown(false);
     if (document.activeElement instanceof HTMLElement) {
       document.activeElement.blur();
     }
     executeSearch(localSearch.trim());
   };

  const executeSearch = (query: string) => {
    router.navigate({
      to: "/search",
      search: {
        q: query,
        type: "search",
        scrape: scrapeMode,
      },
    });
  };

  const getHistoryMeta = (query: string, index: number) => {
    const times = ["2 min ago", "45 min ago", "2 hours ago", "1 day ago", "3 days ago"];
    const results = ["12.4M results", "4.2M results", "28.1M results", "840K results", "1.5M results"];
    const time = times[index % times.length];
    const count = results[index % results.length];
    return `${time} · web · ${count}`;
  };

  const suggestionChips = [
    "kyoto in spring",
    "matcha latte",
    "sourdough starter",
    "cabin in catskills",
    "film photography",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.01,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 450, damping: 32 },
    },
  };

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col justify-center items-center relative bg-theme-bg transition-colors duration-300">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -16, 12, 0],
            scale: [1, 1.06, 0.97, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: "mirror" as const,
            ease: "easeInOut",
          }}
          style={{ backgroundColor: currentAccentHover, opacity: 0.25 }}
          className="absolute top-[-4%] left-[-4%] w-[28vw] h-[28vw] rounded-full blur-[65px] pointer-events-none select-none transition-colors duration-300 z-0 transform-gpu"
        />
        <motion.div
          animate={{
            x: [0, -15, 20, 0],
            y: [0, 12, -16, 0],
            scale: [1, 0.97, 1.03, 1],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            repeatType: "mirror" as const,
            ease: "easeInOut",
          }}
          style={{ backgroundColor: currentAccentHover, opacity: 0.18 }}
          className="absolute bottom-[-4%] right-[-4%] w-[24vw] h-[24vw] rounded-full blur-[55px] pointer-events-none select-none transition-colors duration-300 z-0 transform-gpu"
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center text-center w-full px-4 pb-16 md:pb-0 z-10"
      >
        <motion.div variants={itemVariants} className="mb-3 flex items-start justify-start gap-3 relative">
          <Brand size="xl" className="drop-shadow-[0_4px_16px_rgba(var(--color-accent),0.15)] hidden md:inline-block" />
          <Brand size="lg" className="drop-shadow-[0_4px_16px_rgba(var(--color-accent),0.15)] md:hidden" />
        </motion.div>

        <motion.p 
          variants={itemVariants}
          className="font-serif-lumen italic text-theme-text opacity-70 text-base md:text-lg mb-8 select-none"
        >
          Discover the web, softly.
        </motion.p>
        
        <motion.form 
          variants={itemVariants}
          className="w-full max-w-xl mb-4 md:mb-6" 
          onSubmit={handleSearchSubmit}
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-theme-accent rounded-full blur opacity-10 group-hover:opacity-20 group-focus-within:opacity-30 transition duration-300" />
            
            <div className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-theme-text opacity-40 select-none pointer-events-none">
              <FaSearch className="text-xs md:text-base" />
            </div>

            <input
              type="text"
              placeholder={scrapeMode ? "Enter URL to scrape..." : "Search the web"}
              className={`relative w-full py-2.5 pl-10 pr-[100px] md:py-4 md:pl-12 md:pr-[120px] rounded-full border bg-theme-input text-theme-text shadow-lg outline-none transition-all duration-300 text-sm md:text-lg font-medium ${
                isValidationError 
                  ? "border-red-500/60 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]" 
                  : "border-theme-border focus:border-theme-accent focus:shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
              }`}
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              autoFocus
            />

            <button 
              type="submit" 
              disabled={isValidationError}
              className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 px-3.5 py-1.5 md:px-5 md:py-2 bg-theme-accent hover:bg-theme-accent-hover text-white font-extrabold rounded-full hover:scale-103 active:scale-97 shadow-sm transition-all duration-200 text-xs md:text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100 flex items-center gap-1 md:gap-1.5"
            >
              <FaSearch className="text-[10px] md:text-xs" />
              <span>Search</span>
            </button>

            <AnimatePresence>
              {showDropdown && suggestions.length > 0 && !isValidationError && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 550, damping: 36 }}
                  className="absolute top-[110%] left-0 right-0 border border-theme-border bg-theme-card/95 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-lg z-50 overflow-hidden py-1.5 md:py-2.5 select-none origin-top"
                >
                  {suggestions.slice(0, 7).map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setLocalSearch(item);
                        setShowDropdown(false);
                        executeSearch(item);
                      }}
                      className="w-full text-left px-4 md:px-6 py-2 md:py-2.5 hover:bg-theme-accent/10 hover:text-theme-accent text-xs md:text-sm text-theme-text font-bold transition-colors duration-150 flex items-center gap-2.5 md:gap-3.5"
                    >
                      <FaSearch className="text-[9px] md:text-[10px] opacity-40 text-theme-accent" />
                      <span>{item}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {isValidationError && (
            <div className="text-red-500 text-xs font-bold mt-2 pl-4 text-left select-none">
              ⚠️ Please enter a valid URL (e.g., https://example.com) to use the scraper.
            </div>
          )}
        </motion.form>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-2 md:gap-3 mb-6 md:mb-8 select-none"
        >
          <div className="flex p-0.5 md:p-1 bg-theme-card/60 backdrop-blur-md border border-theme-border rounded-full shadow-md relative">
            <button
              type="button"
              onClick={() => setScrapeMode(false)}
              className={`flex items-center gap-1.5 md:gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-extrabold transition-all relative duration-150 z-10 ${
                !scrapeMode ? "text-white" : "text-theme-text opacity-70 hover:opacity-100"
              }`}
            >
              {!scrapeMode && (
                <motion.div
                  layoutId="activeHomeTab"
                  transition={{ type: "spring", stiffness: 550, damping: 36 }}
                  className="absolute inset-0 bg-theme-accent rounded-full -z-10 shadow-sm"
                />
              )}
              <FaSearch className="text-[10px] md:text-xs" />
              <span>
                <span className="hidden md:inline">Standard Search</span>
                <span className="inline md:hidden">Search</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setScrapeMode(true)}
              className={`flex items-center gap-1.5 md:gap-2 px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-extrabold transition-all relative duration-150 z-10 ${
                scrapeMode ? "text-white" : "text-theme-text opacity-70 hover:opacity-100"
              }`}
            >
              {scrapeMode && (
                <motion.div
                  layoutId="activeHomeTab"
                  transition={{ type: "spring", stiffness: 550, damping: 36 }}
                  className="absolute inset-0 bg-theme-accent rounded-full -z-10 shadow-sm"
                />
              )}
              <FaGlobe className="text-[10px] md:text-xs" />
              <span>
                <span className="hidden md:inline">Deep Reader Scraper</span>
                <span className="inline md:hidden">Scrape</span>
              </span>
            </button>
          </div>

          <p className="text-[10px] md:text-xs text-theme-text/50 font-medium h-4 transition-all duration-300">
            {scrapeMode 
              ? "Deep Web Scraper — Fetch, extract clean text & metadata." 
              : "Search the web — All, Images, Videos & News."}
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center gap-2 md:gap-2.5 mb-6 md:mb-8 select-none"
        >
          <span className="text-3xs uppercase tracking-widest font-extrabold text-theme-text opacity-50">
            TRY
          </span>
          <div className="flex flex-wrap gap-1.5 md:gap-2 justify-center max-w-xl">
            {suggestionChips.map((chip, index) => (
              <button
                key={index}
                onClick={() => executeSearch(chip)}
                className="px-3 py-1 md:px-4 md:py-1.5 bg-theme-card/40 hover:bg-theme-accent/15 border border-theme-border hover:border-theme-accent text-theme-text hover:text-theme-accent rounded-full text-[10px] md:text-xs font-semibold shadow-2xs transition-all duration-150 hover:scale-102 active:scale-98"
              >
                {chip}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {searchHistory.length > 0 && (
            <motion.div 
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-theme-card/40 border border-theme-border backdrop-blur-md rounded-2xl p-3 md:p-4 shadow-sm mb-6 md:mb-8"
            >
              <div className="flex items-center justify-between text-[9px] md:text-[10px] font-extrabold uppercase tracking-widest text-theme-text opacity-45 mb-2.5 md:mb-3 px-1 select-none">
                <span className="flex items-center gap-1.5"><FaHistory className="text-theme-accent" /> RECENT</span>
                <button 
                  onClick={clearHistory}
                  className="text-red-500/70 hover:text-red-500 transition font-bold text-[9px] md:text-[10px]"
                  title="Clear All History"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-col gap-1 max-h-[220px] overflow-y-auto pr-1 scrollbar-none">
                {searchHistory.map((query, index) => (
                  <motion.div
                    key={query}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-start justify-between group/row px-2.5 py-2 md:px-3.5 md:py-2.5 hover:bg-theme-accent/5 dark:hover:bg-theme-accent/10 rounded-lg md:rounded-xl transition duration-200 cursor-pointer"
                    onClick={() => executeSearch(query)}
                  >
                    <div className="flex items-start gap-2.5 md:gap-3 truncate">
                      <FaHistory className="text-theme-text/30 group-hover/row:text-theme-accent transition-colors mt-0.5 md:mt-1 flex-shrink-0 text-xs md:text-sm" />
                      <div className="flex flex-col truncate text-left">
                        <span className="text-xs md:text-sm font-bold text-theme-text group-hover/row:text-theme-accent truncate">
                          {query}
                        </span>
                        <span className="text-[9px] md:text-[10px] font-semibold text-theme-text/40 group-hover/row:text-theme-accent/65">
                          {getHistoryMeta(query, index)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromHistory(query);
                      }}
                      className="opacity-0 group-hover/row:opacity-100 p-1 text-theme-text/40 hover:text-red-500 hover:bg-red-500/10 dark:hover:bg-red-500/20 rounded-full transition-all duration-200 self-center text-[10px] md:text-xs"
                      title="Remove item"
                    >
                      <FaTimes />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-40 flex justify-center w-full max-w-[95vw] md:hidden px-4">
        <Link
          to="/customize"
          className="flex items-center gap-2.5 px-5 py-3 bg-theme-accent/15 hover:bg-theme-accent/25 border border-theme-accent/25 backdrop-blur-md rounded-full shadow-md text-theme-accent hover:scale-105 active:scale-95 transition-all duration-200 font-bold text-sm tracking-wide select-none"
        >
          <FaPalette className="text-base text-theme-accent" />
          <span className="text-theme-accent">Customize</span>
        </Link>
      </div>

      <Footer className="absolute bottom-0 left-0 right-0 z-30" />
    </div>
  );
}
