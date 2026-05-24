import React from "react";
import { motion } from "framer-motion";
import { NoData } from "../../components/NoData";

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
    return <NoData resultType="news" />;
  }

  return (
    <div className="space-y-5 animate-fade-in">
      {newsList.map((item, i) => (
        <motion.article
          key={i}
          variants={cardVariants}
          whileHover={{ x: 2, borderLeftColor: "var(--color-accent)" }}
          style={{ borderLeftWidth: "3px" }}
          className="border-l-transparent border border-theme-border/50 p-5 rounded-2xl bg-theme-card/60 backdrop-blur-sm shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-5 justify-between items-start"
        >
          {/* Main news text content */}
          <div className="flex-grow">
            <div className="flex items-center gap-3 text-2xs font-bold uppercase tracking-wider text-theme-accent mb-2">
              <span>{item.source}</span>
              <span className="text-theme-text opacity-35 select-none">&bull;</span>
              <span className="text-theme-text opacity-50 font-semibold">{item.date}</span>
            </div>
            
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="group">
              <h3 className="text-lg font-bold font-serif-lumen text-theme-text group-hover:text-theme-accent transition-colors duration-200 mb-2.5 leading-snug">
                {item.title}
              </h3>
            </a>
            
            <p className="text-sm text-theme-text opacity-85 leading-relaxed font-normal">
              {item.snippet}
            </p>
          </div>
          
          {/* Optional Right-Aligned Thumbnail */}
          {item.imageUrl && (
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-theme-bg shrink-0 border border-theme-border/50 shadow-xs">
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            </div>
          )}
        </motion.article>
      ))}
    </div>
  );
};
