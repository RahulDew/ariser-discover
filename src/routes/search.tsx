import React, { useState, useEffect } from "react";
import { createRoute, useRouter } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";
import { useSearchQuery } from "../hooks/useSearchQuery";
import { useAppStore } from "../store/useAppStore";
import { SearchHeader } from "../components/SearchHeader";
import { SearchTabs } from "../components/SearchTabs";
import { WebResults } from "../features/results/WebResults";
import { ImageResults } from "../features/results/ImageResults";
import { VideoResults } from "../features/results/VideoResults";
import { NewsResults } from "../features/results/NewsResults";
import { ShoppingResults } from "../features/results/ShoppingResults";
import { ScholarResults } from "../features/results/ScholarResults";
import { ScraperResults } from "../features/results/ScraperResults";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaGlobe, FaImage, FaRegNewspaper, FaVideo, FaShoppingCart, FaGraduationCap, FaTimes, FaArrowLeft, FaPalette } from "react-icons/fa";
import { Link } from "@tanstack/react-router";
import Loading from "../components/Loading";
import { NoData } from "../components/NoData";
import { QuotaExceeded } from "../components/QuotaExceeded";
import Footer from "../components/Footer";

export const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  validateSearch: (search) => ({
    q: (search.q as string) || "",
    type: (search.type as string) || "search", 
    hl: (search.hl as string) || "en",
    gl: (search.gl as string) || "us",
    tbs: (search.tbs as string) || "anytime",
    batch: (search.batch === "true" || search.batch === true) ? true : false,
    scrape: (search.scrape === "true" || search.scrape === true) ? true : false,
  }),
  component: SearchComponent,
});

