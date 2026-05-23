import React, { useEffect } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { useAppStore } from "../store/useAppStore";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const theme = useAppStore((state) => state.theme);

  // Sync theme with HTML root class for Tailwind on load
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-sky-50 dark:bg-neutral-900 text-black dark:text-white transition duration-300 ease-in-out">
      <Outlet />
    </div>
  );
}
