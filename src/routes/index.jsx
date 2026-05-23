import React, { useState } from "react";
import { createRoute, useRouter } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";
import { useAppStore } from "../store/useAppStore";
import { FaSun, FaMoon, FaSearch, FaHistory, FaTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomeComponent,
});

function HomeComponent() {
  const router = useRouter();
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const searchHistory = useAppStore((state) => state.searchHistory);
  const clearHistory = useAppStore((state) => state.clearHistory);
  const [localSearch, setLocalSearch] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!localSearch.trim()) return;
    executeSearch(localSearch.trim());
  };

  const executeSearch = (query) => {
    router.navigate({
      to: "/search",
      search: {
        q: query,
        type: "search", // Default to 'search' (All) tab
      },
    });
  };

  // Framer Motion Animation Variants
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative overflow-hidden bg-sky-50/30 dark:bg-neutral-950 transition-colors duration-300">
      
      {/* Premium Ambient Background Spotlights */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-sky-200/20 dark:bg-indigo-900/10 blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-violet-200/20 dark:bg-violet-900/10 blur-[100px] pointer-events-none select-none" />

      {/* Header / Nav */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center px-6 md:px-14 py-5 z-10"
      >
        <a href="#" className="p-2 text-4xl font-bold text-sky-800 dark:text-sky-400 pacifico select-none hover:scale-102 transition duration-200">
          Ariser
        </a>
        <button
          onClick={toggleTheme}
          className="p-3 text-xl md:text-2xl bg-white/70 dark:bg-neutral-900/70 border border-sky-100 dark:border-neutral-800 backdrop-blur-md rounded-full shadow-md text-sky-800 dark:text-sky-400 hover:scale-105 active:scale-95 transition-all duration-200"
          title="Toggle Theme"
        >
          {theme === "dark" ? (
            <motion.div initial={{ rotate: -30 }} animate={{ rotate: 0 }}><FaSun className="text-amber-400" /></motion.div>
          ) : (
            <motion.div initial={{ rotate: 30 }} animate={{ rotate: 0 }}><FaMoon className="text-sky-900" /></motion.div>
          )}
        </button>
      </motion.nav>

      {/* Main Search Panel */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center text-center w-full px-4 z-10 -mt-8 flex-grow"
      >
        {/* Glowing Brand Name */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          className="text-sky-800 dark:text-sky-400 text-8xl lg:text-9xl font-bold pacifico mb-8 select-none drop-shadow-[0_4px_16px_rgba(3,105,161,0.15)] dark:drop-shadow-[0_4px_24px_rgba(56,189,248,0.1)] cursor-default"
        >
          Ariser
        </motion.div>

        {/* Dynamic Search Box with Framer Motion Focus */}
        <motion.form 
          variants={itemVariants}
          className="w-full max-w-xl mb-8" 
          onSubmit={handleSearchSubmit}
        >
          <div className="relative group">
            {/* Input background glow effect on group-hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full blur opacity-15 group-hover:opacity-25 transition duration-300 group-focus-within:opacity-35" />
            
            <input
              type="text"
              placeholder="Search the web with power..."
              className="relative w-full py-4 pl-6 pr-14 rounded-full border border-sky-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/90 text-black dark:text-white shadow-lg outline-none focus:border-sky-500 dark:focus:border-indigo-500 focus:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:focus:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-all duration-300 text-lg"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              autoFocus
            />
            
            <button 
              type="submit" 
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-full hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <FaSearch className="text-sm" />
            </button>
          </div>
        </motion.form>

        {/* Persistent Search History Panel */}
        <AnimatePresence>
          {searchHistory.length > 0 && (
            <motion.div 
              variants={itemVariants}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white/50 dark:bg-neutral-900/50 border border-sky-100/50 dark:border-neutral-800/80 backdrop-blur-md rounded-2xl p-5 shadow-md mb-8"
            >
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-sky-800 dark:text-sky-400 mb-3 select-none">
                <span className="flex items-center gap-1.5"><FaHistory /> Recent Queries</span>
                <button 
                  onClick={clearHistory}
                  className="flex items-center gap-1 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition duration-150"
                  title="Clear Search History"
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
                    className="px-3.5 py-1.5 bg-white dark:bg-neutral-800 hover:bg-sky-50 dark:hover:bg-neutral-750 text-xs md:text-sm text-gray-700 dark:text-neutral-300 rounded-full border border-sky-100/50 dark:border-neutral-750 shadow-sm transition duration-150"
                  >
                    {query}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          variants={itemVariants}
          className="bg-sky-100/60 dark:bg-neutral-900/60 border border-sky-200/20 text-sky-900 dark:text-sky-300 px-6 py-2 rounded-full text-sm font-semibold select-none shadow-sm"
        >
          Keep Exploring !!!
        </motion.div>
      </motion.div>

      {/* Premium Animating footer outlet */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}
