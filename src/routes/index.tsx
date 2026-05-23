import React, { useState } from "react";
import { createRoute, useRouter } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";
import { useAppStore } from "../store/useAppStore";
import { FaSun, FaMoon } from "react-icons/fa";
import Footer from "../components/Footer";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomeComponent,
});

function HomeComponent() {
  const router = useRouter();
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const [localSearch, setLocalSearch] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!localSearch.trim()) return;

    // Navigate programmatically with type-safe search parameters
    router.navigate({
      to: "/search",
      search: {
        q: localSearch.trim(),
        type: "search", // Default to 'search' (All) tab
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Navbar with logo and Theme Toggle */}
      <nav className="flex justify-between items-center px-5 md:px-14 pt-4">
        <a href="#" className="p-2 text-4xl font-bold text-sky-800 dark:text-sky-500 pacifico">
          Ariser
        </a>
        <button
          onClick={toggleTheme}
          className="p-3 text-xl md:text-2xl bg-sky-200 dark:bg-neutral-800 rounded-full shadow-md text-sky-900 dark:text-sky-400 hover:shadow-lg transition duration-200"
          title="Toggle Light/Dark Theme"
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </nav>

      {/* Main Search Panel */}
      <div className="flex flex-col items-center justify-center text-center w-full px-4 -mt-20">
        <div className="text-sky-800 dark:text-sky-500 text-8xl lg:text-9xl font-bold pacifico mb-6 select-none">
          Ariser
        </div>

        <form className="w-full max-w-xl mb-6" onSubmit={handleSearchSubmit}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search the web..."
              className="w-full py-4 px-6 rounded-full border border-sky-500 dark:border-sky-500/50 bg-white dark:bg-neutral-800 text-black dark:text-white shadow-md outline-none focus:border-sky-600 focus:shadow-lg transition duration-200 text-lg pr-12"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              autoFocus
            />
          </div>
        </form>

        <div className="bg-sky-100 dark:bg-neutral-800/50 text-sky-800 dark:text-sky-400 px-6 py-2 rounded-full text-base font-medium transition duration-200 select-none">
          Keep Exploring !!!
        </div>
      </div>

      <Footer />
    </div>
  );
}
