import React from "react";
import { motion } from "framer-motion";

interface NewsResult {
  title: string;
  link: string;
  snippet: string;
  date: string;
  source: string;
  imageUrl?: string;
}

interface NewsResultsProps {
  data: {
    news?: NewsResult[];
  };
  cardVariants: any; // Framer motion animation variants passed from parent
}

/**
 * Senior Developer Component: NewsResults
 * Renders news rows with publication times, source badges, headlines, and optional right-aligned image cards.
 */
export const NewsResults: React.FC<NewsResultsProps> = ({ data, cardVariants }) => {
  const newsList = data?.news || [];

  if (newsList.length === 0) {
    return <p className="text-gray-400 text-center py-10">No news results found.</p>;
  }

  return (
    <div className="space-y-5">
      {newsList.map((item, i) => (
        <motion.article
          key={i}
          variants={cardVariants}
          whileHover={{ x: 2, borderLeftColor: "#0284c7" }}
          className="border-l-3 border-transparent border border-sky-100/30 dark:border-neutral-900/80 p-5 rounded-2xl bg-white/70 dark:bg-neutral-900/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-5 justify-between items-start"
        >
          {/* Main news text content */}
          <div className="flex-grow">
            <div className="flex items-center gap-3 text-2xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-2">
              <span>{item.source}</span>
              <span className="text-gray-350 dark:text-neutral-700 select-none">&bull;</span>
              <span className="text-gray-400 dark:text-neutral-500 font-semibold">{item.date}</span>
            </div>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="group">
              <h3 className="text-lg font-bold text-gray-900 dark:text-neutral-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-200 mb-2.5 leading-snug">
                {item.title}
              </h3>
            </a>
            <p className="text-sm text-gray-655 dark:text-neutral-400 leading-relaxed font-normal">
              {item.snippet}
            </p>
          </div>
          
          {/* Optional Right-Aligned Thumbnail */}
          {item.imageUrl && (
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-sky-50 dark:bg-neutral-900 shrink-0 border border-sky-100/30 dark:border-neutral-800 shadow-sm">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            </div>
          )}
        </motion.article>
      ))}
    </div>
  );
};
