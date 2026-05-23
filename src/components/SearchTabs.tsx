import React from "react";
import { FaGlobe, FaImage, FaRegNewspaper, FaVideo } from "react-icons/fa";
import { motion } from "framer-motion";

interface SearchTabsProps {
  type: string;
  onTabChange: (tabId: string) => void;
}

/**
 * Senior Developer Component: SearchTabs
 * Renders the sliding tab buttons for Search, Images, Videos, and News with elegant glide underlines.
 */
export const SearchTabs: React.FC<SearchTabsProps> = ({ type, onTabChange }) => {
  const tabs = [
    { id: "search", label: "All", icon: <FaGlobe className="mr-2" /> },
    { id: "images", label: "Images", icon: <FaImage className="mr-2" /> },
    { id: "news", label: "News", icon: <FaRegNewspaper className="mr-2" /> },
    { id: "videos", label: "Videos", icon: <FaVideo className="mr-2" /> },
  ];

  return (
    <div className="border-b border-sky-100/50 dark:border-neutral-900/80 bg-white/40 dark:bg-neutral-950/40 backdrop-blur-sm px-4 md:px-8">
      <div className="flex space-x-6 max-w-7xl mx-auto overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const isActive = type === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-3.5 px-1 relative font-semibold text-sm md:text-base flex items-center transition-colors duration-200 ${
                isActive
                  ? "text-sky-700 dark:text-sky-455"
                  : "text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              }`}
            >
              {tab.icon}
              {tab.label}
              
              {/* Sliding Underline Animation via Framer Motion */}
              {isActive && (
                <motion.div 
                  layoutId="activeTabUnderline" 
                  className="absolute bottom-0 left-0 right-0 h-0.75 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full" 
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
