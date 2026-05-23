import React, { useState } from "react";
import { createRoute, useRouter } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";
import { useAppStore } from "../store/useAppStore";
import { FaSearch, FaHistory, FaTrashAlt, FaTimes } from "react-icons/fa";
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
  const removeFromHistory = useAppStore((state) => state.removeFromHistory);
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
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-theme-bg transition-colors duration-300">
      
      {/* Dynamic Moving Blobs (Spotlights) moving independently with heavy blur */}
      <motion.div
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "mirror" as const,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-15%] w-[65vw] h-[65vw] rounded-full bg-theme-accent/18 blur-[120px] pointer-events-none select-none transition-colors duration-300 z-0"
      />
      <motion.div
        animate={{
          x: [0, -40, 50, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          repeatType: "mirror" as const,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-15%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-theme-accent/12 blur-[100px] pointer-events-none select-none transition-colors duration-300 z-0"
      />



      {/* Main Brand Centered Panel */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center text-center w-full px-4 z-10"
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
          Discover the web, softly.
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
              placeholder="Discover the warm side of the web..."
              className="relative w-full py-4 pl-6 pr-32 rounded-full border border-theme-border bg-theme-input text-theme-text shadow-lg outline-none focus:border-theme-accent focus:shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300 text-lg font-medium"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              autoFocus
            />
            
            {/* Rounded filled Search Button matching the accent colorway exactly */}
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-theme-accent hover:bg-theme-accent-hover text-white font-bold rounded-full hover:scale-103 active:scale-97 shadow-sm transition-all duration-200 text-sm"
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
              className="w-full max-w-md bg-white/40 dark:bg-neutral-900/40 border border-theme-border backdrop-blur-md rounded-3xl p-5 shadow-lg mb-8"
            >
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-theme-text opacity-50 mb-3.5 select-none">
                <span className="flex items-center gap-2"><FaHistory className="text-theme-accent" /> Recent Searches</span>
                <button 
                  onClick={clearHistory}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 transition font-semibold text-2xs"
                  title="Clear All History"
                >
                  <FaTrashAlt className="text-2xs" /> Clear All
                </button>
              </div>
              <div className="flex flex-col gap-1 max-h-[160px] overflow-y-auto pr-1 scrollbar-none">
                {searchHistory.map((query, index) => (
                  <motion.div
                    key={query}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-center justify-between group/row px-3.5 py-2 hover:bg-theme-accent/5 dark:hover:bg-theme-accent/10 rounded-2xl transition duration-200 cursor-pointer"
                    onClick={() => executeSearch(query)}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <FaHistory className="text-theme-text/30 group-hover/row:text-theme-accent transition-colors" />
                      <span className="text-sm font-medium text-theme-text/80 group-hover/row:text-theme-accent truncate">
                        {query}
                      </span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromHistory(query);
                      }}
                      className="opacity-0 group-hover/row:opacity-100 p-1.5 text-theme-text/40 hover:text-red-500 hover:bg-red-500/10 dark:hover:bg-red-500/20 rounded-full transition-all duration-200"
                      title="Remove item"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating Theme Selector pill placed sleekly at the bottom center of the homepage only */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex justify-center w-full max-w-[95vw] md:max-w-fit px-4">
        <ThemeSelector />
      </div>

      <Footer className="absolute bottom-0 left-0 right-0 z-30" />
    </div>
  );
}
