import React from "react";

interface BrandProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * Senior Developer Component: Brand
 * Renders the custom elegant serif logo "Lumen" with the colored accent letter "e".
 */
export const Brand: React.FC<BrandProps> = ({ className = "", size = "md" }) => {
  // Define responsive, consistent text sizing
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-3xl md:text-4xl",
    lg: "text-6xl md:text-7xl",
    xl: "text-8xl lg:text-9xl",
  };

  return (
    <div className={`font-serif-lumen font-normal tracking-tight italic select-none ${sizeClasses[size]} ${className}`}>
      <span className="text-theme-text transition-colors duration-300">Lum</span>
      <span className="text-theme-accent transition-colors duration-300">e</span>
      <span className="text-theme-text transition-colors duration-300">n</span>
    </div>
  );
};
