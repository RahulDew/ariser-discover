import React from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa";

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
  data: { videos?: VideoResult[] };
  cardVariants: any;
}

export const VideoResults: React.FC<VideoResultsProps> = ({ data, cardVariants }) => {
  const videosList = data?.videos || [];

  if (videosList.length === 0) {
    return <p className="text-theme-text opacity-60 text-center py-10">No video results found.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4 animate-fade-in">
      {videosList.map((vid, i) => (
        <motion.div
          key={i}
          variants={cardVariants}
          whileHover={{ y: -2 }}
          className="group flex flex-col rounded-2xl overflow-hidden border border-theme-border/30 bg-theme-card/40 backdrop-blur-sm shadow-xs hover:shadow-md transition-all duration-200"
        >
          {/* Thumbnail / Player */}
          <div className="relative w-full bg-black" style={{ aspectRatio: "16/9" }}>
            <ReactPlayer
              url={vid.link}
              controls
              width="100%"
              height="100%"
              style={{ position: "absolute", top: 0, left: 0 }}
              light={vid.imageUrl}
              playIcon={
                <div className="w-10 h-10 bg-theme-accent text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition cursor-pointer">
                  <FaPlay className="text-sm ml-0.5" />
                </div>
              }
            />
            {/* Duration badge */}
            {vid.duration && (
              <span className="absolute bottom-1.5 right-1.5 bg-black/75 text-white text-[10px] font-bold px-1.5 py-0.5 rounded select-none">
                {vid.duration}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-3 flex flex-col gap-1 flex-grow">
            <a href={vid.link} target="_blank" rel="noopener noreferrer">
              <h3 className="text-xs sm:text-sm font-bold text-theme-text group-hover:text-theme-accent transition-colors duration-150 leading-snug line-clamp-2">
                {vid.title}
              </h3>
            </a>
            <p className="text-[11px] text-theme-text/55 font-medium truncate">
              {vid.channel ? `${vid.channel} · ${vid.source}` : vid.source}
              {vid.date && ` · ${vid.date}`}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
