import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy, FaMinus, FaPlus, FaSearch } from "react-icons/fa";

interface OrganicResult {
  title: string;
  link: string;
  snippet: string;
  date?: string;        // Real date from Serper API (present on some results)
  sitelinks?: { title: string; link: string }[];
}

interface RelatedSearch {
  query: string;
}

interface PeopleAlsoAskItem {
  question: string;
  snippet: string;
  title: string;
  link: string;
}

interface WebResultsProps {
  data: {
    organic?: OrganicResult[];
    peopleAlsoAsk?: PeopleAlsoAskItem[];
    relatedSearches?: RelatedSearch[];
  };
  cardVariants: any;
}

/**
 * WebResults — renders only real API data.
 * No fake summaries, no hardcoded dates, no synthetic fact cards.
 */
export const WebResults: React.FC<WebResultsProps> = ({ data, cardVariants }) => {
  const organicList = data?.organic || [];
  const serperPAA    = data?.peopleAlsoAsk || [];
  const relatedSearches = data?.relatedSearches || [];

  const [openAccordionIdx, setOpenAccordionIdx] = useState<number | null>(0);

  if (organicList.length === 0) {
    return <p className="text-theme-text opacity-60 text-center py-10">No web results found.</p>;
  }

  const handleCopyLink = (e: React.MouseEvent, link: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(link);
  };

  const getDomainHost = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  // Build breadcrumb path from URL (e.g. /wiki/Cherry_blossom → wiki › Cherry blossom)
  const getPathBreadcrumb = (url: string, domain: string) => {
    try {
      const path = new URL(url).pathname;
      if (!path || path === "/") return "";
      return path
        .replace(/^\//, "")
        .replace(/\/$/, "")
        .split("/")
        .map((seg) => seg.replace(/-|_/g, " "))
        .join(" › ");
    } catch {
      return "";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">

      {/* LEFT COLUMN: Organic results */}
      <div className="lg:col-span-8 space-y-3">
        {organicList.map((item, i) => {
          const domain        = getDomainHost(item.link);
          const displayDomain = domain.replace("www.", "");
          const breadcrumb    = getPathBreadcrumb(item.link, domain);
          const faviconLetter = displayDomain.charAt(0).toUpperCase();

          return (
            <motion.div
              key={i}
              variants={cardVariants}
              className="group border border-theme-border/40 px-5 py-4 rounded-2xl bg-theme-card/30 hover:bg-theme-card/55 backdrop-blur-sm shadow-2xs hover:shadow-xs transition-all duration-200"
            >
              {/* Domain breadcrumb row */}
              <div className="flex items-center justify-between mb-2 select-none">
                <div className="flex items-center gap-2 min-w-0">
                  {/* Favicon circle */}
                  <span className="w-5 h-5 rounded-full bg-theme-text/8 border border-theme-border text-theme-text/55 font-extrabold text-[10px] flex items-center justify-center flex-shrink-0">
                    {faviconLetter}
                  </span>
                  <span className="text-xs text-theme-text/60 font-medium truncate">
                    {displayDomain}
                    {breadcrumb && (
                      <span className="opacity-50 font-normal"> › {breadcrumb}</span>
                    )}
                  </span>
                </div>

                {/* Copy link — appears on hover */}
                <button
                  onClick={(e) => handleCopyLink(e, item.link)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-theme-text/40 hover:text-theme-accent hover:bg-theme-accent/10 rounded-full transition-all duration-150 flex-shrink-0"
                  title="Copy link"
                >
                  <FaCopy className="text-[10px]" />
                </button>
              </div>

              {/* Title */}
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="block mb-1.5">
                <h3 className="text-lg font-bold text-theme-accent hover:underline leading-snug transition-colors duration-150 line-clamp-2">
                  {item.title}
                </h3>
              </a>

              {/* Snippet */}
              <p className="text-sm text-theme-text/75 leading-relaxed line-clamp-3">
                {item.snippet}
              </p>

              {/* Real date from API — only shown if the API actually provides it */}
              {item.date && (
                <p className="mt-2 text-[11px] text-theme-text/40 font-medium select-none">
                  {item.date}
                </p>
              )}

              {/* Sitelinks — shown only when Serper returns them (usually for top branded results) */}
              {item.sitelinks && item.sitelinks.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.sitelinks.slice(0, 4).map((sl, si) => (
                    <a
                      key={si}
                      href={sl.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-full border border-theme-border bg-theme-card/50 text-xs text-theme-accent font-semibold hover:bg-theme-accent/10 transition"
                    >
                      {sl.title}
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* RIGHT COLUMN: People Also Ask (only if API returns real ones) */}
      <div className="lg:col-span-4 space-y-6">

        {serperPAA.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-theme-text/40 pl-1 leading-none select-none">
              People Also Ask
            </h4>

            <div className="border border-theme-border bg-theme-card/30 rounded-2xl overflow-hidden shadow-2xs">
              {serperPAA.slice(0, 4).map((item, idx) => {
                const isOpen = openAccordionIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`border-theme-border/20 ${idx !== Math.min(serperPAA.length, 4) - 1 ? "border-b" : ""}`}
                  >
                    <button
                      onClick={() => setOpenAccordionIdx(isOpen ? null : idx)}
                      className="w-full text-left px-4 py-3.5 flex items-center justify-between gap-3 text-xs font-semibold text-theme-text hover:text-theme-accent transition"
                    >
                      <span>{item.question}</span>
                      <span className="flex-shrink-0 text-theme-accent/70">
                        {isOpen ? <FaMinus className="text-[9px]" /> : <FaPlus className="text-[9px]" />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.18, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 text-xs text-theme-text/80 leading-relaxed border-t border-theme-border/10 pt-3 space-y-2">
                            <p>{item.snippet}</p>
                            <div className="flex items-center justify-between">
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-theme-accent font-semibold hover:underline truncate max-w-[80%] text-[10px]"
                              >
                                {item.title}
                              </a>
                              <button
                                onClick={(e) => handleCopyLink(e, item.link)}
                                className="text-theme-text/40 hover:text-theme-accent p-1 rounded-full hover:bg-theme-accent/10 transition"
                                title="Copy link"
                              >
                                <FaCopy className="text-[9px]" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Related Searches — full width at bottom, only if API returns them */}
      {relatedSearches.length > 0 && (
        <motion.div
          variants={cardVariants}
          className="col-span-1 lg:col-span-12 border-t border-theme-border/30 pt-6 mt-2"
        >
          <h4 className="text-xs font-bold text-theme-text/50 mb-4 select-none uppercase tracking-widest">
            Related Searches
          </h4>
          <div className="flex flex-wrap gap-2 select-none">
            {relatedSearches.map((term, i) => (
              <motion.div key={i} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/search"
                  search={{ q: term.query, type: "search" }}
                  className="px-4 py-2 bg-theme-card hover:bg-theme-accent/10 border border-theme-border text-theme-text hover:text-theme-accent rounded-full text-xs font-semibold shadow-2xs transition flex items-center gap-1.5"
                >
                  <FaSearch className="text-[9px] text-theme-accent/70" />
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
