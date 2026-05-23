import React, { useEffect } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useAppStore, applyThemeColors } from "../store/useAppStore";
import { ThemeSelector } from "../components/ThemeSelector";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const themeId = useAppStore((state) => state.themeId);
  const mode = useAppStore((state) => state.mode);

  // Synchronize CSS custom property tokens inside :root on mount and state changes
  useEffect(() => {
    applyThemeColors(themeId, mode);
  }, [themeId, mode]);

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text transition-colors duration-300 ease-in-out font-sans relative">
      <Outlet />
      
      {/* Sleek global floating theme selector popover placed at the bottom center */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex justify-center w-full max-w-[95vw] md:max-w-fit px-4">
        <ThemeSelector />
      </div>
    </div>
  );
}
