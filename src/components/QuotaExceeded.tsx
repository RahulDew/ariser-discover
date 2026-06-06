import React from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { Link } from "@tanstack/react-router";

interface QuotaExceededProps {
  onBack?: () => void;
  isScraper?: boolean;
}

export const QuotaExceeded: React.FC<QuotaExceededProps> = ({ onBack, isScraper = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 450, damping: 32 }}
      className="flex flex-col items-center justify-center text-center p-8 py-16 w-full max-w-lg mx-auto select-none"
    >
      <div className="relative w-56 h-56 mb-8 flex items-center justify-center">
        <div className="absolute inset-8 rounded-full bg-theme-accent/5 blur-2xl animate-pulse" />

        <svg
          viewBox="0 0 200 200"
          className="w-full h-full relative z-10 filter drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="100"
            cy="100"
            r="85"
            stroke="var(--color-border)"
            strokeWidth="1.2"
            strokeDasharray="4 8"
            className="opacity-35"
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />

          <motion.path
            d="M50 65L52 69L56 71L52 73L50 77L48 73L44 71L48 69L50 65Z"
            fill="var(--color-accent)"
            className="opacity-50"
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M155 125L156.5 128L159.5 129.5L156.5 131L155 134L153.5 131L150.5 129.5L153.5 128L155 125Z"
            fill="var(--color-accent)"
            className="opacity-60"
            animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.7, 0.3, 0.7] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <motion.g
            animate={{ x: [-3, 3, -3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="opacity-25"
          >
            <path
              d="M35 125C35 119.5 39.5 115 45 115C46.5 115 48 115.5 49.5 116.5C52 112.5 56.5 110 61.5 110C68.5 110 74 115.5 74 122.5C74 123.5 74 124.5 73.5 125.5C75 126.5 76 128 76 130C76 134 72.5 137.5 68.5 137.5H45C39.5 137.5 35 133 35 127.5V125Z"
              fill="var(--color-border)"
            />
          </motion.g>

          <motion.g
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M130 65C130 95.3757 105.376 120 75 120C69.664 120 64.5517 119.239 59.7344 117.82C69.3496 126.657 82.0469 132 96 132C129.137 132 156 105.137 156 72C156 53.6454 147.781 37.2144 134.779 26.241C131.696 37.8929 130 50.8447 130 65Z"
              fill="var(--color-card-bg)"
              stroke="var(--color-accent)"
              strokeWidth="2.5"
            />
            <motion.text
              x="138"
              y="40"
              fontSize="12"
              fontWeight="bold"
              fill="var(--color-accent)"
              className="font-sans opacity-0"
              animate={{ opacity: [0, 0.8, 0], y: [40, 28], x: [138, 142] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 0 }}
            >
              z
            </motion.text>
            <motion.text
              x="146"
              y="32"
              fontSize="16"
              fontWeight="bold"
              fill="var(--color-accent)"
              className="font-sans opacity-0"
              animate={{ opacity: [0, 0.8, 0], y: [32, 16], x: [146, 153] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
            >
              Z
            </motion.text>
          </motion.g>

          <motion.g
            animate={{
              rotate: [15, 12, 15],
              x: [0, 2, 0],
              y: [0, 1, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="origin-[100px_98px]"
          >
            <line
              x1="90"
              y1="108"
              x2="72"
              y2="126"
              stroke="var(--color-text)"
              strokeWidth="5"
              strokeLinecap="round"
              className="opacity-70"
            />
            <line
              x1="78"
              y1="120"
              x2="72"
              y2="126"
              stroke="var(--color-accent)"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <circle
              cx="106"
              cy="92"
              r="22"
              fill="var(--color-bg)"
              stroke="var(--color-border)"
              strokeWidth="3"
            />
            <path
              d="M96 92C97 94 99 94 100 92"
              stroke="var(--color-text)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="opacity-75"
            />
            <path
              d="M107 92C108 94 110 94 111 92"
              stroke="var(--color-text)"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="opacity-75"
            />
          </motion.g>
        </svg>
      </div>

      <h3 className="text-2xl md:text-3xl font-extrabold font-serif-lumen text-theme-accent mb-3.5">
        {isScraper ? "Deep Reader is Resting" : "Ariser is Softly Resting"}
      </h3>

      <p className="text-sm md:text-base text-theme-text/70 leading-relaxed max-w-md mb-8 font-medium">
        {isScraper
          ? "Our webpage reader API limits have been reached for today. We'll be back online soon! In the meantime, you can try opening the live page directly."
          : "We have reached our daily search query limits. Ariser is resting to replenish its quota. Please check back shortly, or navigate home."}
      </p>

      <div className="flex items-center gap-3 justify-center">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-2.5 bg-theme-card border border-theme-border hover:border-theme-accent text-theme-text hover:text-theme-accent rounded-full text-xs md:text-sm font-extrabold transition duration-150 shadow-sm"
          >
            <FaArrowLeft className="text-xs" />
            <span>Go Back</span>
          </button>
        ) : (
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-theme-accent hover:bg-theme-accent-hover text-white rounded-full text-xs md:text-sm font-extrabold transition duration-150 shadow-sm"
          >
            <FaHome className="text-xs" />
            <span>Return Home</span>
          </Link>
        )}
      </div>
    </motion.div>
  );
};
