import React, { useState } from "react";
import { FaGlobe, FaImage, FaRegNewspaper, FaVideo } from "react-icons/fa";

interface SearchTabsProps {
  type: string;
  onTabChange: (tabId: string) => void;
}

/**
 * Senior Developer Component: SearchTabs
 * Renders the new unified pill-based tabs and responsive Time Filter rows.
 */
export const SearchTabs: React.FC<SearchTabsProps> = ({ type, onTabChange }) => {
  const [activeTime, setActiveTime] = useState("anytime");

  const tabs = [
    { id: "search", label: "All", count: "12.4M", icon: <FaGlobe className="text-xs" /> },
    { id: "images", label: "Images", count: "8.1M", icon: <FaImage className="text-xs" /> },
    { id: "news", label: "News", count: "2.3K", icon: <FaRegNewspaper className="text-xs" /> },
    { id: "videos", label: "Videos", count: "124K", icon: <FaVideo className="text-xs" /> },
  ];

  const timeFilters = [
    { id: "anytime", label: "Any time" },
    { id: "24h", label: "24 h" },
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
    { id: "year", label: "Year" },
  ];

  return (
    <div className="border-b border-theme-border bg-theme-bg/40 backdrop-blur-sm px-4 md:px-8 py-2.5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Unified Pill-Based Tabs Container */}
        <div className="flex items-center gap-1.5 p-1 bg-theme-card/60 border border-theme-border rounded-full w-fit max-w-full overflow-x-auto scrollbar-none select-none">
          {tabs.map((tab) => {
            const isActive = type === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`py-1.5 px-4 rounded-full flex items-center gap-2 font-bold text-xs md:text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-theme-accent text-white shadow-sm scale-102"
                    : "text-theme-text/80 hover:text-theme-accent hover:bg-theme-accent/5"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold transition-all duration-200 ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-theme-text/5 text-theme-text/50"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Time Filters aligned to the right */}
        <div className="flex items-center gap-2 max-w-full overflow-x-auto scrollbar-none select-none">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-theme-text opacity-45 pr-1.5">
            Time
          </span>
          <div className="flex items-center gap-1.5">
            {timeFilters.map((filter) => {
              const isSelected = activeTime === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveTime(filter.id)}
                  className={`px-4 py-1.5 rounded-full border text-xs font-semibold transition-all duration-200 ${
                    isSelected
                      ? "border-theme-accent bg-theme-accent/5 text-theme-accent font-bold"
                      : "border-theme-border bg-theme-card/30 hover:border-theme-accent text-theme-text/80 hover:text-theme-accent"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
