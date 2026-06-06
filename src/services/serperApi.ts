const SERPER_BASE_URL = "https://google.serper.dev";

/**
 * Perform a Google Search query using Serper.dev.
 * Supports localization, advanced filtering, and array-based concurrent batch requests.
 * 
 * @param {string} q The query or list of comma-separated queries to search for
 * @param {string} type The tab type: 'search' | 'images' | 'videos' | 'news' | 'shopping'
 * @param {boolean} mockMode (Deprecated)
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
  page = 1,
  hl = "en",
  gl = "us",
  tbs = "anytime",
  batch = false
) => {
  const apiKey = import.meta.env.VITE_SERPER_KEY || "eda103aef7bf56dba66cb7f8243fc051d216bfe7";

  if (!apiKey) {
    throw new Error("Serper API Key is not configured. Please add VITE_SERPER_KEY to your .env file.");
  }

  // Split query string by commas or newlines if in batch mode
  const queries = batch
    ? q.split(/,|\n/).map(s => s.trim()).filter(Boolean)
    : [q];

  const activeQueries = queries.length > 0 ? queries : [q];

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

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "X-API-KEY": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    if (response.status === 403 || response.status === 429) {
      throw new Error("QUOTA_EXCEEDED");
    }
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

/**
 * Scrape a URL using Serper's /webpage endpoint.
 * Returns the full text content of the page.
 *
 * @param {string} url The URL to scrape
 * @returns {Promise<{ title: string; text: string }>}
 */
export const fetchSerperWebpage = async (url: string) => {
  const apiKey = import.meta.env.VITE_SERPER_KEY || "eda103aef7bf56dba66cb7f8243fc051d216bfe7";

  if (!apiKey) {
    throw new Error("Serper API Key is not configured.");
  }

  console.log(`[Serper Webpage] Scraping: ${url}`);

  const response = await fetch(`${SERPER_BASE_URL}/webpage`, {
    method: "POST",
    headers: {
      "X-API-KEY": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    if (response.status === 403 || response.status === 429) {
      throw new Error("QUOTA_EXCEEDED");
    }
    throw new Error(`Webpage scrape failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
