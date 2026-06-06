import React from "react";
import { createRoute, Link } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";
import { motion } from "framer-motion";
import { Brand } from "../components/Brand";
import Footer from "../components/Footer";
import { 
  FaArrowLeft, 
  FaGlobe, 
  FaSearch, 
  FaBook, 
  FaKey, 
  FaQuestionCircle, 
  FaPalette, 
  FaHistory, 
  FaCheckCircle, 
  FaTerminal 
} from "react-icons/fa";
import { useAppStore, THEMES } from "../store/useAppStore";

export const helpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/help",
  component: HelpComponent,
});

function HelpComponent() {
  const { themeId, mode } = useAppStore();

  React.useEffect(() => {
    document.title = "Help & Features - Ariser Discover";
  }, []);

  const activeTheme = THEMES[themeId] || THEMES.apricot;
  const currentAccentHover = mode === "dark" ? activeTheme.dark.accentHover : activeTheme.light.accentHover;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.01,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 450, damping: 32 },
    },
  };

  const guides = [
    {
      icon: <FaSearch className="text-theme-accent text-lg" />,
      title: "1. Search Softly",
      description: "Type search query keywords into the main search box. Switch seamlessly across tabs like All, Images, Videos, News, Shopping, and Scholar."
    },
    {
      icon: <FaGlobe className="text-theme-accent text-lg" />,
      title: "2. Deep Web Scrape",
      description: "Toggle on the 'Deep Reader Scraper' mode and paste a full URL. Ariser will bypass proxy firewalls to retrieve clean extracted text body copy."
    },
    {
      icon: <FaPalette className="text-theme-accent text-lg" />,
      title: "3. Customize Your Theme",
      description: "Click the floating Theme Selector customize pill at the bottom. Choose from 8 warm light/dark premium colorways dynamically sync'd to local cache."
    }
  ];

  const specs = [
    {
      icon: <FaTerminal className="text-theme-text/80 text-base" />,
      title: "Core Search Engine API",
      value: (
        <span>
          <a href="https://serper.dev" target="_blank" rel="noopener noreferrer" className="text-theme-accent hover:underline font-bold">Serper.dev</a> Google Search API (Blazing fast live scraping engine delivering organic results under 1s)
        </span>
      )
    },
    {
      icon: <FaKey className="text-theme-text/80 text-base" />,
      title: "Deep Scraper API",
      value: (
        <span>
          <a href="https://serper.dev" target="_blank" rel="noopener noreferrer" className="text-theme-accent hover:underline font-bold">Serper.dev</a> /webpage Endpoint proxy (Scrapes, parses and structures static DOM body copy)
        </span>
      )
    },
    {
      icon: <FaHistory className="text-theme-text/80 text-base" />,
      title: "State Management & Cache",
      value: "Zustand Persistence + React Query (TanStack) with a 10-minute cache and 1-hour garbage collector cycle to minimize quota consumption"
    }
  ];

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col justify-between relative bg-theme-bg transition-colors duration-300">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -16, 12, 0],
            scale: [1, 1.05, 0.98, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" }}
          style={{ backgroundColor: currentAccentHover, opacity: 0.18 }}
          className="absolute top-[-5%] left-[-5%] w-[35vw] h-[35vw] rounded-full blur-[80px] pointer-events-none select-none z-0 transform-gpu"
        />
        <motion.div
          animate={{
            x: [0, -15, 20, 0],
            y: [0, 12, -16, 0],
            scale: [1, 0.98, 1.02, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" }}
          style={{ backgroundColor: currentAccentHover, opacity: 0.12 }}
          className="absolute bottom-[-5%] right-[-5%] w-[30vw] h-[30vw] rounded-full blur-[70px] pointer-events-none select-none z-0 transform-gpu"
        />
      </div>

      <header className="border-b border-theme-border bg-theme-bg/85 backdrop-blur-md sticky top-0 z-40 px-4 py-3.5 md:px-8 flex items-center justify-between gap-4 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <Link 
            to="/" 
            className="p-2 text-theme-text opacity-70 hover:opacity-100 hover:bg-theme-card rounded-full transition duration-200"
            title="Go back to Home"
          >
            <FaArrowLeft className="text-sm" />
          </Link>
          <Link to="/">
            <Brand size="sm" />
          </Link>
        </div>
        <div className="text-[10px] font-extrabold uppercase tracking-widest text-theme-accent px-3 py-1.5 bg-theme-accent/10 border border-theme-accent/20 rounded-full select-none flex items-center gap-1.5">
          <FaQuestionCircle />
          <span>Help Center</span>
        </div>
      </header>

      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-8 md:py-12 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold font-serif-lumen text-theme-text leading-tight">
              Using <span className="font-serif-lumen italic text-theme-accent">Ariser Discover</span>
            </h1>
            <p className="text-sm md:text-base text-theme-text/75 max-w-xl mx-auto font-medium leading-relaxed">
              Ariser is a custom-themed, elegant Google Search client designed to help you search and explore the web softly, with integrated full-page reader scraper capabilities.
            </p>
          </motion.div>

          <hr className="border-theme-border/60" />

          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-lg md:text-xl font-bold font-serif-lumen text-theme-accent flex items-center gap-2 select-none">
              <FaBook className="text-xs" />
              <span>How To Use The App</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {guides.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-5 border border-theme-border bg-theme-card/35 rounded-3xl space-y-3.5 shadow-sm hover:border-theme-accent/40 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-2xl bg-theme-accent/10 border border-theme-accent/20 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-sm md:text-base text-theme-text">{item.title}</h3>
                  <p className="text-xs md:text-sm text-theme-text/60 leading-relaxed font-medium">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <hr className="border-theme-border/60" />

          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-lg md:text-xl font-bold font-serif-lumen text-theme-accent flex items-center gap-2 select-none">
              <FaTerminal className="text-xs" />
              <span>API Details & Integration Specifications</span>
            </h2>
            <div className="border border-theme-border bg-theme-card/20 rounded-3xl overflow-hidden divide-y divide-theme-border/60 shadow-sm">
              {specs.map((spec, idx) => (
                <div key={idx} className="p-5 md:p-6 flex flex-col md:flex-row gap-2.5 md:items-start justify-between">
                  <div className="flex items-center gap-2 font-bold text-xs md:text-sm text-theme-text min-w-[200px]">
                    <span className="opacity-60">{spec.icon}</span>
                    <span>{spec.title}</span>
                  </div>
                  <div className="text-xs md:text-sm font-medium text-theme-text/70 leading-relaxed md:max-w-xl md:text-right">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <hr className="border-theme-border/60" />

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-theme-border/80 bg-theme-card/15 rounded-3xl space-y-4 shadow-3xs">
              <h3 className="text-base font-bold text-theme-accent flex items-center gap-1.5 leading-none">
                <FaCheckCircle className="text-xs" />
                <span>Zero Latency Privacy Engine</span>
              </h3>
              <p className="text-xs md:text-sm text-theme-text/65 leading-relaxed font-medium">
                To maximize your security, Ariser proxies all requests directly through high-performance edge layers. No personally identifiable details are passed to downstream providers or third parties.
              </p>
            </div>
            
            <div className="p-6 border border-theme-border/80 bg-theme-card/15 rounded-3xl space-y-4 shadow-3xs">
              <h3 className="text-base font-bold text-theme-accent flex items-center gap-1.5 leading-none">
                <FaCheckCircle className="text-xs" />
                <span>Responsive & Fluid Aesthetics</span>
              </h3>
              <p className="text-xs md:text-sm text-theme-text/65 leading-relaxed font-medium">
                Designed to run softly on all screen aspect ratios. Visual spotlights, custom SVG states, fluid animations, and elastic theme switches adapt dynamically to fit mobile devices, tablets, and desktop monitors.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
