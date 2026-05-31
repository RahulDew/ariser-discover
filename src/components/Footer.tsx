import React from "react";
import { ThemeSelector } from "./ThemeSelector";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "mt-auto" }) => {
  return (
    <footer className={`w-full border-t border-theme-border bg-theme-bg/40 backdrop-blur-sm transition duration-300 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] px-4 md:px-12 ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-theme-text opacity-70">
        
        {/* Left Side: Attribution exactly matching user's text */}
        <div className="flex items-center justify-center md:justify-start gap-1.5 font-medium select-none w-full md:w-auto">
          <span>Crafted and passioned by</span>
          <span className="font-bold text-theme-accent hover:text-theme-accent-hover transition cursor-default">
            Rahul Dewangan
          </span>
        </div>
        
        {/* Right Side: Theme Switcher Selector Pill (Hidden on Mobile, Visible on Desktop) */}
        <div className="hidden md:flex items-center justify-end flex-shrink-0 z-40">
          <ThemeSelector layoutId="theme-selector-footer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
