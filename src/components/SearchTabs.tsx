import React, { useState } from "react";
import { FaGlobe, FaImage, FaRegNewspaper, FaVideo, FaShoppingCart, FaSlidersH, FaChevronDown, FaGraduationCap } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface SearchTabsProps {
  type: string;
  onTabChange: (tabId: string) => void;
  hl: string;
  gl: string;
  tbs: string;
  batch: boolean;
  onFiltersChange: (filters: { hl?: string; gl?: string; tbs?: string; batch?: boolean }) => void;
}

/**
 * Senior Developer Component: SearchTabs
 * Renders the new unified pill-based tabs, responsive Time Filter rows, and the collapsible Filters options panel.
 */
export const SearchTabs: React.FC<SearchTabsProps> = ({
  type,
  onTabChange,
  hl,
  gl,
  tbs,
  batch,
  onFiltersChange,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const tabs = [
    { id: "search", label: "All",      icon: <FaGlobe className="text-xs" /> },
    { id: "images", label: "Images",   icon: <FaImage className="text-xs" /> },
    { id: "news",   label: "News",     icon: <FaRegNewspaper className="text-xs" /> },
    { id: "videos", label: "Videos",   icon: <FaVideo className="text-xs" /> },
    { id: "shopping", label: "Shopping", icon: <FaShoppingCart className="text-xs" /> },
    { id: "scholar", label: "Scholar",  icon: <FaGraduationCap className="text-xs" /> },
  ];

  const timeFilters = [
    { id: "anytime", label: "Any time" },
    { id: "24h",     label: "24 h" },
    { id: "week",    label: "Week" },
    { id: "month",   label: "Month" },
    { id: "year",    label: "Year" },
  ];

  return (
    <div className="border-b border-theme-border bg-theme-bg/40 backdrop-blur-sm px-4 md:px-8 py-2.5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                </button>
              );
            })}
          </div>

          {/* Filters and Options Row */}
          <div className="flex items-center gap-3 max-w-full overflow-x-auto scrollbar-none select-none">
            
            {/* Time Filters */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-theme-text opacity-45 pr-1.5">
                Time
              </span>
              <div className="flex items-center gap-1.5">
                {timeFilters.map((filter) => {
                  const isSelected = tbs === filter.id;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => onFiltersChange({ tbs: filter.id })}
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

            <span className="w-px h-6 bg-theme-border" />

            {/* Collapsible Filter Panel Toggle FAB */}
            <button
              onClick={() => setShowDrawer(!showDrawer)}
              className={`px-4 py-1.5 rounded-full border text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                showDrawer
                  ? "border-theme-accent bg-theme-accent text-white shadow-sm"
                  : "border-theme-border bg-theme-card/30 hover:border-theme-accent text-theme-text/80 hover:text-theme-accent"
              }`}
              title="Toggle Advanced Search Filters"
            >
              <FaSlidersH className="text-[10px]" />
              <span>Options</span>
            </button>

          </div>
        </div>

        {/* Collapsible Advanced Filters Drawer */}
        <AnimatePresence>
          {showDrawer && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-theme-border/20 mt-3 pt-3 flex flex-wrap items-center gap-6"
            >
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-theme-text opacity-45 select-none">
                  Language
                </span>
                <div className="relative">
                  <select
                    value={hl}
                    onChange={(e) => onFiltersChange({ hl: e.target.value })}
                    className="appearance-none pl-4 pr-8 py-1.5 rounded-full border border-theme-border bg-theme-card/50 text-theme-text text-xs font-bold outline-none hover:border-theme-accent/50 focus:border-theme-accent transition cursor-pointer select-none"
                  >
                    <option value="en">English (US)</option>
                    <option value="hi">Hindi (India)</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-accent text-[9px] pointer-events-none opacity-80" />
                </div>
              </div>

              {/* Country/Region Selector */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-theme-text opacity-45 select-none">
                  Region
                </span>
                <div className="relative">
                  <select
                    value={gl}
                    onChange={(e) => onFiltersChange({ gl: e.target.value })}
                    className="appearance-none pl-4 pr-8 py-1.5 rounded-full border border-theme-border bg-theme-card/50 text-theme-text text-xs font-bold outline-none hover:border-theme-accent/50 focus:border-theme-accent transition cursor-pointer select-none"
                  >
                    <option value="us">United States</option>
                    <option value="in">India</option>
                    <option value="uk">United Kingdom</option>
                    <option value="ca">Canada</option>
                    <option value="de">Germany</option>
                    <option value="fr">France</option>
                    <option value="jp">Japan</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-accent text-[9px] pointer-events-none opacity-80" />
                </div>
              </div>

              {/* Batch Toggle */}
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-theme-text opacity-45 select-none">
                  Batch Search
                </span>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={batch}
                    onChange={(e) => onFiltersChange({ batch: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-theme-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-theme-accent"></div>
                  <span className="ml-2 text-xs font-bold text-theme-text/80 peer-checked:text-theme-accent transition">
                    {batch ? "Enabled" : "Disabled"}
                  </span>
                </label>
              </div>

              <span className="text-3xs text-theme-text/40 ml-auto font-medium select-none max-w-xs text-right hidden lg:block leading-tight">
                {batch ? "Separate multiple queries using commas or newlines." : "Toggle Batch to search multiple keywords concurrently."}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
