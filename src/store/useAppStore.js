import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set, get) => ({
      theme: "light",
      searchHistory: [],
      mockMode: true,

      toggleTheme: () => {
        const nextTheme = get().theme === "light" ? "dark" : "light";
        set({ theme: nextTheme });
        
        // Sync theme with HTML document element for Tailwind dark class
        if (nextTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      },

      addToHistory: (query) => {
        if (!query || query.trim() === "") return;
        
        const cleanQuery = query.trim();
        const currentHistory = get().searchHistory;
        
        // Remove duplicate if it already exists, and prepend to the history list
        const filteredHistory = currentHistory.filter((item) => item !== cleanQuery);
        const newHistory = [cleanQuery, ...filteredHistory].slice(0, 20); // Keep last 20 searches
        
        set({ searchHistory: newHistory });
      },

      clearHistory: () => set({ searchHistory: [] }),

      setMockMode: (val) => set({ mockMode: val }),
    }),
    {
      name: "ariser-search-store", // local storage key
    }
  )
);
