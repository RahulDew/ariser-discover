import { getMockResults } from "./mockData";

const SERPER_BASE_URL = "https://google.serper.dev";

/**
 * Perform a Google Search query using Serper.dev or a local Mock Data fallback.
 * Supports localization, advanced filtering, and array-based concurrent batch requests.
 * 
 * @param {string} q The query or list of comma-separated queries to search for
 * @param {string} type The tab type: 'search' | 'images' | 'videos' | 'news' | 'shopping'
 * @param {boolean} mockMode Explicit override to use local mock data
 * @param {number} page Page number for pagination
 * @param {string} hl Language code
 * @param {string} gl Country code
 * @param {string} tbs Time filter range
 * @param {boolean} batch Whether batch mode is active
 * @returns {Promise<object | array>} The parsed search result(s) JSON structure
 */
export const fetchSerperResults = async (
  q, 
  type = "search", 
  mockMode = false, 
  page = 1,
  hl = "en",
  gl = "us",
  tbs = "anytime",
  batch = false
) => {
  const apiKey = import.meta.env.VITE_SERPER_KEY || "eda103aef7bf56dba66cb7f8243fc051d216bfe7";

  // Split query string by commas or newlines if in batch mode
  const queries = batch
    ? q.split(/,|\n/).map(s => s.trim()).filter(Boolean)
    : [q];

  const activeQueries = queries.length > 0 ? queries : [q];

  // Enforce mock mode if selected or if API key is not configured
  if (mockMode || !apiKey) {
    console.log(`[Serper API] Query: "${q}" p${page} [${mockMode ? "Mock Mode" : "Key Missing – Fallback"}]`);
    if (batch) {
      return Promise.all(activeQueries.map(query => getMockResults(query, type)));
    }
    return getMockResults(q, type);
  }

  // Map router tab values to correct Serper API endpoints
  // Serper.dev URLs: /search, /images, /videos, /news, /shopping
  const endpoint = `${SERPER_BASE_URL}/${type === "search" ? "search" : type}`;

  console.log(`[Serper API] Query: "${q}" p${page} (hl: ${hl}, gl: ${gl}, tbs: ${tbs}, batch: ${batch}) [Calling: ${endpoint}]`);

  // Map tbs filter values: anytime (default) -> undefined, 24h -> qdr:d, etc.
  const tbsValue = 
    tbs === "24h" 
      ? "qdr:d" 
      : tbs === "week" 
      ? "qdr:w" 
      : tbs === "month" 
      ? "qdr:m" 
      : tbs === "year" 
      ? "qdr:y" 
      : undefined;

  // Construct batch array payload or single search object
  const payload = batch
    ? activeQueries.map(query => ({
        q: query,
        num: 10,
        page,
        hl,
        gl,
        tbs: tbsValue
      }))
    : {
        q,
        num: 10,
        page,
        hl,
        gl,
        tbs: tbsValue
      };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("[Serper API] Failed to fetch live results, falling back to mock:", error);
    // Safe graceful degradation: fallback to mock data on network/key failure
    if (batch) {
      return Promise.all(activeQueries.map(query => getMockResults(query, type)));
    }
    return getMockResults(q, type);
  }
};
