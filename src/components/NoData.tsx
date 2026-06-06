import React from "react";
import { motion } from "framer-motion";
import { FaCompass, FaArrowLeft } from "react-icons/fa";

interface NoDataProps {
  resultType: string;
}

/**
 * Senior Developer UI Component: NoData
 * Renders a gorgeous, custom-themed, interactive SVG empty state.
 * Fully adapts to the active color variables (--color-accent, --color-text, etc.)
 */
export const NoData: React.FC<NoDataProps> = ({ resultType }) => {
  // Map internal tab identifiers to beautiful human-readable titles
  const getReadableType = (type: string) => {
    switch (type.toLowerCase()) {
      case "search":
        return "Web Results";
      case "images":
        return "Images";
      case "videos":
        return "Videos";
      case "news":
        return "News Stories";
      case "shopping":
        return "Products";
      case "scholar":
        return "Scholarly Articles";
      case "scraper":
        return "Webpage Content";
      default:
        return type;
    }
  };

  const readableType = getReadableType(resultType);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 450, damping: 32 }}
      className="flex flex-col items-center justify-center text-center p-8 py-16 w-full max-w-lg mx-auto select-none"
    >
      {/* Dynamic Animated theme-accented SVG Artwork */}
      <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
        {/* Soft atmospheric background glow */}
        <div className="absolute inset-4 rounded-full bg-theme-accent/5 blur-xl animate-pulse" />
        
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full relative z-10 filter drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer slow-spinning compass circle ring */}
          <motion.circle
            cx="100"
            cy="100"
            r="80"
            stroke="var(--color-border)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            className="opacity-40"
            animate={{ rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner solid border ring */}
          <circle
            cx="100"
            cy="100"
            r="65"
            stroke="var(--color-border)"
            strokeWidth="1"
            className="opacity-25"
          />

          {/* Floating magic sparkles */}
          <motion.path
            d="M50 80L52 84L56 86L52 88L50 92L48 88L44 86L48 84L50 80Z"
            fill="var(--color-accent)"
            className="opacity-60"
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.path
            d="M150 70L151.5 73L154.5 74.5L151.5 76L150 79L148.5 76L145.5 74.5L148.5 73L150 70Z"
            fill="var(--color-accent)"
            className="opacity-75"
            animate={{ scale: [1.1, 0.7, 1.1], opacity: [0.8, 0.3, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          <motion.path
            d="M75 140L76 142L78 143L76 144L75 146L74 144L72 143L74 142L75 140Z"
            fill="var(--color-accent)"
            className="opacity-50"
            animate={{ scale: [0.9, 1.3, 0.9], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          {/* Clean document sketch representing a blank state */}
          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Folder / Document shape */}
            <rect
              x="70"
              y="55"
              width="60"
              height="80"
              rx="12"
              fill="var(--color-card-bg)"
              stroke="var(--color-border)"
              strokeWidth="2"
              className="shadow-sm"
            />
            {/* Page header line */}
            <path
              d="M82 72H102"
              stroke="var(--color-accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="opacity-80"
            />
            {/* Blank page placeholder mock content lines */}
            <path
              d="M82 85H118"
              stroke="var(--color-border)"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-40"
            />
            <path
              d="M82 96H118"
              stroke="var(--color-border)"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-40"
            />
            <path
              d="M82 107H106"
              stroke="var(--color-border)"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-40"
            />

            {/* Empty dotted center magnifier target */}
            <circle
              cx="100"
              cy="95"
              r="22"
              fill="var(--color-bg)"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="opacity-70"
            />
          </motion.g>

          {/* Bobbing Magnifying glass searching */}
          <motion.g
            animate={{
              x: [0, 4, -4, 0],
              y: [0, -6, 6, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Magnifier glass handle shadow */}
            <line
              x1="117.5"
              y1="113.5"
              x2="138.5"
              y2="134.5"
              stroke="rgba(0,0,0,0.15)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Magnifier glass handle */}
            <line
              x1="117"
              y1="113"
              x2="138"
              y2="134"
              stroke="var(--color-text)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Magnifier inner accent grip cap */}
            <line
              x1="130"
              y1="126"
              x2="138"
              y2="134"
              stroke="var(--color-accent)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Magnifier glass outer rim */}
            <circle
              cx="102"
              cy="98"
              r="22"
              fill="color-mix(in srgb, var(--color-accent) 8%, transparent)"
              stroke="var(--color-accent)"
              strokeWidth="3.5"
              className="backdrop-blur-xs"
            />
            {/* Magnifier shiny light reflections */}
            <path
              d="M90 88C93.5 84.5 97.5 83 100 83"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="opacity-70"
            />
            <circle cx="89" cy="98" r="1.5" fill="white" className="opacity-65" />
          </motion.g>
        </svg>
      </div>

      {/* Elegant Serif Alert Header */}
      <h3 className="text-xl md:text-2xl font-bold font-serif-lumen text-theme-accent mb-2.5">
        No {readableType} Available
      </h3>

      {/* Helpful context subtitle */}
      <p className="text-sm text-theme-text/60 leading-relaxed max-w-sm">
        We couldn't find any results under this section. Try adjusting your search query keywords, changing filters, or selecting a different tab.
      </p>
    </motion.div>
  );
};
