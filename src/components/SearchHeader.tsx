import React from "react";
import { Link } from "@tanstack/react-router";
import { useAppStore } from "../store/useAppStore";
import { FaSun, FaMoon, FaSearch, FaTimes, FaFlask, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

interface SearchHeaderProps {
  type: string;
  inputVal: string;
  setInputVal: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

/**
 * Senior Developer Component: SearchHeader
 * Renders the responsive glassmorphic top search header with theme toggles, back navigation, and sandbox switches.
 */
export const SearchHeader: React.FC<SearchHeaderProps> = ({
  type,
  inputVal,
  setInputVal,
  onSubmit,
}) => {
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const mockMode = useAppStore((state) => state.mockMode);
  const setMockMode = useAppStore((state) => state.setMockMode);

  return (
    <header className="border-b border-sky-100/50 dark:border-neutral-900/80 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md sticky top-0 z-50 px-4 py-3.5 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center justify-between w-full md:w-auto">
        
        {/* Back Navigation Arrow & Cursive Brand Logo */}
        <div className="flex items-center gap-3 animate-fade-in">
          <Link 
            to="/" 
            className="p-2 text-gray-500 hover:text-sky-700 dark:text-neutral-400 dark:hover:text-sky-400 hover:bg-sky-50/50 dark:hover:bg-neutral-800 rounded-full transition duration-200"
            title="Return to Home Landing"
          >
            <FaArrowLeft className="text-sm" />
          </Link>
          <Link to="/" className="text-3xl font-bold text-sky-800 dark:text-sky-400 pacifico select-none hover:scale-102 transition duration-200">
            Ariser
          </Link>
        </div>

        {/* Quick controls panel (Mobile Only) */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMockMode(!mockMode)}
            className={`p-2 rounded-full text-xs font-semibold flex items-center border ${
              mockMode 
                ? "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900" 
                : "bg-emerald-50 text-emerald-600 border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900"
            }`}
            title="Toggle Local Sandbox"
          >
            <FaFlask className="mr-1 animate-pulse" /> {mockMode ? "Mock" : "Live"}
          </button>
          <button 
            onClick={toggleTheme} 
            className="p-2 bg-sky-100/80 dark:bg-neutral-850 rounded-full text-sky-800 dark:text-sky-400 shadow-sm"
          >
            {theme === "dark" ? <FaSun className="text-amber-400" /> : <FaMoon />}
          </button>
        </div>
      </div>

      {/* Modern Search Bar Input Form */}
      <form className="w-full md:max-w-2xl flex-grow" onSubmit={onSubmit}>
        <div className="relative group">
          {/* Subtle surrounding blur glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full blur opacity-5 group-hover:opacity-15 group-focus-within:opacity-25 transition duration-300" />
          <input
            type="text"
            className="relative w-full py-3 pl-5 pr-12 rounded-full border border-sky-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 text-black dark:text-white outline-none focus:border-sky-500 dark:focus:border-indigo-500 shadow-sm transition duration-300"
            placeholder="Search the web..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2.5 text-gray-400 dark:text-neutral-500 z-10">
            {inputVal && (
              <button 
                type="button" 
                onClick={() => setInputVal("")} 
                className="hover:text-black dark:hover:text-white transition p-0.5"
                title="Clear input"
              >
                <FaTimes />
              </button>
            )}
            <span className="w-px h-4 bg-gray-200 dark:bg-neutral-800" />
            <button 
              type="submit" 
              className="text-sky-700 dark:text-sky-400 hover:text-sky-950 dark:hover:text-sky-300 transition p-0.5"
              title="Submit query"
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </form>

      {/* Controls panel (Desktop Only) */}
      <div className="hidden md:flex items-center gap-3">
        <button
          onClick={() => setMockMode(!mockMode)}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center border transition ${
            mockMode 
              ? "bg-amber-50 text-amber-600 border-amber-250 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50 hover:bg-amber-100/50" 
              : "bg-emerald-50 text-emerald-600 border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50 hover:bg-emerald-100/50"
          }`}
          title="Toggle Sandbox Mock/Live Search API Mode"
        >
          <FaFlask className="mr-1.5 animate-pulse text-sm" /> 
          {mockMode ? "Mock Sandbox" : "Live API Enabled"}
        </button>

        <button
          onClick={toggleTheme}
          className="p-2.5 bg-white dark:bg-neutral-900 border border-sky-100 dark:border-neutral-800 hover:bg-sky-50 dark:hover:bg-neutral-800 text-sky-850 dark:text-sky-450 rounded-full transition shadow-sm hover:scale-105 active:scale-95 duration-200"
          title="Toggle Light/Dark Theme"
        >
          {theme === "dark" ? <FaSun className="text-amber-400" /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};