function SearchComponent() {
  const router = useRouter();
  const { q, type, hl, gl, tbs, batch, scrape } = searchRoute.useSearch();
  const [inputVal, setInputVal] = useState(q);
  const [page, setPage] = useState(1);
  const [activeBatchIndex, setActiveBatchIndex] = useState(0);
  const [scrapeMode, setScrapeMode] = useState(scrape);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setInputVal(q);
    setPage(1); 
    setActiveBatchIndex(0); 
    setScrapeMode(scrape);
  }, [q, scrape]);

  useEffect(() => {
    if (!inputVal.trim()) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(inputVal)}`);
        const data = await res.json();
        setSuggestions(data[1] || []);
      } catch (e) {
        console.error("Autocomplete failed:", e);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [inputVal]);

  const handleScrapeModeToggle = (val: boolean) => {
    setScrapeMode(val);
    router.navigate({
      to: "/search",
      search: { q, type, hl, gl, tbs, batch, scrape: val },
      replace: true,
    });
  };

  const isUrl = (q.startsWith("http://") || q.startsWith("https://")) ||
    (!q.includes(" ") && q.includes(".") && q.length > 4);
  const shouldScrape = scrape && isUrl;

  const { data, isLoading, isError, error } = useSearchQuery(q, type, page, hl, gl, tbs, batch, !shouldScrape);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    router.navigate({
      to: "/search",
      search: {
        q: inputVal.trim(),
        type,
        hl,
        gl,
        tbs,
        batch,
        scrape: scrapeMode,
      },
    });
  };

  const handleTabChange = (nextType: string) => {
    router.navigate({
      to: "/search",
      search: {
        q,
        type: nextType,
        hl,
        gl,
        tbs,
        batch,
        scrape: scrapeMode,
      },
    });
    setPage(1);
  };

  const fastScrollToTop = () => {
    const scrollStep = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 1) {
        window.requestAnimationFrame(scrollStep);
        window.scrollTo(0, c - c / 5);
      } else {
        window.scrollTo(0, 0);
      }
    };
    window.requestAnimationFrame(scrollStep);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 450, damping: 32 }
    }
  };

  const renderResultsDispatcher = () => {
    const isUrl = (q.startsWith("http://") || q.startsWith("https://")) ||
      (!q.includes(" ") && q.includes(".") && q.length > 4);

    if (scrape && isUrl) {
      return <ScraperResults url={q} cardVariants={cardVariants} />;
    }

    if (!data) return <NoData resultType={type} />;

    const activeData = Array.isArray(data) ? data[activeBatchIndex] : data;

    if (!activeData) return <NoData resultType={type} />;

    switch (type) {
      case "images":
        return <ImageResults data={activeData} cardVariants={cardVariants} />;
      case "videos":
        return <VideoResults data={activeData} cardVariants={cardVariants} />;
      case "news":
        return <NewsResults data={activeData} cardVariants={cardVariants} />;
      case "shopping":
        return <ShoppingResults data={activeData} cardVariants={cardVariants} />;
      case "scholar":
        return <ScholarResults data={activeData} cardVariants={cardVariants} />;
      case "search":
      default:
        return <WebResults data={activeData} cardVariants={cardVariants} />;
    }
  };

  const activeDataForStats = Array.isArray(data) ? data[activeBatchIndex] : data;

  const liveResultCount = activeDataForStats?.searchInformation?.totalResults
    ? Number(activeDataForStats.searchInformation.totalResults).toLocaleString()
    : null;

  const liveSearchTime = activeDataForStats?.searchInformation?.timeTaken
    ? `${activeDataForStats.searchInformation.timeTaken.toFixed(2)}s`
    : null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="min-h-screen flex flex-col justify-between bg-theme-bg transition-colors duration-300 relative"
    >
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-theme-accent/5 blur-[100px] pointer-events-none select-none transition-colors duration-300" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-theme-text/3 blur-[90px] pointer-events-none select-none transition-colors duration-300" />
      </div>

      <div className="z-10 w-full">
        <SearchHeader 
          type={type} 
          inputVal={inputVal} 
          setInputVal={setInputVal} 
          onSubmit={handleSearchSubmit} 
          scrapeMode={scrapeMode}
          setScrapeMode={handleScrapeModeToggle}
        />

        <SearchTabs 
          type={type} 
          onTabChange={handleTabChange} 
          hl={hl}
          gl={gl}
          tbs={tbs}
          batch={batch}
          onFiltersChange={(nextFilters) => {
            router.navigate({
              to: "/search",
              search: {
                q,
                type,
                hl: nextFilters.hl ?? hl,
                gl: nextFilters.gl ?? gl,
                tbs: nextFilters.tbs ?? tbs,
                batch: nextFilters.batch ?? batch,
              },
            });
            setPage(1);
          }}
          totalResults={data?.searchInformation?.totalResults}
        />
      </div>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 pt-6 pb-24 md:pb-6 md:px-8 z-10 min-w-0">
        
        {q && !isLoading && !isError && liveResultCount && (
          <div className="text-xs text-theme-text/50 font-medium mb-5 select-none animate-fade-in pl-1">
            About {liveResultCount} results • {liveSearchTime}
          </div>
        )}

        {q && !isLoading && !isError && Array.isArray(data) && data.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-1.5 bg-theme-card/30 border border-theme-border/60 rounded-2xl w-fit select-none">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-theme-text opacity-45 px-3">
              Batch Queries:
            </span>
            {data.map((item, idx) => {
              const queryStr = item?.searchParameters?.q || `Query ${idx + 1}`;
              const isActive = activeBatchIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveBatchIndex(idx)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-theme-accent text-white shadow-sm"
                      : "text-theme-text/80 hover:text-theme-accent hover:bg-theme-accent/5"
                  }`}
                >
                  {queryStr}
                </button>
              );
            })}
          </div>
        )}

        <div>
          {!q ? (
            <motion.div 
              key="no-query"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-24 text-gray-400 dark:text-neutral-500"
            >
              <FaSearch className="text-6xl mb-4 text-theme-accent opacity-30" />
              <p className="text-lg font-medium">Please enter a search query above to begin.</p>
            </motion.div>
          ) : shouldScrape ? (
            <motion.div
              key={`${q}-${type}-${page}-${activeBatchIndex}`}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.03,
                  },
                },
              }}
            >
              {renderResultsDispatcher()}
            </motion.div>
          ) : isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full py-6"
            >
              <Loading />
            </motion.div>
          ) : isError ? (
            error?.message === "QUOTA_EXCEEDED" ? (
              <QuotaExceeded />
            ) : (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 p-6 rounded-2xl max-w-lg mx-auto mt-10 shadow-sm"
              >
                <h3 className="font-bold text-lg mb-2 flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2.5 animate-pulse" />
                  Search failed
                </h3>
                <p className="text-sm">{error?.message || "An unexpected error occurred."}</p>
              </motion.div>
            )
          ) : (
            <motion.div
              key={`${q}-${type}-${page}-${activeBatchIndex}`}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.03,
                  },
                },
              }}
            >
              {renderResultsDispatcher()}
            </motion.div>
          )}
        </div>

        {q && !isLoading && !isError && data && (
          <div className="flex items-center justify-center gap-2 mt-10 mb-4 select-none flex-wrap">
            <button
              onClick={() => { setPage((p) => Math.max(1, p - 1)); fastScrollToTop(); }}
              disabled={page === 1}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-theme-border bg-theme-card/40 text-theme-text text-sm font-bold hover:bg-theme-accent/10 hover:border-theme-accent/40 hover:text-theme-accent transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-theme-card/40 disabled:hover:text-theme-text disabled:hover:border-theme-border"
            >
              ← Prev
            </button>

            {[...Array(5)].map((_, i) => {
              const pageNum = Math.max(1, page - 2) + i;
              const isActive = pageNum === page;
              return (
                <button
                  key={pageNum}
                  onClick={() => { setPage(pageNum); fastScrollToTop(); }}
                  className={`w-9 h-9 rounded-full text-sm font-bold transition-all duration-150 ${
                    isActive
                      ? "bg-theme-accent text-white shadow-md scale-110"
                      : "border border-theme-border bg-theme-card/40 text-theme-text hover:bg-theme-accent/10 hover:text-theme-accent hover:border-theme-accent/40"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => { setPage((p) => p + 1); fastScrollToTop(); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-theme-border bg-theme-card/40 text-theme-text text-sm font-bold hover:bg-theme-accent/10 hover:border-theme-accent/40 hover:text-theme-accent transition-all duration-150"
            >
              Next →
            </button>
          </div>
        )}
      </main>

      <div className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-40 flex justify-center w-full max-w-[95vw] md:hidden px-4">
        <Link
          to="/customize"
          className="flex items-center gap-2.5 px-5 py-3 bg-theme-accent/15 hover:bg-theme-accent/25 border border-theme-accent/25 backdrop-blur-md rounded-full shadow-md text-theme-accent hover:scale-105 active:scale-95 transition-all duration-200 font-bold text-sm tracking-wide select-none"
        >
          <FaPalette className="text-base text-theme-accent" />
          <span className="text-theme-accent">Customize</span>
        </Link>
      </div>

      <Footer />
    </motion.div>
  );
}
