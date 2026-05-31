import React from "react";

interface BrandProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Brand: React.FC<BrandProps> = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "text-lg md:text-lg",
    md: "text-2xl md:text-3xl",
    lg: "text-4xl md:text-5xl",
    xl: "text-5xl md:text-7xl lg:text-8xl",
  };

  return (
    <div className={`font-serif-lumen font-normal tracking-tight italic select-none ${sizeClasses[size]} ${className}`}>
      <span className="inline">
        <span className="text-theme-text transition-colors duration-300">Ariser Discov</span>
        <span className="text-theme-accent transition-colors duration-300">e</span>
        <span className="text-theme-text transition-colors duration-300">r</span>
      </span>
    </div>
  );
};
