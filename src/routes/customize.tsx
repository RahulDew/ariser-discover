import React from "react";
import { createRoute, useRouter, Link } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";
import { useAppStore, THEMES, ThemeConfig } from "../store/useAppStore";
import { FaArrowLeft, FaSun, FaMoon, FaCheck, FaPalette, FaFont } from "react-icons/fa";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

export const customizeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/customize",
  component: CustomizeComponent,
});

function CustomizeComponent() {
  const router = useRouter();
  const { themeId, mode, setTheme, toggleMode } = useAppStore();

  React.useEffect(() => {
    document.title = "Customize Theme - Ariser Discover";
  }, []);

  const activeTheme = THEMES[themeId] || THEMES.apricot;
  const currentAccentHover = mode === "dark" ? activeTheme.dark.accentHover : activeTheme.light.accentHover;

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      router.navigate({ to: "/" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
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
          style={{ backgroundColor: currentAccentHover, opacity: 0.15 }}
          className="absolute top-[-5%] left-[-5%] w-[35vw] h-[35vw] rounded-full blur-[80px] pointer-events-none select-none z-0 transform-gpu"
        />
        <motion.div
          animate={{
            x: [0, -15, 20, 0],
            y: [0, 12, -16, 0],
            scale: [1, 0.98, 1.02, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" }}
          style={{ backgroundColor: currentAccentHover, opacity: 0.1 }}
          className="absolute bottom-[-5%] right-[-5%] w-[30vw] h-[30vw] rounded-full blur-[70px] pointer-events-none select-none z-0 transform-gpu"
        />
      </div>

      <header className="border-b border-theme-border bg-theme-bg/85 backdrop-blur-md sticky top-0 z-40 px-4 py-3.5 md:px-8 flex items-center justify-between gap-4 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleBack} 
            className="p-2 text-theme-text opacity-70 hover:opacity-100 hover:bg-theme-card rounded-full transition duration-200"
            title="Go Back"
          >
            <FaArrowLeft className="text-sm" />
          </button>
          <Link to="/">
            <div className="font-serif-lumen text-lg font-normal tracking-tight italic select-none">
              Ariser <span className="text-theme-accent">Customize</span>
            </div>
          </Link>
        </div>
        <div className="text-[10px] font-extrabold uppercase tracking-widest text-theme-accent px-3 py-1.5 bg-theme-accent/10 border border-theme-accent/20 rounded-full select-none flex items-center gap-1.5">
          <FaPalette />
          <span>Customize</span>
        </div>
      </header>

      <main className="flex-grow w-full max-w-5xl mx-auto px-4 py-8 md:py-12 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="text-center space-y-3">
            <h1 className="text-3xl md:text-5xl font-bold font-serif-lumen text-theme-text leading-tight">
              Personalize <span className="font-serif-lumen italic text-theme-accent">Your Experience</span>
            </h1>
            <p className="text-sm md:text-base text-theme-text/70 max-w-md mx-auto font-medium">
              Choose from our curated premium color palettes and typographic combinations. Changing a theme applies updates instantly.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center select-none pt-2">
            <div className="flex p-1 bg-theme-card/60 backdrop-blur-md border border-theme-border rounded-full shadow-md relative">
              <button
                type="button"
                onClick={() => { if (mode === "dark") toggleMode(); }}
                className={`flex items-center justify-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-extrabold transition-all relative duration-300 z-10 ${
                  mode === "light" ? "text-white" : "text-theme-text opacity-70 hover:opacity-100"
                }`}
              >
                {mode === "light" && (
                  <motion.div
                    layoutId="activeModeTab"
                    transition={{ type: "spring", stiffness: 550, damping: 36 }}
                    className="absolute inset-0 bg-theme-accent rounded-full -z-10 shadow-sm"
                  />
                )}
                <FaSun className="text-xs" />
                <span>Light Theme</span>
              </button>

              <button
                type="button"
                onClick={() => { if (mode === "light") toggleMode(); }}
                className={`flex items-center justify-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-extrabold transition-all relative duration-300 z-10 ${
                  mode === "dark" ? "text-white" : "text-theme-text opacity-70 hover:opacity-100"
                }`}
              >
                {mode === "dark" && (
                  <motion.div
                    layoutId="activeModeTab"
                    transition={{ type: "spring", stiffness: 550, damping: 36 }}
                    className="absolute inset-0 bg-theme-accent rounded-full -z-10 shadow-sm"
                  />
                )}
                <FaMoon className="text-xs" />
                <span>Dark Theme</span>
              </button>
            </div>
          </motion.div>

          <hr className="border-theme-border/60" />

          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {Object.values(THEMES).map((theme) => {
              const isSelected = theme.id === themeId;
              const palette = mode === "dark" ? theme.dark : theme.light;
              
              return (
                <button
                  key={theme.id}
                  onClick={() => setTheme(theme.id)}
                  style={{
                    borderColor: isSelected ? "var(--color-accent)" : "var(--color-border)",
                    boxShadow: isSelected ? "0 10px 25px -5px color-mix(in srgb, var(--color-accent) 20%, transparent)" : "none",
                  }}
                  className={`group relative text-left p-6 bg-theme-card/35 hover:bg-theme-card/65 border rounded-3xl transition-all duration-300 flex flex-col justify-between gap-5 cursor-pointer outline-none ${
                    isSelected ? "border-2" : "border"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4 bg-theme-accent text-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
                      <FaCheck className="text-[10px]" />
                    </div>
                  )}

                  <div className="space-y-1">
                    <h3 
                      style={{ fontFamily: theme.fontFamily }} 
                      className="text-lg font-bold text-theme-text group-hover:text-theme-accent transition-colors leading-none"
                    >
                      {theme.name}
                    </h3>
                    <p className="text-xs text-theme-text/60 font-medium">
                      {theme.description}
                    </p>
                  </div>

                  <div className="space-y-2 select-none">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-theme-accent block leading-none">
                      Color Palette
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="flex flex-col items-center gap-1">
                        <div 
                          style={{ backgroundColor: palette.accent }} 
                          className="w-8 h-8 rounded-full border border-black/5 dark:border-white/5 shadow-inner"
                        />
                        <span className="text-[8px] font-semibold text-theme-text/40">Accent</span>
                      </div>
                      
                      <div className="flex flex-col items-center gap-1">
                        <div 
                          style={{ backgroundColor: palette.bg }} 
                          className="w-8 h-8 rounded-full border border-black/5 dark:border-white/5 shadow-inner"
                        />
                        <span className="text-[8px] font-semibold text-theme-text/40">Page</span>
                      </div>

                      <div className="flex flex-col items-center gap-1">
                        <div 
                          style={{ backgroundColor: palette.cardBg }} 
                          className="w-8 h-8 rounded-full border border-black/5 dark:border-white/5 shadow-inner"
                        />
                        <span className="text-[8px] font-semibold text-theme-text/40">Cards</span>
                      </div>

                      <div className="flex flex-col items-center gap-1">
                        <div 
                          style={{ backgroundColor: palette.text }} 
                          className="w-8 h-8 rounded-full border border-black/5 dark:border-white/5 shadow-inner"
                        />
                        <span className="text-[8px] font-semibold text-theme-text/40">Text</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-theme-border/40 pt-3 flex-grow flex flex-col justify-end">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-theme-text/40 flex items-center gap-1 leading-none select-none">
                      <FaFont /> Typography
                    </span>
                    <div className="text-sm font-semibold truncate" style={{ fontFamily: theme.fontFamily }}>
                      Aa Bb Cc Dd Ee Ff Gg
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
