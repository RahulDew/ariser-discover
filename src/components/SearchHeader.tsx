import React, { useState, useEffect } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { useAppStore } from "../store/useAppStore";
import { FaSearch, FaTimes, FaArrowLeft, FaGlobe } from "react-icons/fa";
import { Brand } from "./Brand";
import { motion, AnimatePresence } from "framer-motion";

interface SearchHeaderProps {
  type: string;
  inputVal: string;
  setInputVal: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  scrapeMode: boolean;
  setScrapeMode: (val: boolean) => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  type,
  inputVal,
  setInputVal,
  onSubmit,
  scrapeMode,
  setScrapeMode,
}) => {
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!inputVal.trim()) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(inputVal)}`);
        const data = await res.json();
        setSuggestions(data[1] || []);
      } catch (e) {
        console.error("Autocomplete failed:", e);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [inputVal]);

  const renderSwitcherPill = () => (
    <div className="flex p-0.5 bg-theme-card/60 backdrop-blur-md border border-theme-border rounded-full shadow-sm relative flex-shrink-0">
      <button
        type="button"
        onClick={() => setScrapeMode(false)}
        className={`flex-shrink-0 flex items-center justify-center gap-1 px-3 py-1 rounded-full text-[10px] md:text-xs font-extrabold transition-all relative duration-300 z-10 ${
          !scrapeMode ? "text-white" : "text-theme-text opacity-70 hover:opacity-100"
        }`}
      >
        {!scrapeMode && (
          <motion.div
            layoutId="activeHeaderTab"
            transition={{ type: "spring", stiffness: 550, damping: 36 }}
            className="absolute inset-0 bg-theme-accent rounded-full -z-10 shadow-sm"
          />
        )}
        <FaSearch className="text-[9px] md:text-[10px]" />
        <span>Search</span>
      </button>

      <button
        type="button"
        onClick={() => setScrapeMode(true)}
        className={`flex-shrink-0 flex items-center justify-center gap-1 px-3 py-1 rounded-full text-[10px] md:text-xs font-extrabold transition-all relative duration-300 z-10 ${
          scrapeMode ? "text-white" : "text-theme-text opacity-70 hover:opacity-100"
        }`}
      >
        {scrapeMode && (
          <motion.div
            layoutId="activeHeaderTab"
            transition={{ type: "spring", stiffness: 550, damping: 36 }}
            className="absolute inset-0 bg-theme-accent rounded-full -z-10 shadow-sm"
          />
        )}
        <FaGlobe className="text-[9px] md:text-[10px]" />
        <span>Scrape</span>
      </button>
    </div>
  );

  const renderSearchForm = (isMobile: boolean) => (
    <form 
      className={`${isMobile ? "w-full" : "w-full md:max-w-xl flex-grow"}`} 
      onSubmit={(e) => {
        setShowDropdown(false);
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        onSubmit(e);
      }}
    >
      <div className="relative group flex items-center">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-theme-accent to-theme-text rounded-full blur opacity-5 group-hover:opacity-15 group-focus-within:opacity-25 transition duration-300" />
        <input
          type="text"
          className="relative w-full py-2 pl-4 pr-[135px] rounded-full border border-theme-border bg-theme-input text-theme-text outline-none shadow-sm focus:border-theme-accent transition duration-300 font-medium"
          placeholder={scrapeMode ? "Enter URL to scrape..." : "Search the web softly..."}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
        />
        
        {inputVal && (
          <div className="absolute right-[112px] top-1/2 -translate-y-1/2 z-10 text-theme-text opacity-50 flex items-center">
            <button 
              type="button" 
              onClick={() => setInputVal("")} 
              className="hover:opacity-100 transition p-1"
            >
              <FaTimes className="text-2xs" />
            </button>
          </div>
        )}

        <div className="absolute right-1 top-1/2 -translate-y-1/2 z-10">
          {renderSwitcherPill()}
        </div>

        <AnimatePresence>
          {showDropdown && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              transition={{ type: "spring", stiffness: 550, damping: 36 }}
              className="absolute top-[110%] left-0 right-0 border border-theme-border bg-theme-card/95 backdrop-blur-md rounded-2xl shadow-lg z-50 overflow-hidden py-2 select-none origin-top"
            >
              {suggestions.slice(0, 7).map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInputVal(item);
                    setShowDropdown(false);
                    router.navigate({
                      to: "/search",
                      search: {
                        q: item.trim(),
                        type,
                      },
                    });
                  }}
                  className="w-full text-left px-5 py-2.5 hover:bg-theme-accent/10 hover:text-theme-accent text-sm text-theme-text font-bold transition-colors duration-150 flex items-center gap-3"
                >
                  <FaSearch className="text-[10px] opacity-40 text-theme-accent" />
                  <span>{item}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );

  return (
    <header className="border-b border-theme-border bg-theme-bg/85 backdrop-blur-md sticky top-0 z-50 px-4 py-3 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 transition-colors duration-300">
      
      <div className="flex md:hidden items-center justify-between gap-3 w-full">
        <Link 
          to="/" 
          className="p-1.5 text-theme-text opacity-70 hover:opacity-100 hover:bg-theme-card rounded-full transition duration-200 flex-shrink-0"
          title="Go back to Home"
        >
          <FaArrowLeft className="text-sm" />
        </Link>
        
        <div className="flex-grow min-w-0">
          {renderSearchForm(true)}
        </div>
      </div>

      <div className="hidden md:flex items-center justify-between w-full">
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link 
            to="/" 
            className="p-2 text-theme-text opacity-70 hover:opacity-100 hover:bg-theme-card rounded-full transition duration-200"
            title="Go back to Home"
          >
            <FaArrowLeft className="text-sm" />
          </Link>
          <Link to="/">
            <Brand size="sm" />
          </Link>
        </div>

        <div className="flex items-center gap-3 max-w-xl flex-grow justify-end pl-8">
          {renderSearchForm(false)}
        </div>
      </div>
    </header>
  );
};
