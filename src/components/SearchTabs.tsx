import React from "react";
import { FaGlobe, FaImage, FaRegNewspaper, FaVideo } from "react-icons/fa";
import { motion } from "framer-motion";

interface SearchTabsProps {
  type: string;
  onTabChange: (tabId: string) => void;
}

/**
 * Senior Developer Component: SearchTabs
 * Renders the sliding tab buttons for Search, Images, Videos, and News with elegant, theme-aware glide underlines.
 */
export const SearchTabs: React.FC<SearchTabsProps> = ({ type, onTabChange }) => {
  const tabs = [
    { id: "search", label: "All", icon: <FaGlobe className="mr-2 text-xs" /> },
    { id: "images", label: "Images", icon: <FaImage className="mr-2 text-xs" /> },
    { id: "news", label: "News", icon: <FaRegNewspaper className="mr-2 text-xs" /> },
    { id: "videos", label: "Videos", icon: <FaVideo className="mr-2 text-xs" /> },
  ];

  return (
    <div className="border-b border-theme-border bg-theme-bg/40 backdrop-blur-sm px-4 md:px-8 transition-colors duration-300">
      <div className="flex space-x-6 max-w-7xl mx-auto overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const isActive = type === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-3.5 px-1 relative font-bold text-sm md:text-base flex items-center transition-colors duration-200 ${
                isActive
                  ? "text-theme-accent"
                  : "text-theme-text opacity-60 hover:opacity-90"
              }`}
            >
              {tab.icon}
              {tab.label}
              
              {/* Sliding Underline Animation matching the active theme accent color */}
              {isActive && (
                <motion.div 
                  layoutId="activeTabUnderline" 
                  className="absolute bottom-0 left-0 right-0 h-0.75 bg-theme-accent rounded-full" 
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
