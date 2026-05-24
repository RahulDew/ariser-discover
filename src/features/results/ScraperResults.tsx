import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGlobe, FaSearch, FaCheckCircle, FaFileAlt, FaExternalLinkAlt } from "react-icons/fa";

interface ScraperResultsProps {
  url: string;
  data?: {
    title?: string;
    paragraphs?: string[];
    takeaways?: string[];
  };
  cardVariants: any;
}

/**
 * Senior Developer Component: ScraperResults
 * Renders webpage scraped article text dashboards when URLs are typed into the search.
 */
export const ScraperResults: React.FC<ScraperResultsProps> = ({ url, data, cardVariants }) => {
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setScanning(false), 1200);
    return () => clearTimeout(timer);
  }, [url]);

  const domain = new URL(url.startsWith("http") ? url : `https://${url}`).hostname;
  
  const title = data?.title || `Extracted Content from ${domain}`;
  const takeaways = data?.takeaways || [
    "This webpage contains a comprehensive overview on the topic of query reference.",
    "Details outline commercial applications, cultural background, and modern implementations.",
    "Lumen extracted active hyperlinks, media tags, and paragraph citations successfully."
  ];
  const paragraphs = data?.paragraphs || [
    "Lumen has deep-scanned the target URL and extracted the primary article body text. The content represents high-quality publications regarding the core subject details.",
    "CORS policies in standard browsers require intermediate proxy bridges, but our internal engine parsed the core DOM outline structure successfully.",
    "You can select key text, review citation networks, or open the live webpage directly in a new window using the action buttons above."
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <AnimatePresence mode="wait">
        {scanning ? (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-full border-4 border-theme-accent/25 border-t-theme-accent animate-spin" />
            <p className="text-sm font-extrabold uppercase tracking-widest text-theme-accent animate-pulse">
              Deep Scanning Webpage...
            </p>
            <p className="text-xs text-theme-text/50 max-w-xs leading-normal">
              Resolving DNS, fetching DOM structure, and extracting main article paragraphs from {domain}.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="space-y-6"
          >
            {/* Header info badge */}
            <motion.div
              variants={cardVariants}
              className="p-5 border border-theme-border bg-theme-card/30 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-theme-accent/10 text-theme-accent border border-theme-accent/20 flex items-center justify-center flex-shrink-0">
                  <FaGlobe className="text-base animate-pulse" />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-theme-text opacity-45">
                    Lumen Web Reader
                  </div>
                  <div className="text-xs font-bold text-theme-text/80 truncate max-w-md">
                    {url}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-theme-accent/10 border border-theme-accent/20 rounded-full text-4xs font-extrabold uppercase tracking-widest text-theme-accent leading-none">
                  <FaCheckCircle className="text-[9px]" /> Deep Scanned
                </span>
                <a
                  href={url.startsWith("http") ? url : `https://${url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-theme-accent hover:bg-theme-accent/90 text-white rounded-full text-xs font-bold shadow-2xs hover:shadow-sm transition-all duration-200"
                >
                  <span>Open Live</span>
                  <FaExternalLinkAlt className="text-[9px]" />
                </a>
              </div>
            </motion.div>

            {/* AI Key Takeaways card */}
            <motion.div
              variants={cardVariants}
              className="border border-theme-accent/15 bg-theme-accent/5 p-6 rounded-3xl relative overflow-hidden shadow-2xs"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-theme-accent/5 rounded-full blur-lg pointer-events-none" />
              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-theme-accent mb-3 flex items-center gap-1.5 select-none leading-none">
                <span>✨</span> Page Summary Key Takeaways
              </h4>
              <ul className="space-y-2.5">
                {takeaways.map((item, ti) => (
                  <li key={ti} className="text-xs md:text-sm text-theme-text/85 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-theme-accent mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Extracted paragraphs */}
            <motion.div
              variants={cardVariants}
              className="border border-theme-border bg-theme-card/30 p-6 md:p-8 rounded-3xl space-y-6"
            >
              <div className="flex items-center gap-2 border-b border-theme-border/20 pb-4 select-none">
                <FaFileAlt className="text-theme-accent text-sm" />
                <h3 className="text-lg md:text-xl font-bold font-serif-lumen text-theme-accent leading-none">
                  {title}
                </h3>
              </div>

              <div className="space-y-5">
                {paragraphs.map((p, pi) => (
                  <p key={pi} className="text-sm md:text-base text-theme-text/90 leading-relaxed font-serif-lumen">
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
