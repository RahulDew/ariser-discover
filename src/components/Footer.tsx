import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full mt-auto border-t border-theme-border bg-theme-bg/40 backdrop-blur-sm transition duration-300 py-6 px-4 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-theme-text opacity-70">
        <div className="flex items-center gap-1 font-medium select-none">
          <span>&copy; {currentYear}</span>
          <span className="font-bold text-theme-accent">Lumen Search</span>
          <span>&bull; All rights reserved.</span>
        </div>
        
        <div className="flex items-center gap-2 select-none">
          <span>Crafted with passion by</span>
          <span className="font-semibold text-theme-text hover:text-theme-accent transition cursor-default">
            Rahul Dewangan
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
