import React, { useState, useEffect } from "react";
import { createRoute, useRouter } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";
import { useSearchQuery } from "../hooks/useSearchQuery";
import { SearchHeader } from "../components/SearchHeader";
import { SearchTabs } from "../components/SearchTabs";
import { WebResults } from "../features/results/WebResults";
import { ImageResults } from "../features/results/ImageResults";
import { VideoResults } from "../features/results/VideoResults";
import { NewsResults } from "../features/results/NewsResults";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

// Programmatic route validation and parameter tracking
export const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  validateSearch: (search) => ({
    q: (search.q as string) || "",
    type: (search.type as string) || "search", // Default to 'search' (All)
  }),
  component: SearchComponent,
});

/**
 * Senior Developer Page Orchestrator: SearchComponent
 * Acts as the Container page that retrieves search parameters, coordinates data queries, 
 * and distributes results to granular, isolated rendering components.
 */
function SearchComponent() {
  const router = useRouter();
  const { q, type } = searchRoute.useSearch();
  const [inputVal, setInputVal] = useState(q);

  // Sync state with URL parameter updates (e.g. back navigation or click-pills)
  useEffect(() => {
    setInputVal(q);
  }, [q]);

  // Execute Search query hook
  const { data, isLoading, isError, error } = useSearchQuery(q, type);

  // Form search query submissions
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    router.navigate({
      to: "/search",
      search: {
        q: inputVal.trim(),
        type,
      },
    });
  };

  // Safe tab switches
  const handleTabChange = (nextType: string) => {
    router.navigate({
      to: "/search",
      search: {
        q,
        type: nextType,
      },
    });
  };

  // Framer Motion Spring Animations for cascading list cards
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  /**
   * Helper dispatcher to choose the correct modular results view
   */
  const renderResultsDispatcher = () => {
    if (!data) return <p className="text-gray-400 text-center py-10">No results found.</p>;

    switch (type) {
      case "images":
        return <ImageResults data={data} cardVariants={cardVariants} />;
      case "videos":
        return <VideoResults data={data} cardVariants={cardVariants} />;
      case "news":
        return <NewsResults data={data} cardVariants={cardVariants} />;
      case "search":
      default:
        return <WebResults data={data} cardVariants={cardVariants} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-sky-50/10 dark:bg-neutral-950 transition-colors duration-300 relative">
      
      {/* Background radial glow spotlights */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-sky-200/10 dark:bg-indigo-900/5 blur-[100px] pointer-events-none select-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-violet-200/10 dark:bg-violet-900/5 blur-[90px] pointer-events-none select-none" />

      <div className="z-10">
        {/* Sticky Search Panel & Controls */}
        <SearchHeader 
          type={type} 
          inputVal={inputVal} 
          setInputVal={setInputVal} 
          onSubmit={handleSearchSubmit} 
        />

        {/* Dynamic sliding Tab underlines */}
        <SearchTabs 
          type={type} 
          onTabChange={handleTabChange} 
        />
      </div>

      {/* Primary Results Display */}
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-8 md:px-8 z-10">
        <AnimatePresence mode="wait">
          {!q ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center py-24 text-gray-400 dark:text-neutral-500"
            >
              <FaSearch className="text-6xl mb-4 text-sky-200 dark:text-neutral-800" />
              <p className="text-lg font-medium">Please enter a search query above to begin.</p>
            </motion.div>
          ) : isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-24"
            >
              <Loading />
            </motion.div>
          ) : isError ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-400 p-6 rounded-2xl max-w-lg mx-auto mt-10 shadow-sm"
            >
              <h3 className="font-bold text-lg mb-2 flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2.5 animate-pulse" />
                Search failed
              </h3>
              <p className="text-sm">{error?.message || "An unexpected error occurred."}</p>
            </motion.div>
          ) : (
            <motion.div
              key={`${q}-${type}`}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08,
                  },
                },
                exit: { opacity: 0 }
              }}
            >
              {renderResultsDispatcher()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
