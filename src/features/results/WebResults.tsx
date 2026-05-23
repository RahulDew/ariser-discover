import React from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { FaSearch, FaCopy } from "react-icons/fa";

interface OrganicResult {
  title: string;
  link: string;
  snippet: string;
}

interface RelatedSearch {
  query: string;
}

interface WebResultsProps {
  data: {
    organic?: OrganicResult[];
    relatedSearches?: RelatedSearch[];
  };
  cardVariants: any; // Framer motion animation variants passed from parent
}

/**
 * Senior Developer Component: WebResults
 * Renders general web search organic links, descriptions, and related search keyword chips.
 */
export const WebResults: React.FC<WebResultsProps> = ({ data, cardVariants }) => {
  const organicList = data?.organic || [];
  const relatedSearches = data?.relatedSearches || [];

  if (organicList.length === 0) {
    return <p className="text-gray-400 text-center py-10">No web results found.</p>;
  }

  // Copy link utility
  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="space-y-8">
      {/* Organic Web Search Results */}
      <div className="space-y-5">
        {organicList.map((item, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ y: -1 }}
            className="group border border-sky-100/30 dark:border-neutral-900/80 p-5.5 rounded-2xl bg-white/70 dark:bg-neutral-900/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline truncate max-w-[80%] font-medium"
              >
                {item.link}
              </a>
              
              {/* Copy URL Hover Shortcut */}
              <div className="flex gap-2 text-gray-400 dark:text-neutral-500 select-none opacity-0 group-hover:opacity-100 transition duration-200">
                <button 
                  onClick={() => handleCopyLink(item.link)}
                  className="p-1 hover:text-sky-600 dark:hover:text-sky-400" 
                  title="Copy Link to Clipboard"
                >
                  <FaCopy className="text-xs" />
                </button>
              </div>
            </div>

            <a href={item.link} target="_blank" rel="noopener noreferrer" className="group-hover:text-sky-600 dark:group-hover:text-sky-350">
              <h3 className="text-xl font-bold text-sky-850 dark:text-sky-400 group-hover:text-sky-600 dark:group-hover:text-sky-350 transition-colors duration-200 mb-2 leading-tight">
                {item.title}
              </h3>
            </a>
            <p className="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed font-normal">
              {item.snippet}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Related Searches Section */}
      {relatedSearches.length > 0 && (
        <motion.div 
          variants={cardVariants}
          className="border-t border-sky-100/50 dark:border-neutral-900 pt-6 mt-8"
        >
          <h4 className="text-base font-bold text-gray-800 dark:text-neutral-200 mb-4 select-none flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Related Searches
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {relatedSearches.map((term, i) => (
              <motion.div key={i} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/search"
                  search={{ q: term.query, type: "search" }}
                  className="px-4.5 py-2.5 bg-white dark:bg-neutral-900 hover:bg-sky-50 dark:hover:bg-neutral-800 border border-sky-100/80 dark:border-neutral-850 text-sky-900 dark:text-neutral-300 rounded-full text-xs font-bold shadow-xs transition flex items-center gap-2"
                >
                  <FaSearch className="text-3xs text-sky-600 dark:text-indigo-400 opacity-80" />
                  {term.query}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
