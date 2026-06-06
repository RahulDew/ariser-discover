import React from "react";
import { Link } from "@tanstack/react-router";
import { FaPalette } from "react-icons/fa";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "mt-auto" }) => {
  return (
    <footer className={`w-full border-t border-theme-border bg-theme-bg/40 backdrop-blur-sm transition duration-300 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] px-4 md:px-12 ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-theme-text opacity-70">
        
        {/* Left Side: Attribution and Help link */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 font-medium select-none w-full md:w-auto">
          <span>Crafted and passioned by</span>
          <span className="font-bold text-theme-accent hover:text-theme-accent-hover transition cursor-default">
            Rahul Dewangan
          </span>
          <span className="text-theme-text/30 mx-1">&bull;</span>
          <Link
            to="/help"
            className="font-bold text-theme-text hover:text-theme-accent transition underline decoration-theme-accent/30 hover:decoration-theme-accent decoration-2 underline-offset-4"
          >
            Help
          </Link>
        </div>
        
        {/* Right Side: Customize Button (Hidden on Mobile, Visible on Desktop) */}
        <div className="hidden md:flex items-center justify-end flex-shrink-0 z-40">
          <Link
            to="/customize"
            className="flex items-center gap-2 px-4 py-2 bg-theme-accent/10 hover:bg-theme-accent/20 border border-theme-accent/20 rounded-full text-theme-accent hover:scale-103 active:scale-97 transition-all duration-200 font-bold text-xs select-none"
          >
            <FaPalette className="text-sm" />
            <span>Customize Theme</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
