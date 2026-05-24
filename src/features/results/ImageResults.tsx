import React from "react";
import { motion } from "framer-motion";

interface ImageResult {
  title: string;
  imageUrl: string;
  source: string;
  link: string;
  imageWidth?: number;
  imageHeight?: number;
  domain?: string;
}

interface ImageResultsProps {
  data: { images?: ImageResult[] };
  cardVariants: any;
}

export const ImageResults: React.FC<ImageResultsProps> = ({ data, cardVariants }) => {
  const imagesList = data?.images || [];

  if (imagesList.length === 0) {
    return <p className="text-theme-text opacity-60 text-center py-10">No image results found.</p>;
  }

  const getDomain = (url: string) => {
    try { return new URL(url).hostname.replace("www.", ""); }
    catch { return url; }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 animate-fade-in">
      {imagesList.map((img, i) => (
        <motion.a
          key={i}
          href={img.link}
          target="_blank"
          rel="noopener noreferrer"
          variants={cardVariants}
          whileHover={{ scale: 1.03 }}
          className="group block rounded-xl overflow-hidden border border-theme-border/30 bg-theme-card/40 shadow-xs hover:shadow-md transition-all duration-200"
        >
          {/* Thumbnail */}
          <div className="relative overflow-hidden bg-theme-bg/30" style={{ aspectRatio: "4/3" }}>
            <img
              src={img.imageUrl}
              alt={img.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            {/* Hover overlay with dims */}
            {img.imageWidth && img.imageHeight && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-200 flex items-end justify-end p-1.5">
                <span className="text-[9px] text-white/80 font-mono font-bold bg-black/50 px-1.5 py-0.5 rounded">
                  {img.imageWidth}×{img.imageHeight}
                </span>
              </div>
            )}
          </div>

          {/* Caption */}
          <div className="px-2 py-1.5">
            <p className="text-[10px] font-semibold text-theme-text/60 truncate">
              {img.source || img.domain || getDomain(img.link)}
            </p>
            <p className="text-[11px] font-medium text-theme-text/85 truncate leading-snug" title={img.title}>
              {img.title}
            </p>
          </div>
        </motion.a>
      ))}
    </div>
  );
};
