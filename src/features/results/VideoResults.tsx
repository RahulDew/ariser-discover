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
  date?: string;
}

interface VideoResultsProps {
  data: {
    videos?: VideoResult[];
  };
  cardVariants: any; // Framer motion animation variants passed from parent
}

/**
 * Senior Developer Component: VideoResults
 * Renders a grid of video items with inline player capabilities using lightweight thumbnail preloading and dynamic themes.
 */
export const VideoResults: React.FC<VideoResultsProps> = ({ data, cardVariants }) => {
  const videosList = data?.videos || [];

  if (videosList.length === 0) {
    return <p className="text-theme-text opacity-60 text-center py-10">No video results found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      {videosList.map((vid, i) => (
        <motion.div
          key={i}
          variants={cardVariants}
          whileHover={{ y: -2 }}
          className="border border-theme-border/50 rounded-2xl p-4 bg-theme-card/60 backdrop-blur-sm shadow-xs flex flex-col justify-between transition-all duration-300"
        >
          <div>
            {/* Inline React Player Container with bandwidth and theme optimization */}
            <div className="rounded-xl overflow-hidden bg-neutral-900 mb-4 aspect-video shadow-inner relative group border border-theme-border/20">
              <ReactPlayer
                url={vid.link}
                controls
                width="100%"
                height="100%"
                light={vid.imageUrl} // Custom optimization: preloads thumbnail image and play button
                playIcon={
                  <div className="w-14 h-14 bg-theme-accent text-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 active:scale-95 transition cursor-pointer">
                    <FaVideo className="text-lg ml-0.5" />
                  </div>
                }
              />
            </div>
            
            {/* Title & Description Link */}
            <a href={vid.link} target="_blank" rel="noopener noreferrer" className="hover:underline block group">
              <h3 className="text-lg font-bold font-serif-lumen text-theme-accent group-hover:opacity-85 mb-2 leading-tight">
                {vid.title}
              </h3>
            </a>
            
            <p className="text-sm text-theme-text opacity-80 mb-4 leading-relaxed truncate-3-lines">
               {vid.snippet}
            </p>
          </div>
          
          {/* Card footer details with publication date and channel name */}
          <div className="flex justify-between items-center text-xs text-theme-text opacity-50 font-bold border-t border-theme-border/40 pt-3 select-none">
            <span className="text-theme-accent truncate max-w-[45%]">
              {vid.channel ? `${vid.channel} • ${vid.source}` : vid.source}
            </span>
            <span className="flex items-center gap-1.5 flex-shrink-0">
              {vid.date && <span>{vid.date}</span>}
              {vid.date && vid.duration && <span>&bull;</span>}
              {vid.duration && <span>{vid.duration}</span>}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
