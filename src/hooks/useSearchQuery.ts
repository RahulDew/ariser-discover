import { useQuery } from "@tanstack/react-query";
import { fetchSerperResults } from "../services/serperApi";
import { useAppStore } from "../store/useAppStore";
import { useEffect } from "react";

/**
 * Custom TanStack Query Hook to handle Google Search results caching & fetching.
 * 
 * @param {string} q Search query string
 * @param {string} type Search type: 'search' | 'images' | 'videos' | 'news'
 */
export const useSearchQuery = (q, type = "search", page = 1, hl = "en", gl = "us", tbs = "anytime", batch = false, enabled = true) => {
  const { addToHistory } = useAppStore();
  const normalizedQuery = q ? q.trim() : "";

  const queryResult = useQuery({
    queryKey: ["search", normalizedQuery, type, page, hl, gl, tbs, batch],
    queryFn: () => fetchSerperResults(normalizedQuery, type, page, hl, gl, tbs, batch),
    enabled: enabled && normalizedQuery.length > 0, // Prevent running query on empty input or if disabled
    staleTime: 1000 * 60 * 10, // Consider search cached data fresh for 10 minutes
    gcTime: 1000 * 60 * 60, // Keep in garbage collector cache for 1 hour
    retry: 1, // Minimize retry attempts to preserve live quota
  });

  // Keep search history synced upon successful queries
  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data && normalizedQuery) {
      addToHistory(normalizedQuery);
    }
  }, [queryResult.isSuccess, queryResult.data, normalizedQuery, addToHistory]);

  return queryResult;
};
