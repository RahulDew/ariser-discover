import React, { useState, useEffect } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { useAppStore } from "../store/useAppStore";
import { FaSearch, FaTimes, FaFlask, FaArrowLeft } from "react-icons/fa";
import { Brand } from "./Brand";
// ThemeSelector is rendered globally in __root.tsx

interface SearchHeaderProps {
  type: string;
  inputVal: string;
  setInputVal: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

/**
 * Senior Developer Component: SearchHeader
 * Renders the responsive top sticky search bar using dynamic theme variables and the new ThemeSelector swatch popover.
 */
export const SearchHeader: React.FC<SearchHeaderProps> = ({
  type,
  inputVal,
  setInputVal,
  onSubmit,
}) => {
  const router = useRouter();
  const mockMode = useAppStore((state) => state.mockMode);
  const setMockMode = useAppStore((state) => state.setMockMode);
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

  return (
    <header className="border-b border-theme-border bg-theme-bg/85 backdrop-blur-md sticky top-0 z-50 px-4 py-3.5 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-300">
      <div className="flex items-center justify-between w-full md:w-auto">
        
        {/* Back Navigation & Serif Logo Brand */}
        <div className="flex items-center gap-3">
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

        {/* Quick controls panel (Mobile Only) */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMockMode(!mockMode)}
            className={`p-2 rounded-full text-xs font-bold flex items-center border ${
              mockMode 
                ? "bg-amber-500/10 text-amber-500 border-amber-500/30" 
                : "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
            }`}
          >
            <FaFlask className="mr-1 animate-pulse" /> {mockMode ? "Mock" : "Live"}
          </button>
          
        </div>
      </div>

      {/* Dynamic Search Bar Input */}
      <form className="w-full md:max-w-2xl flex-grow" onSubmit={onSubmit}>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-theme-accent to-theme-text rounded-full blur opacity-5 group-hover:opacity-15 group-focus-within:opacity-25 transition duration-300" />
          <input
            type="text"
            className="relative w-full py-2.5 pl-5 pr-14 rounded-full border border-theme-border bg-theme-input text-theme-text outline-none focus:border-theme-accent shadow-sm transition duration-300 font-medium"
            placeholder="Search the web softly..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2.5 text-theme-text opacity-50 z-10">
            {inputVal && (
              <button 
                type="button" 
                onClick={() => setInputVal("")} 
                className="hover:opacity-100 transition p-0.5"
              >
                <FaTimes />
              </button>
            )}
            <span className="w-px h-4 bg-theme-border" />
            <button 
              type="submit" 
              className="text-theme-accent hover:opacity-100 transition p-0.5"
            >
              <FaSearch />
            </button>
          </div>

          {/* Floating Autocomplete drop panel */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-[110%] left-0 right-0 border border-theme-border bg-theme-card/95 backdrop-blur-md rounded-2xl shadow-lg z-50 overflow-hidden py-2 select-none">
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
            </div>
          )}
        </div>
      </form>

      {/* Controls panel (Desktop Only) */}
      <div className="hidden md:flex items-center gap-3">
        <button
          onClick={() => setMockMode(!mockMode)}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center border transition ${
            mockMode 
              ? "bg-amber-500/10 text-amber-500 border-amber-500/30 hover:bg-amber-500/20" 
              : "bg-emerald-500/10 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/20"
          }`}
          title="Toggle Sandbox Mock/Live Search API Mode"
        >
          <FaFlask className="mr-1.5 animate-pulse text-sm" /> 
          {mockMode ? "Mock Sandbox" : "Live API Enabled"}
        </button>

      </div>
    </header>
  );
};
