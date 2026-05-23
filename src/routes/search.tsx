import React, { useState, useEffect } from "react";
import { createRoute, Link, useRouter } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";
import { useSearchQuery } from "../hooks/useSearchQuery";
import { useAppStore } from "../store/useAppStore";
import { FaSun, FaMoon, FaSearch, FaTimes, FaGlobe, FaImage, FaRegNewspaper, FaVideo, FaFlask, FaArrowLeft, FaShareAlt, FaCopy } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ReactPlayer from "react-player";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

export const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  validateSearch: (search) => ({
    q: (search.q as string) || "",
    type: (search.type as string) || "search", // Default to 'search' (All)
  }),
  component: SearchComponent,
});

function SearchComponent() {
  const router = useRouter();
  const { q, type } = searchRoute.useSearch();
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const mockMode = useAppStore((state) => state.mockMode);
  const setMockMode = useAppStore((state) => state.setMockMode);

  const [inputVal, setInputVal] = useState(q);

  // Sync input value with query parameter from URL
  useEffect(() => {
    setInputVal(q);
  }, [q]);

  // Execute Search Query
  const { data, isLoading, isError, error } = useSearchQuery(q, type);

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

  const handleTabChange = (nextType: string) => {
    router.navigate({
      to: "/search",
      search: {
        q,
        type: nextType,
      },
    });
  };

  const tabs = [
    { id: "search", label: "All", icon: <FaGlobe className="mr-2" /> },
    { id: "images", label: "Images", icon: <FaImage className="mr-2" /> },
    { id: "news", label: "News", icon: <FaRegNewspaper className="mr-2" /> },
    { id: "videos", label: "Videos", icon: <FaVideo className="mr-2" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-sky-50/10 dark:bg-neutral-950 transition-colors duration-300 relative">
      
      {/* Background spotlights */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-sky-200/10 dark:bg-indigo-900/5 blur-[100px] pointer-events-none select-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-violet-200/10 dark:bg-violet-900/5 blur-[90px] pointer-events-none select-none" />

      <div className="z-10">
        {/* Sticky Header */}
        <header className="border-b border-sky-100/50 dark:border-neutral-900/80 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md sticky top-0 z-50 px-4 py-3.5 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            
            {/* Back Arrow & Logo */}
            <div className="flex items-center gap-3">
              <Link 
                to="/" 
                className="p-2 text-gray-500 hover:text-sky-700 dark:text-neutral-400 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-neutral-800 rounded-full transition duration-200"
                title="Go back to Home"
              >
                <FaArrowLeft className="text-sm" />
              </Link>
              <Link to="/" className="text-3xl font-bold text-sky-800 dark:text-sky-400 pacifico select-none hover:scale-102 transition duration-200">
                Ariser
              </Link>
            </div>

            {/* Quick Actions (Mobile Only) */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setMockMode(!mockMode)}
                className={`p-2 rounded-full text-xs font-semibold flex items-center border ${
                  mockMode 
                    ? "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900" 
                    : "bg-emerald-50 text-emerald-600 border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900"
                }`}
              >
                <FaFlask className="mr-1 animate-pulse" /> {mockMode ? "Mock" : "Live"}
              </button>
              <button 
                onClick={toggleTheme} 
                className="p-2 bg-sky-100/80 dark:bg-neutral-850 rounded-full text-sky-800 dark:text-sky-400 shadow-sm"
              >
                {theme === "dark" ? <FaSun className="text-amber-400" /> : <FaMoon />}
              </button>
            </div>
          </div>

          {/* Search Input Bar */}
          <form className="w-full md:max-w-2xl flex-grow" onSubmit={handleSearchSubmit}>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full blur opacity-5 group-hover:opacity-15 group-focus-within:opacity-25 transition duration-300" />
              <input
                type="text"
                className="relative w-full py-3 pl-5 pr-12 rounded-full border border-sky-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 text-black dark:text-white outline-none focus:border-sky-500 dark:focus:border-indigo-500 shadow-sm transition duration-300"
                placeholder="Search..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2.5 text-gray-400 dark:text-neutral-500 z-10">
                {inputVal && (
                  <button 
                    type="button" 
                    onClick={() => setInputVal("")} 
                    className="hover:text-black dark:hover:text-white transition p-0.5"
                  >
                    <FaTimes />
                  </button>
                )}
                <span className="w-px h-4 bg-gray-200 dark:bg-neutral-800" />
                <button 
                  type="submit" 
                  className="text-sky-700 dark:text-sky-400 hover:text-sky-950 dark:hover:text-sky-300 transition p-0.5"
                >
                  <FaSearch />
                </button>
              </div>
            </div>
          </form>

          {/* Controls Panel (Desktop Only) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setMockMode(!mockMode)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center border transition ${
                mockMode 
                  ? "bg-amber-50 text-amber-600 border-amber-250 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50 hover:bg-amber-100/50" 
                  : "bg-emerald-50 text-emerald-600 border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50 hover:bg-emerald-100/50"
              }`}
              title="Toggle Sandbox Mock/Live Search API Mode"
            >
              <FaFlask className="mr-1.5 animate-pulse text-sm" /> 
              {mockMode ? "Mock Sandbox" : "Live API Enabled"}
            </button>

            <button
              onClick={toggleTheme}
              className="p-2.5 bg-white dark:bg-neutral-900 border border-sky-100 dark:border-neutral-800 hover:bg-sky-50 dark:hover:bg-neutral-800 text-sky-850 dark:text-sky-450 rounded-full transition shadow-sm hover:scale-105 active:scale-95 duration-200"
              title="Toggle Light/Dark Theme"
            >
              {theme === "dark" ? <FaSun className="text-amber-400" /> : <FaMoon />}
            </button>
          </div>
        </header>

        {/* Tab Selector Links */}
        <div className="border-b border-sky-100/50 dark:border-neutral-900/80 bg-white/40 dark:bg-neutral-950/40 backdrop-blur-sm px-4 md:px-8">
          <div className="flex space-x-6 max-w-7xl mx-auto overflow-x-auto scrollbar-none">
            {tabs.map((tab) => {
              const isActive = type === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`py-3.5 px-1 relative font-semibold text-sm md:text-base flex items-center transition-colors duration-200 ${
                    isActive
                      ? "text-sky-700 dark:text-sky-450"
                      : "text-gray-500 hover:text-gray-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  
                  {/* Sliding Underline Animation via Framer Motion */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabUnderline" 
                      className="absolute bottom-0 left-0 right-0 h-0.75 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full" 
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Results Container */}
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
              {renderResults(type, data)}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

// Framer Motion card animations
const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

/**
 * Premium visual dispatcher based on current active tab
 */
function renderResults(type: string, data: any) {
  if (!data) return <p className="text-gray-400 text-center py-10">No results found.</p>;

  switch (type) {
    case "images":
      const imagesList = data.images || [];
      if (imagesList.length === 0) return <p className="text-gray-400 text-center py-10">No image results found.</p>;
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {imagesList.map((img: any, i: number) => (
            <motion.a
              href={img.link}
              key={i}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group block border border-sky-100/50 dark:border-neutral-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-sm"
            >
              <div className="relative aspect-video overflow-hidden bg-sky-50 dark:bg-neutral-900">
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-103 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
              </div>
              <div className="p-3.5">
                <p className="text-2xs text-sky-700 dark:text-sky-400 font-bold uppercase tracking-wider mb-0.5">{img.source}</p>
                <h4 className="text-xs font-semibold text-gray-800 dark:text-neutral-250 truncate leading-snug" title={img.title}>
                  {img.title}
                </h4>
              </div>
            </motion.a>
          ))}
        </div>
      );

    case "videos":
      const videosList = data.videos || [];
      if (videosList.length === 0) return <p className="text-gray-400 text-center py-10">No video results found.</p>;
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videosList.map((vid: any, i: number) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -2 }}
              className="border border-sky-100/50 dark:border-neutral-900 rounded-2xl p-4 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-sm shadow-sm flex flex-col justify-between transition-all duration-300"
            >
              <div>
                {/* Embed video player inside modern card container */}
                <div className="rounded-xl overflow-hidden bg-neutral-900 mb-4 aspect-video shadow-inner relative group border border-sky-50/10">
                  <ReactPlayer
                    url={vid.link}
                    controls
                    width="100%"
                    height="100%"
                    light={vid.imageUrl} // Premium loading performance optimization!
                    playIcon={
                      <div className="w-14 h-14 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 active:scale-95 transition cursor-pointer text-white">
                        <FaVideo className="text-lg ml-0.5" />
                      </div>
                    }
                  />
                </div>
                <a href={vid.link} target="_blank" rel="noopener noreferrer" className="hover:underline block group">
                  <h3 className="text-lg font-bold text-sky-850 dark:text-sky-400 group-hover:text-sky-600 dark:group-hover:text-sky-350 mb-2 leading-tight">
                    {vid.title}
                  </h3>
                </a>
                <p className="text-sm text-gray-600 dark:text-neutral-400 mb-4 leading-relaxed truncate-3-lines">
                  {vid.snippet}
                </p>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-400 dark:text-neutral-500 font-bold border-t border-sky-100/40 dark:border-neutral-800/80 pt-3">
                <span className="text-sky-700/80 dark:text-sky-450/80">{vid.channel || vid.source}</span>
                <span>{vid.duration && `Length: ${vid.duration}`}</span>
              </div>
            </motion.div>
          ))}
        </div>
      );

    case "news":
      const newsList = data.news || [];
      if (newsList.length === 0) return <p className="text-gray-400 text-center py-10">No news results found.</p>;
      return (
        <div className="space-y-5">
          {newsList.map((item: any, i: number) => (
            <motion.article
              key={i}
              variants={cardVariants}
              whileHover={{ x: 2, borderLeftColor: "#0284c7" }}
              className="border-l-3 border-transparent border border-sky-100/30 dark:border-neutral-900/80 p-5 rounded-2xl bg-white/70 dark:bg-neutral-900/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-5 justify-between items-start"
            >
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
              {item.imageUrl && (
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-sky-50 dark:bg-neutral-900 shrink-0 border border-sky-100/30 dark:border-neutral-800 shadow-sm">
                  <img src={item.imageUrl} alt="News Article" className="w-full h-full object-cover" />
                </div>
              )}
            </motion.article>
          ))}
        </div>
      );

    case "search":
    default:
      const organicList = data.organic || [];
      const relatedSearches = data.relatedSearches || [];
      if (organicList.length === 0) return <p className="text-gray-400 text-center py-10">No web results found.</p>;
      return (
        <div className="space-y-8">
          {/* Main Web Results */}
          <div className="space-y-5">
            {organicList.map((item: any, i: number) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -1 }}
                className="border border-sky-100/30 dark:border-neutral-900/80 p-5.5 rounded-2xl bg-white/70 dark:bg-neutral-900/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline truncate max-w-[80%] font-medium"
                  >
                    {item.link}
                  </a>
                  
                  {/* Share/Actions menu for rich styling */}
                  <div className="flex gap-2 text-gray-400 dark:text-neutral-500 select-none opacity-0 hover:opacity-100 group-hover:opacity-100 md:opacity-30 transition">
                    <button 
                      onClick={() => navigator.clipboard.writeText(item.link)}
                      className="p-1 hover:text-sky-600 dark:hover:text-sky-400" 
                      title="Copy Link"
                    >
                      <FaCopy className="text-2xs" />
                    </button>
                  </div>
                </div>

                <a href={item.link} target="_blank" rel="noopener noreferrer" className="group">
                  <h3 className="text-xl font-bold text-sky-850 dark:text-sky-400 group-hover:text-sky-600 dark:group-hover:text-sky-350 transition-colors duration-200 mb-2 leading-tight">
                    {item.title}
                  </h3>
                </a>
                <p className="text-sm text-gray-655 dark:text-neutral-400 leading-relaxed font-normal">
                  {item.snippet}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Related Searches Panel */}
          {relatedSearches.length > 0 && (
            <motion.div 
              variants={cardVariants}
              className="border-t border-sky-100/50 dark:border-neutral-900 pt-6 mt-8"
            >
              <h4 className="text-base font-bold text-gray-800 dark:text-neutral-200 mb-4 select-none flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Related Searches
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {relatedSearches.map((term: any, i: number) => (
                  <motion.div key={i} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Link
                      to="/search"
                      search={{ q: term.query, type: "search" }}
                      className="px-4.5 py-2.5 bg-white dark:bg-neutral-900 hover:bg-sky-50 dark:hover:bg-neutral-800 border border-sky-100/80 dark:border-neutral-850 text-sky-900 dark:text-neutral-300 rounded-full text-xs font-bold shadow-xs transition flex items-center gap-2"
                    >
                      <FaSearch className="text-3xs text-sky-600 dark:text-indigo-400 opacity-80" />
                      {term.query}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      );
  }
}
