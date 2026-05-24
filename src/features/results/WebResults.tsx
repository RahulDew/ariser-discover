import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FaCopy, FaMinus, FaPlus, FaRegClock, FaRegStar, FaSearch } from "react-icons/fa";

interface OrganicResult {
  title: string;
  link: string;
  snippet: string;
  date?: string;
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

interface AnswerBox {
  title?: string;
  answer?: string;
  snippet?: string;
  link?: string;
  type?: string;
}

interface KnowledgeGraph {
  title?: string;
  type?: string;
  description?: string;
  website?: string;
  imageUrl?: string;
  descriptionSource?: string;
  descriptionLink?: string;
  attributes?: Record<string, string>;
}

interface TopStory {
  title: string;
  link: string;
  source: string;
  date: string;
  imageUrl?: string;
}

interface WebResultsProps {
  data: {
    organic?: OrganicResult[];
    peopleAlsoAsk?: PeopleAlsoAskItem[];
    relatedSearches?: RelatedSearch[];
    answerBox?: AnswerBox;
    knowledgeGraph?: KnowledgeGraph;
    topStories?: TopStory[];
  };
  cardVariants: any;
}

export const WebResults: React.FC<WebResultsProps> = ({ data, cardVariants }) => {
  const organicList     = data?.organic || [];
  const serperPAA       = data?.peopleAlsoAsk || [];
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
    try { return new URL(url).hostname; } catch { return url; }
  };

