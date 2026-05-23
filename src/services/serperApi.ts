import { getMockResults } from "./mockData";

const SERPER_BASE_URL = "https://google.serper.dev";

/**
 * Perform a Google Search query using Serper.dev or a local Mock Data fallback.
 * 
 * @param {string} q The query to search for
 * @param {string} type The tab type: 'search' | 'images' | 'videos' | 'news'
 * @param {boolean} mockMode Explicit override to use local mock data
 * @returns {Promise<object>} The parsed search results JSON structure
 */
export const fetchSerperResults = async (q, type = "search", mockMode = true) => {
  const apiKey = import.meta.env.VITE_SERPER_KEY;

  // Enforce mock mode if selected or if API key is not configured
  if (mockMode || !apiKey) {
    console.log(`[Serper API] Query: "${q}" [Mock Mode: ${mockMode ? "Active" : "Key Missing Fallback"}]`);
    return getMockResults(q, type);
  }

  // Map router tab values to correct Serper API endpoints
  // Serper.dev URLs: /search, /images, /videos, /news
  const endpoint = `${SERPER_BASE_URL}/${type === "search" ? "search" : type}`;

  console.log(`[Serper API] Query: "${q}" [Calling endpoint: ${endpoint}]`);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q,
        num: 20, // Fetch top 20 results per search
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("[Serper API] Failed to fetch live results, falling back to mock:", error);
    // Safe graceful degradation: fallback to mock data on network/key failure
    return getMockResults(q, type);
  }
};
