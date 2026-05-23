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
 * Renders general web search organic results with elegant serif titles, favicons, 
 * copy shortcuts, and dynamic related searches pills matching the active colorway.
 */
export const WebResults: React.FC<WebResultsProps> = ({ data, cardVariants }) => {
  const organicList = data?.organic || [];
  const relatedSearches = data?.relatedSearches || [];

  if (organicList.length === 0) {
    return <p className="text-theme-text opacity-60 text-center py-10">No web results found.</p>;
  }

  // Copy link utility
  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
  };

  // Extract simple host for breadcrumbs
  const getDomainHost = (url: string) => {
    try {
      const parsed = new URL(url);
      return parsed.hostname;
    } catch {
      return url;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Organic Web Search Results */}
      <div className="space-y-5">
        {organicList.map((item, i) => {
          const domain = getDomainHost(item.link);
          const faviconLetter = domain.replace("www.", "").charAt(0).toUpperCase();

          return (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -1 }}
              className="group border border-theme-border/50 p-5.5 rounded-2xl bg-theme-card/60 backdrop-blur-sm shadow-xs hover:shadow-md transition-all duration-300"
            >
              {/* Breadcrumb row matching the PDF design */}
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2 truncate max-w-[80%]">
                  {/* Decorative Favicon Circle matching theme accent */}
                  <span className="w-5 h-5 rounded-full bg-theme-accent/15 text-theme-accent font-bold text-3xs flex items-center justify-center border border-theme-accent/20 select-none">
                    {faviconLetter}
                  </span>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-theme-text opacity-70 hover:opacity-100 hover:underline truncate"
                  >
                    {domain} <span className="opacity-45 select-none">&rsaquo;</span>
                  </a>
                </div>
                
                {/* Actions row */}
                <div className="flex gap-2 text-theme-text opacity-40 hover:opacity-100 group-hover:opacity-100 md:opacity-20 transition duration-200">
                  <button 
                    onClick={() => handleCopyLink(item.link)}
                    className="p-1 hover:text-theme-accent" 
                    title="Copy Link to Clipboard"
                  >
                    <FaCopy className="text-xs" />
                  </button>
                </div>
              </div>

              {/* Title in elegant playfair display serif */}
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="block group">
                <h3 className="text-xl font-bold font-serif-lumen text-theme-accent hover:underline mb-2 leading-tight transition-colors duration-200">
                  {item.title}
                </h3>
              </a>
              
              <p className="text-sm text-theme-text opacity-80 leading-relaxed font-normal">
                {item.snippet}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Related Searches Section */}
      {relatedSearches.length > 0 && (
        <motion.div 
          variants={cardVariants}
          className="border-t border-theme-border pt-6 mt-8"
        >
          <h4 className="text-base font-bold text-theme-text mb-4 select-none flex items-center gap-2 font-serif-lumen italic">
            <span className="w-1.5 h-1.5 rounded-full bg-theme-accent" />
            Related Searches
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {relatedSearches.map((term, i) => (
              <motion.div key={i} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/search"
                  search={{ q: term.query, type: "search" }}
                  className="px-4.5 py-2.5 bg-theme-card hover:bg-theme-accent/15 border border-theme-border text-theme-text hover:text-theme-accent rounded-full text-xs font-bold shadow-2xs transition flex items-center gap-2"
                >
                  <FaSearch className="text-3xs text-theme-accent opacity-85" />
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
