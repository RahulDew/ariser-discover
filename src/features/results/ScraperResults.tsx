import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGlobe,
  FaCheckCircle,
  FaFileAlt,
  FaExternalLinkAlt,
  FaTag,
  FaChevronDown,
  FaChevronUp,
  FaDownload,
  FaImage,
  FaExclamationTriangle
} from "react-icons/fa";
import { useWebpageQuery } from "../../hooks/useWebpageQuery";
import { QuotaExceeded } from "../../components/QuotaExceeded";

interface ScraperResultsProps {
  url: string;
  cardVariants: any;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const cleanKey = (key: string) =>
  key
    .replace(/^(og:|twitter:|fb:)/i, "")
    .replace(/[_:]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

const groupMeta = (meta: Record<string, string>) => {
  const skip = new Set([
    "og:image",
    "og:image:alt",
    "og:url",
    "og:description",
    "og:title",
    "twitter:description",
    "twitter:title",
  ]);
  const og: [string, string][] = [];
  const twitter: [string, string][] = [];
  const other: [string, string][] = [];

  for (const [k, v] of Object.entries(meta)) {
    if (!v || typeof v !== "string" || skip.has(k)) continue;
    if (k.startsWith("og:")) og.push([k, v]);
    else if (k.startsWith("twitter:")) twitter.push([k, v]);
    else other.push([k, v]);
  }
  return { og, twitter, other };
};

// ─── MetaBadge ────────────────────────────────────────────────────────────────

const MetaBadge: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col gap-1.5 p-3.5 bg-theme-card border border-theme-border rounded-2xl hover:border-theme-accent transition-colors duration-200 shadow-4xs">
    <span className="text-[9px] font-extrabold uppercase tracking-widest text-theme-accent leading-none">
      {label}
    </span>
    <span className="text-xs font-medium text-theme-text/80 leading-relaxed break-all line-clamp-3">
      {value}
    </span>
  </div>
);

// ─── TextContent ──────────────────────────────────────────────────────────────

const TextContent: React.FC<{ text: string; pageTitle?: string }> = ({ text, pageTitle }) => {
  const [open, setOpen] = useState(false);

  type Block = { type: "heading" | "paragraph"; content: string };

  const blocks = useMemo<Block[]>(() => {
    if (!text) return [];
    const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

    return lines.reduce<Block[]>((acc, line) => {
      // Skip: separator dashes, repeating page title, very short noise
      if (/^-{4,}$/.test(line)) return acc;
      if (pageTitle && line === pageTitle) return acc;
      if (line.length < 15) return acc;

      // Skip image alt-text lines — usually start with "A " and describe animations/screenshots
      if (/^A (demonstration|screenshot|photo|video|gif|graphic|diagram|image|preview|animation)/i.test(line)) return acc;

      // Detect heading: short line (≤12 words), no trailing punctuation, starts capital
      const words = line.split(" ").length;
      const isHeading = words <= 12 && !/[.!?,;:]$/.test(line) && /^[A-Z0-9]/.test(line) && line.length < 100;

      acc.push({ type: isHeading ? "heading" : "paragraph", content: line });
      return acc;
    }, []);
  }, [text, pageTitle]);

  const preview = blocks.slice(0, 7);
  const rest = blocks.slice(7);
  const wordCount = blocks.map((b) => b.content).join(" ").split(/\s+/).length;
  const readMins = Math.max(1, Math.round(wordCount / 200));

  return (
    <div className="border border-theme-border bg-theme-card/30 rounded-3xl overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-theme-border/40 bg-theme-card/50 flex items-center justify-between select-none">
        <div>
          <h3 className="text-sm font-bold text-theme-text/90">Extracted Webpage Content</h3>
          <p className="text-[10px] text-theme-text/40 mt-0.5 font-medium">
            {wordCount.toLocaleString()} words · ~{readMins} min read
          </p>
        </div>
      </div>
      <div className="relative px-6 py-8 md:px-8 space-y-5">
        <div className="space-y-4">
          {preview.map((block, i) =>
            block.type === "heading" ? (
              <h4 key={i} className="text-lg md:text-xl font-bold font-serif-lumen text-theme-accent pt-4 first:pt-0 leading-snug tracking-tight">
                {block.content}
              </h4>
            ) : (
              <p key={i} className="text-sm md:text-base text-theme-text/85 leading-[1.85] font-serif-lumen tracking-wide">
                {block.content}
              </p>
            )
          )}
        </div>
        
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 overflow-hidden pt-2"
            >
              {rest.map((block, i) =>
                block.type === "heading" ? (
                  <h4 key={i} className="text-lg md:text-xl font-bold font-serif-lumen text-theme-accent pt-4 leading-snug tracking-tight">
                    {block.content}
                  </h4>
                ) : (
                  <p key={i} className="text-sm md:text-base text-theme-text/85 leading-[1.85] font-serif-lumen tracking-wide">
                    {block.content}
                  </p>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic visual fade when collapsed */}
        {!open && rest.length > 0 && (
          <div 
            className="absolute bottom-[44px] left-0 right-0 h-28 pointer-events-none transition-all duration-300"
            style={{
              background: `linear-gradient(to top, var(--color-card-bg) 0%, transparent 100%)`
            }}
          />
        )}

        {rest.length > 0 && (
          <div className="pt-2 z-10 relative">
            <button 
              onClick={() => setOpen(!open)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-theme-accent/5 hover:bg-theme-accent/15 border border-theme-accent/15 hover:border-theme-accent text-xs font-bold text-theme-accent rounded-full transition-all select-none shadow-3xs"
            >
              {open
                ? <><FaChevronUp className="text-[9px]" /> Close Reader Mode</>
                : <><FaChevronDown className="text-[9px]" /> Read all {rest.length} sections</>
              }
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const ScraperResults: React.FC<ScraperResultsProps> = ({ url, cardVariants }) => {
  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;
  let domain = url;
  try { domain = new URL(normalizedUrl).hostname; } catch { /* keep raw */ }

  const { data, isLoading, isError, error } = useWebpageQuery(normalizedUrl, true);
  const [showMeta, setShowMeta] = useState(false);

  const handleDownload = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(blob),
      download: `${domain.replace(/\./g, "_")}_scraped.json`,
    });
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const meta: Record<string, string> = data?.metadata || {};
  const title: string = data?.title || meta["og:title"] || `Content from ${domain}`;
  const description: string = meta["og:description"] || meta["twitter:description"] || meta["description"] || "";
  const ogImage: string = meta["og:image"] || "";
  const ogImageAlt: string = meta["og:image:alt"] || title;
  const siteName: string = meta["og:site_name"] || domain;
  const pageUrl: string = meta["og:url"] || normalizedUrl;
  const rawText: string = data?.text || "";

  const { og, twitter, other } = useMemo(() => groupMeta(meta), [meta]);

  // Extract dynamic takeaways
  const takeaways = useMemo(() => {
    if (!rawText) return [];
    const lines = rawText
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 40 && !l.includes("---") && !/^A (demonstration|screenshot)/i.test(l));
    
    if (lines.length >= 3) {
      return lines.slice(0, 3);
    }
    return [
      description || "No description tags available for summary key takeaways.",
      "Lumen parsed the core page structure, social markup metadata, and image assets.",
      "Real-time DOM rendering proxy bypass successfully retrieved static text contents."
    ];
  }, [rawText, description]);

  const hasData = !!(title || description || rawText);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center space-y-5"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-theme-accent/20 border-t-theme-accent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <FaGlobe className="text-theme-accent text-lg animate-pulse" />
              </div>
            </div>
            <div>
              <p className="text-sm font-extrabold uppercase tracking-widest text-theme-accent animate-pulse">Deep Scanning Webpage...</p>
              <p className="text-xs text-theme-text/50 mt-1.5 leading-normal">
                Resolving DNS, proxying CORS, and extracting body copy from <span className="text-theme-accent font-semibold">{domain}</span>
              </p>
            </div>
          </motion.div>
        ) : isError ? (
          (error as Error)?.message === "QUOTA_EXCEEDED" ? (
            <QuotaExceeded isScraper={true} />
          ) : (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center space-y-4"
            >
              <span className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <FaExclamationTriangle className="text-2xl text-red-500" />
              </span>
              <p className="text-base font-bold text-theme-text/80">Deep Scrape Failed</p>
              <p className="text-sm text-theme-text/50 max-w-sm">{(error as Error)?.message || "The website rejected our scraper requests or has anti-bot firewalls."}</p>
              <a
                href={normalizedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-theme-accent hover:bg-theme-accent-hover text-white rounded-full text-sm font-bold shadow-sm transition-all"
              >
                Open Live Page <FaExternalLinkAlt className="text-[10px]" />
              </a>
            </motion.div>
          )
        ) : !hasData ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center space-y-4"
          >
            <span className="w-14 h-14 rounded-full bg-theme-accent/10 border border-theme-accent/25 flex items-center justify-center">
              <FaGlobe className="text-2xl text-theme-accent" />
            </span>
            <p className="text-base font-bold text-theme-text/80">No Content Extracted</p>
            <a
              href={normalizedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-theme-accent hover:bg-theme-accent-hover text-white rounded-full text-sm font-bold shadow-sm transition-all"
            >
              Open Live Page <FaExternalLinkAlt className="text-[10px]" />
            </a>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
            }}
            className="space-y-6"
          >
            {/* ── 1. Floating Toolbar ── */}
            <motion.div
              variants={cardVariants}
              className="p-4 border border-theme-border bg-theme-card/30 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 select-none shadow-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
                  alt=""
                  className="w-8 h-8 rounded-lg flex-shrink-0 bg-white p-1 border border-theme-border shadow-3xs"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div className="min-w-0">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-theme-accent block leading-none mb-1">Ariser Web Reader</span>
                  <a
                    href={pageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-theme-text/80 hover:text-theme-accent truncate block max-w-[240px] md:max-w-md transition-colors"
                  >
                    {pageUrl}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap flex-shrink-0 self-start md:self-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-theme-accent/10 border border-theme-accent/25 rounded-full text-[9px] font-extrabold uppercase tracking-widest text-theme-accent">
                  <FaCheckCircle className="text-[9px]" /> Deep Scanned
                </span>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-theme-card hover:bg-theme-accent/10 border border-theme-border hover:border-theme-accent text-theme-text/70 hover:text-theme-accent rounded-full text-xs font-bold transition-all shadow-3xs"
                  title="Download Raw Extracted JSON Data"
                >
                  <FaDownload className="text-[10px]" />
                  <span>JSON</span>
                </button>
                <a
                  href={normalizedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-theme-accent hover:bg-theme-accent-hover text-white rounded-full text-xs font-bold shadow-3xs hover:scale-102 transition-all duration-200"
                >
                  <span>Open Live</span>
                  <FaExternalLinkAlt className="text-[9px]" />
                </a>
              </div>
            </motion.div>

            {/* ── 2. Hero Card ── */}
            <motion.div
              variants={cardVariants}
              className="border border-theme-border bg-theme-card/30 rounded-3xl overflow-hidden shadow-sm"
            >
              {ogImage ? (
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-theme-card/50 overflow-hidden border-b border-theme-border">
                  <img
                    src={ogImage}
                    alt={ogImageAlt}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = "none"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              ) : null}
              
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-2 select-none">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${domain}&sz=16`}
                    alt=""
                    className="w-4 h-4 rounded"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-theme-text/50">{siteName}</span>
                </div>
                
                <h1 className="text-xl md:text-3xl font-bold font-serif-lumen text-theme-text leading-snug tracking-tight">
                  {title}
                </h1>
                
                {description && (
                  <p className="text-sm md:text-[15px] text-theme-text/65 leading-relaxed font-medium">
                    {description}
                  </p>
                )}
              </div>
            </motion.div>

            {/* ── 3. AI Takeaways Card ── */}
            {takeaways.length > 0 && (
              <motion.div
                variants={cardVariants}
                className="border border-theme-accent/15 bg-theme-accent/5 p-6 rounded-3xl relative overflow-hidden shadow-3xs"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-theme-accent/5 rounded-full blur-lg pointer-events-none" />
                <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-theme-accent mb-3.5 flex items-center gap-1.5 select-none leading-none">
                  <span>✨</span> Deep Scrape Key Takeaways
                </h4>
                <ul className="space-y-3">
                  {takeaways.map((item, ti) => (
                    <li key={ti} className="text-xs md:text-sm text-theme-text/80 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-theme-accent mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* ── 4. Collapsible Metadata Accordion ── */}
            {(og.length > 0 || twitter.length > 0 || other.length > 0) && (
              <motion.div
                variants={cardVariants}
                className="border border-theme-border bg-theme-card/30 rounded-3xl overflow-hidden shadow-3xs"
              >
                <button
                  onClick={() => setShowMeta(!showMeta)}
                  className="w-full px-6 py-4 bg-theme-card/50 flex items-center gap-2 select-none hover:bg-theme-card/70 transition duration-200 text-left border-none outline-none focus:outline-none"
                >
                  <FaTag className="text-theme-accent text-xs" />
                  <h3 className="text-sm font-bold text-theme-text/90">Page Metadata Tags Explorer</h3>
                  <span className="px-2 py-0.5 bg-theme-accent/10 border border-theme-accent/20 rounded-full text-[9px] font-extrabold uppercase tracking-widest text-theme-accent ml-2">
                    {og.length + twitter.length + other.length} Tags Detected
                  </span>
                  <span className="text-theme-accent ml-auto">
                    {showMeta ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
                  </span>
                </button>
                <AnimatePresence>
                  {showMeta && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 space-y-6 border-t border-theme-border/20 bg-theme-card/10">
                        {og.length > 0 && (
                          <div>
                            <p className="text-[9px] font-extrabold uppercase tracking-widest text-theme-accent/60 mb-3 select-none">Open Graph Protocol</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {og.map(([k, v]) => <MetaBadge key={k} label={cleanKey(k)} value={v} />)}
                            </div>
                          </div>
                        )}
                        {twitter.length > 0 && (
                          <div>
                            <p className="text-[9px] font-extrabold uppercase tracking-widest text-theme-accent/60 mb-3 select-none">Twitter Card Properties</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {twitter.map(([k, v]) => <MetaBadge key={k} label={cleanKey(k)} value={v} />)}
                            </div>
                          </div>
                        )}
                        {other.length > 0 && (
                          <div>
                            <p className="text-[9px] font-extrabold uppercase tracking-widest text-theme-accent/60 mb-3 select-none">Additional Metadata</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {other.map(([k, v]) => <MetaBadge key={k} label={cleanKey(k)} value={v} />)}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── 5. Page Text Content ── */}
            {rawText && (
              <motion.div variants={cardVariants}>
                <TextContent text={rawText} pageTitle={title} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
