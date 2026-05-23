import React, { useState } from "react";
import { createRoute, useRouter } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";
import { useAppStore } from "../store/useAppStore";
import { FaSearch, FaHistory, FaTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Brand } from "../components/Brand";
import { ThemeSelector } from "../components/ThemeSelector";
import Footer from "../components/Footer";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomeComponent,
});

function HomeComponent() {
  const router = useRouter();
  const searchHistory = useAppStore((state) => state.searchHistory);
  const clearHistory = useAppStore((state) => state.clearHistory);
  const [localSearch, setLocalSearch] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localSearch.trim()) return;
    executeSearch(localSearch.trim());
  };

  const executeSearch = (query: string) => {
    router.navigate({
      to: "/search",
      search: {
        q: query,
        type: "search", // Default to 'search' (All) tab
      },
    });
  };

  // Suggestion chips from the "TRY" section of Page 3 of the PDF
  const suggestionChips = [
    "kyoto in spring",
    "matcha latte",
    "sourdough starter",
    "cabin in catskills",
    "film photography",
  ];

  // Framer Motion spring-based animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative overflow-hidden bg-theme-bg transition-colors duration-300">
      
      {/* Premium Spotlights mapping active theme accent */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-theme-accent/5 blur-[120px] pointer-events-none select-none transition-colors duration-300" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-theme-text/3 blur-[100px] pointer-events-none select-none transition-colors duration-300" />

      {/* Sticky Header Nav */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center px-6 md:px-14 py-5 z-10"
      >
        <span className="select-none pointer-events-none opacity-0">Lumen</span>
        
        {/* Floating popover theme selector */}
        <ThemeSelector />
      </motion.nav>

      {/* Main Brand Centered Panel */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center text-center w-full px-4 z-10 -mt-10 flex-grow"
      >
        {/* Centered Serif Brand Logo Lumen */}
        <motion.div variants={itemVariants} className="mb-3">
          <Brand size="xl" className="drop-shadow-[0_4px_16px_rgba(var(--color-accent),0.15)]" />
        </motion.div>

        {/* Elegant Serif Subtitle matching the PDF */}
        <motion.p 
          variants={itemVariants}
          className="font-serif-lumen italic text-theme-text opacity-70 text-base md:text-lg mb-8 select-none"
        >
          Search, softly.
        </motion.p>

        {/* Search Input Box */}
        <motion.form 
          variants={itemVariants}
          className="w-full max-w-xl mb-6" 
          onSubmit={handleSearchSubmit}
        >
          <div className="relative group">
            {/* Ambient accent ring glow */}
            <div className="absolute -inset-0.5 bg-theme-accent rounded-full blur opacity-10 group-hover:opacity-20 group-focus-within:opacity-30 transition duration-300" />
            
            <input
              type="text"
              placeholder="Search the warm side of the web..."
              className="relative w-full py-4 pl-6 pr-32 rounded-full border border-theme-border bg-theme-input text-theme-text shadow-lg outline-none focus:border-theme-accent focus:shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300 text-lg font-medium"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              autoFocus
            />
            
            {/* Rounded filled Search Button matching the accent colorway exactly */}
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-theme-accent hover:bg-theme-accent-hover text-theme-bg font-bold rounded-full hover:scale-103 active:scale-97 shadow-sm transition-all duration-200 text-sm"
            >
              Search
            </button>
          </div>
        </motion.form>

        {/* Suggestion "TRY" chips panel from Page 3 of the PDF */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center gap-2.5 mb-8 select-none"
        >
          <span className="text-3xs uppercase tracking-widest font-bold text-theme-text opacity-50">
            Try
          </span>
          <div className="flex flex-wrap gap-2 justify-center max-w-xl">
            {suggestionChips.map((chip, index) => (
              <button
                key={index}
                onClick={() => executeSearch(chip)}
                className="px-4 py-1.5 bg-theme-card/40 hover:bg-theme-accent/15 border border-theme-border hover:border-theme-accent text-theme-text hover:text-theme-accent rounded-full text-xs font-semibold shadow-2xs transition-all duration-200"
              >
                {chip}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Persistent Search History Panel */}
        <AnimatePresence>
          {searchHistory.length > 0 && (
            <motion.div 
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-theme-card/45 border border-theme-border backdrop-blur-md rounded-2xl p-5 shadow-sm mb-8"
            >
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-theme-text opacity-70 mb-3 select-none">
                <span className="flex items-center gap-1.5"><FaHistory /> Recent Searches</span>
                <button 
                  onClick={clearHistory}
                  className="flex items-center gap-1 text-red-500 hover:opacity-85 transition duration-150"
                  title="Clear History"
                >
                  <FaTrashAlt /> Clear
                </button>
              </div>
              <div className="flex flex-wrap gap-2 justify-center max-h-[120px] overflow-y-auto scrollbar-none">
                {searchHistory.map((query, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => executeSearch(query)}
                    className="px-3.5 py-1.5 bg-theme-input hover:bg-theme-accent/10 text-xs md:text-sm text-theme-text rounded-full border border-theme-border/60 shadow-3xs transition duration-150"
                  >
                    {query}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Footer />
    </div>
  );
}
