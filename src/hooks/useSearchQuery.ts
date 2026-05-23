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
export const useSearchQuery = (q, type = "search") => {
  const { mockMode, addToHistory } = useAppStore();
  const normalizedQuery = q ? q.trim() : "";

  const queryResult = useQuery({
    queryKey: ["search", normalizedQuery, type, mockMode],
    queryFn: () => fetchSerperResults(normalizedQuery, type, mockMode),
    enabled: normalizedQuery.length > 0, // Prevent running query on empty input
    staleTime: 1000 * 60 * 10, // Consider search cached data fresh for 10 minutes
    gcTime: 1000 * 60 * 60, // Keep in garbage collector cache for 1 hour
    retry: mockMode ? false : 1, // Minimize retry attempts to preserve live quota
  });

  // Keep search history synced upon successful queries
  useEffect(() => {
    if (queryResult.isSuccess && queryResult.data && normalizedQuery) {
      addToHistory(normalizedQuery);
    }
  }, [queryResult.isSuccess, queryResult.data, normalizedQuery, addToHistory]);

  return queryResult;
};
