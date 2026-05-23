import React, { useEffect } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useAppStore, applyThemeColors } from "../store/useAppStore";

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
    <div className="min-h-screen bg-theme-bg text-theme-text transition-colors duration-300 ease-in-out font-sans">
      <Outlet />
    </div>
  );
}
