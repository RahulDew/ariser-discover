import { useQuery } from "@tanstack/react-query";
import { fetchSerperWebpage } from "../services/serperApi";

/**
 * Custom TanStack Query Hook to scrape a URL via Serper's /webpage endpoint.
 *
 * @param {string} url The full URL to scrape (only runs when enabled=true)
 * @param {boolean} enabled Whether to actually fire the request
 */
export const useWebpageQuery = (url: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["webpage", url],
    queryFn: () => fetchSerperWebpage(url),
    enabled: enabled && url.length > 0,
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
    gcTime: 1000 * 60 * 60,
    retry: 1,
  });
};
