import React, { useEffect } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useAppStore } from "../store/useAppStore";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const mode = useAppStore((state) => state.mode);

  // Sync dark class for Tailwind dark selector
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text transition-colors duration-300 ease-in-out font-sans">
      <Outlet />
    </div>
  );
}
