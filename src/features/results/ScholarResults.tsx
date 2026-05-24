import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaQuoteRight, FaBook, FaExternalLinkAlt } from "react-icons/fa";

interface ScholarArticle {
  title: string;
  link: string;
  snippet: string;
  publicationInfo?: string;
  year?: string;
  citedBy?: number | string;
}

interface ScholarResultsProps {
  data: {
    organic?: ScholarArticle[];
  };
  cardVariants: any;
}

/**
 * Senior Developer Component: ScholarResults
 * Renders structured academic citation entries with premium layouts.
 */
export const ScholarResults: React.FC<ScholarResultsProps> = ({ data, cardVariants }) => {
  const articles = data?.organic || [];

  if (articles.length === 0) {
    return <p className="text-theme-text opacity-60 text-center py-10">No scholarly articles found.</p>;
  }

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      {articles.map((item, idx) => (
        <motion.div
          key={idx}
          variants={cardVariants}
          className="p-6 border border-theme-border bg-theme-card/30 rounded-3xl hover:border-theme-accent/30 hover:shadow-2xs transition-all duration-200"
        >
          {/* Header row */}
          <div className="flex items-start justify-between gap-4 mb-3.5 select-none">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-theme-accent/10 border border-theme-accent/20 text-theme-accent flex items-center justify-center">
                <FaGraduationCap className="text-xs" />
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-theme-text opacity-45">
                Academic Paper
              </span>
            </div>
            {item.citedBy && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full text-4xs font-extrabold uppercase tracking-widest leading-none">
                <FaQuoteRight className="text-[7px]" /> Cited by {item.citedBy}
              </span>
            )}
          </div>

          {/* Title Link */}
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-2 group"
          >
            <h3 className="text-lg md:text-xl font-bold font-serif-lumen text-theme-accent group-hover:underline leading-snug transition-colors">
              {item.title}
            </h3>
          </a>

          {/* Publication/Author Metadata Row */}
          {item.publicationInfo && (
            <div className="flex items-center gap-2 text-2xs text-emerald-600 dark:text-emerald-400 font-medium mb-3 select-none">
              <FaBook className="text-[10px]" />
              <span className="truncate">{item.publicationInfo}</span>
            </div>
          )}

          {/* Snippet */}
          <p className="text-sm text-theme-text/80 leading-relaxed mb-4">
            {item.snippet}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-theme-accent hover:bg-theme-accent/90 text-white rounded-full text-xs font-bold shadow-2xs hover:shadow-sm transition-all duration-200 select-none"
            >
              <span>View Source</span>
              <FaExternalLinkAlt className="text-[9px]" />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
