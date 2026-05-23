import React from "react";
import { motion } from "framer-motion";

interface ImageResult {
  title: string;
  imageUrl: string;
  source: string;
  link: string;
}

interface ImageResultsProps {
  data: {
    images?: ImageResult[];
  };
  cardVariants: any; // Framer motion animation variants passed from parent
}

/**
 * Senior Developer Component: ImageResults
 * Renders a structured grid of high-quality image thumbnails, details, and source links matching active theme colors.
 */
export const ImageResults: React.FC<ImageResultsProps> = ({ data, cardVariants }) => {
  const imagesList = data?.images || [];

  if (imagesList.length === 0) {
    return <p className="text-theme-text opacity-60 text-center py-10">No image results found.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 animate-fade-in">
      {imagesList.map((img, i) => (
        <motion.a
          href={img.link}
          key={i}
          target="_blank"
          rel="noopener noreferrer"
          variants={cardVariants}
          whileHover={{ y: -4, scale: 1.02 }}
          className="group block border border-theme-border/50 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 bg-theme-card/60 backdrop-blur-sm"
        >
          {/* Image Container with Aspect Ratio */}
          <div className="relative aspect-video overflow-hidden bg-theme-bg/30">
            <img
              src={img.imageUrl}
              alt={img.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-103 transition duration-300"
            />
            {/* Subtle Gradient Shadow Layer on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
          </div>
          
          {/* Metadata details */}
          <div className="p-3.5 border-t border-theme-border/20">
            <p className="text-2xs text-theme-accent font-bold uppercase tracking-wider mb-0.5">{img.source}</p>
            <h4 className="text-xs font-semibold text-theme-text truncate leading-snug" title={img.title}>
              {img.title}
            </h4>
          </div>
        </motion.a>
      ))}
    </div>
  );
};