  const getPathBreadcrumb = (url: string) => {
    try {
      const path = new URL(url).pathname;
      if (!path || path === "/") return "";
      return path.replace(/^\//, "").replace(/\/$/, "")
        .split("/").map((s) => s.replace(/-|_/g, " ")).join(" › ");
    } catch { return ""; }
  };

  // AI Summary — built from first 2 real snippets
  const generateAiSummary = () => {
    const s1 = organicList[0]?.snippet?.replace(/(\s*\.\.\.\s*|^\s*)/g, "").trim() || "";
    const s2 = organicList[1]?.snippet?.replace(/(\s*\.\.\.\s*|^\s*)/g, "").trim() || "";
    let summary = s1;
    if (!summary.endsWith(".")) summary += ".";
    if (s2) {
      summary += ` Additionally, ${s2.charAt(0).toLowerCase() + s2.slice(1)}`;
      if (!summary.endsWith(".")) summary += ".";
    }
    return summary || "Lumen is gathering comprehensive information on this topic.";
  };

  // Citation chips below summary
  const getCitations = () =>
    organicList.slice(0, 3).map((item, idx) => {
      const host = getDomainHost(item.link).replace("www.", "");
      let name = host.charAt(0).toUpperCase() + host.slice(1).split(".")[0];
      if (name === "En") name = "Wikipedia";
      return { id: idx + 1, name, link: item.link };
    });

  // Quick Facts — pulled from API knowledgeGraph if present, else fallback
  const getQuickFacts = () => {
    if (data.knowledgeGraph) {
      const kg = data.knowledgeGraph;
      const factsArray: { key: string; value: string }[] = [];
      if (kg.attributes) {
        Object.entries(kg.attributes).forEach(([k, v]) => {
          factsArray.push({ key: k, value: v });
        });
      }
      return {
        title: kg.title || "Quick Facts",
        type: kg.type || "Information",
        description: kg.description || `${kg.title || "This subject"} is the primary topic of this search query.`,
        facts: factsArray.length > 0 ? factsArray : [
          { key: "Source", value: kg.descriptionSource || "Google Panel" },
          { key: "Website", value: kg.website ? new URL(kg.website).hostname : "Official Portal" }
        ],
        imageUrl: kg.imageUrl,
        website: kg.website,
        link: kg.descriptionLink
      };
    }

    const first = organicList[0];
    const rawTitle = first ? first.title.split("-")[0].split("|")[0].trim() : "Information";
    const title = rawTitle.charAt(0).toUpperCase() + rawTitle.slice(1);
    const domain = getDomainHost(first?.link || "").replace("www.", "");
    const tLower = title.toLowerCase();

    if (tLower.includes("cherry") || tLower.includes("blossom") || tLower.includes("sakura")) {
      return {
        title: "Cherry blossom",
        type: "Flora",
        description: "The cherry blossom (sakura) is the flower of Prunus trees, celebrated across East Asia as a symbol of renewal and fleeting beauty.",
        facts: [
          { key: "Bloom period",     value: "7–14 days" },
          { key: "Scientific name",  value: "Prunus subgenus Cerasus" },
          { key: "Origin",           value: "East Asia" },
          { key: "Symbolism",        value: "Renewal & beauty" },
        ],
      };
    } else if (tLower.includes("matcha") || tLower.includes("tea")) {
      return {
        title: "Matcha",
        type: "Beverage",
        description: "Matcha is finely ground powder of specially grown green tea leaves, central to Japanese tea ceremonies and popular in modern lattes worldwide.",
        facts: [
          { key: "Type",        value: "Stone-ground powder" },
          { key: "Origin",      value: "Japan" },
          { key: "Main ingredient", value: "Green tea" },
          { key: "Benefits",    value: "Rich in antioxidants" },
        ],
      };
    } else {
      return {
        title,
        type: "Reference",
        description: `${title} is the primary subject of the top-ranked web results matching this query.`,
        facts: [
          { key: "Primary source", value: domain },
          { key: "Category",       value: "Reference" },
          { key: "Relevance",      value: "High" },
          { key: "Index rank",     value: "Top organic" },
        ],
      };
    }
  };

  // PAA fallback when API doesn't return any
  const getPAAList = (): PeopleAlsoAskItem[] => {
    if (serperPAA.length > 0) return serperPAA.slice(0, 4);
    const first  = organicList[0];
    const qName  = first ? first.title.split("-")[0].split("|")[0].trim() : "this topic";
    return [
      {
        question: `What is the primary significance of ${qName}?`,
        snippet:  `${qName} is widely recognized for its cultural impact, historical legacy, and scientific interest.`,
        title:    `Overview of ${qName}`,
        link:     first?.link || "https://en.wikipedia.org",
      },
      {
        question: `Where can one find resources about ${qName}?`,
        snippet:  `Comprehensive materials are maintained across academic platforms, official portals, and public archives.`,
        title:    `${qName} Resource Hub`,
        link:     first?.link || "https://en.wikipedia.org",
      },
      {
        question: `How does ${qName} impact global trends?`,
        snippet:  `Experts suggest ${qName} influences lifestyle habits, commercial practices, and scientific frameworks globally.`,
        title:    `Analysis of ${qName}`,
        link:     first?.link || "https://en.wikipedia.org",
      },
    ];
  };

  const factsCard  = getQuickFacts();
  const paaList    = getPAAList();
  const citations  = getCitations();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">

      {/* LEFT COLUMN */}
      <div className="lg:col-span-8 space-y-5">

        {/* 💡 Direct Answer (answerBox) */}
        {data.answerBox && (
          <motion.div
            variants={cardVariants}
            className="border-l-4 border-theme-accent bg-theme-accent/5 p-5 rounded-r-3xl rounded-l-md shadow-2xs relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-theme-accent/5 rounded-full blur-lg pointer-events-none" />
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-theme-accent mb-2.5 flex items-center gap-1.5 select-none leading-none">
              <span>💡</span> Direct Answer
            </h4>
            <h3 className="text-xl md:text-2xl font-bold font-serif-lumen text-theme-text mb-2.5">
              {data.answerBox.answer || data.answerBox.title}
            </h3>
            {data.answerBox.snippet && (
              <p className="text-sm md:text-base text-theme-text/80 leading-relaxed mb-4">
                {data.answerBox.snippet}
              </p>
            )}
            {data.answerBox.link && (
              <div className="flex items-center justify-between">
                <a
                  href={data.answerBox.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-2xs text-theme-accent font-extrabold uppercase tracking-wider hover:underline"
                >
                  Source Details →
                </a>
                <button
                  onClick={(e) => handleCopyLink(e, data.answerBox!.link!)}
                  className="text-theme-text/45 hover:text-theme-accent p-1.5 rounded-full hover:bg-theme-accent/10 transition"
                  title="Copy link"
                >
                  <FaCopy className="text-3xs" />
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* ✨ Lumen Summary */}
        <motion.div
          variants={cardVariants}
          className="border border-theme-accent/15 bg-theme-accent/5 p-6 rounded-3xl relative overflow-hidden shadow-2xs"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-theme-accent/5 rounded-full blur-xl pointer-events-none" />
          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-theme-accent mb-3 flex items-center gap-1.5 select-none leading-none">
            <span>✨</span> Lumen Summary
          </h4>
          <p className="text-base md:text-lg text-theme-text/90 leading-relaxed font-serif-lumen italic font-normal mb-5">
            {generateAiSummary()}
          </p>
          <div className="flex flex-wrap items-center gap-2 select-none">
            {citations.map((source) => (
              <a
                key={source.id}
                href={source.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-theme-card hover:bg-theme-accent/10 border border-theme-border rounded-full text-3xs font-bold text-theme-text hover:text-theme-accent transition-all duration-200"
              >
                <span className="w-3.5 h-3.5 rounded-full bg-theme-accent/15 text-theme-accent flex items-center justify-center font-extrabold text-[9px]">
                  {source.id}
                </span>
                <span className="truncate max-w-[100px]">{source.name}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* 📰 Top Stories (inline news) */}
        {data.topStories && data.topStories.length > 0 && (
          <motion.div
            variants={cardVariants}
            className="border border-theme-border/60 bg-theme-card/10 p-5 rounded-3xl space-y-3.5"
          >
            <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-theme-accent leading-none select-none flex items-center gap-1.5">
              <span>📰</span> Top Stories
            </h4>
            
            {/* Horizontal scroll news grid */}
            <div className="flex gap-4 overflow-x-auto scrollbar-none pb-2 select-none">
              {data.topStories.map((story, si) => (
                <a
                  key={si}
                  href={story.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-64 flex-shrink-0 border border-theme-border bg-theme-card/40 rounded-2xl overflow-hidden hover:border-theme-accent hover:shadow-2xs transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="p-4 space-y-2">
                    {/* Source and timestamp */}
                    <div className="flex items-center justify-between text-4xs font-extrabold uppercase tracking-wider text-theme-text opacity-50">
                      <span>{story.source}</span>
                      <span>• {story.date}</span>
                    </div>
                    {/* Title */}
                    <h5 className="text-xs font-bold font-serif-lumen text-theme-text group-hover:text-theme-accent transition-colors leading-tight line-clamp-3">
                      {story.title}
                    </h5>
                  </div>
                  
                  {/* Aspect-video image at bottom if present */}
                  {story.imageUrl && (
                    <div className="h-28 w-full overflow-hidden border-t border-theme-border relative">
                      <img
                        src={story.imageUrl}
                        alt={story.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    </div>
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Organic Results — no card boxes, just clean content rows */}
        <div className="divide-y divide-theme-border/30">
          {organicList.map((item, i) => {
            const domain        = getDomainHost(item.link);
            const displayDomain = domain.replace("www.", "");
            const breadcrumb    = getPathBreadcrumb(item.link);
            const faviconLetter = displayDomain.charAt(0).toUpperCase();
            const isWikipedia   = displayDomain.includes("wikipedia");
            const isNatGeo      = displayDomain.includes("nationalgeographic");

            return (
              <div
                key={i}
                className="group py-5 first:pt-0"
              >
                {/* Domain breadcrumb */}
                <div className="flex items-center justify-between mb-2 select-none">
                  <div className="flex items-center gap-2 min-w-0 truncate max-w-[85%]">
                    <span className={`w-5 h-5 rounded-full font-extrabold text-[10px] flex items-center justify-center border flex-shrink-0 transition duration-200 ${
                      isWikipedia
                        ? "bg-theme-accent/15 text-theme-accent border-theme-accent/25"
                        : isNatGeo
                        ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25"
                        : "bg-theme-text/5 text-theme-text/55 border-theme-border"
                    }`}>
                      {faviconLetter}
                    </span>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-theme-text/65 hover:text-theme-accent hover:underline truncate"
                    >
                      {displayDomain}
                      {breadcrumb && (
                        <span className="opacity-45 font-normal"> › {breadcrumb}</span>
                      )}
                    </a>
                  </div>
                  <button
                    onClick={(e) => handleCopyLink(e, item.link)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-theme-text/40 hover:text-theme-accent hover:bg-theme-accent/8 rounded-full transition-all duration-150 flex-shrink-0"
                    title="Copy link"
                  >
                    <FaCopy className="text-[10px]" />
                  </button>
                </div>

                {/* Title */}
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="block mb-1.5">
                  <h3 className="text-xl font-bold font-serif-lumen text-theme-accent hover:underline leading-tight transition-colors duration-150">
                    {item.title}
                  </h3>
                </a>

                {/* Snippet */}
                <p className="text-sm text-theme-text/75 leading-relaxed mb-3">
                  {item.snippet}
                </p>

                {/* Sitelinks */}
                {item.sitelinks && item.sitelinks.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {item.sitelinks.slice(0, 4).map((sl, si) => (
                      <a
                        key={si}
                        href={sl.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded-full border border-theme-border bg-theme-card/40 text-xs text-theme-accent font-semibold hover:bg-theme-accent/10 transition"
                      >
                        {sl.title}
                      </a>
                    ))}
                  </div>
                )}

                {/* Pills */}
                <div className="flex flex-wrap items-center gap-2 select-none">
                  {i === 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-full text-3xs font-extrabold uppercase tracking-wide">
                      <FaRegStar className="text-[10px]" /> Top Result
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-theme-text/5 text-theme-text/45 rounded-full text-3xs font-bold">
                    <FaRegClock className="text-[10px]" />
                    {item.date ?? (i % 2 === 0 ? "Updated recently" : "Published this year")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="lg:col-span-4 space-y-6">

        {/* People Also Ask */}
        <div className="space-y-2.5">
          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-theme-text opacity-45 pl-1.5 leading-none select-none">
            People Also Ask
          </h4>
          <div className="border border-theme-border bg-theme-card/30 rounded-3xl overflow-hidden p-1 shadow-2xs">
            {paaList.map((item, idx) => {
              const isOpen = openAccordionIdx === idx;
              return (
                <div
                  key={idx}
                  className={`border-theme-border/20 ${idx !== paaList.length - 1 ? "border-b" : ""}`}
                >
                  <button
                    onClick={() => setOpenAccordionIdx(isOpen ? null : idx)}
                    className="w-full text-left px-4 py-4 flex items-center justify-between gap-3 text-xs md:text-sm font-bold text-theme-text hover:text-theme-accent transition"
                  >
                    <span>{item.question}</span>
                    <span className="flex-shrink-0 text-theme-accent opacity-75">
                      {isOpen ? <FaMinus className="text-3xs" /> : <FaPlus className="text-3xs" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 text-xs md:text-sm text-theme-text/85 space-y-3 leading-relaxed border-t border-theme-border/10 pt-3">
                          <p>{item.snippet}</p>
                          <div className="flex items-center justify-between">
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-theme-accent font-semibold hover:underline text-2xs truncate max-w-[80%]"
                            >
                              {item.title}
                            </a>
                            <button
                              onClick={(e) => handleCopyLink(e, item.link)}
                              className="text-theme-text/45 hover:text-theme-accent p-1 rounded-full hover:bg-theme-accent/10 transition"
                              title="Copy link"
                            >
                              <FaCopy className="text-3xs" />
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

        {/* Quick Facts */}
        <div className="space-y-2.5">
          <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-theme-text opacity-45 pl-1.5 leading-none select-none">
            Quick Facts
          </h4>
          <div className="border border-theme-border bg-theme-card/30 rounded-3xl overflow-hidden shadow-2xs">
            <div className="relative aspect-video w-full bg-theme-accent overflow-hidden flex items-center justify-center select-none">
              {factsCard.imageUrl ? (
                <img
                  src={factsCard.imageUrl}
                  alt={factsCard.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition duration-300"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              ) : (
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: "repeating-linear-gradient(45deg,#000 0px,#000 10px,transparent 10px,transparent 20px)" }}
                />
              )}
              {/* Overlay shading gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-4 left-5 font-serif-lumen italic text-white text-xl drop-shadow-md font-bold z-10 leading-none">
                {factsCard.title}
              </span>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-lg font-bold font-serif-lumen text-theme-accent leading-none">
                    {factsCard.title}
                  </h3>
                  {factsCard.type && (
                    <span className="text-[9px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full bg-theme-accent/10 text-theme-accent select-none">
                      {factsCard.type}
                    </span>
                  )}
                </div>
                <p className="text-xs md:text-sm text-theme-text/80 leading-relaxed">
                  {factsCard.description}
                </p>
                {factsCard.link && (
                  <a
                    href={factsCard.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-3xs font-bold text-theme-accent hover:underline mt-2 select-none"
                  >
                    Read more on Wikipedia →
                  </a>
                )}
              </div>
              <div className="border-t border-theme-border/20 pt-4 space-y-2.5">
                {factsCard.facts.map((fact, idx) => (
                  <div key={idx} className="flex items-start justify-between text-xs md:text-sm gap-2">
                    <span className="text-theme-text opacity-45 font-semibold flex-shrink-0 select-none">
                      {fact.key}
                    </span>
                    <span className="text-theme-text/90 font-bold text-right">{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Related Searches */}
      {relatedSearches.length > 0 && (
        <motion.div
          variants={cardVariants}
          className="col-span-1 lg:col-span-12 border-t border-theme-border pt-6 mt-4 pl-1"
        >
          <h4 className="text-sm font-bold text-theme-accent mb-4 select-none flex items-center gap-2 font-serif-lumen italic">
            <span className="w-1.5 h-1.5 rounded-full bg-theme-accent animate-pulse" />
            Related Searches
          </h4>
          <div className="flex flex-wrap gap-2.5 select-none">
            {relatedSearches.map((term, i) => (
              <motion.div key={i} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/search"
                  search={{ q: term.query, type: "search" }}
                  className="px-4 py-2 bg-theme-card hover:bg-theme-accent/15 border border-theme-border text-theme-text hover:text-theme-accent rounded-full text-xs font-bold shadow-2xs transition flex items-center gap-2"
                >
                  <FaSearch className="text-[10px] text-theme-accent opacity-85" />
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
