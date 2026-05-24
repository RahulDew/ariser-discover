import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaTag } from "react-icons/fa";

interface ShoppingItem {
  title: string;
  source: string;
  link: string;
  price: string;
  imageUrl: string;
}

interface ShoppingResultsProps {
  data: {
    shopping?: ShoppingItem[];
  };
  cardVariants: any;
}

/**
 * Senior Developer Component: ShoppingResults
 * Renders the new product shopping grid using premium visual hover animations and structured spec tables.
 */
export const ShoppingResults: React.FC<ShoppingResultsProps> = ({ data, cardVariants }) => {
  const shoppingList = data?.shopping || [];

  if (shoppingList.length === 0) {
    return <p className="text-theme-text opacity-60 text-center py-10">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
      {shoppingList.map((item, idx) => (
        <motion.div
          key={idx}
          variants={cardVariants}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          className="group border border-theme-border bg-theme-card/30 rounded-3xl overflow-hidden shadow-2xs hover:shadow-sm hover:border-theme-accent/30 transition-all duration-200 flex flex-col justify-between"
        >
          {/* Aspect-square product image container */}
          <div className="aspect-square bg-theme-card/50 overflow-hidden relative flex items-center justify-center p-6 border-b border-theme-border/40 select-none">
            <img
              src={item.imageUrl}
              alt={item.title}
              loading="lazy"
              className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal rounded-xl transition duration-300 group-hover:scale-104"
              onError={(e) => {
                // Fallback icon placeholder if image fails to load
                e.currentTarget.style.display = "none";
              }}
            />
            {/* Tag Overlay Badge */}
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 bg-theme-accent/90 text-white rounded-full text-4xs font-extrabold uppercase tracking-widest shadow-sm">
              <FaTag className="text-[8px]" /> Buy
            </span>
          </div>

          {/* Product Info section */}
          <div className="p-5 flex-grow flex flex-col justify-between gap-4">
            <div className="space-y-2">
              {/* Source/Merchant info */}
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-theme-text opacity-45">
                {item.source}
              </div>
              {/* Product Title */}
              <h4 className="text-sm font-bold text-theme-text group-hover:text-theme-accent transition-colors leading-snug font-serif-lumen line-clamp-2">
                {item.title}
              </h4>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-theme-border/20 pt-3.5 mt-2">
              {/* Price Tag */}
              <div className="text-base font-extrabold text-theme-accent font-serif-lumen italic">
                {item.price}
              </div>
              
              {/* Buy button */}
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-theme-accent hover:bg-theme-accent/90 text-white rounded-full text-xs font-bold shadow-2xs hover:shadow-sm transition-all duration-200 select-none"
              >
                <span>Shop</span>
                <FaExternalLinkAlt className="text-[9px]" />
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
