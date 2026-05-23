import React from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import { FaVideo } from "react-icons/fa";

interface VideoResult {
  title: string;
  link: string;
  snippet: string;
  imageUrl: string;
  duration?: string;
  source: string;
  channel?: string;
}

interface VideoResultsProps {
  data: {
    videos?: VideoResult[];
  };
  cardVariants: any; // Framer motion animation variants passed from parent
}

/**
 * Senior Developer Component: VideoResults
 * Renders a grid of video items with inline player capabilities using lightweight thumbnail preloading.
 */
export const VideoResults: React.FC<VideoResultsProps> = ({ data, cardVariants }) => {
  const videosList = data?.videos || [];

  if (videosList.length === 0) {
    return <p className="text-gray-400 text-center py-10">No video results found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {videosList.map((vid, i) => (
        <motion.div
          key={i}
          variants={cardVariants}
          whileHover={{ y: -2 }}
          className="border border-sky-100/50 dark:border-neutral-900 rounded-2xl p-4 bg-white/70 dark:bg-neutral-900/50 backdrop-blur-sm shadow-sm flex flex-col justify-between transition-all duration-300"
        >
          <div>
            {/* Inline React Player Container with bandwidth optimization */}
            <div className="rounded-xl overflow-hidden bg-neutral-900 mb-4 aspect-video shadow-inner relative group border border-sky-50/10">
              <ReactPlayer
                url={vid.link}
                controls
                width="100%"
                height="100%"
                light={vid.imageUrl} // Custom optimization: preloads thumbnail image and play button, only spins up heavier ReactPlayer framework on-click
                playIcon={
                  <div className="w-14 h-14 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 active:scale-95 transition cursor-pointer text-white">
                    <FaVideo className="text-lg ml-0.5" />
                  </div>
                }
              />
            </div>
            
            {/* Title & Description Link */}
            <a href={vid.link} target="_blank" rel="noopener noreferrer" className="hover:underline block group">
              <h3 className="text-lg font-bold text-sky-850 dark:text-sky-400 group-hover:text-sky-600 dark:group-hover:text-sky-350 mb-2 leading-tight">
                {vid.title}
              </h3>
            </a>
            
            <p className="text-sm text-gray-600 dark:text-neutral-400 mb-4 leading-relaxed truncate-3-lines">
              {vid.snippet}
            </p>
          </div>
          
          {/* Card footer details */}
          <div className="flex justify-between items-center text-xs text-gray-400 dark:text-neutral-500 font-bold border-t border-sky-100/40 dark:border-neutral-800/80 pt-3">
            <span className="text-sky-700/80 dark:text-sky-450/80">{vid.channel || vid.source}</span>
            <span>{vid.duration && `Length: ${vid.duration}`}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
