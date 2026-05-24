import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";
import { FaPlay, FaVideo } from "react-icons/fa";
import { NoData } from "../../components/NoData";

interface VideoResult {
  title: string;
  link: string;
  snippet: string;
  imageUrl?: string;
  duration?: string;
  source: string;
  channel?: string;
  date?: string;
}

interface VideoResultsProps {
  data: { videos?: VideoResult[] };
  cardVariants: any;
}

/** Fallback thumbnail shown when no imageUrl or it fails to load */
const VideoFallback: React.FC<{ title: string; source: string }> = ({ title, source }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-theme-card/60 gap-2.5 px-3">
    <div className="w-10 h-10 rounded-full bg-theme-accent/15 flex items-center justify-center">
      <FaVideo className="text-theme-accent/60 text-base" />
    </div>
    <p className="text-[10px] text-theme-text/40 font-semibold text-center line-clamp-2 leading-snug">
      {title}
    </p>
    <span className="text-[9px] text-theme-text/25 uppercase tracking-wider font-bold">{source}</span>
  </div>
);

/** Single video card with lazy mount via IntersectionObserver */
const VideoCard: React.FC<{ vid: VideoResult; variants: any }> = ({ vid, variants }) => {
  const ref   = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [thumbError, setThumbError] = useState(false);

  // Only mount ReactPlayer once the card scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: "200px" } // start loading 200px before visible
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hasThumb = !!vid.imageUrl && !thumbError;

  // Decide what to pass as `light` to ReactPlayer
  // - true  → ReactPlayer auto-fetches the YouTube/Vimeo thumbnail
  // - string → use our explicit imageUrl
  // - false  → no light mode (auto-play iframe)
  const lightProp = hasThumb ? vid.imageUrl : true;

  return (
    <motion.div
      ref={ref}
      variants={variants}
      whileHover={{ y: -2 }}
      className="group flex flex-col rounded-2xl overflow-hidden border border-theme-border/30 bg-theme-card/40 backdrop-blur-sm shadow-xs hover:shadow-md transition-all duration-200"
    >
      {/* Player area */}
      <div className="relative w-full bg-black" style={{ aspectRatio: "16/9" }}>
        {inView ? (
          <ReactPlayer
            url={vid.link}
            controls
            width="100%"
            height="100%"
            style={{ position: "absolute", top: 0, left: 0 }}
            light={lightProp}
            onError={() => setThumbError(true)}
            playIcon={
              <div className="w-10 h-10 bg-theme-accent text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition cursor-pointer">
                <FaPlay className="text-sm ml-0.5" />
              </div>
            }
            fallback={
              <div className="absolute inset-0">
                <VideoFallback title={vid.title} source={vid.source} />
              </div>
            }
          />
        ) : (
          /* Placeholder shown before card enters viewport */
          <div className="absolute inset-0">
            {hasThumb ? (
              <img
                src={vid.imageUrl}
                alt={vid.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                onError={() => setThumbError(true)}
              />
            ) : (
              <VideoFallback title={vid.title} source={vid.source} />
            )}
            {/* Static play button overlay while not in view */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/25">
              <div className="w-10 h-10 bg-theme-accent/80 text-white rounded-full flex items-center justify-center shadow-lg">
                <FaPlay className="text-sm ml-0.5" />
              </div>
            </div>
          </div>
        )}

        {/* Duration badge */}
        {vid.duration && (
          <span className="absolute bottom-1.5 right-1.5 bg-black/75 text-white text-[10px] font-bold px-1.5 py-0.5 rounded select-none z-10 pointer-events-none">
            {vid.duration}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-2.5 flex-grow justify-between">
        <div className="space-y-1">
          <a href={vid.link} target="_blank" rel="noopener noreferrer">
            <h3 className="text-xs sm:text-sm font-bold text-theme-text group-hover:text-theme-accent transition-colors duration-150 leading-snug line-clamp-2">
              {vid.title}
            </h3>
          </a>
          <p className="text-[11px] text-theme-text/50 font-medium truncate">
            {vid.channel ? `${vid.channel} · ${vid.source}` : vid.source}
            {vid.date && ` · ${vid.date}`}
          </p>
        </div>
        <span className="w-fit inline-flex items-center px-2 py-0.5 bg-theme-accent/10 border border-theme-accent/20 rounded-full text-[9px] font-extrabold uppercase tracking-widest text-theme-accent select-none leading-none">
          Video
        </span>
      </div>
    </motion.div>
  );
};

export const VideoResults: React.FC<VideoResultsProps> = ({ data, cardVariants }) => {
  const videosList = data?.videos || [];

  if (videosList.length === 0) {
    return <NoData resultType="videos" />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4 animate-fade-in">
      {videosList.map((vid, i) => (
        <VideoCard key={i} vid={vid} variants={cardVariants} />
      ))}
    </div>
  );
};
